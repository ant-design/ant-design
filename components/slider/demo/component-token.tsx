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
          controlSize: 20,
          railSize: 4,
          handleSize: 22,
          handleSizeHover: 18,
          dotSize: 8,
          handleLineWidth: 6,
          handleLineWidthHover: 2,
          sliderMargin: '20px 16px 10px',
          railBg: '#9f3434',
          railHoverBg: '#8d2424',
          trackBg: '#b0b0ef',
          trackHoverBg: '#c77195',
          handleColor: '#e6f6a2',
          handleHoverColor: '#229a24',
          handleColorTooltipOpen: '#1e1756',
          handleMarginTop: -5,
          handleMarginLeft: -5,
          dotBorderColor: '#303030',
          dotActiveBorderColor: '#918542',
          trackBgDisabled: '#1a1b80',
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
