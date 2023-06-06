import { ConfigProvider, Space } from 'antd';
import React from 'react';
import BasicExample from './basic';
import DotExample from './dot';
import NoWrapperExample from './no-wrapper';
import StatusExample from './status';

/** Test usage. Do not use in your production. */
export default () => (
  <ConfigProvider
    theme={{
      components: {
        Badge: {
          height: 24,
          dotSize: 4,
          textFontWeight: 'bold',
          statusSize: 8,
          colorError: '#f56c6c', // Global token
        },
      },
    }}
  >
    <Space direction="vertical">
      <BasicExample />
      <NoWrapperExample />
      <DotExample />
      <StatusExample />
    </Space>
  </ConfigProvider>
);
