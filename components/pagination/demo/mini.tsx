import React from 'react';
import type { PaginationProps } from 'antd';
import { Flex, Pagination } from 'antd';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
    <Pagination
      size="small"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />

    <Pagination size="large" total={50} />
    <Pagination size="large" total={50} showSizeChanger showQuickJumper />
    <Pagination size="large" total={50} showTotal={showTotal} />
    <Pagination
      size="large"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </Flex>
);

export default App;
