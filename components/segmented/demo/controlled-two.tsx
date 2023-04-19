import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo = () => {
  const [foo, setFoo] = useState<string | number>('AND');
  return (
    <>
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={setFoo} />
      &nbsp;&nbsp;
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={setFoo} />
    </>
  );
};

export default Demo;
