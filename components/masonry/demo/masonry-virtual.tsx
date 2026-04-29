import React from 'react';
import { Card, Masonry } from 'antd';

interface DemoData {
  height: number;
  title: string;
  cover: string;
}

const images = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=640&auto=format',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&auto=format',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=640&auto=format',
  'https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=640&auto=format',
  'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=640&auto=format',
];

const items = Array.from({ length: 600 }).map((_, index) => {
  const height = 120 + ((index * 37) % 140);

  return {
    key: `virtual-item-${index}`,
    data: {
      height,
      title: `Photo ${index + 1}`,
      cover: images[index % images.length],
    },
  };
});

const App: React.FC = () => (
  <Masonry
    virtual
    fresh
    style={{ height: 600 }}
    columns={{ xs: 1, sm: 2, md: 3 }}
    gutter={[16, 16]}
    items={items}
    itemRender={({ data }: { data: DemoData }) => (
      <Card
        size="small"
        cover={
          <img
            alt={data.title}
            src={data.cover}
            style={{ height: data.height, objectFit: 'cover' }}
          />
        }
      >
        <Card.Meta title={data.title} description={`Dynamic height: ${data.height}px`} />
      </Card>
    )}
  />
);

export default App;
