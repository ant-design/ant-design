import * as React from 'react';
import CSSMotion from 'rc-motion';
import raf from 'rc-util/lib/raf';
import { render, unmount } from 'rc-util/lib/React/render';
import classNames from 'classnames';
import { getTargetWaveColor } from './util';
import type { ConfigProviderProps } from '../../config-provider';
import type { useToken } from '../../theme/internal';

function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value;
}

export interface WaveEffectProps extends Omit<WaveWrapperProps, 'token'> {
  onFinish: VoidFunction;
}

const WaveEffect: React.FC<WaveEffectProps> = (props) => {
  const { className, target, onFinish } = props;
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
    const targetStyle = getComputedStyle(target);

    // Get wave color from target
    setWaveColor(getTargetWaveColor(target));

    const isStatic = targetStyle.position === 'static';

    // Rect
    const { borderLeftWidth, borderTopWidth } = targetStyle;
    setLeft(isStatic ? target.offsetLeft : -parseFloat(borderLeftWidth));
    setTop(isStatic ? target.offsetTop : -parseFloat(borderTopWidth));
    setWidth(target.offsetWidth);
    setHeight(target.offsetHeight);

    // Get border radius
    const {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    } = targetStyle;

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

  return (
    <CSSMotion
      visible
      motionAppear
      motionName="wave-motion"
      motionDeadline={5000}
      onAppearEnd={(_, event) => {
        if (event.deadline || (event as TransitionEvent).propertyName === 'opacity') {
          onFinish();
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

export interface WaveWrapperProps {
  className: string;
  currentTarget: HTMLElement;
  /**
   * In most case same as `currentTarget`.
   * Only when `currentTarget` has children element with `.antd-wave-target` className.
   * `target` will be the classNamed one.
   */
  target: HTMLElement;
  token: ReturnType<typeof useToken>;
  holder: HTMLElement;
}

function WaveWrapper(props: WaveWrapperProps) {
  const { holder } = props;

  function onFinish() {
    unmount(holder).then(() => {
      holder.parentElement?.removeChild(holder);
    });
  }

  return <WaveEffect {...props} onFinish={onFinish} />;
}

export default function showWaveEffect(
  node: HTMLElement,
  className: string,
  token: ReturnType<typeof useToken>,
  wave: ConfigProviderProps['wave'],
) {
  // Target
  const target = node.querySelector<HTMLElement>('.antd-wave-target') || node;

  if (wave?.render) {
    wave?.render({ target, currentTarget: node, token });
    return;
  }

  // Create holder
  const holder = document.createElement('div');
  holder.style.position = 'absolute';
  holder.style.left = `0px`;
  holder.style.top = `0px`;
  target?.insertBefore(holder, target?.firstChild);

  render(
    <WaveWrapper
      currentTarget={node}
      target={target}
      className={className}
      token={token}
      holder={holder}
    />,
    holder,
  );
}
