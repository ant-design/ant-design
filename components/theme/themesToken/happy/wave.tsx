import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import * as React from 'react';
import type { ConfigProviderProps } from '../../../config-provider';
import useWaveStyle from './style/wave';

export type WaveRender = Required<Required<ConfigProviderProps>['wave']>['render'];
export type UseTokenType = Parameters<WaveRender>[1];

interface HappyWaveProps {
  target: HTMLElement;
  token: UseTokenType;
}

function HappyWave({ target, token }: HappyWaveProps) {
  const prefixCls = 'happy-wave';
  const dotPrefixCls = `${prefixCls}-dot`;

  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const [, , hashId] = token;
  useWaveStyle(token);

  React.useEffect(() => {
    const rect = target.getBoundingClientRect();

    setLeft(rect.left + rect.width / 2);
    setTop(rect.top + rect.height / 2);
  }, []);

  return (
    <div
      className={classNames(prefixCls, hashId)}
      style={{
        left,
        top,
      }}
    >
      {new Array(7).fill(null).map((_, index) => {
        const name = `${dotPrefixCls}-${index}`;

        return (
          <CSSMotion key={name}>
            {() => <div className={classNames(dotPrefixCls, name)} />}
          </CSSMotion>
        );
      })}
    </div>
  );
}

const renderWave: WaveRender = (target, token) => <HappyWave target={target} token={token} />;

const Wave: ConfigProviderProps['wave'] = {
  render: renderWave,
};

export default Wave;
