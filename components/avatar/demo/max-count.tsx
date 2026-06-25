import React, { useState } from 'react';
import { Avatar, Flex, InputNumber, Switch } from 'antd';
import type { AvatarGroupProps } from '../AvatarGroup';

const defaultMaxCount = 3;

const AvatarGroupOverflow: React.FC<AvatarGroupProps & { overflowInFinal?: boolean }> = (props) => {
  const { overflowInFinal, ...restProps } = props;
  const mergedMaxCount = props.max?.count ?? defaultMaxCount;
  const childrenCount = React.Children.count(props.children);
  if (!overflowInFinal || mergedMaxCount >= childrenCount) {
    return <Avatar.Group {...restProps} />;
  }

  return (
    <Avatar.Group
      {...restProps}
      max={{
        ...props.max,
        count: Math.max(1, mergedMaxCount - 1),
      }}
    />
  );
};

const App: React.FC = () => {
  const [maxCount, setMaxCount] = useState(3);
  const [overflowInFinal, setOverflowInFinal] = useState(false);

  return (
    <Flex vertical gap="middle">
      <Flex align="center" gap="middle">
        <span>maxCount:</span>
        <InputNumber
          min={0}
          max={6}
          value={maxCount}
          onChange={(value) => setMaxCount(value ?? defaultMaxCount)}
          aria-label="maxCount"
        />
        <span>overflowInFinal:</span>
        <Switch
          checked={overflowInFinal}
          onChange={setOverflowInFinal}
          aria-label="overflowInFinal"
        />
      </Flex>
      <AvatarGroupOverflow
        max={{
          count: maxCount,
          style: { backgroundColor: '#52c41a', color: '#fff' },
        }}
        overflowInFinal={overflowInFinal}
      >
        <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
        <Avatar style={{ backgroundColor: '#7265e6' }}>B</Avatar>
        <Avatar style={{ backgroundColor: '#00a2ae' }}>C</Avatar>
        <Avatar style={{ backgroundColor: '#f56a00' }}>D</Avatar>
        <Avatar style={{ backgroundColor: '#7265e6' }}>E</Avatar>
      </AvatarGroupOverflow>
    </Flex>
  );
};

export default App;
