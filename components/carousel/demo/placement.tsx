import React, { useState } from 'react';
import type { CarouselProps, RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';

type DotPlacement = CarouselProps['dotPlacement'];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const [dotPlacement, setDotPlacement] = useState<DotPlacement>('top');

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPlacement(value);
  };

  return (
    <>
      <Radio.Group onChange={handlePositionChange} value={dotPlacement} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="start">Start</Radio.Button>
        <Radio.Button value="end">End</Radio.Button>
      </Radio.Group>
      <Carousel dotPlacement={dotPlacement}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default App;
