import * as React from 'react';
import Modal, { ModalFuncProps } from '../Modal';

export interface HookModalProps extends ModalFuncProps {
  afterClose: () => void;
}

const HookModal: React.FC<HookModalProps> = ({ content, onOk, onCancel, ...restProps }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Modal
      {...restProps}
      visible={visible}
      onOk={(...args) => {
        Promise.resolve(onOk ? onOk(...args) : undefined).then(() => {
          setVisible(false);
        });
      }}
      onCancel={(...args) => {
        Promise.resolve(onCancel ? onCancel(...args) : undefined).then(() => {
          setVisible(false);
        });
      }}
    >
      {content}
    </Modal>
  );
};

export default HookModal;
