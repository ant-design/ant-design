import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React from 'react';
import Button from '../button';
import { convertLegacyProps } from '../button/button';
import { useLocale } from '../locale';
import type { ModalProps } from './interface';
import { getConfirmLocale } from './locale';

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
  } = props;

  const [locale] = useLocale('Modal', getConfirmLocale());

  return (
    <>
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText || locale?.cancelText}
      </Button>
      <Button
        {...convertLegacyProps(okType)}
        loading={confirmLoading}
        onClick={onOk}
        {...okButtonProps}
      >
        {okText || locale?.okText}
      </Button>
    </>
  );
};
