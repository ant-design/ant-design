import * as React from 'react';
import type { PopconfirmProps } from '.';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import ActionButton from '../_util/ActionButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

export interface OverlayProps
  extends Pick<
    PopconfirmProps,
    | 'icon'
    | 'okButtonProps'
    | 'cancelButtonProps'
    | 'cancelText'
    | 'okText'
    | 'okType'
    | 'showCancel'
    | 'title'
  > {
  prefixCls: string;
  close?: Function;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Overlay: React.FC<OverlayProps> = props => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    cancelText,
    okText,
    okType,
    icon,
    showCancel = true,
    close,
    onConfirm,
    onCancel,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  return (
    <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
      {contextLocale => (
        <div className={`${prefixCls}-inner-content`}>
          <div className={`${prefixCls}-message`}>
            {icon && <span className={`${prefixCls}-message-icon`}>{icon}</span>}
            <div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
          </div>
          <div className={`${prefixCls}-buttons`}>
            {showCancel && (
              <Button onClick={onCancel} size="small" {...cancelButtonProps}>
                {cancelText ?? contextLocale.cancelText}
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
              {okText ?? contextLocale.okText}
            </ActionButton>
          </div>
        </div>
      )}
    </LocaleReceiver>
  );
};
