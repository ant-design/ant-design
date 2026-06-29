import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const onStep: InputNumberProps['onStep'] = (value, info) => {
  console.log('onStep', value, info);
};

const App: React.FC = () => (
  <InputNumber
    min={1}
    max={10}
    defaultValue={3}
    onChange={onChange}
    onStep={onStep}
    changeOnWheel
  />
);

export default App;
