import React from 'react';
import type { PaginationProps } from 'antd';
import { ConfigProvider, Pagination } from 'antd';

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
          itemActiveBg: '#e7cc87',
          itemLinkBg: '#344324',
          itemActiveBgDisabled: '#9c1515',
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
