import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination simple defaultCurrent={2} total={50} />
    <br />
    <Pagination disabled simple defaultCurrent={2} total={50} />
  </>
);

export default App;
