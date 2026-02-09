import React from 'react';
import { CloudOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';
import type { SegmentedProps, SegmentedSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 2px;
  `,
}));

const styleFn: SegmentedProps['styles'] = (info): SegmentedSemanticAllType['styles'] => {
  if (info.props.vertical) {
    return {
      root: {
        border: '1px solid #77BEF0',
        padding: 4,
        width: 100,
      },
      icon: {
        color: '#77BEF0',
      },
      item: {
        textAlign: 'start',
      },
    };
  }
  return {};
};

const styles: SegmentedProps['styles'] = {
  root: {
    padding: 4,
    width: 260,
  },
};

const options: SegmentedProps['options'] = [
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

const App: React.FC = () => {
  const segmentedSharedProps: SegmentedProps = {
    options,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Segmented {...segmentedSharedProps} styles={styles} />
      <Segmented {...segmentedSharedProps} styles={styleFn} vertical />
    </Flex>
  );
};

export default App;
