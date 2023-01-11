import { Button, ConfigProvider } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider button={{ className: 'custom-btn' }}>
    <Button>Button</Button>
  </ConfigProvider>
);
