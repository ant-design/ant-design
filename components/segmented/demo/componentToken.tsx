import React from 'react';
import { ConfigProvider, Segmented } from 'antd';

const Demo: React.FC = () => (
  <>
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
    &nbsp;&nbsp;
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemColor: '#222',
            itemHoverColor: '#333',
            itemHoverBg: 'rgba(0, 0, 0, 0.06)',
            itemSelectedBg: 'linear-gradient(225deg, #c200ff 0%, #00ffff 100%)',
            itemActiveBg: '#ccc',
            itemSelectedColor: '#fff',
          },
        },
      }}
    >
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    </ConfigProvider>
  </>
);

export default Demo;
