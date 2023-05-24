import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import classNames from 'classnames';
import * as React from 'react';
import type { ButtonProps } from '../button';
import Button from '../button';
import type { ButtonHTMLType } from '../button/button';
import type { ButtonGroupProps } from '../button/button-group';
import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from '../space/Compact';
import type { DropdownProps } from './dropdown';
import Dropdown from './dropdown';
import Space from '../space';

export type DropdownButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

export interface DropdownButtonProps extends ButtonGroupProps, DropdownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  danger?: boolean;
  disabled?: boolean;
  loading?: ButtonProps['loading'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  title?: string;
  buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
}

type CompoundedComponent = React.FC<DropdownButtonProps> & {
  /** @internal */
  __ANT_BUTTON: boolean;
};

const DropdownButton: CompoundedComponent = (props) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    type = 'default',
    danger,
    disabled,
    loading,
    onClick,
    htmlType,
    children,
    className,
    menu,
    arrow,
    autoFocus,
    overlay,
    trigger,
    align,
    visible,
    open,
    onVisibleChange,
    onOpenChange,
    placement,
    getPopupContainer,
    href,
    icon = <EllipsisOutlined />,
    title,
    buttonsRender = (buttons: React.ReactNode[]) => buttons,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
  const dropdownProps: DropdownProps = {
    menu,
    arrow,
    autoFocus,
    align,
    disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange: onOpenChange || onVisibleChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyPopupOnHide,
  };

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const classes = classNames(prefixCls, compactItemClassnames, className);

  if ('overlay' in props) {
    dropdownProps.overlay = overlay;
  }

  if ('open' in props) {
    dropdownProps.open = open;
  } else if ('visible' in props) {
    dropdownProps.open = visible;
  }

  if ('placement' in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight';
  }

  const leftButton = (
    <Button
      type={type}
      danger={danger}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
      href={href}
      title={title}
    >
      {children}
    </Button>
  );

  const rightButton = <Button type={type} danger={danger} icon={icon} />;

  const [leftButtonToRender, rightButtonToRender] = buttonsRender([leftButton, rightButton]);

  return (
    <Space.Compact className={classes} size={compactSize} block {...restProps}>
      {leftButtonToRender}
      <Dropdown {...dropdownProps}>{rightButtonToRender}</Dropdown>
    </Space.Compact>
  );
};

DropdownButton.__ANT_BUTTON = true;

export default DropdownButton;
