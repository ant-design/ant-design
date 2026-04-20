import React from 'react';
import { BorderBeam, Flex, theme, Typography } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const radius = 20;

  return (
    <BorderBeam borderWidth={2} duration={5.5} pathRadius={radius} size={84} style={{ width: 360 }}>
      <Flex
        vertical
        gap={8}
        style={{
          padding: 24,
          borderRadius: radius,
          border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
          background: token.colorBgContainer,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Workspace overview
        </Typography.Title>
        <Typography.Text type="secondary">
          Review task status, deployment health, and recent automation activity in one panel.
        </Typography.Text>
      </Flex>
    </BorderBeam>
  );
};

export default App;
