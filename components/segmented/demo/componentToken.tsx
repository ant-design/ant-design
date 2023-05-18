import { ConfigProvider, Segmented } from 'antd';
import React from 'react';

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
        },
      },
    }}
  >
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </ConfigProvider>
);
