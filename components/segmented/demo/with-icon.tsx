import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

export default () => (
  <Segmented
    options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        label: 'Kanban',
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
