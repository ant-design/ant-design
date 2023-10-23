import React from 'react';
import { ConfigProvider, Segmented } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Segmented: {
          itemColor: '#222',
          itemHoverColor: '#333',
          itemHoverBg: 'rgba(0, 0, 0, 0.06)',
          itemSelectedBg: '#aaa',
          itemActiveBg: '#ccc',
          itemSelectedColor: '#fff',
        },
      },
    }}
  >
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </ConfigProvider>
);
