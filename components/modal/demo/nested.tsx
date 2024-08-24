import React, { useState } from 'react';
import { Button, message, Modal, notification, Select, Space, Switch } from 'antd';

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

const Demo: React.FC = () => {
  const [messageInstance, messageHolder] = message.useMessage();
  const [notificationInstance, notificationHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onShowStatic = () => {
    Modal.confirm({
      content: <Select open value="1" options={options} />,
    });
  };

  return (
    <Space>
      <Switch
        style={{ position: 'relative', zIndex: isModalOpen ? 4000 : 0 }}
        checkedChildren="Open"
        unCheckedChildren="Close"
        onChange={(open) => setIsModalOpen(open)}
      />
      <Button onClick={onShowStatic}>Static</Button>
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
            <Space wrap>
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: 'Are you OK?',
                    content: 'I am OK',
                  });
                }}
              >
                Static Confirm
              </Button>

              <Button
                onClick={() => {
                  message.success('Hello World');
                  notification.success({
                    message: 'Hello World',
                  });
                }}
              >
                Static Message, Notification
              </Button>

              <Button
                onClick={() => {
                  messageInstance.success('Hello World');
                  notificationInstance.success({
                    message: 'Hello World',
                  });
                }}
              >
                Hook Message, Notification
              </Button>

              <Select open value="1" options={options} />
            </Space>
          </Modal>
        </Modal>
      </Modal>

      {messageHolder}
      {notificationHolder}
    </Space>
  );
};

export default Demo;
