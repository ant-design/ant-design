import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress type="dashboard" percent={75} style={{ marginRight: 8 }} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </>
);

export default App;
