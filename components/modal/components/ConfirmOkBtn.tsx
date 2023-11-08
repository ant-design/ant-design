import type { FC } from 'react';
import React, { useContext } from 'react';

import ActionButton from '../../_util/ActionButton';
import type { ConfirmDialogProps } from '../ConfirmDialog';
import { ModalContext } from '../context';

export interface ConfirmOkBtnProps
  extends Pick<
    ConfirmDialogProps,
    'close' | 'isSilent' | 'okType' | 'okButtonProps' | 'rootPrefixCls' | 'onConfirm' | 'onOk'
  > {
  autoFocusButton?: false | 'ok' | 'cancel' | null;
  okTextLocale?:
    | string
    | number
    | true
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>;
}

const ConfirmOkBtn: FC = () => {
  const {
    autoFocusButton,
    close,
    isSilent,
    okButtonProps,
    rootPrefixCls,
    okTextLocale,
    okType,
    onConfirm,
    onOk,
  } = useContext(ModalContext);
  return (
    <ActionButton
      isSilent={isSilent}
      type={okType || 'primary'}
      actionFn={onOk}
      close={(...args: any[]) => {
        close?.(...args);
        onConfirm?.(true);
      }}
      autoFocus={autoFocusButton === 'ok'}
      buttonProps={okButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {okTextLocale}
    </ActionButton>
  );
};

export default ConfirmOkBtn;
