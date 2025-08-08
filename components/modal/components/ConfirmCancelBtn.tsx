import type { FC } from 'react';
import React, { useContext } from 'react';

import ActionButton from '../../_util/ActionButton';
import type { ConfirmDialogProps } from '../ConfirmDialog';
import { ModalContext } from '../context';

export interface ConfirmCancelBtnProps
  extends Pick<
    ConfirmDialogProps,
    'cancelButtonProps' | 'isSilent' | 'rootPrefixCls' | 'close' | 'onConfirm' | 'onCancel'
  > {
  autoFocusButton?: false | 'ok' | 'cancel' | null;
  cancelTextLocale?: React.ReactNode;
  mergedOkCancel?: boolean;
  onClose?: () => void;
}

const ConfirmCancelBtn: FC = () => {
  const {
    autoFocusButton,
    cancelButtonProps,
    cancelTextLocale,
    isSilent,
    mergedOkCancel,
    rootPrefixCls,
    close,
    onCancel,
    onConfirm,
    onClose,
  } = useContext(ModalContext);
  return mergedOkCancel ? (
    <ActionButton
      isSilent={isSilent}
      actionFn={onCancel}
      close={(...args: any[]) => {
        close?.(...args);
        onConfirm?.(false);
        onClose?.();
      }}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelTextLocale}
    </ActionButton>
  ) : null;
};

export default ConfirmCancelBtn;
