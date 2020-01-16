import * as React from 'react';
import { ModalFuncProps } from '../Modal';
import usePatchElement from '../../_util/usePatchElement';
import HookModal from './HookModal';
import { ConfirmReturn } from '../confirm';

let uuid = 0;

export interface ModalHooker {
  confirm: (config: ModalFuncProps) => ConfirmReturn;
}

export default function useModal(): [ModalHooker, React.ReactElement] {
  const [elements, patchElement] = usePatchElement();

  function hookConfirm(config: ModalFuncProps) {
    uuid += 1;

    let closeFunc: Function;
    const modal = (
      <HookModal
        key={`modal-${uuid}`}
        {...config}
        afterClose={() => {
          closeFunc();
        }}
      />
    );

    closeFunc = patchElement(modal);

    return {} as any;
  }

  return [
    {
      confirm: hookConfirm,
    },
    <>{elements}</>,
  ];
}
