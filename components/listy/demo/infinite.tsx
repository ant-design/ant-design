import React from 'react';
import { Flex, Listy, Spin, Typography } from 'antd';

interface Item {
  id: number;
  content: string;
}

const PAGE_SIZE = 50;

const makePage = (offset: number): Item[] =>
  Array.from({ length: PAGE_SIZE }, (_, index) => ({
    id: offset + index,
    content: `Item ${offset + index}`,
  }));

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>(() => makePage(0));
  const [loading, setLoading] = React.useState(false);
  const loadingRef = React.useRef(false);

  const onScroll: React.UIEventHandler<HTMLElement> = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight > 200 || loadingRef.current) {
      return;
    }
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...makePage(prev.length)]);
      loadingRef.current = false;
      setLoading(false);
    }, 600);
  };

  return (
    <Flex vertical gap="small">
      <Listy
        items={items}
        rowKey="id"
        height={400}
        itemRender={(item) => item.content}
        onScroll={onScroll}
      />
      <Flex justify="center" align="center" style={{ height: 24 }}>
        {loading ? (
          <Spin size="small" />
        ) : (
          <Typography.Text type="secondary">{items.length} items loaded</Typography.Text>
        )}
      </Flex>
    </Flex>
  );
};

export default App;
