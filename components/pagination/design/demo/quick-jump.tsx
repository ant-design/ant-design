import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={3} total={500} showQuickJumper />;

export default App;
