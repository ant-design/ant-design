import React from 'react';
import { Avatar } from 'antd';
import type { AvatarGroupProps } from '../AvatarGroup';

const defaultMaxCount = 3;

const AvatarGroupOverflow: React.FC<AvatarGroupProps & { overflowInFinal?: boolean }> = (props) => {
  const { overflowInFinal, ...restProps } = props;

  if (!overflowInFinal) {
    return <Avatar.Group {...restProps} />;
  }

  const mergedMaxCount = props.max?.count ?? defaultMaxCount;

  return (
    <Avatar.Group
      {...restProps}
      max={{
        ...props.max,
        count: mergedMaxCount - 1,
      }}
    />
  );
};

const App: React.FC = () => (
  <AvatarGroupOverflow
    max={{
      count: 3,
      style: { backgroundColor: '#52c41a', color: '#fff' },
    }}
    overflowInFinal
  >
    <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
    <Avatar style={{ backgroundColor: '#7265e6' }}>B</Avatar>
    <Avatar style={{ backgroundColor: '#00a2ae' }}>C</Avatar>
    <Avatar style={{ backgroundColor: '#f56a00' }}>D</Avatar>
    <Avatar style={{ backgroundColor: '#7265e6' }}>E</Avatar>
  </AvatarGroupOverflow>
);

export default App;
