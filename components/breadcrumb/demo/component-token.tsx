import { Breadcrumb, ConfigProvider } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Breadcrumb: {
          baseColor: '#b02121',
          lastItemColor: '#0f3a88',
          iconFontSize: 28,
          linkColor: '#979a42',
          linkColorHover: '#947e27',
          separatorColor: '#b41b60',
          separatorMargin: 22,
        },
      },
    }}
  >
    <Breadcrumb
      routes={[
        {
          path: '/home',
          breadcrumbName: 'Home',
        },
        {
          path: '/user',
          breadcrumbName: 'User',
          children: [
            {
              path: '/user1',
              breadcrumbName: 'User1',
            },
            {
              path: '/user2',
              breadcrumbName: 'User2',
            },
          ],
        },
      ]}
    />
  </ConfigProvider>
);
