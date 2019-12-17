import * as React from 'react';
import Hitu from '@ant-design/hitu';
import { HiTuRefObject } from '@ant-design/hitu/lib/HiTu';
import './Logo.less';
import { preLoad } from '../util';

const ICON_IMAGES = [
  'https://gw.alipayobjects.com/zos/basement_prod/c6935869-a270-463a-8303-9273173c189f.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/b32b972c-ee21-46fc-a922-8cfcef0a9e28.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/33754f3e-96de-40a0-8a68-d678b951545b.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/4b165b8b-5664-48cd-98db-b961c80f3d44.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/b5bd8035-5f8f-4656-a352-b91bad6aae5d.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/ab4a9544-c312-4162-8047-7ef2951fe461.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/8567be3a-e343-4256-ae73-868b9b3bc11e.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/c8148987-f22d-4988-b098-34ffc52c8832.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/e821630f-e313-48ed-b5b2-5e7b2db5cf5e.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/8a155478-541c-4bf9-bdab-5448ff6c0da0.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/36871c50-fb03-4f76-9929-3c4484107b5c.svg',
  'https://gw.alipayobjects.com/zos/basement_prod/9c2c7598-cd37-4879-ba30-2f409c9e994b.svg',
];

preLoad(ICON_IMAGES);

const AntDesign = () => (
  <svg>
    <circle cx="15" cy="15" r="9" fill="#F74455" />
  </svg>
);

AntDesign.width = 30;
AntDesign.height = 30;

const ICONS = ICON_IMAGES.map(href => {
  function Icon() {
    return (
      <svg viewBox="0 0 30 30">
        {/* Image size will follow outer svg size, let's cut to half here */}
        <image href={href} height="15" width="15" />
      </svg>
    );
  }

  Icon.width = 30;
  Icon.height = 30;

  return Icon;
});

export default function Logo() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);
  const [iconIndex, setIconIndex] = React.useState(-1);
  const Icon = ICONS[iconIndex] || AntDesign;
  const NextIcon = ICONS[(iconIndex + 1) % ICONS.length];

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
        width={60}
        height={60}
        className="home-card-logo-icon"
        loop={loop}
        defaultPlay={false}
        defaultFrame={30}
        frames={180}
        onFrame={frame => {
          if (frame === 0) {
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
                x: 30,
                y: 30,
                rotate: 0,
                cubic: Hitu.CUBIC_EASE,
              },
              {
                frame: 30,
                rotate: 0,
                opacity: 1,
                cubic: Hitu.CUBIC_EASE,
              },
              {
                frame: 150,
                rotate: 720,
                opacity: 0,
              },
            ],
          },
          {
            type: 'shape',
            source: NextIcon,
            frames: [
              {
                frame: 0,
                x: 30,
                y: 30,
                rotate: 0,
                opacity: 0,
              },
              {
                frame: 30,
                rotate: 0,
                opacity: 0,
                cubic: Hitu.CUBIC_EASE,
              },
              {
                frame: 150,
                rotate: 720,
                opacity: 1,
              },
            ],
          },
        ]}
      />
    </div>
  );
}
