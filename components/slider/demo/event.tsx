import React from 'react';
import { Slider } from 'antd';

const onChange = (value: number | number[]) => {
  console.log('onChange: ', value);
};

const onChangeComplete = (value: number | number[]) => {
  console.log('onChangeComplete: ', value);
};

const App: React.FC = () => (
  <>
    <Slider defaultValue={30} onChange={onChange} onChangeComplete={onChangeComplete} />
    <Slider
      range
      step={10}
      defaultValue={[20, 50]}
      onChange={onChange}
      onChangeComplete={onChangeComplete}
    />
  </>
);

export default App;
