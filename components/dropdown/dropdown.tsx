import React, { cloneElement } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import DropdownButton from './dropdown-button';
import warning from '../_util/warning';

export interface DropDownProps {
  trigger?: ('click' | 'hover')[];
  overlay: React.ReactNode;
  style?: React.CSSProperties;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  prefixCls?: string;
  className?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}

export default class Dropdown extends React.Component<DropDownProps, any> {
  static Button: typeof DropdownButton;
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
    const { children, prefixCls, overlay, trigger, disabled } = this.props;
    const dropdownTrigger = cloneElement(children as any, {
      className: classNames((children as any).props.className, `${prefixCls}-trigger`),
      disabled,
    });
    // menu cannot be selectable in dropdown defaultly
    const overlayProps = overlay && (overlay as any).props;
    const selectable = (overlayProps && 'selectable' in overlayProps)
      ? overlayProps.selectable : false;
    const fixedModeOverlay = cloneElement(overlay as any, {
      mode: 'vertical',
      selectable,
    });
    return (
      <RcDropdown
        {...this.props}
        transitionName={this.getTransitionName()}
        trigger={disabled ? [] : trigger}
        overlay={fixedModeOverlay}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  }
}
