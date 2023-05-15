import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { ConfigContext } from '../config-provider';
import Popover from '../popover';
import type { AbstractTooltipProps } from '../tooltip';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';
import { Overlay } from './PurePanel';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  disabled?: boolean;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  showCancel?: boolean;
  icon?: React.ReactNode;
  /**
   * @deprecated `onVisibleChange` is deprecated which will be removed in next major version. Please
   *   use `onOpenChange` instead.
   */
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  onOpenChange?: (
    open: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

export interface PopconfirmState {
  open?: boolean;
}

const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    placement = 'top',
    trigger = 'click',
    okType = 'primary',
    icon = <ExclamationCircleFilled />,
    children,
    overlayClassName,
    onOpenChange,
    onVisibleChange,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const [open, setOpen] = useMergedState(false, {
    value: props.open !== undefined ? props.open : props.visible,
    defaultValue: props.defaultOpen !== undefined ? props.defaultOpen : props.defaultVisible,
  });

  // const isDestroyed = useDestroyed();

  const settingOpen = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setOpen(value, true);
    onVisibleChange?.(value, e);
    onOpenChange?.(value, e);
  };

  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingOpen(false, e);
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingOpen(false, e);
    props.onCancel?.call(this, e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC && open) {
      settingOpen(false, e);
    }
  };

  const onInternalOpenChange = (value: boolean) => {
    const { disabled = false } = props;
    if (disabled) {
      return;
    }
    settingOpen(value);
  };

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const prefixClsConfirm = getPrefixCls('popconfirm', customizePrefixCls);
  const overlayClassNames = classNames(prefixClsConfirm, overlayClassName);

  return (
    <Popover
      {...restProps}
      trigger={trigger}
      prefixCls={prefixCls}
      placement={placement}
      onOpenChange={onInternalOpenChange}
      open={open}
      ref={ref}
      overlayClassName={overlayClassNames}
      _overlay={
        <Overlay
          okType={okType}
          icon={icon}
          {...props}
          prefixCls={prefixCls}
          close={close}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      }
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Popover>
  );
});

export default Popconfirm;
