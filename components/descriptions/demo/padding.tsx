import React from 'react';
import { Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'long',
    children: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
  },
  {
    key: '2',
    label: 'long',
    children: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
  },
  {
    key: '3',
    label: 'long',
    children: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
  },
  {
    key: '4',
    label: 'long',
    children: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
  },
  {
    key: '5',
    label: 'long',
    children: 'loooooooooooooooooooooooooooooooooooooooooooooooong',
  },
];

const App: React.FC = () => (
  <Flex gap={8} vertical>
    <div style={{ width: 600, border: '1px solid', padding: 20 }}>
      <Descriptions title="User Info" column={2} items={items} />
    </div>
    <div style={{ width: 600, border: '1px solid', padding: 20 }}>
      <Descriptions layout="vertical" title="User Info" column={2} items={items} />
    </div>
  </Flex>
);

export default App;
