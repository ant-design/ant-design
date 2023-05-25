import { ConfigProvider, Slider } from 'antd';
import React from 'react';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: <strong>100°C</strong>,
  },
};

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Slider: {
          sliderMargin: '10px 6px 10px',
          railBackgroundColor: '#852929',
          railBackgroundColorHover: '#4370d3',
          trackBackgroundColor: '#545669',
          trackBackgroundColorHover: '#a99980',
          handleBorderWidth: 2,
          handleBackgroundColor: '#401b62',
          handleColor: '#3496b2',
          handleColorHover: '#310303',
          handleColorFocus: '#050905',
          handleColorFocusShadow: '#1a1b80',
          handleColorTooltipOpen: '#675c30',
          handleMarginTop: -5,
          handleMarginLeft: -5,
          handleShadow: 0,
          dotBorderColor: '#50b1da',
          dotBorderColorActive: '#863e6d',
          disabledColor: '#eee',
          disabledBackgroundColor: '#1c0f33',
        },
      },
    }}
  >
    <Slider vertical defaultValue={30} />
    <Slider range defaultValue={[20, 50]} />
    <Slider defaultValue={30} tooltip={{ open: true }} />
    <Slider range marks={marks} defaultValue={[26, 37]} />
  </ConfigProvider>
);

export default App;
