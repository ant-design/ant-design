import * as React from 'react';
import usePatchElement from '../../_util/hooks/usePatchElement';
import type { ModalFunc, ModalStaticFunctions } from '../confirm';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import destroyFns from '../destroyFns';
import type { ModalFuncProps } from '../interface';
import type { HookModalRef } from './HookModal';
import HookModal from './HookModal';

let uuid = 0;

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}

// Add `then` field for `ModalFunc` return instance.
export type ModalFuncWithPromise = (...args: Parameters<ModalFunc>) => ReturnType<ModalFunc> & {
  then<T>(resolve: (confirmed: boolean) => T, reject: VoidFunction): Promise<T>;
};

export type HookAPI = Omit<Record<keyof ModalStaticFunctions, ModalFuncWithPromise>, 'warn'>;

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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{elements}</>;
  }),
);

function useModal(): readonly [instance: HookAPI, contextHolder: React.ReactElement] {
  const holderRef = React.useRef<ElementsHolderRef>(null);

  // ========================== Effect ==========================
  const [actionQueue, setActionQueue] = React.useState<(() => void)[]>([]);

  React.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = [...actionQueue];
      cloneQueue.forEach((action) => {
        action();
      });

      setActionQueue([]);
    }
  }, [actionQueue]);

  // =========================== Hook ===========================
  const getConfirmFunc = React.useCallback(
    (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
      function hookConfirm(config: ModalFuncProps) {
        uuid += 1;

        const modalRef = React.createRef<HookModalRef>();

        // Proxy to promise with `onClose`
        let resolvePromise: (confirmed: boolean) => void;
        const promise = new Promise<boolean>((resolve) => {
          resolvePromise = resolve;
        });
        let silent = false;

        let closeFunc: Function | undefined;
        const modal = (
          <HookModal
            key={`modal-${uuid}`}
            config={withFunc(config)}
            ref={modalRef}
            afterClose={() => {
              closeFunc?.();
            }}
            isSilent={() => silent}
            onConfirm={(confirmed) => {
              resolvePromise(confirmed);
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);

        if (closeFunc) {
          destroyFns.push(closeFunc);
        }

        const instance: ReturnType<ModalFuncWithPromise> = {
          destroy: () => {
            function destroyAction() {
              modalRef.current?.destroy();
            }

            if (modalRef.current) {
              destroyAction();
            } else {
              setActionQueue((prev) => [...prev, destroyAction]);
            }
          },
          update: (newConfig: ModalFuncProps) => {
            function updateAction() {
              modalRef.current?.update(newConfig);
            }

            if (modalRef.current) {
              updateAction();
            } else {
              setActionQueue((prev) => [...prev, updateAction]);
            }
          },
          then: (resolve) => {
            silent = true;
            return promise.then(resolve);
          },
        };

        return instance;
      },
    [],
  );

  const fns = React.useMemo<HookAPI>(
    () => ({
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm),
    }),
    [],
  );
  return [fns, <ElementsHolder key="modal-holder" ref={holderRef} />] as const;
}

export default useModal;
