import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo = () => {
  const [value, setValue] = useState<string | number>('Map');

  return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;
};

export default Demo;
