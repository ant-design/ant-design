import React from 'react';
import { Card, Divider, Flex, Masonry, Typography } from 'antd';
import type { MasonryProps } from 'antd';

const { Title } = Typography;

const heights = [120, 80, 100, 60, 140, 90, 110, 70];

const items = heights.map((height, index) => ({
  key: `item-${index}`,
  data: height,
}));

const classNamesObject: MasonryProps['classNames'] = {
  root: 'custom-masonry-root',
  item: 'custom-masonry-item',
};

const classNamesFn: MasonryProps['classNames'] = (info) => {
  const { props } = info;
  return {
    root: `dynamic-masonry-${props.columns}-cols`,
    item: `dynamic-item-${props.gutter}px-gutter`,
  };
};

const stylesObject: MasonryProps['styles'] = {
  root: {
    border: '1px solid #d9d9d9',
    borderRadius: 8,
    padding: 16,
    height: 260,
    backgroundColor: '#fafafa',
  },
  item: {
    transform: 'scale(0.98)',
    transition: 'transform 0.2s ease',
    opacity: 0.8,
    border: '1px solid #ccc',
  },
};

const stylesFn: MasonryProps['styles'] = (info) => {
  const { props } = info;
  return {
    root: {
      border: `2px solid ${typeof props.columns === 'number' && props.columns > 2 ? '#1890ff' : '#52c41a'}`,
      borderRadius: 12,
      padding: 20,
      height: 280,
      backgroundColor: '#f0f8ff',
    },
    item: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderRadius: 6,
      overflow: 'hidden',
    },
  };
};

const App: React.FC = () => (
  <Flex vertical gap={24}>
    <div>
      <Title level={4}>classNames and styles object</Title>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        itemRender={({ data, index }) => (
          <Card size="small" style={{ height: data }}>
            {index + 1}
          </Card>
        )}
        classNames={classNamesObject}
        styles={stylesObject}
      />
    </div>

    <Divider />

    <div>
      <Title level={4}>classNames and styles function</Title>
      <Masonry
        columns={3}
        gutter={12}
        items={items.slice(0, 6)}
        itemRender={({ data, index }) => (
          <Card size="small" style={{ height: data }}>
            Item {index + 1}
          </Card>
        )}
        classNames={classNamesFn}
        styles={stylesFn}
      />
    </div>
  </Flex>
);

export default App;
