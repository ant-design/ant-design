import { ColorPicker, Space } from 'antd';
import React from 'react';

const Demo = () => (
  <Space>
    <ColorPicker size="small" />
    <ColorPicker />
    <ColorPicker size="large" />
  </Space>
);

export default Demo;
