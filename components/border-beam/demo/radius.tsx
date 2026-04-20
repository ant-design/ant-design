import React from 'react';
import { BorderBeam, Button, Flex, Input, theme, Typography } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  const radius = 24;

  return (
    <div style={{ width: 360 }}>
      <BorderBeam pathRadius={radius}>
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
    </div>
  );
};

export default App;
