import React from 'react';
import { Flex, Pagination } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Pagination defaultCurrent={1} total={50} showSizeChanger={false} size="small" />
    <Pagination defaultCurrent={1} total={100} showSizeChanger={false} size="small" />
    <Pagination defaultCurrent={1} total={100} size="small" />
    <Pagination defaultCurrent={1} total={100} showQuickJumper size="small" />
    <Pagination
      defaultCurrent={1}
      total={100}
      showQuickJumper
      size="small"
      showTotal={(total, range) => `第 ${range.join('-')} 条 / 共 ${total} 条`}
    />
  </Flex>
);

export default App;
