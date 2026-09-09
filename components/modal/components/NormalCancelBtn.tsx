import type { FC } from 'react';
import React, { useContext } from 'react';

import Button from '../../button/Button';
import { ModalContext } from '../context';
import type { ModalProps } from '../interface';

export interface NormalCancelBtnProps extends Pick<ModalProps, 'cancelButtonProps' | 'onCancel'> {
  cancelTextLocale?: React.ReactNode;
}

const NormalCancelBtn: FC = () => {
  const { cancelButtonProps, cancelTextLocale, onCancel } = useContext(ModalContext);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onCancel?.(event);
    cancelButtonProps?.onClick?.(event);
  };

  return (
    <Button {...cancelButtonProps} onClick={handleClick}>
      {cancelTextLocale}
    </Button>
  );
};

export default NormalCancelBtn;
