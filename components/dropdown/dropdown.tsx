import React, { cloneElement } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';

export interface DropDownProps {
  trigger?: ('click' | 'hover')[];
  overlay: React.ReactNode;
  style?: React.CSSProperties;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  align?: Object;
  getPopupContainer?: () => HTMLElement;
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

  render() {
    const { children, prefixCls } = this.props;
    const dropdownTrigger = cloneElement(children as any, {
      className: classNames((children as any).props.className, `${prefixCls}-trigger`),
    });
    return (
      <RcDropdown transitionName={this.getTransitionName()} {...this.props}>
        {dropdownTrigger}
      </RcDropdown>
    );
  }
}
