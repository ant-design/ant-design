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
        color: 'rgb(135, 208, 104)',
        percent: 100,
      },
    ]}
    allowClear
    showText
    mode={['single', 'gradient']}
  />
);

export default Demo;
