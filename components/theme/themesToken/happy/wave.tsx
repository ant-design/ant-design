import classNames from 'classnames';
import { CSSMotionList } from 'rc-motion';
import raf from 'rc-util/lib/raf';
import * as React from 'react';
import type { ConfigProviderProps } from '../../../config-provider';
import useWaveStyle from './style/wave';

export type WaveRender = Required<Required<ConfigProviderProps>['wave']>['render'];
export type UseTokenType = Parameters<WaveRender>[0]['token'];

interface HappyWaveProps {
  target: HTMLElement;
  token: UseTokenType;
  onFinish: VoidFunction;
}

const DOT_COUNT = 7;
const DOT_COUNT_LG = 10;

interface DotInfo {
  key: number;
  startSize: string;
  endSize: string;
  type: 'fill' | 'outlined';
  color: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}

function inRange(x: number, y: number, left: number, top: number, right: number, bottom: number) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

function HappyWave({ target, token, onFinish }: HappyWaveProps) {
  const prefixCls = 'happy-wave';
  const dotPrefixCls = `${prefixCls}-dot`;
  const targetPrefixCls = `${prefixCls}-target`;

  const [dots, setDots] = React.useState<DotInfo[] | null>(null);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const [, globalToken, hashId] = token;
  useWaveStyle(token);

  // ========================= Dots =========================
  React.useEffect(() => {
    const id = raf(() => {
      const rect = target.getBoundingClientRect();
      const { width, height } = rect;

      setLeft(rect.left + width / 2);
      setTop(rect.top + height / 2);
      setDots([]);

      const minSize = Math.min(width, height);
      const maxSize = Math.max(width, height);
      const halfMinSize = minSize / 2;
      const halfMaxSize = maxSize / 2;
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      const OFFSET_MIN = 15;
      const OFFSET_MAX = 30;
      const halfOffsetMinWidth = halfWidth + OFFSET_MIN;
      const halfOffsetMinHeight = halfHeight + OFFSET_MIN;
      const halfOffsetMaxWidth = halfWidth + OFFSET_MAX;
      const halfOffsetMaxHeight = halfHeight + OFFSET_MAX;

      const dotCount = minSize >= 20 ? DOT_COUNT_LG : DOT_COUNT;

      // Delay to start dot motion
      setTimeout(() => {
        const offsetAngle = Math.random() * 360;

        setDots(
          new Array(DOT_COUNT).fill(null).map((_, index) => {
            const rotate: number = 360 / dotCount;
            const randomAngle = offsetAngle + rotate * index;

            // Get start XY (Which should align the rect edge)
            let startX = 0;
            let startY = 0;

            for (let startDist = halfMinSize - 1; startDist <= halfMaxSize; startDist += 1) {
              const x = Math.cos((randomAngle * Math.PI) / 180) * startDist;
              const y = Math.sin((randomAngle * Math.PI) / 180) * startDist;

              if (!inRange(x, y, -halfWidth, -halfHeight, halfWidth, halfHeight)) {
                break;
              }

              startX = x;
              startY = y;
            }

            // Get end XY
            let endX = startX;
            let endY = startY;
            let endDist = halfMinSize;

            const endHalfWidth =
              Math.random() * (halfOffsetMaxWidth - halfOffsetMinWidth) + halfOffsetMinWidth;
            const endHalfHeight =
              Math.random() * (halfOffsetMaxHeight - halfOffsetMinHeight) + halfOffsetMinHeight;

            do {
              endX = Math.cos((randomAngle * Math.PI) / 180) * endDist;
              endY = Math.sin((randomAngle * Math.PI) / 180) * endDist;
              endDist += 1;
            } while (
              inRange(endX, endY, -endHalfWidth, -endHalfHeight, endHalfWidth, endHalfHeight)
            );

            let size = Math.random() * 3 + 3;
            if (height >= 20) {
              size = Math.random() * 4 + 6;
            }

            return {
              key: index + 1,
              startX: `${startX}px`,
              startY: `${startY}px`,
              endX: `${endX}px`,
              endY: `${endY}px`,
              startSize: `${size}px`,
              endSize: `${Math.random() > 0.75 ? size : 0}px`,
              type: Math.random() > 0.6 ? 'outlined' : 'fill',
              color:
                Math.random() > 0.5 ? globalToken.colorPrimary : globalToken.colorPrimaryBgHover,
            };
          }),
        );
      }, 50);

      target.className += ` ${targetPrefixCls}`;
    });

    return () => {
      raf.cancel(id);
    };
  }, []);

  // ======================== Clean =========================
  React.useEffect(() => {
    const id = setTimeout(() => {
      target.className = target.className.replace(` ${targetPrefixCls}`, '');
      onFinish();
    }, 600);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // ======================== Render ========================
  if (!dots) {
    return null;
  }

  return (
    <div
      className={classNames(prefixCls, hashId)}
      style={{
        left,
        top,
      }}
    >
      <CSSMotionList component={false} keys={dots} motionAppear motionName="happy-in-out">
        {({
          className: motionCls,
          style: motionStyle,
          key,
          startX,
          startY,
          endX,
          endY,
          startSize,
          endSize,
          type,
          color,
        }) => {
          const name = `${dotPrefixCls}-${key}`;

          const dotCls = classNames(dotPrefixCls, motionCls, name);

          const dotStyle: Record<string, string> = {
            [`--start-x`]: startX,
            [`--start-y`]: startY,
            [`--end-x`]: endX,
            [`--end-y`]: endY,
            [`--start-size`]: startSize,
            [`--end-size`]: endSize,
          };
          if (type === 'fill') {
            dotStyle['--background'] = color;
          } else {
            dotStyle['--border'] = `1px solid ${color}`;
          }

          return (
            <div
              className={dotCls}
              style={{
                ...motionStyle,
                ...dotStyle,
              }}
            />
          );
        }}
      </CSSMotionList>
    </div>
  );
}

const renderWave: WaveRender = (props: HappyWaveProps) => <HappyWave {...props} />;

const Wave: ConfigProviderProps['wave'] = {
  render: renderWave,
};

export default Wave;
