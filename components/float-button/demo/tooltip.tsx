import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div>
    <span>查看右下角的 FloatButton</span>
    <FloatButton tooltip={<div>帮助文档</div>} />
  </div>
);

export default App;
