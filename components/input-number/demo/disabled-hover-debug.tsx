import React from 'react';
import { Flex, InputNumber, Typography } from 'antd';

const sharedProps = {
  min: 0,
  max: 3,
  controls: true,
  style: { width: 180 },
};

const App: React.FC = () => (
  <Flex vertical gap={16}>
    <Typography.Text type="secondary">
      Hover the disabled step controls when the value reaches min or max.
    </Typography.Text>

    <Flex gap={16} wrap>
      <Flex vertical gap={8}>
        <Typography.Text>Input mode at max</Typography.Text>
        <InputNumber {...sharedProps} defaultValue={3} />
      </Flex>

      <Flex vertical gap={8}>
        <Typography.Text>Input mode at min</Typography.Text>
        <InputNumber {...sharedProps} defaultValue={0} />
      </Flex>

      <Flex vertical gap={8}>
        <Typography.Text>Spinner mode at max</Typography.Text>
        <InputNumber {...sharedProps} defaultValue={3} mode="spinner" />
      </Flex>

      <Flex vertical gap={8}>
        <Typography.Text>Spinner mode at min</Typography.Text>
        <InputNumber {...sharedProps} defaultValue={0} mode="spinner" />
      </Flex>
    </Flex>
  </Flex>
);

export default App;
