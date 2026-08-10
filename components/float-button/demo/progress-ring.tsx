import React from 'react';
import { FloatButton } from 'antd';

const sharedProps: React.ComponentProps<typeof FloatButton.BackTop> = {
  showProgress: true,
  visibilityHeight: 0,
};

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
      <FloatButton.BackTop {...sharedProps} style={{ insetInlineEnd: 24 }} shape="circle" />
      <FloatButton.BackTop {...sharedProps} style={{ insetInlineEnd: 88 }} shape="square" />
    </div>
  );
};

export default Demo;
