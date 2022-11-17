import React from 'react';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: 'linear-gradient(to right, #108ee9, #87d068)',
          colorPrimaryHover: 'linear-gradient(to right, #108ee9 60%, #87d068)',
          colorPrimaryActive: 'linear-gradient(to right, #108ee9 90%, #87d068)',
          controlOutlineWidth: 0,
          lineWidth: 0,
        },
      },
    }}
  >
    <Button type="primary">Button</Button>
  </ConfigProvider>
);

export default App;
