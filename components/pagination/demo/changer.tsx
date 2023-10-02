import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};

const App: React.FC = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);

export default App;
