import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcDrawer from 'rc-drawer';
import createReactContext, { Context } from 'create-react-context';
import warning from 'warning';
import classNames from 'classnames';
import Icon from '../icon';
import { tuple } from '../_util/type';

const DrawerContext: Context<Drawer | null> = createReactContext(null);

type EventType = React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>;

type getContainerfunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = (typeof PlacementTypes)[number];
export interface DrawerProps {
  closable?: boolean;
  destroyOnClose?: boolean;
  getContainer?: string | HTMLElement | getContainerfunc;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  /* deprecated, use className instead */
  wrapClassName?: string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  className?: string;
}

export interface IDrawerState {
  push?: boolean;
}

export default class Drawer extends React.Component<DrawerProps, IDrawerState> {
  static propTypes = {
    closable: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    getContainer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object as PropTypes.Requireable<HTMLElement>,
      PropTypes.func,
      PropTypes.bool,
    ]),
    maskClosable: PropTypes.bool,
    mask: PropTypes.bool,
    maskStyle: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.node,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number,
    prefixCls: PropTypes.string,
    placement: PropTypes.oneOf(PlacementTypes),
    onClose: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'ant-drawer',
    width: 256,
    height: 256,
    closable: true,
    placement: 'right' as placementType,
    maskClosable: true,
    mask: true,
    level: null,
  };

  readonly state = {
    push: false,
  };

  parentDrawer: Drawer;
  destoryClose: boolean;

  public componentDidUpdate(preProps: DrawerProps) {
    if (preProps.visible !== this.props.visible && this.parentDrawer) {
      if (this.props.visible) {
        this.parentDrawer.push();
      } else {
        this.parentDrawer.pull();
      }
    }
  }

  close = (e: EventType) => {
    if (this.props.visible !== undefined) {
      if (this.props.onClose) {
        this.props.onClose(e);
      }
      return;
    }
  };

  onMaskClick = (e: EventType) => {
    if (!this.props.maskClosable) {
      return;
    }
    this.close(e);
  };

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

  onDestoryTransitionEnd = () => {
    const isDestroyOnClose = this.getDestoryOnClose();
    if (!isDestroyOnClose) {
      return;
    }
    if (!this.props.visible) {
      this.destoryClose = true;
      this.forceUpdate();
    }
  };

  getDestoryOnClose = () => this.props.destroyOnClose && !this.props.visible;

  // get drawar push width or height
  getPushTransform = (placement?: placementType) => {
    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? 180 : -180}px)`;
    }
    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? 180 : -180}px)`;
    }
  };

  renderHeader() {
    const { prefixCls, title, closable } = this.props;
    if (!title && !closable) {
      return null;
    }
    return (
      <div className={`${prefixCls}-header`}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {this.renderCloseIcon()}
      </div>
    );
  }

  renderCloseIcon() {
    const { prefixCls, closable } = this.props;
    return (
      closable && (
        <button onClick={this.close} aria-label="Close" className={`${prefixCls}-close`}>
          <Icon type="close" />
        </button>
      )
    );
  }

  // render drawer body dom
  renderBody = () => {
    const { placement, prefixCls, visible } = this.props;
    if (this.destoryClose && !visible) {
      return null;
    }
    this.destoryClose = false;

    const containerStyle: React.CSSProperties =
      placement === 'left' || placement === 'right'
        ? {
            overflow: 'auto',
            height: '100%',
          }
        : {};

    const isDestroyOnClose = this.getDestoryOnClose();

    if (isDestroyOnClose) {
      // Increase the opacity transition, delete children after closing.
      containerStyle.opacity = 0;
      containerStyle.transition = 'opacity .3s';
    }

    return (
      <div
        className={`${prefixCls}-wrapper-body`}
        style={containerStyle}
        onTransitionEnd={this.onDestoryTransitionEnd}
      >
        {this.renderHeader()}
        <div className={`${prefixCls}-body`}>{this.props.children}</div>
      </div>
    );
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

  // render Provider for Multi-level drawe
  renderProvider = (value: Drawer) => {
    const {
      zIndex,
      style,
      placement,
      className,
      wrapClassName,
      width,
      height,
      ...rest
    } = this.props;
    warning(
      wrapClassName === undefined,
      'wrapClassName is deprecated, please use className instead.',
    );
    const haveMask = rest.mask ? '' : 'no-mask';
    this.parentDrawer = value;
    const offsetStyle: any = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }
    return (
      <DrawerContext.Provider value={this}>
        <RcDrawer
          handler={false}
          {...rest}
          {...offsetStyle}
          open={this.props.visible}
          onMaskClick={this.onMaskClick}
          showMask={this.props.mask}
          placement={placement}
          style={this.getRcDrawerStyle()}
          className={classNames(wrapClassName, className, haveMask)}
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
