import React, { useState } from 'react';
import { Modal, Select, Switch } from 'antd';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Switch
        style={{ position: 'relative', zIndex: 4000 }}
        checkedChildren="Open"
        unCheckedChildren="Close"
        onChange={(open) => setIsModalOpen(open)}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        destroyOnClose
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        closable={false}
        styles={{
          content: {
            marginBlockStart: 100,
          },
        }}
      >
        <Select open value="1" options={options} />
        <Modal
          title="Nested Modal"
          open={isModalOpen}
          footer={null}
          destroyOnClose
          mask={false}
          onCancel={() => setIsModalOpen(false)}
          maskClosable={false}
          closable={false}
          styles={{
            content: {
              marginBlockStart: 250,
            },
            body: {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Select open value="1" options={options} />

          <Modal
            title="Nested Modal"
            open={isModalOpen}
            footer={null}
            destroyOnClose
            mask={false}
            maskClosable={false}
            onCancel={() => setIsModalOpen(false)}
            closable={false}
            styles={{
              content: {
                marginBlockStart: 400,
              },
              body: {
                display: 'flex',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Select open value="1" options={options} />
          </Modal>
        </Modal>
      </Modal>
    </>
  );
};

export default App;
