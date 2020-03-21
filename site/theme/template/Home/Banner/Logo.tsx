import * as React from 'react';
import Hitu from '@ant-design/hitu';
import { HiTuRefObject } from '@ant-design/hitu/lib/HiTu';
import './Logo.less';
import { preLoad } from '../util';

const ICON_IMAGES = [
  'https://gw.alipayobjects.com/zos/basement_prod/fef2f3d5-9326-48e3-a8f3-a99584efd425.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/95736b64-de90-4fcd-bae9-a827091a247d.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/7002f57b-bf16-4640-8373-2c4cfcfa7f8c.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/29aa8cd8-de97-42b8-a370-f901be43e18a.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/d7bc5cdf-07f9-4ddf-8135-78d3cc6ca009.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/8737ccb7-3b5d-40ca-ae36-6a904047caa4.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/1fdf5981-2d9d-4315-bb84-4590d5c5b989.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/b9d17ebc-2af1-4926-ba1b-c1376ddaa479.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/dcb1b8f8-becd-4f90-ba32-574260a7b18d.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/ba0958ce-b194-4910-84de-7e3274742dbb.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/ad510b94-5f85-4b30-b929-2e3a34ad673c.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/43d010fa-71ac-44e3-8475-bb77d95c331c.svg',
];

preLoad(ICON_IMAGES);

const AntDesign = () => (
  <svg>
    <circle cx="16" cy="16" r="9" fill="#F74455" />
  </svg>
);

AntDesign.width = 32;
AntDesign.height = 32;

const ICONS = ICON_IMAGES.map(href => {
  function Icon() {
    return (
      <svg viewBox="0 0 32 32">
        {/* Image size will follow outer svg size, let's cut to half here */}
        <image href={href} height="16" width="16" />
      </svg>
    );
  }

  Icon.width = 32;
  Icon.height = 32;

  return Icon;
});

export default function Logo() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);
  const [iconIndex, setIconIndex] = React.useState(-1);
  const Icon = ICONS[iconIndex] || AntDesign;

  return (
    <div
      className="home-card-logo"
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
      <img
        alt="Ant Design"
        src="https://gw.alipayobjects.com/zos/basement_prod/80e7d303-aa05-4c2d-94e9-2255ab5cea6c.svg"
        className="home-banner-mini"
      />
      <img
        width="490"
        height="87"
        alt="Ant Design"
        src="https://gw.alipayobjects.com/zos/basement_prod/5b153736-dfe3-4a73-9454-68607c8103e4.svg"
        className="home-banner-normal"
      />
      <Hitu
        ref={hituRef}
        width={64}
        height={64}
        className="home-card-logo-icon"
        loop={loop}
        defaultPlay={false}
        frames={6}
        onFrame={frame => {
          if (frame === 5) {
            const newIndex = (iconIndex + 1) % ICONS.length;
            setIconIndex(newIndex);
          }
        }}
        shapes={[
          {
            type: 'shape',
            source: Icon,
            frames: [
              {
                frame: 0,
                x: 32,
                y: 32,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                cubic: Hitu.CUBIC_EASE,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
