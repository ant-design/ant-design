import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      style={{ insetBlockEnd: 108 }}
      tooltip={{
        // tooltipProps is supported starting from version 5.25.0.
        title: 'Since 5.25.0+',
        color: 'blue',
        placement: 'top',
      }}
    />
    <FloatButton tooltip={<div>Documents</div>} />
  </>
);

export default App;
