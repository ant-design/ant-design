import React, { useState } from 'react';
import { Button, ColorPicker, ConfigProvider, Divider, Input, Space } from 'antd';

const App: React.FC = () => {
  const [primary, setPrimary] = useState('#1677ff');

  return (
    <>
      <ColorPicker showText value={primary} onChange={(color) => setPrimary(color.toHexString())} />
      <Divider />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
          },
        }}
      >
        <Space>
          <Input placeholder="Please Input" />
          <Button type="primary">Submit</Button>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
