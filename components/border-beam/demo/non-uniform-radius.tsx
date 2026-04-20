import React from 'react';
import { BorderBeam, Button, Flex, theme, Typography } from 'antd';

const pathRadius = '20px 20px 0 0';

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <BorderBeam
      borderWidth={2}
      duration={5.5}
      pathRadius={pathRadius}
      size={84}
      style={{ width: 360 }}
    >
      <Flex
        vertical
        style={{
          borderRadius: pathRadius,
          border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
          overflow: 'hidden',
          background: token.colorBgContainer,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        <Flex
          vertical
          gap={8}
          style={{
            padding: 24,
            background: `linear-gradient(135deg, ${token.colorInfoBg}, ${token.colorBgContainer})`,
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Activity stream
          </Typography.Title>
          <Typography.Text type="secondary">
            Use a multi-value `pathRadius` like `20px 20px 0 0` to keep the beam aligned with
            non-uniform corners.
          </Typography.Text>
        </Flex>
        <Flex align="center" justify="space-between" style={{ padding: '16px 24px' }}>
          <Typography.Text strong>12 running jobs</Typography.Text>
          <Button type="primary">View queue</Button>
        </Flex>
      </Flex>
    </BorderBeam>
  );
};

export default App;
