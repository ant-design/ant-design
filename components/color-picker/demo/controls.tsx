import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ColorPicker, Space, Typography } from 'antd';

const { Title } = Typography;

const Demo = () => {
  return (
    <Space vertical>
      <Title level={5}>open controls</Title>
      <ColorPicker defaultValue="#1677ff" />
      <Title level={5}>close controls</Title>
      <ColorPicker controls={false} defaultValue="#1677ff" />
      <Title level={5}>customize controls</Title>
      <ColorPicker
        controls={{ upIcon: <CaretUpOutlined />, downIcon: <CaretDownOutlined /> }}
        defaultValue="#1677ff"
      />
    </Space>
  );
};

export default Demo;
