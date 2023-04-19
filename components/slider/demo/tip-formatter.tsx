import React from 'react';
import { Slider } from 'antd';

const formatter = (value: number) => `${value}%`;

const App = () => (
  <>
    <Slider tooltip={{ formatter }} />
    <Slider tooltip={{ formatter: null }} />
  </>
);

export default App;
