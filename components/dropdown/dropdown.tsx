import React, { cloneElement } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import warning from '../_util/warning';

export interface DropDownProps {
  trigger?: ('click' | 'hover')[];
  overlay: React.ReactNode;
  style?: React.CSSProperties;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  prefixCls?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}

export default class Dropdown extends React.Component<DropDownProps, any> {
  static Button: React.ReactNode;
  static defaultProps = {
    prefixCls: 'ant-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
  };

  getTransitionName() {
    const { placement = '' } = this.props;
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }

  componentDidMount() {
    const { overlay } = this.props;
    const overlayProps = (overlay as any).props as any;
    warning(
      !overlayProps.mode || overlayProps.mode === 'vertical',
      `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`,
    );
  }

  render() {
    const { children, prefixCls, overlay } = this.props;
    const dropdownTrigger = cloneElement(children as any, {
      className: classNames((children as any).props.className, `${prefixCls}-trigger`),
    });
    const fixedModeOverlay = cloneElement(overlay as any, {
      mode: 'vertical',
    });
    return (
      <RcDropdown
        transitionName={this.getTransitionName()}
        {...this.props}
        overlay={fixedModeOverlay}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  }
}
