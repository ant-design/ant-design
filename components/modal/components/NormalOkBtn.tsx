import type { FC } from 'react';
import React, { useContext } from 'react';

import Button from '../../button/Button';
import { convertLegacyProps } from '../../button/buttonHelpers';
import { ModalContext } from '../context';
import type { ModalProps } from '../interface';

export interface NormalOkBtnProps
  extends Pick<ModalProps, 'confirmLoading' | 'okType' | 'okButtonProps' | 'onOk'> {
  okTextLocale?: React.ReactNode;
}

const NormalOkBtn: FC = () => {
  const { confirmLoading, okButtonProps, okType, okTextLocale, onOk } = useContext(ModalContext);

  const onInternalClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onOk?.(event);
    okButtonProps?.onClick?.(event);
  };

  return (
    <Button
      {...convertLegacyProps(okType)}
      loading={confirmLoading}
      {...okButtonProps}
      onClick={onInternalClick}
    >
      {okTextLocale}
    </Button>
  );
};

export default NormalOkBtn;
