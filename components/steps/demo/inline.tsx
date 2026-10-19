import React from 'react';
import type { StepsProps } from 'antd';
import { Avatar, Flex, Listy, Steps, Typography } from 'antd';

interface DataType {
  title: string;
  current: number;
  status?: StepsProps['status'];
}

const data: DataType[] = [
  {
    title: 'Ant Design Title 1',
    current: 0,
  },
  {
    title: 'Ant Design Title 2',
    current: 1,
    status: 'error',
  },
  {
    title: 'Ant Design Title 3',
    current: 2,
  },
  {
    title: 'Ant Design Title 4',
    current: 1,
  },
];

const items = [
  {
    title: 'Step 1',
    content: 'This is Step 1',
  },
  {
    title: 'Step 2',
    content: 'This is Step 2',
  },
  {
    title: 'Step 3',
    content: 'This is Step 3',
  },
];

const App: React.FC = () => (
  <Listy<DataType>
    items={data}
    rowKey="title"
    itemRender={(item, index) => (
      <Flex gap="middle" align="flex-start">
        <Avatar src={`https://api.dicebear.com/10.x/lorelei/svg?seed=${index}`} />
        <Flex vertical flex="auto" style={{ minWidth: 0 }}>
          <a href="https://ant.design">{item.title}</a>
          <Typography.Text type="secondary">
            Ant Design, a design language for background applications, is refined by Ant UED Team
          </Typography.Text>
          <Steps
            style={{ marginTop: 8 }}
            type="inline"
            current={item.current}
            status={item.status}
            items={items}
          />
        </Flex>
      </Flex>
    )}
  />
);

export default App;
