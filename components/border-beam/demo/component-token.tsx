import React from 'react';
import { BorderBeam, Card, ConfigProvider, Flex, Typography } from 'antd';

const Panel: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <div style={{ width: 320 }}>
      <BorderBeam>
        <Card title={title}>
          <Typography.Text type="secondary">{desc}</Typography.Text>
        </Card>
      </BorderBeam>
    </div>
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
            borderBeamWidth: 3,
          },
        },
      }}
    >
      <Panel
        title="Custom token"
        desc="Override borderBeamWidth from theme.components.BorderBeam."
      />
    </ConfigProvider>
  </Flex>
);

export default App;
