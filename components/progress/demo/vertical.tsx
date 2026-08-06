import React from 'react';
import type { ProgressProps } from 'antd';
import { Flex, Progress } from 'antd';

const stylesFn: ProgressProps['styles'] = (info) => {
  const percent = info?.props?.percent ?? 0;
  const hue = 200 - (200 * percent) / 100;
  return {
    track: {
      backgroundImage: `
        linear-gradient(
          to top,
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
  <Flex gap={8} style={{ height: 300 }}>
    <Progress percent={30} vertical />
    <Progress percent={70} status="exception" vertical />
    <Progress percent={100} status="success" vertical />
    <Progress percent={50} vertical showInfo={false} strokeLinecap="butt" />
    <Progress percent={80} success={{ percent: 60 }} vertical strokeColor="#e9224d" size="small" />
    <Progress percent={60} vertical strokeWidth={20} railColor="#b2f0f2" />
    <Progress percent={90} vertical styles={stylesFn} status="active" />
  </Flex>
);

export default App;
