import React from 'react';
import { BorderBeam, Button, Flex, Input, theme, Typography } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const radius = 24;

  return (
    <BorderBeam borderWidth={2} pathRadius={radius} size={88} style={{ width: 360 }}>
      <Flex
        vertical
        gap={16}
        style={{
          padding: 24,
          borderRadius: radius,
          border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
          background: token.colorBgContainer,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Sign in
        </Typography.Title>
        <Input placeholder="Email" />
        <Input.Password placeholder="Password" />
        <Button type="primary" block>
          Continue
        </Button>
      </Flex>
    </BorderBeam>
  );
};

export default App;
