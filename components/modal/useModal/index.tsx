import * as React from 'react';
import usePatchElement from '../../_util/hooks/usePatchElement';
import type { ModalStaticFunctions } from '../confirm';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import type { ModalFuncProps } from '../Modal';
import type { HookModalRef } from './HookModal';
import HookModal from './HookModal';
import type { CreateModalProps } from '../create';
import { CreatedModal } from '../create';

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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{elements}</>;
  }),
);

type UpdateCreateHookModalProps<T> = Partial<CreateModalProps<T>>;

type CreateHookModalFunc<T> = (config: CreateModalProps<T>) => {
  destroy(): void;
  update(newConfig: UpdateCreateHookModalProps<T>): void;
};

export default function useModal(): [
  Omit<ModalStaticFunctions, 'warn'> & {
    create<T>(...params: Parameters<CreateHookModalFunc<T>>): ReturnType<CreateHookModalFunc<T>>;
  },
  React.ReactElement,
] {
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

        let closeFunc: Function | undefined;
        const modal = (
          <HookModal
            key={`modal-${uuid}`}
            config={withFunc(config)}
            ref={modalRef}
            afterClose={() => {
              closeFunc?.();
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);

        return {
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
        };
      },
    [],
  );

  const getCreationFunc: <T>() => CreateHookModalFunc<T> = React.useCallback(
    () =>
      function createHookModal<T>(config: CreateModalProps<T>) {
        uuid += 1;
        // const modalRef = React.createRef<HookModalRef>();
        let closeFunc: Function | undefined;
        const modal = (
          <CreatedModal<T>
            key={`modal-${uuid}`}
            // ref={modalRef}
            afterClose={() => {
              closeFunc?.();
            }}
            {...config}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);
        return {
          destroy() {
            // todo
            // function destroyAction() {
            //   modalRef.current?.destroy();
            // }
            // if (modalRef.current) {
            //   destroyAction();
            // } else {
            //   setActionQueue((prev) => [...prev, destroyAction]);
            // }
          },
          update(newConfig) {
            console.log('todo', newConfig);
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
      create: getCreationFunc(),
    }),
    [],
  );

  // eslint-disable-next-line react/jsx-key
  return [fns, <ElementsHolder ref={holderRef} />];
}
