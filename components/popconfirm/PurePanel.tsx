import classNames from 'classnames';
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

export function Overlay(props: OverlayProps) {
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
  const titleClassNames = classNames(
    `${prefixCls}-message-title`,
    icon ? null : `${prefixCls}-message-title-no-padding`,
  );

  return (
    <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
      {(popconfirmLocale: PopconfirmLocale) => (
        <div className={`${prefixCls}-inner-content`}>
          <div className={`${prefixCls}-message`}>
            {icon}
            <div className={titleClassNames}>{getRenderPropValue(title)}</div>
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
      )}
    </LocaleReceiver>
  );
}
