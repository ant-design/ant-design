import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import DropdownButton from './dropdown-button';
import warning from '../_util/warning';

export interface DropDownProps {
  trigger?: ('click' | 'hover'| 'contextMenu')[];
  overlay: React.ReactNode;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  forceRender?: boolean;
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
    const { placement = '', transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
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
    const { children, prefixCls, overlay: overlayElements, trigger, disabled } = this.props;

    const child = React.Children.only(children);
    const overlay = React.Children.only(overlayElements);

    const dropdownTrigger = React.cloneElement(child, {
      className: classNames(child.props.className, `${prefixCls}-trigger`),
      disabled,
    });
    // menu cannot be selectable in dropdown defaultly
    const selectable = overlay.props.selectable || false;
    const fixedModeOverlay = React.cloneElement(overlay, {
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
