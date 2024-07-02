import React from 'react';
import { AppstoreOutlined, BarsOutlined, CiOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
      { value: 'Ci', icon: <CiOutlined /> },
    ]}
  />
);

export default Demo;
