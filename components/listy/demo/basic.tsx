import React from 'react';
import { Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 20 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const App: React.FC = () => {
  return <Listy<Item> items={items} height={400} rowKey="id" itemRender={(item) => item.content} />;
};

export default App;
