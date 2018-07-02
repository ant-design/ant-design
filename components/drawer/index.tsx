import * as React from 'react';
import RcDrawer from 'rc-drawer';
import PropTypes from 'prop-types';
import createReactContext, { Context } from 'create-react-context';

const DrawerContext: Context<Drawer | null> = createReactContext(null);

type EventType =
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLButtonElement>;

type getContainerfunc = () => HTMLElement;

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
  wrapClassName?: string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean;
  placement?: 'left' | 'right';
  onClose?: (e: EventType) => void;
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
      PropTypes.object,
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
    wrapClassName: PropTypes.string,
    zIndex: PropTypes.number,
    prefixCls: PropTypes.string,
    placement: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'ant-drawer',
    width: 256,
    closable: true,
    placement: 'right',
    maskClosable: true,
    level: null,
  };

  readonly state = {
    push: false,
  };

  praentDrawer: Drawer;
  public componentDidUpdate(preProps: DrawerProps) {
    if (preProps.visible !== this.props.visible && this.praentDrawer) {
      if (this.props.visible) {
        this.praentDrawer.push();
      } else {
        this.praentDrawer.pull();
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
  }
  onMaskClick = (e: EventType) => {
    if (!this.props.maskClosable) {
      return;
    }
    this.close(e);
  }
  push = () => {
    this.setState({
      push: true,
    });
  }
  pull = () => {
    this.setState({
      push: false,
    });
  }
  renderBody = () => {
    const { destroyOnClose, visible, width, placement } = this.props;
    if (destroyOnClose && !visible) {
      return null;
    }
    const { prefixCls, title, closable } = this.props;
    let header;
    if (title) {
      header = (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
        </div>
      );
    }
    let closer;
    if (closable) {
      closer = (
        <button
          onClick={this.close}
          aria-label="Close"
          className={`${prefixCls}-close`}
        >
          <span className={`${prefixCls}-close-x`} />
        </button>
      );
    }
    let containerStyle: React.CSSProperties = { width };
    if (placement === 'left' || placement === 'right') {
      containerStyle = {
        overflow: 'auto',
        height: '100%',
        width,
      };
    }
    return (
      <div style={containerStyle}>
        {header}
        {closer}
        <div className={`${prefixCls}-body`} style={this.props.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
  renderProvider = (value: Drawer) => {
    let { width, zIndex, style, placement, ...rest } = this.props;
    if (typeof width === 'number') {
      width = `${width}px`;
    }
    const RcDrawerStyle = this.state.push
      ? {
          zIndex,
          transform: `translateX(${placement === 'left' ? 180 : -180}px)`,
        }
      : { zIndex };
    this.praentDrawer = value;
    return (
      <DrawerContext.Provider value={this}>
        <RcDrawer
          {...rest}
          handler={false}
          open={this.props.visible}
          onMaskClick={this.onMaskClick}
          showMask={this.props.mask}
          placement={placement}
          style={RcDrawerStyle}
        >
          {this.renderBody()}
        </RcDrawer>
      </DrawerContext.Provider>
    );
  }
  render() {
    return (
      <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>
    );
  }
}
