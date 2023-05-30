import { ConfigProvider, Slider } from 'antd';
import React from 'react';

const style: React.CSSProperties = {
  display: 'inline-block',
  height: 300,
  marginLeft: 70,
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
    <div style={style}>
      <Slider vertical defaultValue={30} />
    </div>
    <div style={style}>
      <Slider vertical range step={10} defaultValue={[20, 50]} />
    </div>
    <Slider range defaultValue={[20, 50]} />

    <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />

    <Slider defaultValue={30} tooltip={{ open: true }} />
  </ConfigProvider>
);

export default App;
