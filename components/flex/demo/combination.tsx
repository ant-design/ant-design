import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';

const cardStyle: React.CSSProperties = {
  width: 530,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 192,
};

const App: React.FC = () => (
  <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
    <Flex justify="space-between">
      <img
        alt=""
        src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
        style={imgStyle}
      />
      <Flex direction="column" align="flex-start" justify="space-between" style={{ padding: 32 }}>
        <Typography.Title level={3}>
          “antd is an enterprise-class UI design language and React UI library.”
        </Typography.Title>
        <Flex direction="column" align="flex-start">
          <Button
            type="link"
            href="https://github.com/zombieJ"
            target="_blank"
            style={{ padding: 0 }}
          >
            zombieJ
          </Button>
          <Typography.Title level={5}>ant-design team core munber</Typography.Title>
        </Flex>
      </Flex>
    </Flex>
  </Card>
);

export default App;
