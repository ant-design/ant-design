import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Modal, Dropdown, Space } from 'antd';

const Apps: React.FC = (props) => {
  const { time } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    for (let i = 0; i < time; i++) {
      console.log(i);
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        destroyOnClose
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        modal
      </Modal>
    </>
  );
};

const items1: MenuProps['items'] = [
  {
    key: '1',
    label: <Apps time={10} />,
  },
];

const items2: MenuProps['items'] = [
  {
    key: '1',
    label: <Apps time={10000} />,
  },
];

const App: React.FC = () => (
  <Space direction="vertical">
    <Dropdown menu={{ items: items1 }}>
      <span>10</span>
    </Dropdown>
    <Dropdown menu={{ items: items2 }}>
      <span>10000 </span>
    </Dropdown>
  </Space>
);

export default App;
