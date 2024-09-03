import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={5} total={100} showSizeChanger={false} />;

export default App;
