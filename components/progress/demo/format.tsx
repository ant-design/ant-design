import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
    <Progress type="circle" percent={100} format={() => 'Done'} style={{ marginLeft: 8 }} />
  </>
);

export default App;
