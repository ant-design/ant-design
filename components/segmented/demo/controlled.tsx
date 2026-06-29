import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState<string>('Map');
  return (
    <Segmented<string>
      options={['Map', 'Transit', 'Satellite']}
      value={value}
      onChange={setValue}
    />
  );
};

export default Demo;
