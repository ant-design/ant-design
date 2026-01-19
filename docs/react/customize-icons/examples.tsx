import React, { useState } from 'react';
import {
  Alert,
  Breadcrumb,
  Button,
  Collapse,
  DatePicker,
  Drawer,
  Flex,
  FloatButton,
  Image,
  Modal,
  notification,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tour,
  Transfer,
  TreeSelect,
} from 'antd';

const Examples: React.FC = () => {
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <Flex vertical gap="middle">
      {notificationContextHolder}
      <Alert type="success" showIcon title="Success" closable />
      <Alert type="info" showIcon title="Info" closable />
      <Alert type="warning" showIcon title="Warning" closable />
      <Alert type="error" showIcon title="Error" closable />
      <Breadcrumb
        items={[
          { title: 'Home' },
          { title: 'List', menu: { items: [{ title: 'Item 1' }, { title: 'Item 2' }] } },
          { title: 'Item' },
        ]}
      />
      <Flex gap="small">
        <Button loading>Button</Button>
      </Flex>
      <Collapse
        items={[
          { key: '1', label: 'Item 1', children: <div>Content 1</div> },
          { key: '2', label: 'Item 2', children: <div>Content 2</div> },
        ]}
      />
      <div>
        <DatePicker.RangePicker />
      </div>
      <div>
        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer title="Drawer" open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
      <FloatButton.BackTop />
      <Image.PreviewGroup>
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          width={100}
          height={100}
        />
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          width={100}
          height={100}
        />
      </Image.PreviewGroup>
      <div>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal title="Modal" open={modalOpen} onCancel={() => setModalOpen(false)} />
      </div>
      <div>
        <Button
          onClick={() =>
            notificationApi.info({ title: 'Notification', description: 'This is a notification' })
          }
        >
          Open Notification
        </Button>
      </div>
      <Table
        dataSource={[{ id: 1, name: 'John Doe' }]}
        columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
        expandable={{ expandedRowRender: () => <div>Expanded Content</div> }}
      />
      <Tabs
        type="editable-card"
        items={[
          { key: '1', label: 'Tab 1', children: <div>Content 1</div> },
          { key: '2', label: 'Tab 2', children: <div>Content 2</div> },
        ]}
      />
      <Flex gap="small">
        <Tag closable>Tag 1</Tag>
        <Tag closable>Tag 2</Tag>
        <Tag closable>Tag 3</Tag>
      </Flex>
      <div>
        <TimePicker.RangePicker />
      </div>
      <div>
        <Button onClick={() => setTourOpen(true)}>Open Tour</Button>
        <Tour
          steps={[
            {
              title: 'Step 1',
              description: 'This is a step description',
              target: () => document.querySelector('.ant-alert')!,
            },
          ]}
          open={tourOpen}
          onClose={() => setTourOpen(false)}
        />
      </div>
      <Transfer />
      <TreeSelect
        treeData={[
          {
            value: 'parent 1',
            title: 'parent 1',
            children: [
              {
                value: 'parent 1-0',
                title: 'parent 1-0',
                children: [
                  {
                    value: 'leaf1',
                    title: 'leaf1',
                  },
                  {
                    value: 'leaf2',
                    title: 'leaf2',
                  },
                  {
                    value: 'leaf3',
                    title: 'leaf3',
                  },
                  {
                    value: 'leaf4',
                    title: 'leaf4',
                  },
                  {
                    value: 'leaf5',
                    title: 'leaf5',
                  },
                  {
                    value: 'leaf6',
                    title: 'leaf6',
                  },
                ],
              },
              {
                value: 'parent 1-1',
                title: 'parent 1-1',
                children: [
                  {
                    value: 'leaf11',
                    title: <b style={{ color: '#08c' }}>leaf11</b>,
                  },
                ],
              },
            ],
          },
        ]}
        placeholder="Select an option"
      />
    </Flex>
  );
};

export default Examples;
