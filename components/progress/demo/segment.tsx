import React from 'react';
import { Progress, Tooltip } from 'antd';

const App: React.FC = () => (
  <>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} />
    </Tooltip>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} type="circle" />
    </Tooltip>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} type="dashboard" style={{ marginLeft: 8 }} />
    </Tooltip>
  </>
);

export default App;
