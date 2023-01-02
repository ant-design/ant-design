import * as React from 'react';
import CSSMotion from 'rc-motion';
import { render, unmount } from 'rc-util/lib/React/render';
import classNames from 'classnames';
import { getTargetWaveColor } from './util';

export interface WaveEffectProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string | null;
  className: string;
  borderRadius: number[];
}

const WaveEffect: React.FC<WaveEffectProps> = (props) => {
  const { className, left, top, width, height, color, borderRadius } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  const waveStyle = {
    left,
    top,
    width,
    height,
    borderRadius: borderRadius.map((radius) => `${radius}px`).join(' '),
  } as React.CSSProperties & {
    [name: string]: number | string;
  };

  if (color) {
    waveStyle['--wave-color'] = color;
  }

  return (
    <CSSMotion
      visible
      motionAppear
      motionName="wave-motion"
      motionDeadline={5000}
      onAppearEnd={(_, event) => {
        if (event.deadline || (event as TransitionEvent).propertyName === 'opacity') {
          const holder = divRef.current?.parentElement!;
          unmount(holder).then(() => {
            holder.parentElement?.removeChild(holder);
          });
        }
        return false;
      }}
    >
      {({ className: motionClassName }) => (
        <div ref={divRef} className={classNames(className, motionClassName)} style={waveStyle} />
      )}
    </CSSMotion>
  );
};

function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value;
}

export default function showWaveEffect(node: HTMLElement, className: string) {
  const nodeStyle = getComputedStyle(node);

  // Get wave color from target
  const waveColor = getTargetWaveColor(node);

  // Get border radius
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = nodeStyle;

  // Create holder
  const holder = document.createElement('div');
  holder.style.position = 'absolute';
  holder.style.left = `${node.offsetLeft}px`;
  holder.style.top = `${node.offsetTop}px`;
  node.parentElement?.appendChild(holder);

  render(
    <WaveEffect
      left={0}
      top={0}
      width={node.offsetWidth}
      height={node.offsetHeight}
      color={waveColor}
      className={className}
      borderRadius={[
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      ].map((radius) => validateNum(parseFloat(radius)))}
    />,
    holder,
  );
}
