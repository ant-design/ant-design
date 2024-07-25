import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => {
  const onPageSizeChange = (size: number) => {
    console.log({ size });
  };

  return (
    <Pagination
      total={500}
      defaultPageSize={20}
      defaultCurrent={1}
      showSizeChanger
      pageSizeChanger={{
        options: [10, 20, 30, 40, 50],
        showSearch: false,
        onChange: onPageSizeChange,
      }}
    />
  );
};

export default App;
