import React from 'react';
import { ColorPicker, Space, theme } from 'antd';

const Demo = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Space>
      <Space direction="vertical">
        <ColorPicker defaultValue={colorPrimary} size="small" />
        <ColorPicker defaultValue={colorPrimary} />
        <ColorPicker defaultValue={colorPrimary} size="large" />
      </Space>
      <Space direction="vertical">
        <ColorPicker defaultValue={colorPrimary} size="small" showText />
        <ColorPicker defaultValue={colorPrimary} showText />
        <ColorPicker defaultValue={colorPrimary} size="large" showText />
      </Space>
    </Space>
  );
};

export default Demo;
