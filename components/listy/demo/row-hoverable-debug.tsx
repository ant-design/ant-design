import React from 'react';
import { Listy, Typography } from 'antd';

interface Item {
  id: number;
  content: string;
}

const items = Array.from<any, Item>({ length: 4 }, (_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const App: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 16,
    }}
  >
    <section>
      <Typography.Title level={5}>Default</Typography.Title>
      <Listy<Item> items={items} rowKey="id" itemRender={(item) => item.content} />
    </section>
    <section>
      <Typography.Title level={5}>rowHoverable=false</Typography.Title>
      <Listy<Item>
        items={items}
        rowHoverable={false}
        rowKey="id"
        itemRender={(item) => item.content}
      />
    </section>
  </div>
);

export default App;
