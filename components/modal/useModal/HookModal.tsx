import * as React from 'react';
import { ModalFuncProps } from '../Modal';
import ConfirmDialog from '../ConfirmDialog';

export interface HookModalProps {
  afterClose: () => void;
  config: ModalFuncProps;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

const HookModal: React.RefForwardingComponent<HookModalRef, HookModalProps> = (
  { afterClose, config },
  ref,
) => {
  const [visible, setVisible] = React.useState(true);
  const [innerConfig, setInnerConfig] = React.useState(config);

  function close() {
    setVisible(false);
  }

  React.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig: ModalFuncProps) => {
      setInnerConfig(originConfig => ({
        ...originConfig,
        ...newConfig,
      }));
    },
  }));

  return <ConfirmDialog {...innerConfig} close={close} visible={visible} afterClose={afterClose} />;
};

export default React.forwardRef(HookModal);
