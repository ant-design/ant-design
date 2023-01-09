import classNames from 'classnames';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import raf from 'rc-util/lib/raf';
import * as React from 'react';
import type { ConfigProviderProps } from '../../../config-provider';
import useWaveStyle from './style/wave';

export type WaveRender = Required<Required<ConfigProviderProps>['wave']>['render'];
export type UseTokenType = Parameters<WaveRender>[1];

interface HappyWaveProps {
  target: HTMLElement;
  token: UseTokenType;
}

const DOT_COUNT = 10;

function HappyWave({ target, token }: HappyWaveProps) {
  const prefixCls = 'happy-wave';
  const dotPrefixCls = `${prefixCls}-dot`;
  const targetPrefixCls = `${prefixCls}-target`;

  const [keys, setKeys] = React.useState<number[] | null>(null);
  const [hiddenCount, setHiddenCount] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [, , hashId] = token;
  useWaveStyle(token);

  // ========================= Dots =========================
  React.useEffect(() => {
    if (keys && keys.length) {
      setKeys([]);
    }
  }, [keys]);

  React.useEffect(() => {
    const id = raf(() => {
      const rect = target.getBoundingClientRect();

      setLeft(rect.left);
      setTop(rect.top);
      setWidth(rect.width);
      setHeight(rect.height);

      // Delay to start dot motion
      setTimeout(() => {
        setKeys(new Array(DOT_COUNT).fill(null).map((_, index) => index + 1));
      }, 50);

      target.className += ` ${targetPrefixCls}`;
    });

    return () => {
      raf.cancel(id);
    };
  }, []);

  const onDotVisibleChange = (visible: boolean) => {
    if (!visible) {
      setHiddenCount((cnt) => cnt + 1);
    }
  };

  // ======================== Clean =========================
  React.useEffect(() => {
    const id = setTimeout(() => {
      target.className = target.className.replace(` ${targetPrefixCls}`, '');
    }, 600);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // ======================== Render ========================
  if (!keys) {
    return null;
  }

  return (
    <div
      className={classNames(prefixCls, hashId)}
      style={{
        left,
        top,
        width,
        height,
      }}
    >
      <CSSMotionList keys={keys} motionAppear={false} motionLeave motionName="happy-in-out">
        {({ className: motionCls, key }) => {
          const name = `${dotPrefixCls}-${key}`;

          const dotCls = classNames(dotPrefixCls, motionCls, name);

          return <div className={dotCls} />;
        }}
      </CSSMotionList>
      {/* {keys.map((key) => {
        const name = `${dotPrefixCls}-${key}`;

        return (
          <CSSMotion
            key={name}
            motionAppear={false}
            motionLeave
            motionName="happy-in-out"
            onVisibleChanged={onDotVisibleChange}
          >
            {({ className: motionCls }) => {
              const dotCls = classNames(dotPrefixCls, motionCls, name);

              return <div className={dotCls} />;
            }}
          </CSSMotion>
        );
      })} */}
    </div>
  );
}

const renderWave: WaveRender = (target, token) => <HappyWave target={target} token={token} />;

const Wave: ConfigProviderProps['wave'] = {
  render: renderWave,
};

export default Wave;
