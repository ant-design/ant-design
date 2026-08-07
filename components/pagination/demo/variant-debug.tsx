import React from 'react';
import { ConfigProvider, Flex, Pagination, Typography } from 'antd';

const variants = ['outlined', 'filled', 'borderless', 'underlined'] as const;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    {variants.map((variant) => (
      <ConfigProvider key={variant} variant={variant}>
        <Flex vertical gap="small">
          <Typography.Text code>{variant}</Typography.Text>
          <Pagination defaultCurrent={2} total={50} showQuickJumper />
          <Pagination defaultCurrent={2} total={50} simple />
        </Flex>
      </ConfigProvider>
    ))}
  </Flex>
);

export default App;
