import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <React.StrictMode>
    <FloatButton onClick={() => console.log('click')} />
  </React.StrictMode>
);

export default App;
