import React, { useState } from 'react';
import { Button, Modal, Select, Space } from 'antd';

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([false, false, false]);

  const toggleModal = (idx: number, value: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = value;
      return [...p];
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => toggleModal(0, true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        destroyOnClose
      >
        <Space>
          <Button type="primary" onClick={() => toggleModal(1, true)}>
            Nested Modal
          </Button>
          <Select open value="1" options={options} />
        </Space>
        <Modal
          title="Nested Modal"
          open={isModalOpen[1]}
          onOk={() => toggleModal(1, false)}
          onCancel={() => toggleModal(1, false)}
          destroyOnClose
        >
          <Space>
            <Button type="primary" onClick={() => toggleModal(2, true)}>
              Nested Modal
            </Button>
            <Select open value="1" options={options} />
          </Space>
          <Modal
            title="Nested Modal"
            open={isModalOpen[2]}
            onOk={() => toggleModal(2, false)}
            onCancel={() => toggleModal(2, false)}
            destroyOnClose
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Modal>
      </Modal>
    </>
  );
};

export default App;
