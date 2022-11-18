import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress strokeLinecap="butt" percent={75} />
    <Progress strokeLinecap="butt" type="circle" percent={75} />
    <Progress strokeLinecap="butt" type="dashboard" percent={75} style={{ marginLeft: 8 }} />
  </>
);

export default App;
