import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Addon: { colorText: 'blue', algorithm: true },
      },
    }}
  >
    <Space.Compact>
      <Space.Addon>Addon</Space.Addon>
      <Button type="primary">Button</Button>
    </Space.Compact>
  </ConfigProvider>
);

export default App;
