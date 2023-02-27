import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import type { PopconfirmProps } from '.';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import defaultLocale from '../locale/en_US';
import useLocale from '../locale/useLocale';
import PopoverPurePanel from '../popover/PurePanel';
import ActionButton from '../_util/ActionButton';
import { getRenderPropValue } from '../_util/getRenderPropValue';

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
    | 'description'
  > {
  prefixCls: string;
  close?: Function;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    description,
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

  const [contextLocale] = useLocale('Popconfirm', defaultLocale.Popconfirm);

  return (
    <div className={`${prefixCls}-inner-content`}>
      <div className={`${prefixCls}-message`}>
        {icon && <span className={`${prefixCls}-message-icon`}>{icon}</span>}
        <div
          className={classNames(`${prefixCls}-message-title`, {
            [`${prefixCls}-message-title-only`]: !!description,
          })}
        >
          {getRenderPropValue(title)}
        </div>
      </div>
      {description && (
        <div className={`${prefixCls}-description`}>{getRenderPropValue(description)}</div>
      )}
      <div className={`${prefixCls}-buttons`}>
        {showCancel && (
          <Button onClick={onCancel} size="small" {...cancelButtonProps}>
            {cancelText ?? contextLocale?.cancelText}
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
          {okText ?? contextLocale?.okText}
        </ActionButton>
      </div>
    </div>
  );
};

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
      content={<Overlay prefixCls={prefixCls} {...restProps} />}
    />,
  );
}
