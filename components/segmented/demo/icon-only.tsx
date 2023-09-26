import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

export default () => (
  <Segmented
    options={[
      {
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
