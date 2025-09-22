import React from 'react';
import { ThunderboltOutlined, CloudOutlined, RocketOutlined } from '@ant-design/icons';
import { Card, Flex, Segmented, Space } from 'antd';
import type { SegmentedProps } from 'antd';

const objectClassNames: SegmentedProps['classNames'] = {
  root: 'demo-segmented-root',
  item: 'demo-segmented-item',
  label: 'demo-segmented-label',
  icon: 'demo-segmented-icon',
};

const objectStyles: SegmentedProps['styles'] = {
  root: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  item: {
    borderRadius: 12,
    paddingInline: 20,
  },
  label: {
    fontWeight: 500,
  },
  icon: {
    color: '#faad14',
  },
};

const functionClassNames: SegmentedProps['classNames'] = (info) => {
  const { props } = info;
  const { value, options = [] } = props;
  const lastOption = options[options.length - 1] as { value: React.Key };
  const isLast = lastOption.value === value;

  return {
    root: 'demo-segmented-dynamic-root',
    item: isLast ? 'demo-segmented-last-item' : 'demo-segmented-regular-item',
    label: 'demo-segmented-dynamic-label',
    icon: 'demo-segmented-dynamic-icon',
  };
};

const functionStyles: SegmentedProps['styles'] = (info) => {
  const { props } = info;
  const { value } = props;
  const isCloudy = value === 'cloud';

  return {
    root: {
      padding: 12,
      borderRadius: 16,
      backgroundColor: isCloudy ? '#e6f7ff' : '#fff1f0',
      border: `1px solid ${isCloudy ? '#91d5ff' : '#ffccc7'}`,
    },
    item: {
      borderRadius: 12,
      paddingInline: 20,
    },
    label: {
      fontWeight: 600,
      color: isCloudy ? '#1890ff' : '#fa541c',
    },
    icon: {
      color: isCloudy ? '#1890ff' : '#fa541c',
    },
  };
};

const options = [
  {
    label: 'Boost',
    value: 'boost',
    icon: <RocketOutlined />,
  },
  {
    label: 'Stream',
    value: 'stream',
    icon: <ThunderboltOutlined />,
  },
  {
    label: 'Cloud',
    value: 'cloud',
    icon: <CloudOutlined />,
  },
];

const App: React.FC = () => (
  <Flex gap="large" wrap="wrap">
    <Space orientation="vertical" size="large">
      <Card variant="borderless" title="Object ClassNames & Styles">
        <Segmented
          options={options}
          value="boost"
          classNames={objectClassNames}
          styles={objectStyles}
        />
      </Card>

      <Card variant="borderless" title="Function ClassNames & Styles">
        <Segmented
          options={options}
          value="cloud"
          classNames={functionClassNames}
          styles={functionStyles}
        />
      </Card>
    </Space>
  </Flex>
);

export default App;
