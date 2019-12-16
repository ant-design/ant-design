import * as React from 'react';
import Hitu from '@ant-design/hitu';
import { HiTuRefObject } from '@ant-design/hitu/lib/HiTu';

const AntDesign = () => (
  <svg>
    <circle cx="15" cy="15" r="9" fill="#FF0000" />
    <rect x="14" y="0" width="2" height="30" fill="#00FF00" />
  </svg>
);

AntDesign.width = 30;
AntDesign.height = 30;

export default function Logo() {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(true);

  return (
    <div
      className="home-card-logo"
      // onMouseEnter={() => {
      //   setLoop(true);
      //   if (hituRef.current) {
      //     hituRef.current.triggerMotion(true);
      //   }
      // }}
      // onMouseLeave={() => {
      //   setLoop(false);
      // }}
    >
      <img
        width="490"
        height="87"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/basement_prod/5b153736-dfe3-4a73-9454-68607c8103e4.svg"
      />
      <Hitu
        ref={hituRef}
        width={30}
        height={30}
        style={{ width: 30, height: 30 }}
        loop={loop}
        frames={200}
        shapes={[
          {
            type: 'shape',
            source: AntDesign,
            originX: 0.5,
            originY: 0.5,
            frames: [
              {
                frame: 0,
                x: 15,
                y: 15,
              },
              {
                frame: 100,
                x: 15,
                y: 15,
                // scaleX: 1.2,
                scaleY: 0.8,
              },
              {
                frame: 150,
                x: 15,
                y: 15,
                // scaleX: 1.2,
                scaleY: 1.1,
              },
            ],
            // frames: [
            //   {
            //     frame: 0,
            //     x: 15,
            //     y: 15,
            //     rotate: 0,
            //   },
            //   // {
            //   //   frame: 10,
            //   //   rotate: -30,
            //   // },
            //   // {
            //   //   frame: 100,
            //   //   rotate: 720,
            //   // },
            //   {
            //     frame: 200,
            //     rotate: 720,
            //   },
            // ],
          },
        ]}
      />
    </div>
  );
}
