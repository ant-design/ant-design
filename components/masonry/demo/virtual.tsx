import { Card, Masonry, Space } from 'antd';
import React, { useMemo } from 'react';

// Generate 100k items for performance testing
const generateItems = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    // Vary heights between 100-300px to simulate real masonry content
    const height = 100 + ((i * 73) % 200); // Deterministic height based on index
    items.push({
      key: `item-${i}`,
      height, // Declare height at item level for accurate position calculation
      data: {
        index: i,
        height,
      },
    });
  }
  return items;
};

const App: React.FC = () => {
  const items = useMemo(() => {
    const result = generateItems(100_000);
    return result;
  }, []);

  return (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        virtual={{
          height: 600,
          itemHeight: 200, // Estimated average height
          buffer: 8,
        }}
        onScrollEnd={() => {
          console.log('Reached end of list');
        }}
        itemRender={({ data }) => (
          <Card
            size="small"
            style={{
              height: data.height,
            }}
          >
            {data.index + 1}
          </Card>
        )}
      />
    </Space>
  );
};

export default App;
