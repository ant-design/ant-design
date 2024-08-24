import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={2} total={50} showSizeChanger={false} />;

export default App;
