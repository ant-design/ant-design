import * as React from 'react';
import Hitu from '@ant-design/hitu';
import { Shape, FrameInfo } from '@ant-design/hitu/lib/interface';
import InteractiveIcon from './InteractiveIcon';

function Arrow() {
  return (
    <path
      fill="#FFB200"
      d="M81.8274462,0.126276923 L81.8274462,19.3203692 L75.7661538,19.3203692 L75.7666925,9.85015287 C58.6630313,32.8286615 33.5224908,52.4154208 0.389745066,68.6317684 L1.32871492e-12,68.8209231 L0.00109197241,62.0542198 C30.7061773,46.7059243 54.0774442,28.4225755 70.1546362,7.22315635 L70.7125099,6.48245893 L70.931,6.18727692 L62.6333538,6.18756923 L62.6333538,0.126276923 L81.8274462,0.126276923 Z"
    />
  );
}

Arrow.width = 84;
Arrow.height = 70;

function Rect() {
  return <rect x="0" y="0" width="10" height="10" fill="#FFD75A" />;
}

Rect.width = 10;
Rect.height = 10;

const rectShared: Partial<FrameInfo> = {
  originX: 0,
  originY: 1,
  y: 98,
};

const rectDistance = Rect.width + 9;
function getRectFrames(scaleY: number, index: number): FrameInfo[] {
  const delay = index * 3;

  return [
    {
      frame: 0,
      scaleY,
      ...rectShared,
      x: 18 + rectDistance * index,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 1 + delay,
      scaleY: 0,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 30 + delay,
      scaleY: scaleY * 1.05,
    },
    {
      frame: 40 + delay,
      scaleY: scaleY * 0.95,
    },
    {
      frame: 50 + delay,
      scaleY,
    },
  ];
}

const shapes: Shape[] = [
  {
    type: 'shape',
    source: Arrow,
    frames: [
      {
        frame: 0,
        originX: 0,
        originY: 0,
        x: 20,
        y: 12,
        opacity: 1,
        cubic: Hitu.CUBIC_EASE,
      },
      {
        frame: 1,
        y: 17,
        opacity: 0,
      },
      {
        frame: 30,
        y: 12,
        opacity: 1,
      },
    ],
  },
];

[1.2, 2.1, 3.1, 4.5, 6].forEach((scaleY, index) => {
  shapes.push({
    type: 'shape',
    source: Rect,
    frames: getRectFrames(scaleY, index),
  });
});

export default function Meaningful() {
  return <InteractiveIcon shapes={shapes} />;
}
