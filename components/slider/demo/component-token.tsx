import { ConfigProvider, Slider } from 'antd';
import React from 'react';

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
    <Slider range defaultValue={[20, 50]} />
    <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
  </ConfigProvider>
);

export default App;
