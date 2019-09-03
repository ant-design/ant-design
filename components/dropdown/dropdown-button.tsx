import * as React from 'react';
import classNames from 'classnames';
import Button from '../button';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Dropdown, { DropDownProps } from './dropdown';
import Icon from '../icon';

const ButtonGroup = Button.Group;

type DropdownButtonType = 'primary' | 'ghost' | 'dashed';

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * @since 3.17.0
   */
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  title?: string;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight' as DropDownProps['placement'],
    type: 'default' as DropdownButtonType,
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
      icon = <Icon type="ellipsis" />,
      title,
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
        <Dropdown {...dropdownProps}>
          <Button type={type}>{icon}</Button>
        </Dropdown>
      </ButtonGroup>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}
