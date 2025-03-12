import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      style={{ insetBlockEnd: 108 }}
      tooltip={{
        // tooltipProps 自 5.25.0 开始支持
        title: 'Since 5.25.0+',
        color: 'blue',
        placement: 'top',
      }}
    />
    <FloatButton tooltip={<div>Documents</div>} />
  </>
);

export default App;
