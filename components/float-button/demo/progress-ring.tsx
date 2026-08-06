import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div style={{ height: '300vh', padding: 10 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop showProgress visibilityHeight={0} />
  </div>
);

export default App;
