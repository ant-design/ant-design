import * as React from 'react';
import classNames from 'classnames';
import { EllipsisOutlined } from '@ant-design/icons';

import Button from '../button';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Dropdown, { DropDownProps } from './dropdown';

const ButtonGroup = Button.Group;

type DropdownButtonType = 'primary' | 'ghost' | 'dashed';

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  title?: string;
  buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static __ANT_BUTTON = true;

  static defaultProps = {
    placement: 'bottomRight' as DropDownProps['placement'],
    type: 'default' as DropdownButtonType,
    buttonsRender: (buttons: React.ReactNode[]) => buttons,
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
      icon = <EllipsisOutlined />,
      title,
      buttonsRender,
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

    const leftButton = (
      <Button
        type={type}
        disabled={disabled}
        onClick={onClick}
        htmlType={htmlType}
        href={href}
        title={title}
      >
        {children}
      </Button>
    );

    const rightButton = <Button type={type}>{icon}</Button>;

    const [leftButtonToRender, rightButtonToRender] = buttonsRender!([leftButton, rightButton]);

    return (
      <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
        {leftButtonToRender}
        <Dropdown {...dropdownProps}>{rightButtonToRender}</Dropdown>
      </ButtonGroup>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}
