import * as React from 'react';
import Button from '../button';
import { ButtonGroupProps } from '../button/button-group';
import Icon from '../icon';
import Dropdown, { DropDownProps } from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: 'primary' | 'ghost' | 'dashed';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<any>;
  children?: any;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'ant-dropdown-button',
  };

  render() {
    const {
      type, disabled, onClick, children,
      prefixCls, className, overlay, trigger, align,
      visible, onVisibleChange, placement, getPopupContainer,
      ...restProps,
    } = this.props;

    const dropdownProps = {
      align,
      overlay,
      disabled,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
      placement,
      getPopupContainer,
    };
    if ('visible' in this.props) {
      (dropdownProps as any).visible = visible;
    }

    return (
      <ButtonGroup
        {...restProps}
        className={classNames(prefixCls, className)}
      >
        <Button
          type={type}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
