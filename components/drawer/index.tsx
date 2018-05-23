import * as React from 'react';
import RcDrawer from 'rc-drawer-menu';
import { isNull } from 'util';

type EventType =
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLButtonElement>;

export interface IDrawerProps {
  closable?: boolean;
  // @todo  下一步增加
  destroyOnClose?: boolean;
  getContainer?: HTMLElement;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  wrapClassName?: string;
  // @todo  下一步增加
  zIndex?: number;
  prefixCls?: string;
  placement?: 'left' | 'right' ;
  onClose?: (e: EventType) => void;
}

export interface IDrawerState {
  visible?: boolean;
}

export default class Drawer extends React.Component<
  IDrawerProps,
  IDrawerState
> {
  static defaultProps = {
    prefixCls: 'ant-drawer',
    width: 325,
    closable: true,
  };
  static getDerivedStateFromProps(
    nextProps: IDrawerProps,
    prevState: IDrawerState,
  ) {
    const nextState: IDrawerState = {};
    if (!isNull(nextProps.visible) && nextProps.visible !== prevState.visible) {
      nextState.visible = nextProps.visible;
    }
    return nextState;
  }
  constructor(props: IDrawerProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  close = (e: EventType) => {
    if (!isNull(this.props.visible)) {
      if (this.props.onClose) {
        this.props.onClose(e);
      }
      return;
    }
    this.setState({
      visible: false,
    });
  }
  onMaskClick = (e: EventType) => {
    if (!this.props.maskClosable) {
      return;
    }
    this.close(e);
  }
  renderBody = () => {
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
      <div style={containerStyle} >
        {header}
        {closer}
        <div className={`${prefixCls}-body`} style={this.props.style}>{this.props.children}</div>;
      </div >
    );
  }
  render() {
    return (
      <RcDrawer
        {...this.props}
        handleChild={false}
        open={this.state.visible}
        onMaskClick={this.close}
        showMask={this.props.mask}
        placement={this.props.placement}
      >
      {this.renderBody()}
      </RcDrawer>
    );
  }
}
