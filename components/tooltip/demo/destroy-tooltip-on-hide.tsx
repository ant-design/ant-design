import React from 'react';
import { Tooltip } from 'antd';

const App: React.FC = () => (
  <Tooltip destroyOnClose title="prompt text">
    <span>Tooltip will destroy when hidden.</span>
  </Tooltip>
);

export default App;
