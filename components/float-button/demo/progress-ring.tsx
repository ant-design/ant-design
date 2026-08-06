import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <div style={{ height: '200vh' }} />
    <FloatButton.BackTop showProgress visibilityHeight={0} />
  </>
);

export default App;
