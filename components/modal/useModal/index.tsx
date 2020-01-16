import * as React from 'react';
import { ModalFuncProps } from '../Modal';
import usePatchElement from '../../_util/usePatchElement';
import HookModal, { HookModalRef } from './HookModal';
import { ConfirmReturn } from '../confirm';

let uuid = 0;

export interface ModalHooker {
  confirm: (config: ModalFuncProps) => ConfirmReturn;
}

export default function useModal(): [ModalHooker, React.ReactElement] {
  const [elements, patchElement] = usePatchElement();

  function hookConfirm(config: ModalFuncProps): ConfirmReturn {
    uuid += 1;

    const modalRef = React.createRef<HookModalRef>();

    let closeFunc: Function;
    const modal = (
      <HookModal
        key={`modal-${uuid}`}
        config={config}
        ref={modalRef}
        afterClose={() => {
          closeFunc();
        }}
      />
    );

    closeFunc = patchElement(modal);

    return {
      destroy: () => {
        if (modalRef.current) {
          modalRef.current.destroy();
        }
      },
      update: (newConfig: ModalFuncProps) => {
        if (modalRef.current) {
          modalRef.current.update(newConfig);
        }
      },
    };
  }

  return [
    {
      confirm: hookConfirm,
    },
    <>{elements}</>,
  ];
}
