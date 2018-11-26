import * as React from 'react';
import Button from '../button';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { ConfigConsumer, ConfigProviderProps } from '../config-provider';
import Dropdown, { DropDownProps } from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: 'primary' | 'ghost' | 'dashed';
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'ant-dropdown-button',
  };

  renderButton = ({ getPopupContainer: getContextPopupContainer }: ConfigProviderProps) => {
    const {
      type, disabled, onClick, htmlType, children,
      prefixCls, className, overlay, trigger, align,
      visible, onVisibleChange, placement, getPopupContainer,
      ...restProps
    } = this.props;

    const dropdownProps = {
      align,
      overlay,
      disabled,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
      placement,
      getPopupContainer: getPopupContainer || getContextPopupContainer,
    } as DropDownProps;
    if ('visible' in this.props) {
      dropdownProps.visible = visible;
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
          htmlType={htmlType}
        >
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} icon="ellipsis" />
        </Dropdown>
      </ButtonGroup>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderButton}
      </ConfigConsumer>
    );
  }
}
