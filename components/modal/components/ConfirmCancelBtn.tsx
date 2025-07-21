import type { FC } from 'react';
import React, { useContext } from 'react';

import ActionButton from '../../_util/ActionButton';
import type { ConfirmDialogProps } from '../ConfirmDialog';
import { ModalContext } from '../context';

export interface ConfirmCancelBtnProps
  extends Pick<
    ConfirmDialogProps,
    | 'cancelButtonProps'
    | 'isSilent'
    | 'rootPrefixCls'
    | 'close'
    | 'onConfirm'
    | 'onCancel'
    | 'closable'
  > {
  autoFocusButton?: false | 'ok' | 'cancel' | null;
  cancelTextLocale?: React.ReactNode;
  mergedOkCancel?: boolean;
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
    closable,
  } = useContext(ModalContext);
  return mergedOkCancel ? (
    <ActionButton
      isSilent={isSilent}
      actionFn={onCancel}
      close={(...args: any[]) => {
        close?.(...args);
        onConfirm?.(false);
      }}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
      onClose={typeof closable === 'object' ? closable?.onClose : undefined}
    >
      {cancelTextLocale}
    </ActionButton>
  ) : null;
};

export default ConfirmCancelBtn;
