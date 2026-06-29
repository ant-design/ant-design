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
      title="Default line width"
      desc="Uses the default global lineWidth token from the current theme."
    />
    <ConfigProvider
      theme={{
        components: {
          BorderBeam: {
            lineWidth: 3,
          },
        },
      }}
    >
      <Panel title="Custom line width" desc="Override lineWidth from theme.token." />
    </ConfigProvider>
  </Flex>
);

export default App;
