import * as React from 'react';
import RcDrawer from 'rc-drawer';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import omit from 'omit.js';

import { ConfigConsumerProps } from '../config-provider';
import { withConfigConsumer } from '../config-provider/context';
import { tuple } from '../_util/type';

const DrawerContext = React.createContext<Drawer | null>(null);

type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];
export interface DrawerProps {
  closable?: boolean;
  destroyOnClose?: boolean;
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
  push?: boolean;
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
  push?: boolean;
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
  };

  readonly state = {
    push: false,
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
      this.parentDrawer.pull();
      this.parentDrawer = null;
    }
  }

  push = () => {
    this.setState({
      push: true,
    });
  };

  pull = () => {
    this.setState({
      push: false,
    });
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

  // get drawer push width or height
  getPushTransform = (placement?: placementType) => {
    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? 180 : -180}px)`;
    }
    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? 180 : -180}px)`;
    }
  };

  getRcDrawerStyle = () => {
    const { zIndex, placement, style } = this.props;
    const { push } = this.state;
    return {
      zIndex,
      transform: push ? this.getPushTransform(placement) : undefined,
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
    const { closable, prefixCls, onClose } = this.props;
    return (
      closable && (
        // eslint-disable-next-line react/button-has-type
        <button onClick={onClose} aria-label="Close" className={`${prefixCls}-close`}>
          <CloseOutlined />
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
    const { prefixCls, placement, className, width, height, mask, direction, ...rest } = this.props;
    const haveMask = mask ? '' : 'no-mask';
    this.parentDrawer = value;
    const offsetStyle: any = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }
    const drawerClassName = classNames(className, haveMask, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    return (
      <DrawerContext.Provider value={this}>
        <RcDrawer
          handler={false}
          {...omit(rest, [
            'zIndex',
            'style',
            'closable',
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
          ])}
          {...offsetStyle}
          prefixCls={prefixCls}
          open={this.props.visible}
          showMask={mask}
          placement={placement}
          style={this.getRcDrawerStyle()}
          className={drawerClassName}
        >
          {this.renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    );
  };

  render() {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}

export default withConfigConsumer<DrawerProps>({
  prefixCls: 'drawer',
})(Drawer);
