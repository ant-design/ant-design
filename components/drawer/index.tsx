import * as React from 'react';
import RcDrawer from 'rc-drawer';
import PropTypes from 'prop-types';

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
  placement?: 'left' | 'right';
  onClose?: (e: EventType) => void;
}

export interface IDrawerState {
  visible?: boolean;
}

export default class Drawer extends React.Component<
  DrawerProps,
  IDrawerState
> {
  static propTypes = {
    closable: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
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
    maskClosable: true,
  };

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

  renderBody = () => {
    if (this.props.destroyOnClose && !this.props.visible) {
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
    const containerStyle = { width: this.props.width };
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

  render() {
    let { width, zIndex, style, ...rest } = this.props;
    if (typeof width === 'number') {
      width = `${width}px`;
    }
    return (
      <RcDrawer
        level={null}
        {...rest}
        handleChild={false}
        open={this.props.visible}
        onMaskClick={this.onMaskClick}
        showMask={this.props.mask}
        placement={this.props.placement}
        style={{ zIndex }}
      >
        {this.renderBody()}
      </RcDrawer>
    );
  }
}
