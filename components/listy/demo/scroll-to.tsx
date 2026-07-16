import React from 'react';
import { Button, Flex, InputNumber, Listy, Segmented, Select, Space, Typography } from 'antd';
import type { ListyRef } from 'antd';

interface Item {
  id: number;
  group: string;
}

type Align = 'top' | 'bottom' | 'auto';

const items: Item[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index,
  group: `Group ${Math.floor(index / 100)}`,
}));

const groups = Array.from({ length: 10 }, (_, index) => `Group ${index}`);

const App: React.FC = () => {
  const listRef = React.useRef<ListyRef>(null);
  const [align, setAlign] = React.useState<Align>('top');
  const [key, setKey] = React.useState<number | null>(600);
  const [groupKey, setGroupKey] = React.useState('Group 5');
  const [scrollTop, setScrollTop] = React.useState(0);

  return (
    <Flex vertical gap="middle">
      <Flex gap="small" wrap align="center">
        <Segmented<Align> options={['top', 'bottom', 'auto']} value={align} onChange={setAlign} />
        <Space.Compact>
          <InputNumber min={0} max={999} value={key} onChange={setKey} style={{ width: 70 }} />
          <Button onClick={() => listRef.current?.scrollTo({ key: key ?? 0, align })}>
            Scroll to item
          </Button>
        </Space.Compact>
        <Space.Compact>
          <Select
            options={groups.map((group) => ({ value: group }))}
            value={groupKey}
            onChange={setGroupKey}
            style={{ width: 110 }}
          />
          <Button onClick={() => listRef.current?.scrollTo({ groupKey, align })}>
            Scroll to group
          </Button>
        </Space.Compact>
        <Button onClick={() => listRef.current?.scrollTo(0)}>Back to top</Button>
      </Flex>
      <Listy
        ref={listRef}
        items={items}
        rowKey="id"
        height={400}
        sticky
        group={{ key: (item) => item.group, title: (group) => group }}
        itemRender={(item) => `Item ${item.id}`}
        onScroll={(event) => setScrollTop(Math.round(event.currentTarget.scrollTop))}
      />
      <Typography.Text type="secondary">scrollTop: {scrollTop}px</Typography.Text>
    </Flex>
  );
};

export default App;
