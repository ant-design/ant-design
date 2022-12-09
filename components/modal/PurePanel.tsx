import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import { Panel } from 'rc-dialog';
import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import * as React from 'react';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale/LocaleReceiver';
import { ConfirmContent } from './ConfirmDialog';
import { getConfirmLocale } from './locale';
import type { ModalProps, ModalFuncProps } from './Modal';
import useStyle from './style';

export interface PurePanelProps
  extends Omit<PanelProps, 'prefixCls'>,
    Pick<ModalFuncProps, 'type'> {
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

  return footer === undefined ? (
    <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
      {(locale) => (
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
  ) : (
    footer
  );
}

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls('modal');

  const [, hashId] = useStyle(prefixCls);

  const confirmPrefixCls = `${prefixCls}-confirm`;

  // Choose target props by confirm mark
  let additionalProps: Partial<PanelProps> = {};
  if (type) {
    additionalProps = {
      closable: closable ?? false,
      title: '',
      footer: '',
      children: (
        <ConfirmContent
          {...props}
          confirmPrefixCls={confirmPrefixCls}
          rootPrefixCls={rootPrefixCls}
          content={children}
        />
      ),
    };
  } else {
    additionalProps = {
      closable: closable ?? true,
      title,
      footer: renderFooter(props),
      children,
    };
  }

  return (
    <Panel
      prefixCls={prefixCls}
      className={classNames(
        hashId,
        `${prefixCls}-pure-panel`,
        type && confirmPrefixCls,
        type && `${confirmPrefixCls}-${type}`,
        className,
      )}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      closable={closable}
      {...additionalProps}
    />
  );
}
