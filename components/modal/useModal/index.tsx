import * as React from 'react';
import Modal, { ModalFuncProps } from '../Modal';
import PortalContext, { usePatchElement } from '../../config-provider/PortalContext';
import Holder from './Holder';

let uuid = 0;

export default function useModal(): [{ confirm: any }, React.ReactElement] {
  const { patchElement: patchPortalElement } = React.useContext(PortalContext);
  const [holderPatched, setHolderPatched] = React.useState(false);
  const [elements, patchElement] = usePatchElement();

  function hookConfirm({ content, onOk, onCancel, ...restProps }: ModalFuncProps) {
    uuid += 1;

    const modal = (
      <Modal
        key={`modal-${uuid}`}
        {...restProps}
        visible
        onOk={(...args) => {
          Promise.resolve(onOk ? onOk(...args) : undefined).then(() => {
            // Close this!!
          });
        }}
        onCancel={(...args) => {
          Promise.resolve(onCancel ? onCancel(...args) : undefined).then(() => {
            // Close this!!
          });
        }}
      >
        {content}
      </Modal>
    );

    if (holderPatched) {
      patchElement(modal);
    } else {
      patchPortalElement(modal);
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
