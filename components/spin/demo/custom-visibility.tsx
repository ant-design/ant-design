import React from 'react';
import { Space, Spin, Alert, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small">
    <Space direction="vertical">
      <Spin tip="Loading" size="small" visibility="soft">
        <Alert type="info" message="soft" description="description" />
      </Spin>
    </Space>
    <Space direction="vertical">
      <Spin tip="Loading" size="small">
        <Alert type="info" message="default" description="description" />
      </Spin>
    </Space>
    <Space direction="vertical">
      <Spin tip="Loading" size="small" visibility="heavy">
        <Alert type="info" message="heavy" description="description" />
      </Spin>
    </Space>
  </Flex>
);

export default App;
