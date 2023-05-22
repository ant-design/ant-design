import type { PaginationProps } from 'antd';
import { ConfigProvider, Pagination } from 'antd';
import React from 'react';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};
const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemSize: 20,
          itemSizeSM: 12,
          fontFamily: 'SimSun, sans-serif',
          fontWeightActive: 500,
          itemBgActive: '#235ea4',
          itemLinkBg: '#344324',
          itemDisabledColorActive: '#979a42',
          itemDisabledBgActive: '#9c1515',
          itemInputBg: '#9c1515',
          miniOptionsSizeChangerTop: 0,
          itemBg: '#333',
        },
      },
    }}
  >
    <Pagination
      showSizeChanger
      defaultCurrent={3}
      total={500}
      itemRender={itemRender}
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
    />
    <br />
    <Pagination showSizeChanger defaultCurrent={3} total={500} disabled />
  </ConfigProvider>
);

export default App;
