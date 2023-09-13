import type { FC } from 'react';
import React, { useContext } from 'react';

import Button from '../../button';
import { convertLegacyProps } from '../../button/buttonHelpers';
import { ModalContext } from '../context';
import type { ModalProps } from '../interface';

export interface NormalOkBtnProps
  extends Pick<ModalProps, 'confirmLoading' | 'okType' | 'okButtonProps' | 'onOk'> {
  okTextLocale?:
    | string
    | number
    | true
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>;
}

const NormalOkBtn: FC = () => {
  const { confirmLoading, okButtonProps, okType, okTextLocale, onOk } = useContext(ModalContext);
  return (
    <Button
      {...convertLegacyProps(okType)}
      loading={confirmLoading}
      onClick={onOk}
      {...okButtonProps}
    >
      {okTextLocale}
    </Button>
  );
};

export default NormalOkBtn;
