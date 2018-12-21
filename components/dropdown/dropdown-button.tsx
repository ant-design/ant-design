import * as React from 'react';
import Button from '../button';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Dropdown, { DropDownProps } from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: 'primary' | 'ghost' | 'dashed';
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  children?: any;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight',
    type: 'default',
  };

  renderButton = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      type,
      disabled,
      onClick,
      htmlType,
      children,
      className,
      overlay,
      trigger,
      align,
      visible,
      onVisibleChange,
      placement,
      getPopupContainer,
      href,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
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
      <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
        <Button type={type} disabled={disabled} onClick={onClick} htmlType={htmlType} href={href}>
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} icon="ellipsis" />
        </Dropdown>
      </ButtonGroup>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}
