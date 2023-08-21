import type { FC } from 'react';
import React, { useContext } from 'react';
import Button from '../../button';
import { NormalCancelBtnContext } from '../context';
import type { ModalProps } from '../interface';

export interface NormalCancelBtnProps extends Pick<ModalProps, 'cancelButtonProps' | 'onCancel'> {
  cancelTextLocale?:
    | string
    | number
    | true
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>;
}

const NormalCancelBtn: FC = () => {
  const { cancelButtonProps, cancelTextLocale, onCancel } = useContext(NormalCancelBtnContext);
  return (
    <Button onClick={onCancel} {...cancelButtonProps}>
      {cancelTextLocale}
    </Button>
  );
};

export default NormalCancelBtn;
