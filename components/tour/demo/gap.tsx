import React, { useRef, useState } from 'react';
import { Button, InputNumber, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const tourNodeRef = useRef(null);
  const [radius, setRadius] = useState(8);
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [offset, setOffset] = useState(2);
  const [open, setOpen] = useState(false);
  const [offsetDirection, setOffsetDirection] = useState<'both' | 'individual'>('individual');

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

  const offsetGap =
    offsetDirection === 'both'
      ? { offset }
      : {
          offset: [offsetX, offsetY] as [number, number],
        };
  return (
    <div ref={ref1}>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>
          Begin Tour
        </Button>
      </Space>
      <Space style={{ display: 'flex', marginTop: 12 }} direction="vertical">
        <div>
          Radius:
          <InputNumber value={radius} onChange={(val) => val && setRadius(val)} />
        </div>
        <div>
          offset:
          <InputNumber
            value={offset}
            onChange={(val) => val && setOffset(val)}
            onFocus={() => setOffsetDirection('both')}
          />
        </div>
        <div>
          Horizontal offset:
          <InputNumber
            value={offsetX}
            onChange={(val) => val && setOffsetX(val)}
            onFocus={() => setOffsetDirection('individual')}
          />
        </div>
        <div>
          Vertical offset:
          <InputNumber
            value={offsetY}
            onChange={(val) => val && setOffsetY(val)}
            onFocus={() => setOffsetDirection('individual')}
          />
        </div>
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        gap={{ ...offsetGap, radius }}
      />
    </div>
  );
};

export default App;
