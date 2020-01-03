import * as React from 'react';
import Hitu from '@ant-design/hitu';
import { Shape, FrameInfo } from '@ant-design/hitu/lib/interface';
import InteractiveIcon from './InteractiveIcon';

function Rect() {
  return <rect x="0" y="0" width="14" height="14" fill="#0170FE" />;
}

Rect.width = 14;
Rect.height = 14;

function getFrames(x: number, y: number): FrameInfo[] {
  const delay = (x + y) * 5 + 1;

  const position = {
    x: x * (14 + 12) + 21,
    y: y * (14 + 12) + 21,
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
      scaleX: 1.3,
      scaleY: 1.3,
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
  return <InteractiveIcon shapes={shapes} />;
}
