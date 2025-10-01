import React from 'react';
import { Tooltip } from 'antd';

const App: React.FC = () => (
  <Tooltip.Lazy title="lazy prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip.Lazy>
);

export default App;
