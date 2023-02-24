import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    routes={[
      {
        href: '',
        breadcrumbName: <HomeOutlined />,
      },
      {
        href: '',
        breadcrumbName: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        breadcrumbName: 'Application',
      },
    ]}
  />
);

export default App;
