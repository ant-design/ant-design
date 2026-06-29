import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination align="start" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="center" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="end" defaultCurrent={1} total={50} />
  </>
);

export default App;
