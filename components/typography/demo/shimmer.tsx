import React from 'react';
import { Flex, Typography } from 'antd';

const App: React.FC = () => (
  <Flex vertical>
    <Typography.Text shimmer>Thinking...</Typography.Text>
    <Typography.Title level={4} shimmer={{ duration: 1.5 }}>
      Generating title
    </Typography.Title>
    <Typography.Paragraph shimmer>
      Ant Design is analyzing your request and preparing the next response.
    </Typography.Paragraph>
    <Typography.Link href="https://ant.design" shimmer>
      Loading link
    </Typography.Link>
    <Typography.Text shimmer disabled>
      Disabled shimmer (no animation)
    </Typography.Text>
  </Flex>
);

export default App;
