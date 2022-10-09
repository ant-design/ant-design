/*
 * debug: true */
import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo = () => {
  const [foo, setFoo] = useState<string | number>('AND');
  return (
    <>
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={value => setFoo(value)} />
      &nbsp;&nbsp;
      <Segmented value={foo} options={['AND', 'OR', 'NOT']} onChange={value => setFoo(value)} />
    </>
  );
};

export default Demo;
