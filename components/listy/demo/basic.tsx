import React from 'react';
import { Listy } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items: Item[] = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const App: React.FC = () => (
  <Listy items={items} rowKey="id" height={400} itemRender={(item) => item.content} />
);

export default App;
