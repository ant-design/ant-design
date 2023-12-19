import React, { useState } from 'react';
import { CloseSquareFilled } from '@ant-design/icons';
import { Mentions } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState('hello world');
  return (
    <>
      <Mentions value={value} onChange={setValue} allowClear />
      <br />
      <br />
      <Mentions
        value={value}
        onChange={setValue}
        allowClear={{ clearIcon: <CloseSquareFilled /> }}
      />
    </>
  );
};

export default App;
