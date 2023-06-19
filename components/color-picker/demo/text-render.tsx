import { ColorPicker, Space } from 'antd';
import React from 'react';

const Demo = () => {
  return (
    <Space direction="vertical">
      <ColorPicker showText />
      <ColorPicker textRender={(color) => <span>Custom Text ({color.toHexString()})</span>} />
    </Space>
  );
};

export default Demo;
