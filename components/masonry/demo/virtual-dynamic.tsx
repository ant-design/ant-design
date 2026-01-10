import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Masonry, Space, Spin, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';

const { Text } = Typography;

type ItemType = {
  key: string;
  height: number;
  data: {
    index: number;
    width: number;
    height: number;
    imageId: number;
  };
};

const PAGE_SIZE = 30;
const IMAGE_WIDTH = 300;

// Generate items with images of varying heights
const generateItems = (startIndex: number, count: number): ItemType[] => {
  const items: ItemType[] = [];
  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    // Heights between 150-350px for more visual variety
    const height = 150 + ((index * 47) % 200);
    // Use different image IDs for variety
    const imageId = (index * 7 + 10) % 1000;
    items.push({
      key: `item-${index}`,
      height,
      data: {
        index,
        width: IMAGE_WIDTH,
        height,
        imageId,
      },
    });
  }
  return items;
};

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>(() => generateItems(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Simulate async loading with a delay
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setItems((prev) => {
        const newItems = generateItems(prev.length, PAGE_SIZE);
        const combined = [...prev, ...newItems];

        // Stop loading after 300 items for demo purposes
        if (combined.length >= 300) {
          setHasMore(false);
        }

        return combined;
      });
      setLoading(false);
    }, 500);
  }, [loading, hasMore]);

  // Remove an item
  const removeItem = useCallback((removeKey: string) => {
    setItems((prev) => prev.filter(({ key }) => key !== removeKey));
  }, []);

  // Add a single item at the beginning
  const addItem = useCallback(() => {
    setItems((prev) => {
      const newIndex = prev.length > 0 ? Math.max(...prev.map((i) => i.data.index)) + 1 : 0;
      const height = 150 + ((newIndex * 47) % 200);
      const imageId = (newIndex * 7 + 10) % 1000;
      return [
        {
          key: `item-${newIndex}`,
          height,
          data: { index: newIndex, width: IMAGE_WIDTH, height, imageId },
        },
        ...prev,
      ];
    });
  }, []);

  const totalCount = useMemo(() => items.length, [items.length]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Button onClick={addItem}>Add Image</Button>
        <Text type="secondary">
          {totalCount} images {hasMore ? '(scroll for more)' : '(all loaded)'}
        </Text>
        {loading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
      </Space>

      <Masonry
        columns={4}
        gutter={8}
        items={items}
        virtual={{
          height: 500,
          itemHeight: 250, // Average estimated height
          buffer: 8,
        }}
        onScrollEnd={loadMore}
        itemRender={({ data, key }) => (
          <div
            style={{
              position: 'relative',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
            }}
          >
            <img
              src={`https://picsum.photos/id/${data.imageId}/${data.width}/${data.height}`}
              alt={data.imageId.toString()}
              style={{
                width: '100%',
                height: data.height,
                display: 'block',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '8px 12px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                color: '#fff',
                fontSize: 12,
              }}
            >
              #{data.index + 1}
            </div>
            <Button
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
              }}
              size="small"
              type="text"
              icon={<CloseOutlined style={{ color: '#fff' }} />}
              onClick={() => removeItem(key as string)}
            />
          </div>
        )}
      />
    </Space>
  );
};

export default App;
