import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

const App: React.FC = () => (
  <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
    <Flex justify="space-between">
      <img
        alt=""
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        style={imgStyle}
      />
      <Flex direction="column" align="flex-start" justify="space-between" style={{ padding: 32 }}>
        <Typography.Title level={3}>
          “antd is an enterprise-class UI design language and React UI library.”
        </Typography.Title>
        <Flex direction="column" align="flex-start">
          <Button
            type="link"
            href="https://github.com/afc163"
            target="_blank"
            style={{ padding: 0 }}
          >
            afc163
          </Button>
          <Typography.Title level={5}>ant-design author</Typography.Title>
        </Flex>
      </Flex>
    </Flex>
  </Card>
);

export default App;
