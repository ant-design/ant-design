import * as React from 'react';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import omit from 'rc-util/lib/omit';

import type { RenderFunction } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { ConfigContext } from '../config-provider';
import Popover from '../popover';
import type { AbstractTooltipProps, TooltipRef } from '../tooltip';
import PurePanel, { Overlay } from './PurePanel';
import usePopconfirmStyle from './style';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  description?: React.ReactNode | RenderFunction;
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
  onOpenChange?: (
    open: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  onPopupClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface PopconfirmState {
  open?: boolean;
}

const Popconfirm = React.forwardRef<TooltipRef, PopconfirmProps>((props, ref) => {
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
    value: props.open ?? props.visible,
    defaultValue: props.defaultOpen ?? props.defaultVisible,
  });

  const settingOpen = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setOpen(value, true);
    onVisibleChange?.(value);
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

  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  const overlayClassNames = classNames(prefixCls, overlayClassName);

  const [wrapSSR] = usePopconfirmStyle(prefixCls);

  return wrapSSR(
    <Popover
      {...omit(restProps, ['title'])}
      trigger={trigger}
      placement={placement}
      onOpenChange={onInternalOpenChange}
      open={open}
      ref={ref}
      overlayClassName={overlayClassNames}
      content={
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
      data-popover-inject
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Popover>,
  );
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PopconfirmProps> & React.RefAttributes<unknown>
> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

// We don't care debug panel
/* istanbul ignore next */
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Popconfirm.displayName = 'Popconfirm';
}

export default Popconfirm;
