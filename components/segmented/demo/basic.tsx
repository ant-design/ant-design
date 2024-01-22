import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string | number | boolean>
    options={['Daily', 'Weekly', 2021, 2022, true, false]}
    onChange={(value) => {
      console.log(value);
    }}
  />
);

export default Demo;
