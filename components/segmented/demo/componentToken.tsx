import React from 'react';
import { ConfigProvider, Segmented } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Segmented: {
          padding: 50,
          labelColor: '#222',
          labelColorHover: '#333',
          bgColor: '#e6e6e6',
          bgColorHover: 'rgba(0, 0, 0, 0.06)',
          bgColorSelected: '#aaa',
        },
      },
    }}
  >
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </ConfigProvider>
);
