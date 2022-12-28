import * as React from 'react';
import CSSMotion from 'rc-motion';
import { render, unmount } from 'rc-util/lib/React/render';
import classNames from 'classnames';
import { getTargetWaveColor, getValidateContainer } from './util';

export interface WaveEffectProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string | null;
  className: string;
  scale: number;
  borderRadius: number[];
}

const WaveEffect: React.FC<WaveEffectProps> = (props) => {
  const { className, left, top, width, height, color, borderRadius, scale } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  const waveStyle = {
    left,
    top,
    width,
    height,
    borderRadius: borderRadius.map((radius) => `${radius}px`).join(' '),
    '--wave-scale': scale,
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

export default function showWaveEffect(container: Node, node: HTMLElement, className: string) {
  const nodeStyle = getComputedStyle(node);
  const nodeRect = node.getBoundingClientRect();

  // Get wave color from target
  const waveColor = getTargetWaveColor(node);

  // Get border radius
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = nodeStyle;

  // Do scale calc
  const { offsetWidth } = node;
  const scale = validateNum(nodeRect.width / offsetWidth);

  // Create holder
  const holder = document.createElement('div');
  getValidateContainer(container).appendChild(holder);

  render(
    <WaveEffect
      left={nodeRect.left}
      top={nodeRect.top}
      width={nodeRect.width}
      height={nodeRect.height}
      color={waveColor}
      className={className}
      scale={scale}
      borderRadius={[
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      ].map((radius) => validateNum(parseFloat(radius) * scale))}
    />,
    holder,
  );
}
