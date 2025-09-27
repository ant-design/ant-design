import * as React from 'react';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import { clsx } from 'clsx';

import { devUseWarning } from '../_util/warning';
import Button from '../button';
import type { ButtonHTMLType, ButtonProps } from '../button';
import type { ButtonGroupProps } from '../button/button-group';
import { ConfigContext } from '../config-provider';
import Space from '../space';
import { useCompactItemContext } from '../space/Compact';
import Dropdown from './dropdown';
import type { DropdownProps } from './dropdown';

export type DropdownButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';

export interface DropdownButtonProps extends ButtonGroupProps, DropdownProps {
  type?: DropdownButtonType;
  htmlType?: ButtonHTMLType;
  danger?: boolean;
  disabled?: boolean;
  loading?: ButtonProps['loading'];
  onClick?: React.MouseEventHandler<HTMLElement>;
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

/** @deprecated Please use Space.Compact + Dropdown + Button instead */
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
    trigger,
    align,
    open,
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
    destroyOnHidden,
    destroyPopupOnHide,
    dropdownRender,
    popupRender,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const buttonPrefixCls = `${prefixCls}-button`;

  const mergedPopupRender = popupRender || dropdownRender;

  const dropdownProps: DropdownProps = {
    menu,
    arrow,
    autoFocus,
    align,
    disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    classNames: { root: overlayClassName },
    styles: { root: overlayStyle },
    destroyOnHidden,
    popupRender: mergedPopupRender,
  };

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const classes = clsx(buttonPrefixCls, compactItemClassnames, className);

  if ('destroyPopupOnHide' in props) {
    dropdownProps.destroyPopupOnHide = destroyPopupOnHide;
  }

  if ('open' in props) {
    dropdownProps.open = open;
  }

  if ('placement' in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight';
  }

  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Dropdown.Button');
    warning.deprecated(false, 'Dropdown.Button', 'Space.Compact + Dropdown + Button');
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
