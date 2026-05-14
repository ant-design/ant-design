import React from 'react';
import { BorderBeam, Button, Card, Flex, Typography } from 'antd';

const radius = '20px 20px 0 0';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam outset={0}>
      <Card
        title="Activity stream"
        style={{
          borderRadius: radius,
          overflow: 'hidden',
        }}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          },
        }}
      >
        <Typography.Text type="secondary">
          Use a multi-value `borderRadius` like `20px 20px 0 0` to keep the beam aligned with
          non-uniform corners.
        </Typography.Text>
        <Flex align="center" justify="space-between">
          <Typography.Text strong>12 running jobs</Typography.Text>
          <Button type="primary">View queue</Button>
        </Flex>
      </Card>
    </BorderBeam>
  </div>
);

export default App;
