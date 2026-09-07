import React from 'react';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

const style: React.CSSProperties = {
  marginBottom: 16,
};

const sliderStyle: React.CSSProperties = {
  marginBottom: 48,
};

const marks: SliderSingleProps['marks'] = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: <strong>100°C</strong>,
  },
};

const App: React.FC = () => (
  <>
    <h4 style={style}>included=true</h4>
    <Slider style={sliderStyle} marks={marks} defaultValue={37} />
    <Slider style={sliderStyle} range marks={marks} defaultValue={[26, 37]} />

    <h4 style={style}>included=false</h4>
    <Slider style={sliderStyle} marks={marks} included={false} defaultValue={37} />

    <h4 style={style}>marks & step</h4>
    <Slider style={sliderStyle} marks={marks} step={10} defaultValue={37} />

    <h4 style={style}>step=null</h4>
    <Slider style={sliderStyle} marks={marks} step={null} defaultValue={37} />
  </>
);

export default App;
