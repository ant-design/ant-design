import * as React from 'react';
import type { GlobalToken, OverrideToken } from '../../interface';
import type { ComponentToken } from '../../../_util/wave/style';

interface HappyWaveProps {
  target: HTMLElement;
  token: GlobalToken;
}

function HappyWave({ target, token }: HappyWaveProps) {
  React.useEffect(() => {}, []);

  return <div style={{ position: 'fixed' }}>2333</div>;
}

const renderWave: ComponentToken['render'] = (target, token) => (
  <HappyWave target={target} token={token} />
);

const Wave: OverrideToken['Wave'] = {
  render: renderWave,
};

export default Wave;
