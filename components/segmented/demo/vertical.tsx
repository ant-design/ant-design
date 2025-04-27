import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented, Space } from 'antd';

const Demo: React.FC = () => (
  <Space>
    <Segmented
      vertical
      options={[
        { value: 'List', icon: <BarsOutlined /> },
        { value: 'Kanban', icon: <AppstoreOutlined /> },
      ]}
    />
    <Segmented
      orientation="vertical"
      options={[
        { value: 'List', icon: <BarsOutlined /> },
        { value: 'Kanban', icon: <AppstoreOutlined /> },
      ]}
    />
  </Space>
);

export default Demo;
