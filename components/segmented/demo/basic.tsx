import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string>
    options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
    onChange={(value) => {
      console.log(value); // string
    }}
  />
);

export default Demo;
