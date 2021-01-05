import * as React from 'react';
import { ModalFuncProps } from '../Modal';
import usePatchElement from '../../_util/hooks/usePatchElement';
import HookModal, { HookModalRef } from './HookModal';
import {
  withConfirm,
  ModalStaticFunctions,
  withInfo,
  withSuccess,
  withError,
  withWarn,
} from '../confirm';

let uuid = 0;

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      [],
    );
    return <>{elements}</>;
  }),
);

export default function useModal(): [Omit<ModalStaticFunctions, 'warn'>, React.ReactElement] {
  const holderRef = React.useRef<ElementsHolderRef>(null as any);

  const getConfirmFunc = React.useCallback(
    (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
      function hookConfirm(config: ModalFuncProps) {
        uuid += 1;

        const modalRef = React.createRef<HookModalRef>();

        let closeFunc: Function;
        const modal = (
          <HookModal
            key={`modal-${uuid}`}
            config={withFunc(config)}
            ref={modalRef}
            afterClose={() => {
              closeFunc();
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);

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
      },
    [],
  );

  const fns = React.useMemo(
    () => ({
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm),
    }),
    [],
  );

  // eslint-disable-next-line react/jsx-key
  return [fns, <ElementsHolder ref={holderRef} />];
}
