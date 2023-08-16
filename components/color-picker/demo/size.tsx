import React from 'react';
import { ColorPicker, Space } from 'antd';

const Demo = () => (
  <Space>
    <Space direction="vertical">
      <ColorPicker size="small" />
      <ColorPicker />
      <ColorPicker size="large" />
    </Space>
    <Space direction="vertical">
      <ColorPicker size="small" showText />
      <ColorPicker showText />
      <ColorPicker size="large" showText />
    </Space>
  </Space>
);

export default Demo;
