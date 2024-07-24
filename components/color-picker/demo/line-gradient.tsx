import React from 'react';
import { ColorPicker } from 'antd';

const Demo = () => (
  <ColorPicker
    defaultValue={[
      {
        color: 'rgb(16, 142, 233)',
        percent: 0,
      },
      {
        color: 'rgb(255, 0, 0)',
        percent: 50,
      },
      {
        color: 'rgb(135, 208, 104)',
        percent: 100,
      },
    ]}
    allowClear
    showText
    mode={['single', 'gradient']}
    open
  />
);

export default Demo;
