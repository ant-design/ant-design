import * as React from 'react';
import CSSMotion from 'rc-motion';
import { render, unmount } from 'rc-util/lib/React/render';
import classNames from 'classnames';
import { isValidWaveColor } from './util';

function getTargetWaveColor(node: HTMLElement) {
  const computedStyle = getComputedStyle(node);
  const borderTopColor = computedStyle.getPropertyValue('border-top-color');
  const borderColor = computedStyle.getPropertyValue('border-color');
  const backgroundColor = computedStyle.getPropertyValue('background-color');
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor;
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor;
  }
  return backgroundColor;
}

export interface WaveEffectProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  className: string;
  scale: number;
  borderRadius: number[];
}

function WaveEffect(props: WaveEffectProps) {
  const { className, left, top, width, height, color, borderRadius, scale } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <CSSMotion
      visible
      motionAppear
      motionName="wave-motion"
      motionDeadline={5000}
      onAppearEnd={(_, event) => {
        if ((event as TransitionEvent).propertyName === 'opacity') {
          const holder = divRef.current?.parentElement!;
          unmount(holder).then(() => {
            holder.parentElement?.removeChild(holder);
          });
        }

        return false;
      }}
    >
      {({ className: motionClassName }) => (
        <div
          ref={divRef}
          className={classNames(className, motionClassName)}
          style={
            {
              left,
              top,
              width,
              height,
              color,
              borderRadius: borderRadius.map((radius) => `${radius}px`).join(' '),
              '--wave-scale': scale,
            } as React.CSSProperties & {
              '--wave-scale': number;
            }
          }
        />
      )}
    </CSSMotion>
  );
}

export default function showWaveEffect(
  container: HTMLElement,
  node: HTMLElement,
  className: string,
) {
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
  const scale = nodeRect.width / offsetWidth;

  // Create holder
  const holder = document.createElement('div');
  container.appendChild(holder);

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
        borderBottomLeftRadius,
        borderBottomRightRadius,
      ].map((radius) => parseFloat(radius) * scale)}
    />,
    holder,
  );
}
