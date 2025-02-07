import React from 'react';
import { Segmented } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const Demo: React.FC = () => (
  <Segmented
    variant="round"
    options={[
      { value: 'light', icon: <SunOutlined /> },
      { value: 'dark', icon: <MoonOutlined /> },
    ]}
  />
);

export default Demo;
