import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress type="circle" percent={30} width={80} />
    <Progress type="circle" percent={70} width={80} status="exception" />
    <Progress type="circle" percent={100} width={80} />
  </>
);

export default App;
