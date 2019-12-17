import * as React from 'react';
import Hitu, { HiTuRefObject } from '@ant-design/hitu';
import { Shape, FrameInfo } from '@ant-design/hitu/lib/interface';

function Rect() {
  return <rect x="0" y="0" width="14" height="14" fill="#0170FE" />;
}

Rect.width = 14;
Rect.height = 14;

function getFrames(x: number, y: number): FrameInfo[] {
  const delay = (x + y) * 5 + 1;

  const position = {
    x: x * (14 + 12) + 14,
    y: y * (14 + 12) + 14,
  };

  return [
    {
      frame: 0,
      rotate: 0,
      ...position,
    },
    {
      frame: delay,
      rotate: 0,
      ...position,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 15 + delay,
      scaleX: 1.5,
      scaleY: 1.5,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 30 + delay,
      scaleX: 1,
      scaleY: 1,
    },
  ];
}

const shapes: Shape[] = [];

for (let x = 0; x < 4; x += 1) {
  for (let y = 0; y < 4; y += 1) {
    shapes.push({
      type: 'shape',
      source: Rect,
      frames: getFrames(x, y),
    });
  }
}

export default function Certainty() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);

  return (
    <span
      onMouseEnter={() => {
        setLoop(true);
        if (hituRef.current) {
          hituRef.current.triggerMotion(true);
        }
      }}
      onMouseLeave={() => {
        setLoop(false);
      }}
    >
      <Hitu
        loop={loop}
        defaultPlay={false}
        ref={hituRef}
        frames={120}
        width={120}
        height={120}
        style={{ width: 120, height: 120 }}
        shapes={shapes}
      />
    </span>
  );
}
