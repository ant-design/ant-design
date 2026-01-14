import React from 'react';
import { Card, Divider, Flex, Masonry, Typography } from 'antd';
import type { MasonryProps } from 'antd';
import { createStaticStyles } from 'antd-style';
import type { MasonryItemType } from 'antd/es/masonry/MasonryItem';
const { Title } = Typography;

const classNames = createStaticStyles(({ css }) => ({
  root: css`border: 1px solid #d9d9d9; border-radius: 8px; padding: 16px; height: 260px; background-color: #fafafa;`,
  item: css`transform: scale(0.98); transition: transform 0.2s ease; border-radius: 12px; border: 1px solid #ccc; overflow: hidden;`,
}));

const items = [120, 80, 100, 60, 140, 90, 110, 70].map<MasonryItemType<number>>(
  (height, index) => ({
    key: `item-${index}`,
    data: height,
  }),
);

const styles: MasonryProps['styles'] = {
  root: {
    borderRadius: 12,
    padding: 20,
    height: 260,
    backgroundColor: 'rgba(250,250,250,0.5)',
  },
  item: {
    transform: 'scale(0.98)',
    transition: 'transform 0.2s ease',
    border: '1px solid #ccc',
  },
};

const stylesFn: MasonryProps['styles'] = (info) => {
  const { props } = info;
  return {
    root: {
      border: `2px solid ${typeof props.columns === 'number' && props.columns > 2 ? '#1890ff' : '#52c41a'}`,
      padding: 20,
      height: 280,
      backgroundColor: 'rgba(240,248,255,.6)',
    },
    item: {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #1890ff',
    },
  } satisfies MasonryProps['styles'];
};

const App: React.FC = () => {
  const sharedProps: MasonryProps = {
    classNames,
    itemRender: ({ data, index }) => (
      <Card size="small" style={{ height: data }}>
        {index + 1}
      </Card>
    ),
  };
  return (
    <Flex vertical gap={24}>
      <div>
        <Title level={4}>classNames and styles Object</Title>
        <Masonry columns={4} gutter={16} items={items} {...sharedProps} styles={styles} />
      </div>
      <Divider />
      <div>
        <Title level={4}>classNames and styles Function</Title>
        <Masonry
          columns={3}
          gutter={12}
          items={items.slice(0, 6)}
          {...sharedProps}
          styles={stylesFn}
        />
      </div>
    </Flex>
  );
};

export default App;
