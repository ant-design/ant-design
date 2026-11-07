import React from 'react';
import { FloatButton } from 'antd';

const Demo: React.FC = () => {
  return (
    <div style={{ height: '300vh', padding: 10 }}>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <div>Scroll to bottom</div>
      <FloatButton.BackTop style={{ insetInlineEnd: 24 }} shape="circle" />
      <FloatButton.BackTop style={{ insetInlineEnd: 88 }} shape="square" />
    </div>
  );
};

export default Demo;
