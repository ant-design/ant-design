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
    <Progress percent={30} orientation="vertical" />
    <Progress percent={70} status="exception" orientation="vertical" />
    <Progress percent={100} status="success" orientation="vertical" />
    <Progress percent={50} orientation="vertical" showInfo={false} strokeLinecap="butt" />
    <Progress
      percent={80}
      success={{ percent: 60 }}
      orientation="vertical"
      strokeColor="#e9224d"
      size="small"
    />
    <Progress percent={60} orientation="vertical" strokeWidth={20} railColor="#b2f0f2" />
    <Progress percent={90} orientation="vertical" styles={stylesFn} status="active" />
    <Progress
      percent={75}
      orientation="vertical"
      strokeColor={{ from: '#108ee9', to: '#87d068' }}
    />
  </Flex>
);

export default App;
