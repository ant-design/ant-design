import * as React from 'react';
import Modal, { ModalFuncProps } from '../Modal';
import PortalContext, { usePatchElement } from '../../config-provider/PortalContext';
import Holder from './Holder';
import HookModal from './HookModal';

let uuid = 0;

export default function useModal(): [{ confirm: any }, React.ReactElement] {
  const { patchElement: patchPortalElement } = React.useContext(PortalContext);
  const [holderPatched, setHolderPatched] = React.useState(false);
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

    if (holderPatched) {
      closeFunc = patchElement(modal);
    } else {
      closeFunc = patchPortalElement(modal);
    }
  }

  const holder = (
    <Holder
      onMount={() => {
        setHolderPatched(true);
      }}
      onUnmount={() => {
        setHolderPatched(false);
      }}
    >
      {elements}
    </Holder>
  );

  return [
    {
      confirm: hookConfirm,
    },
    holder,
  ];
}
