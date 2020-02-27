import * as React from 'react';
import Hitu from '@ant-design/hitu';
import './Background.less';

const RANDOM_OFFSET = 50;
const TOTAL_FRAMES = 600;

function randomFrames(x: number, y: number): any[] {
  const common = { x, y, cubic: Hitu.CUBIC_EASE_IN_OUT };

  return [
    {
      frame: 0,
      ...common,
    },
    {
      frame: TOTAL_FRAMES / 2,
      ...common,
      x: x - Math.random() * RANDOM_OFFSET * 2 + RANDOM_OFFSET,
      y: y - Math.random() * RANDOM_OFFSET * 2 + RANDOM_OFFSET,
    },
    {
      frame: TOTAL_FRAMES,
      ...common,
    },
  ];
}

const ShadowSize = 30;

// =================================== Circle 1 ===================================
const CircleSize1 = 140;
const Circle1 = () => (
  <svg>
    <defs>
      <filter id="banner-circle-shadow-1">
        <feDropShadow dx="10" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.05)" />
      </filter>
      <linearGradient id="banner-circle-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FAFCFE' }} />
        <stop offset="100%" style={{ stopColor: '#F9FCFE' }} />
      </linearGradient>
    </defs>
    <circle
      cx={CircleSize1 + ShadowSize}
      cy={CircleSize1 + ShadowSize}
      r={CircleSize1}
      fill="url(#banner-circle-fill-1)"
      filter="url(#banner-circle-shadow-1)"
    />
  </svg>
);
Circle1.width = (CircleSize1 + ShadowSize) * 2;
Circle1.height = (CircleSize1 + ShadowSize) * 2;

// =================================== Circle 2 ===================================
const CircleSize2 = 200;
const Circle2 = () => (
  <svg>
    <defs>
      <filter id="banner-circle-shadow-2">
        <feDropShadow dx="10" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.05)" />
      </filter>
      <linearGradient id="banner-circle-fill-2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FAFCFE' }} />
        <stop offset="50%" style={{ stopColor: '#F3F9FC' }} />
      </linearGradient>
    </defs>
    <circle
      cx={CircleSize2 + ShadowSize}
      cy={CircleSize2 + ShadowSize}
      r={CircleSize2}
      fill="url(#banner-circle-fill-2)"
      filter="url(#banner-circle-shadow-2)"
    />
  </svg>
);
Circle2.width = (CircleSize2 + ShadowSize) * 2;
Circle2.height = (CircleSize2 + ShadowSize) * 2;

// ==================================== Rect 1 ====================================
const ReactSize1 = 90;
const React1 = () => (
  <svg>
    <defs>
      <filter id="banner-rect-shadow-1">
        <feDropShadow dx="10" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.05)" />
      </filter>
      <linearGradient id="banner-rect-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="25%" style={{ stopColor: '#F8FCFF' }} />
        <stop offset="100%" style={{ stopColor: '#F8FBFF' }} />
      </linearGradient>
    </defs>
    <rect
      x={ShadowSize}
      y={ShadowSize}
      width={ReactSize1 * 2}
      height={ReactSize1 * 2}
      fill="url(#banner-rect-fill-1)"
      filter="url(#banner-rect-shadow-1)"
    />
  </svg>
);
React1.width = (ReactSize1 + ShadowSize) * 2;
React1.height = (ReactSize1 + ShadowSize) * 2;

// ================================== Diamond 1 ===================================
const DiamondSize1 = 400;
const Diamond1 = () => {
  const start = ShadowSize;
  const center = ShadowSize + DiamondSize1;
  const end = ShadowSize + DiamondSize1 * 2;

  return (
    <svg width={center * 2} height={center * 2}>
      <defs>
        <filter id="banner-diamond-shadow-1">
          <feDropShadow dx="10" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.05)" />
        </filter>
        <linearGradient id="banner-diamond-fill-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="60%" style={{ stopColor: '#FCFDFF' }} />
          <stop offset="100%" style={{ stopColor: '#FCFDFE' }} />
        </linearGradient>
      </defs>

      <path
        d={`M ${start} ${center} ${center} ${start} ${end} ${center} ${center} ${end} Z`}
        fill="url(#banner-diamond-fill-1)"
        filter="url(#banner-diamond-shadow-1)"
      />
    </svg>
  );
};
Diamond1.width = (DiamondSize1 + ShadowSize) * 2;
Diamond1.height = (DiamondSize1 + ShadowSize) * 2;

export default function Background() {
  const [circleFrames, setCircleFrames] = React.useState<any[]>(randomFrames(550, 200));
  const [circle2Frames, setCircle2Frames] = React.useState<any[]>(randomFrames(0, 448));
  const [reactFrames, setReactFrames] = React.useState<any[]>(randomFrames(1400, 300));
  const [diamondFrames, setDiamondFrames] = React.useState<any[]>(randomFrames(1100, -230));

  return (
    <div className="home-banner-background">
      <img
        alt="background"
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJM2Q6uPXCAAAAAAAAAAAABkARQnAQ"
      />
      <Hitu
        width={1440}
        height={448}
        frames={TOTAL_FRAMES}
        onFrame={frame => {
          if (frame === 0) {
            setCircleFrames(randomFrames(550, 200));
            setCircle2Frames(randomFrames(0, 448));
            setReactFrames(randomFrames(1400, 300));
            setDiamondFrames(randomFrames(1100, -230));
          }
        }}
        shapes={[
          {
            type: 'shape',
            source: Circle1,
            frames: circleFrames,
          },
          {
            type: 'shape',
            source: Circle2,
            frames: circle2Frames,
          },
          {
            type: 'shape',
            source: React1,
            frames: reactFrames,
          },
          {
            type: 'shape',
            source: Diamond1,
            frames: diamondFrames,
          },
        ]}
      />
    </div>
  );
}
