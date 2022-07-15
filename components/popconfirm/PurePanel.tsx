import * as React from 'react';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import type { PopconfirmProps } from '.';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import ActionButton from '../_util/ActionButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';
import PopoverPurePanel from '../popover/PurePanel';

import useStyle from './style';

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
    okType = 'primary',
    icon = <ExclamationCircleFilled />,
    showCancel = true,
    close,
    onConfirm,
    onCancel,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  return (
    <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
      {(popconfirmLocale: PopconfirmLocale) => (
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
      )}
    </LocaleReceiver>
  );
}

export interface PurePanelProps
  extends Omit<OverlayProps, 'prefixCls'>,
    Pick<PopconfirmProps, 'placement'> {
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
}

export default function PurePanel(props: PurePanelProps) {
  const { prefixCls: customizePrefixCls, placement, className, style, ...restProps } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  const [wrapSSR] = useStyle(prefixCls);

  return wrapSSR(
    <PopoverPurePanel
      placement={placement}
      className={classNames(prefixCls, className)}
      style={style}
    >
      <Overlay {...restProps} prefixCls={prefixCls} />
    </PopoverPurePanel>,
  );
}
