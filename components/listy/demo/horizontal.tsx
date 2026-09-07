import React from 'react';
import { Flex, Listy, Tag } from 'antd';

interface Item {
  id: number;
  name: string;
  email: string;
  address: string;
  status: string;
}

const items = Array.from<any, Item>({ length: 1000 }, (_, index) => ({
  id: index,
  name: `User ${index}`,
  email: `user.${index}@ant.design`,
  address: `No. ${index} Zhongshan Road, Xihu District, Hangzhou, Zhejiang`,
  status: index % 2 ? 'Active' : 'Inactive',
}));

const App: React.FC = () => (
  <Listy<Item, number>
    virtual
    items={items}
    height={400}
    scrollWidth={1000}
    rowKey="id"
    sticky
    group={{
      key: (item) => Math.floor(item.id / 50),
      title: (groupKey) => `User ${groupKey * 50} - ${groupKey * 50 + 49}`,
    }}
    itemRender={(item) => (
      <Flex gap="middle" align="center">
        <span style={{ flex: '0 0 100px' }}>{item.name}</span>
        <span style={{ flex: '0 0 220px' }}>{item.email}</span>
        <span style={{ flex: '0 0 480px' }}>{item.address}</span>
        <Tag color={item.status === 'Active' ? 'green' : 'default'}>{item.status}</Tag>
      </Flex>
    )}
  />
);

export default App;
