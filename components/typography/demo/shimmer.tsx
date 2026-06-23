import React from 'react';
import { Flex, Typography } from 'antd';

const App: React.FC = () => (
  <Flex vertical>
    <Typography.Text shimmer>Thinking...</Typography.Text>
    <Typography.Paragraph shimmer style={{ marginBottom: 0, paddingBottom: 0 }}>
      Ant Design is analyzing your request and preparing the next response.
    </Typography.Paragraph>
    <Typography.Link href="https://ant.design" shimmer>
      Loading link
    </Typography.Link>
    <Typography.Title level={4} shimmer={{ duration: 2 }} style={{ marginTop: 0, marginBottom: 0 }}>
      Generating title
    </Typography.Title>
  </Flex>
);

export default App;
