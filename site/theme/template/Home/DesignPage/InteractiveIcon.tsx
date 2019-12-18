import * as React from 'react';
import Hitu, { HiTuRefObject } from '@ant-design/hitu';
import { Shape } from '@ant-design/hitu/lib/interface';

const HOVER_LOOP = false;

export interface InteractiveIconProps {
  shapes: Shape[];
  debug?: boolean;
  frames?: number;
}

export default function InteractiveIcon({ shapes, debug, frames }: InteractiveIconProps) {
  const hituRef = React.useRef<HiTuRefObject>(null);
  const [loop, setLoop] = React.useState(false);

  return (
    <span
      onMouseEnter={() => {
        if (HOVER_LOOP) {
          setLoop(true);
        }

        if (hituRef.current) {
          hituRef.current.triggerMotion(true);
        }
      }}
      onMouseLeave={() => {
        setLoop(false);
      }}
    >
      <Hitu
        debug={debug}
        loop={loop}
        defaultPlay={false}
        ref={hituRef}
        frames={frames || 120}
        width={120}
        height={120}
        style={{ width: 120, height: 120 }}
        shapes={shapes}
      />
    </span>
  );
}
