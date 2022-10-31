import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress type="circle" percent={75} style={{ marginRight: 8 }} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} style={{ marginLeft: 8 }} />
  </>
);

export default App;
