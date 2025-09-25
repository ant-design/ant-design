import React from 'react';
import { CloudOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 12px;
    border-radius: 16px;
  `,
}));

const styleFn: SegmentedProps['styles'] = ({ props }) => {
  const isDisabled = props?.disabled;

  return {
    item: {
      background: isDisabled ? '#f5f5f5' : 'rgba(250, 173, 20, 0.08)',
      borderRadius: 999,
    },
    label: {
      fontWeight: 600,
      color: isDisabled ? '#999' : '#fa8c16',
    },
    icon: {
      color: isDisabled ? '#999' : '#fa8c16',
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

const App: React.FC = () => {
  const { styles } = useStyle();

  const segmentedSharedProps: SegmentedProps = {
    options,
    classNames: {
      root: styles.root,
    },
  };

  return (
    <Flex vertical gap="middle">
      <Segmented
        {...segmentedSharedProps}
        styles={{
          item: {
            borderRadius: 999,
            paddingInline: 20,
          },
          label: {
            fontWeight: 500,
          },
          icon: {
            color: '#faad14',
          },
        }}
      />

      <Segmented {...segmentedSharedProps} styles={styleFn} disabled />
    </Flex>
  );
};

export default App;
