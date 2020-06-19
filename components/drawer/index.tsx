import * as React from 'react';
import RcDrawer from 'rc-drawer';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import omit from 'omit.js';

import { ConfigConsumerProps } from '../config-provider';
import { withConfigConsumer, ConfigConsumer } from '../config-provider/context';
import { tuple } from '../_util/type';

const DrawerContext = React.createContext<Drawer | null>(null);

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];

interface PushState {
  distance?: string | number;
  stopPropagation?: boolean;
}
export interface DrawerProps {
  closable?: boolean;
  closeIcon?: React.ReactNode;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  /** wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean | PushState;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  keyboard?: boolean;
  footer?: React.ReactNode;
  footerStyle?: React.CSSProperties;
}

export interface IDrawerState {
  pushTimes: number;
}

class Drawer extends React.Component<DrawerProps & ConfigConsumerProps, IDrawerState> {
  static defaultProps = {
    width: 256,
    height: 256,
    closable: true,
    placement: 'right' as placementType,
    maskClosable: true,
    mask: true,
    level: null,
    keyboard: true,
    push: true,
  };

  readonly state = {
    pushTimes: 0,
  };

  parentDrawer: Drawer | null;

  destroyClose: boolean;

  public componentDidMount() {
    // fix: delete drawer in child and re-render, no push started.
    // <Drawer>{show && <Drawer />}</Drawer>
    const { visible } = this.props;
    if (visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  }

  public componentDidUpdate(preProps: DrawerProps) {
    const { visible } = this.props;
    if (preProps.visible !== visible && this.parentDrawer) {
      if (visible) {
        this.parentDrawer.push();
      } else {
        this.parentDrawer.pull();
      }
    }
  }

  public componentWillUnmount() {
    // unmount drawer in child, clear push.
    if (this.parentDrawer) {
      this.parentDrawer.pull(0);
      this.parentDrawer = null;
    }
  }

  push = () => {
    const pushState = this.getPushState();
    if (this.parentDrawer && !pushState.stopPropagation) {
      this.parentDrawer.push();
    }

    this.setState(({ pushTimes }) => ({
      pushTimes: pushTimes + 1,
    }));
  };

  pull = (nextPushTimes?: number) => {
    const pushState = this.getPushState();
    if (this.parentDrawer && !pushState.stopPropagation) {
      this.parentDrawer.pull(typeof nextPushTimes === 'number' ? nextPushTimes + 1 : undefined);
    }
    this.setState(({ pushTimes }) => ({
      pushTimes: typeof nextPushTimes === 'number' ? nextPushTimes : pushTimes - 1,
    }));
  };

  onDestroyTransitionEnd = () => {
    const isDestroyOnClose = this.getDestroyOnClose();
    if (!isDestroyOnClose) {
      return;
    }
    if (!this.props.visible) {
      this.destroyClose = true;
      this.forceUpdate();
    }
  };

  getDestroyOnClose = () => this.props.destroyOnClose && !this.props.visible;

  getPushState = (): PushState => {
    const { push } = this.props;
    const defaultPushState = {
      distance: 180,
      stopPropagation: false,
    };

    if (typeof push === 'boolean') {
      return push ? defaultPushState : { distance: 0, stopPropagation: true };
    }
    if (typeof push === 'object') {
      return { ...defaultPushState, ...push };
    }

    return defaultPushState;
  };

  getPushDistance = () => {
    const pushState = this.getPushState();
    const { pushTimes } = this.state;
    const distance = parseFloat(String(pushState.distance || 0));
    return pushTimes * distance;
  };

  // get drawer push width or height
  getPushTransform = (placement?: placementType) => {
    const distance = this.getPushDistance();
    if (distance === 0) {
      return undefined;
    }
    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? distance : -distance}px)`;
    }
    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? distance : -distance}px)`;
    }
  };

  getOffsetStyle() {
    const { placement, width, height, visible, mask } = this.props;
    // https://github.com/ant-design/ant-design/issues/24287
    if (!visible && !mask) {
      return {};
    }
    const offsetStyle: any = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }
    return offsetStyle;
  }

  getRcDrawerStyle = () => {
    const { zIndex, placement, mask, style } = this.props;
    // 当无 mask 时，将 width 应用到外层容器上
    // 解决 https://github.com/ant-design/ant-design/issues/12401 的问题
    const offsetStyle = mask ? {} : this.getOffsetStyle();
    return {
      zIndex,
      transform: this.getPushTransform(placement),
      ...offsetStyle,
      ...style,
    };
  };

  renderHeader() {
    const { title, prefixCls, closable, headerStyle } = this.props;
    if (!title && !closable) {
      return null;
    }

    const headerClassName = title ? `${prefixCls}-header` : `${prefixCls}-header-no-title`;
    return (
      <div className={headerClassName} style={headerStyle}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {closable && this.renderCloseIcon()}
      </div>
    );
  }

  renderFooter() {
    const { footer, footerStyle, prefixCls } = this.props;
    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }

  renderCloseIcon() {
    const { closable, closeIcon = <CloseOutlined />, prefixCls, onClose } = this.props;
    return (
      closable && (
        // eslint-disable-next-line react/button-has-type
        <button
          onClick={onClose}
          aria-label="Close"
          className={`${prefixCls}-close`}
          style={
            {
              '--scroll-bar': `${getScrollBarSize()}px`,
            } as any
          }
        >
          {closeIcon}
        </button>
      )
    );
  }

  // render drawer body dom
  renderBody = () => {
    const { bodyStyle, drawerStyle, prefixCls, visible } = this.props;
    if (this.destroyClose && !visible) {
      return null;
    }
    this.destroyClose = false;

    const containerStyle: React.CSSProperties = {};

    const isDestroyOnClose = this.getDestroyOnClose();

    if (isDestroyOnClose) {
      // Increase the opacity transition, delete children after closing.
      containerStyle.opacity = 0;
      containerStyle.transition = 'opacity .3s';
    }

    return (
      <div
        className={`${prefixCls}-wrapper-body`}
        style={{
          ...containerStyle,
          ...drawerStyle,
        }}
        onTransitionEnd={this.onDestroyTransitionEnd}
      >
        {this.renderHeader()}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  };

  // render Provider for Multi-level drawer
  renderProvider = (value: Drawer) => {
    this.parentDrawer = value;

    return (
      <ConfigConsumer>
        {({ getPopupContainer, getPrefixCls }) => {
          const {
            prefixCls: customizePrefixCls,
            placement,
            className,
            mask,
            direction,
            visible,
            ...rest
          } = this.props;

          const prefixCls = getPrefixCls('select', customizePrefixCls);
          const drawerClassName = classNames(className, {
            'no-mask': !mask,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          });
          const offsetStyle = mask ? this.getOffsetStyle() : {};

          return (
            <DrawerContext.Provider value={this}>
              <RcDrawer
                handler={false}
                {...omit(rest, [
                  'zIndex',
                  'style',
                  'closable',
                  'closeIcon',
                  'destroyOnClose',
                  'drawerStyle',
                  'headerStyle',
                  'bodyStyle',
                  'footerStyle',
                  'footer',
                  'locale',
                  'title',
                  'push',
                  'visible',
                  'getPopupContainer',
                  'rootPrefixCls',
                  'getPrefixCls',
                  'renderEmpty',
                  'csp',
                  'pageHeader',
                  'autoInsertSpaceInButton',
                  'width',
                  'height',
                  'dropdownMatchSelectWidth',
                  'getTargetContainer',
                ])}
                getContainer={
                  // 有可能为 false，所以不能直接判断
                  rest.getContainer === undefined && getPopupContainer
                    ? () => getPopupContainer(document.body)
                    : rest.getContainer
                }
                {...offsetStyle}
                prefixCls={prefixCls}
                open={visible}
                showMask={mask}
                placement={placement}
                style={this.getRcDrawerStyle()}
                className={drawerClassName}
              >
                {this.renderBody()}
              </RcDrawer>
            </DrawerContext.Provider>
          );
        }}
      </ConfigConsumer>
    );
  };

  render() {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}

export default withConfigConsumer<DrawerProps>({
  prefixCls: 'drawer',
})(Drawer);
