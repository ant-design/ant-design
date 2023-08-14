import React from 'react';
import { Button, Tooltip } from 'antd';

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
