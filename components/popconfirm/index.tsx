import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import Button from '../button';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import Popover from '../popover';
import type { AbstractTooltipProps } from '../tooltip';
import ActionButton from '../_util/ActionButton';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';

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
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

export interface PopconfirmState {
  visible?: boolean;
}

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible,
  });

  // const isDestroyed = useDestroyed();

  const settingVisible = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setVisible(value, true);
    props.onVisibleChange?.(value, e);
  };

  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
    props.onCancel?.call(this, e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC && visible) {
      settingVisible(false, e);
    }
  };

  const onVisibleChange = (value: boolean) => {
    const { disabled } = props;
    if (disabled) {
      return;
    }
    settingVisible(value);
  };

  const renderOverlay = (prefixCls: string, popconfirmLocale: PopconfirmLocale) => {
    const {
      okButtonProps,
      cancelButtonProps,
      title,
      cancelText,
      okText,
      okType,
      icon,
      showCancel = true,
    } = props;
    return (
      <div className={`${prefixCls}-inner-content`}>
        <div className={`${prefixCls}-message`}>
          {icon}
          <div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
        </div>
        <div className={`${prefixCls}-buttons`}>
          {showCancel && (
            <Button onClick={onCancel} size="small" {...cancelButtonProps}>
              {cancelText || popconfirmLocale.cancelText}
            </Button>
          )}
          <ActionButton
            buttonProps={{ size: 'small', ...convertLegacyProps(okType), ...okButtonProps }}
            actionFn={onConfirm}
            close={close}
            prefixCls={getPrefixCls('btn')}
            quitOnNullishReturnValue
            emitEvent
          >
            {okText || popconfirmLocale.okText}
          </ActionButton>
        </div>
      </div>
    );
  };

  const {
    prefixCls: customizePrefixCls,
    placement,
    children,
    overlayClassName,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const prefixClsConfirm = getPrefixCls('popconfirm', customizePrefixCls);
  const overlayClassNames = classNames(prefixClsConfirm, overlayClassName);

  const overlay = (
    <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
      {(popconfirmLocale: PopconfirmLocale) => renderOverlay(prefixCls, popconfirmLocale)}
    </LocaleReceiver>
  );

  return (
    <Popover
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      onVisibleChange={onVisibleChange}
      visible={visible}
      _overlay={overlay}
      overlayClassName={overlayClassNames}
      ref={ref as any}
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

Popconfirm.defaultProps = {
  placement: 'top' as PopconfirmProps['placement'],
  trigger: 'click' as PopconfirmProps['trigger'],
  okType: 'primary' as PopconfirmProps['okType'],
  icon: <ExclamationCircleFilled />,
  disabled: false,
};

export default Popconfirm;
