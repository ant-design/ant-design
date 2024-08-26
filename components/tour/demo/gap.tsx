import React, { useRef, useState } from 'react';

import { Button, Divider, InputNumber, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

type OffsetKey = 'ref2' | 'ref3' | 'ref4';
const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [radiusOpen, setRadiusOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState(2);

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
      target: () => ref1.current,
    },
  ];

  const offsetTarget = useRef<OffsetKey>('ref2');
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [offset, setOffset] = useState(2);
  const [offsetOpen, setOffsetOpen] = useState(false);
  const refMap = {
    ref2: ref2.current,
    ref3: ref3.current,
    ref4: ref4.current,
  };
  const offsetSteps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => refMap[offsetTarget.current],
    },
  ];
  const clickOffsetBtn = (ref: OffsetKey) => {
    setOffsetOpen(true);

    offsetTarget.current = ref;
  };
  const offsetGap =
    offsetTarget.current === 'ref2'
      ? { offset }
      : {
          offset: [offsetX, offsetY] as [number, number],
        };
  return (
    <>
      <Button type="primary" onClick={() => setRadiusOpen(true)}>
        Begin Tour with radius
      </Button>

      <Space style={{ display: 'flex', marginTop: 12 }}>
        Radius:
        <InputNumber value={radius} onChange={(val) => val && setRadius(val)} ref={ref1} />
      </Space>
      <Tour open={radiusOpen} onClose={() => setRadiusOpen(false)} steps={steps} gap={{ radius }} />

      <Divider />
      <Space>
        <Button type="primary" onClick={() => clickOffsetBtn('ref2')}>
          Begin Tour with offset
        </Button>
        <Button type="primary" onClick={() => clickOffsetBtn('ref3')}>
          Begin Tour with offsetX
        </Button>
        <Button type="primary" onClick={() => clickOffsetBtn('ref4')}>
          Begin Tour with offsetY
        </Button>
      </Space>

      <Space style={{ display: 'flex', marginTop: 12 }} direction="vertical">
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
        open={offsetOpen}
        onClose={() => setOffsetOpen(false)}
        steps={offsetSteps}
        gap={offsetGap}
      />
    </>
  );
};

export default App;
