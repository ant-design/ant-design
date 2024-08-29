import React, { useRef, useState } from 'react';
import { Button, InputNumber, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

type Refs = 'ref1' | 'ref2' | 'ref3' | 'ref4';
const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [radius, setRadius] = useState(8);

  const target = useRef<Refs>('ref1');
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [offset, setOffset] = useState(2);
  const [open, setOpen] = useState(false);

  const refMap = {
    ref1: ref1.current,
    ref2: ref2.current,
    ref3: ref3.current,
    ref4: ref4.current,
  };
  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => refMap[target.current],
    },
  ];
  const clickOffsetBtn = (ref: Refs) => {
    setOpen(true);

    target.current = ref;
  };
  const offsetGap =
    target.current === 'ref2'
      ? { offset }
      : {
          offset: [offsetX, offsetY] as [number, number],
        };
  return (
    <>
      <Space>
        <Button type="primary" onClick={() => clickOffsetBtn('ref1')}>
          Begin Tour with radius
        </Button>
        <Button type="primary" onClick={() => clickOffsetBtn('ref2')}>
          Begin Tour with offset
        </Button>
      </Space>
      <div style={{ marginTop: 12 }}>
        <Button type="primary" style={{ marginRight: 12 }} onClick={() => clickOffsetBtn('ref3')}>
          Begin Tour with offsetX
        </Button>
        <Button type="primary" onClick={() => clickOffsetBtn('ref4')}>
          Begin Tour with offsetY
        </Button>
      </div>
      <Space style={{ display: 'flex', marginTop: 12 }} direction="vertical">
        <div>
          Radius:
          <InputNumber value={radius} onChange={(val) => val && setRadius(val)} ref={ref1} />
        </div>
        <div>
          offset:
          <InputNumber value={offset} ref={ref2} onChange={(val) => val && setOffset(val)} />
        </div>
        <div>
          Horizontal offset:
          <InputNumber value={offsetX} ref={ref3} onChange={(val) => val && setOffsetX(val)} />
        </div>
        <div>
          Vertical offset:
          <InputNumber value={offsetY} ref={ref4} onChange={(val) => val && setOffsetY(val)} />
        </div>
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        gap={{ ...offsetGap, radius }}
      />
    </>
  );
};

export default App;
