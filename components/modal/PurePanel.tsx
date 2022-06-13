import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import { Panel } from 'rc-dialog';
import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import * as React from 'react';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getConfirmLocale } from './locale';
import type { ModalProps } from './Modal';
import useStyle from './style';

export interface PurePanelProps extends Omit<PanelProps, 'prefixCls'> {
  prefixCls?: string;
  style?: React.CSSProperties;
}

export function renderCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  );
}

export function renderFooter(
  props: Pick<
    ModalProps,
    | 'footer'
    | 'okText'
    | 'okType'
    | 'cancelText'
    | 'confirmLoading'
    | 'okButtonProps'
    | 'cancelButtonProps'
  > & {
    onOk?: React.MouseEventHandler;
    onCancel?: React.MouseEventHandler;
  },
) {
  const {
    okText,
    okType = 'primary',
    cancelText,
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    footer,
  } = props;

  return (
    footer ?? (
      <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
        {locale => (
          <>
            <Button onClick={onCancel} {...cancelButtonProps}>
              {cancelText || locale!.cancelText}
            </Button>
            <Button
              {...convertLegacyProps(okType)}
              loading={confirmLoading}
              onClick={onOk}
              {...okButtonProps}
            >
              {okText || locale!.okText}
            </Button>
          </>
        )}
      </LocaleReceiver>
    )
  );
}

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable = true,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = customizePrefixCls || getPrefixCls('modal');

  const [, hashId] = useStyle(prefixCls);

  return (
    <Panel
      prefixCls={prefixCls}
      className={classNames(hashId, `${prefixCls}-pure-panel`, className)}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      footer={renderFooter(props)}
      closable={closable}
    />
  );
}
