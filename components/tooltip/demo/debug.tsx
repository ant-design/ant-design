import { Button, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Tooltip
    open
    title="Thanks for using antd. Have a nice day!"
    arrow={{ pointAtCenter: true }}
    placement="topLeft"
  >
    <Button>Point at center</Button>
  </Tooltip>
);

export default App;
