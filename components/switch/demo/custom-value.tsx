import React, { useState } from 'react';
import { Space, Switch } from 'antd';

const App: React.FC = () => {
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(1);
  const [value3, setValue3] = useState('hello');

  const onChange1 = (value: boolean) => {
    setValue1(value);
  };

  const onChange2 = (value: number) => {
    setValue2(value);
  };

  const onChange3 = (value: string) => {
    setValue3(value);
  };

  return (
    <Space direction="vertical">
      <Space>
        <Switch value={value1} onChange={onChange1} />
        <span>value: {value1.toString()}</span>
      </Space>
      <Space>
        <Switch value={value2} checkedValue={1} uncheckedValue={0} onChange={onChange2} />
        <span>value: {value2}</span>
      </Space>
      <Space>
        <Switch value={value3} checkedValue="hello" uncheckedValue="word" onChange={onChange3} />
        <span>value: {value3}</span>
      </Space>
    </Space>
  );
};

export default App;
