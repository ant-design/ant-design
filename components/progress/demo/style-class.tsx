import React from 'react';
import { Flex, Progress } from 'antd';
import type { ProgressProps, ProgressSemanticAllType } from 'antd';

const classNames: ProgressProps['classNames'] = {
  root: 'demo-progress-root',
  rail: 'demo-progress-rail',
  track: 'demo-progress-track',
};

const stylesFn: ProgressProps['styles'] = (info): ProgressSemanticAllType['styles'] => {
  const percent = info?.props?.percent ?? 0;
  const hue = 200 - (200 * percent) / 100;
  return {
    track: {
      backgroundImage: `
        linear-gradient(
          to right,
          hsla(${hue}, 85%, 65%, 1),
          hsla(${hue + 30}, 90%, 55%, 0.95)
        )`,
      borderRadius: 8,
      transition: 'all 0.3s ease',
    },
    rail: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
    },
  };
};

const App: React.FC = () => (
  <Flex vertical gap="large">
    <Progress classNames={classNames} styles={stylesFn} percent={10} />
    <Progress classNames={classNames} styles={stylesFn} percent={20} />
    <Progress classNames={classNames} styles={stylesFn} percent={40} />
    <Progress classNames={classNames} styles={stylesFn} percent={60} />
    <Progress classNames={classNames} styles={stylesFn} percent={80} />
    <Progress classNames={classNames} styles={stylesFn} percent={99} />
  </Flex>
);

export default App;
