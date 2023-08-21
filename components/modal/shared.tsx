import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React from 'react';
import { DisabledContextProvider } from '../config-provider/DisabledContext';
import { useLocale } from '../locale';
import type { ModalProps } from './interface';
import { getConfirmLocale } from './locale';
import type { NormalCancelBtnProps } from './components/NormalCancelBtn';
import type { NormalOkBtnProps } from './components/NormalOkBtn';
import { NormalCancelBtnContextProvider, NormalOkBtnContextProvider } from './context';
import NormalOkBtn from './components/NormalOkBtn';
import NormalCancelBtn from './components/NormalCancelBtn';

export function renderCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  );
}

interface FooterProps {
  onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Footer: React.FC<
  FooterProps &
    Pick<
      ModalProps,
      | 'footer'
      | 'okText'
      | 'okType'
      | 'cancelText'
      | 'confirmLoading'
      | 'okButtonProps'
      | 'cancelButtonProps'
    >
> = (props) => {
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

  const [locale] = useLocale('Modal', getConfirmLocale());

  // ================== Locale Text ==================
  const okTextLocale = okText || locale?.okText;
  const cancelTextLocale = cancelText || locale?.cancelText;

  // ================= Context Value =================
  const confirmBtnCtxValue: NormalOkBtnProps = {
    confirmLoading,
    okButtonProps,
    okTextLocale,
    okType,
    onOk,
  };

  const cancelBtnCtxValue: NormalCancelBtnProps = {
    cancelButtonProps,
    cancelTextLocale,
    onCancel,
  };

  const confirmBtnCtxValueMemo = React.useMemo(
    () => confirmBtnCtxValue,
    [...Object.values(confirmBtnCtxValue)],
  );
  const cancelBtnCtxValueMemo = React.useMemo(
    () => cancelBtnCtxValue,
    [...Object.values(cancelBtnCtxValue)],
  );

  const footerOriginNode = (
    <>
      <NormalCancelBtn />
      <NormalOkBtn />
    </>
  );

  return (
    <DisabledContextProvider disabled={false}>
      <NormalOkBtnContextProvider value={confirmBtnCtxValueMemo}>
        <NormalCancelBtnContextProvider value={cancelBtnCtxValueMemo}>
          {typeof footer === 'function'
            ? footer?.(footerOriginNode, {
                ConfirmBtn: NormalOkBtn,
                CancelBtn: NormalCancelBtn,
              })
            : footerOriginNode}
        </NormalCancelBtnContextProvider>
      </NormalOkBtnContextProvider>
    </DisabledContextProvider>
  );
};
