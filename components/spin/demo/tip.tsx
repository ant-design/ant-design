import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Spin description="Loading" size="small">
        {content}
      </Spin>
      <Spin description="Loading">{content}</Spin>
      <Spin description="Loading" size="large">
        {content}
      </Spin>
    </Flex>
    <Spin description="Loading...">
      <Alert
        title="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  </Flex>
);

export default App;
