import React from 'react';
import { BorderBeam, ConfigProvider, Flex, theme, Typography } from 'antd';

const radius = 20;

const Panel: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  const { token } = theme.useToken();

  return (
    <BorderBeam pathRadius={radius} size={84} style={{ width: 320 }}>
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
          {title}
        </Typography.Title>
        <Typography.Text type="secondary">{desc}</Typography.Text>
      </Flex>
    </BorderBeam>
  );
};

const App: React.FC = () => (
  <Flex gap={24} wrap>
    <Panel
      title="Default token"
      desc="Uses the default BorderBeam component token values derived from the current theme."
    />
    <ConfigProvider
      theme={{
        components: {
          BorderBeam: {
            beamColorFrom: '#fa541c',
            beamColorTo: '#13c2c2',
            borderBeamWidth: 3,
          },
        },
      }}
    >
      <Panel
        title="Custom token"
        desc="Override beamColorFrom, beamColorTo, and borderBeamWidth from theme.components.BorderBeam."
      />
    </ConfigProvider>
  </Flex>
);

export default App;
