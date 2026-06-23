import React from 'react';
import { Avatar } from 'antd';
import type { AvatarGroupProps } from '../AvatarGroup';

interface Config {
  defaultMaxCount?: number;
}

const withOverflowInFinal = (
  Component: React.ComponentType<AvatarGroupProps>,
  config: Config = {},
) => {
  const { defaultMaxCount = 3 } = config;

  return (props: AvatarGroupProps & { overFlowInFinal?: boolean }) => {
    const { overFlowInFinal, ...restProps } = props;
    const mergedMaxCount = props.max?.count ?? defaultMaxCount;

    return (
      <Component
        {...restProps}
        max={{
          ...props.max,
          count: overFlowInFinal ? mergedMaxCount - 1 : mergedMaxCount,
        }}
      />
    );
  };
};

const AvatarGroupOverflow = withOverflowInFinal(Avatar.Group);

const App: React.FC = () => (
  <AvatarGroupOverflow
    max={{
      count: 3,
      style: { backgroundColor: '#52c41a', color: '#fff' },
    }}
    overFlowInFinal
  >
    <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
    <Avatar style={{ backgroundColor: '#7265e6' }}>B</Avatar>
    <Avatar style={{ backgroundColor: '#00a2ae' }}>C</Avatar>
    <Avatar style={{ backgroundColor: '#f56a00' }}>D</Avatar>
    <Avatar style={{ backgroundColor: '#7265e6' }}>E</Avatar>
  </AvatarGroupOverflow>
);

export default App;
