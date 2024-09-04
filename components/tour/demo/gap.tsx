import React, { useRef, useState } from 'react';
import { Button, Col, Row, Slider, Space, Tour, Typography } from 'antd';
import type { TourProps } from 'antd';

const { Text } = Typography;

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
      target: () => tourNodeRef.current,
    },
  ];

  const offsetGap =
    offsetDirection === 'both'
      ? { offset }
      : {
          offset: [offsetX, offsetY] as [number, number],
        };
  return (
    <div ref={tourNodeRef}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Space style={{ display: 'flex', marginTop: 12 }} direction="vertical">
        <Row>
          <Col span={6}>
            <Text>Radius:</Text>
          </Col>
          <Col span={12}>
            <Slider value={radius} onChange={(val) => val && setRadius(val)} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text> offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offset}
              max={50}
              onChange={(val) => val && setOffset(val)}
              onFocus={() => setOffsetDirection('both')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Horizontal offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offsetX}
              max={50}
              onChange={(val) => val && setOffsetX(val)}
              onFocus={() => setOffsetDirection('individual')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Vertical offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offsetY}
              max={50}
              onChange={(val) => val && setOffsetY(val)}
              onFocus={() => setOffsetDirection('individual')}
            />
          </Col>
        </Row>
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
