import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
);

export default Demo;
