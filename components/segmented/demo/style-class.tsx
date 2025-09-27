import React from 'react';
import { CloudOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(() => ({
  root: {
    padding: 2,
  },
}));

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
  const { styles: classNames } = useStyle();

  const segmentedSharedProps: SegmentedProps = {
    options,
    classNames,
  };

  const styleFn: SegmentedProps['styles'] = (info) => {
    if (info.props.vertical) {
      return {
        root: {
          border: '1px solid #77BEF0',
          padding: 4,
          width: 80,
        },
        icon: {
          color: '#77BEF0',
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

  return (
    <Flex vertical gap="middle">
      <Segmented {...segmentedSharedProps} styles={styles} />
      <Segmented {...segmentedSharedProps} styles={styleFn} vertical />
    </Flex>
  );
};

export default App;
