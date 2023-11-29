import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton
    onClick={() => console.log('click')}
    onMouseEnter={() => console.log('mouseEnter')}
    onMouseLeave={() => console.log('mouseLeave')}
  />
);

export default App;
