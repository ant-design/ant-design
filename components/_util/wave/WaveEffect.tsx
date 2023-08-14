import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { render, unmount } from 'rc-util/lib/React/render';
import raf from 'rc-util/lib/raf';
import * as React from 'react';
import { getTargetWaveColor } from './util';
import { type ShowWaveEffect, TARGET_CLS } from './interface';

function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value;
}

export interface WaveEffectProps {
  className: string;
  target: HTMLElement;
  component?: string;
}

const WaveEffect: React.FC<WaveEffectProps> = (props) => {
  const { className, target, component } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  const [color, setWaveColor] = React.useState<string | null>(null);
  const [borderRadius, setBorderRadius] = React.useState<number[]>([]);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);

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

  function syncPos() {
    const nodeStyle = getComputedStyle(target);

    // Get wave color from target
    setWaveColor(getTargetWaveColor(target));

    const isStatic = nodeStyle.position === 'static';

    // Rect
    const { borderLeftWidth, borderTopWidth } = nodeStyle;
    setLeft(isStatic ? target.offsetLeft : validateNum(-parseFloat(borderLeftWidth)));
    setTop(isStatic ? target.offsetTop : validateNum(-parseFloat(borderTopWidth)));
    setWidth(target.offsetWidth);
    setHeight(target.offsetHeight);

    // Get border radius
    const {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = nodeStyle;

    setBorderRadius(
      [
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      ].map((radius) => validateNum(parseFloat(radius))),
    );
  }

  React.useEffect(() => {
    if (target) {
      // We need delay to check position here
      // since UI may change after click
      const id = raf(() => {
        syncPos();

        setEnabled(true);
      });

      // Add resize observer to follow size
      let resizeObserver: ResizeObserver;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(syncPos);

        resizeObserver.observe(target);
      }

      return () => {
        raf.cancel(id);
        resizeObserver?.disconnect();
      };
    }
  }, []);

  if (!enabled) {
    return null;
  }

  const isSmallComponent =
    (component === 'Checkbox' || component === 'Radio') && target?.classList.contains(TARGET_CLS);

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
            holder?.remove();
          });
        }
        return false;
      }}
    >
      {({ className: motionClassName }) => (
        <div
          ref={divRef}
          className={classNames(
            className,
            {
              'wave-quick': isSmallComponent,
            },
            motionClassName,
          )}
          style={waveStyle}
        />
      )}
    </CSSMotion>
  );
};

const showWaveEffect: ShowWaveEffect = (target, info) => {
  const { component } = info;

  // Skip for unchecked checkbox
  if (component === 'Checkbox' && !target.querySelector('input')?.checked) {
    return;
  }

  // Create holder
  const holder = document.createElement('div');
  holder.style.position = 'absolute';
  holder.style.left = '0px';
  holder.style.top = '0px';
  target?.insertBefore(holder, target?.firstChild);

  render(<WaveEffect {...info} target={target} />, holder);
};

export default showWaveEffect;
