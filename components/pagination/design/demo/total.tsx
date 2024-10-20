import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <Pagination
    defaultCurrent={3}
    total={500}
    showQuickJumper
    showTotal={(total, range) => `第 ${range.join('-')} 条 / 共 ${total} 条`}
  />
);

export default App;
