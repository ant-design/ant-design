import React, { useState } from 'react';
import { toArray } from '@rc-component/util';
import { Avatar, Flex, InputNumber, Switch } from 'antd';
import type { AvatarGroupProps } from '../AvatarGroup';

const AvatarGroupOverflow: React.FC<AvatarGroupProps & { overflowInFinal?: boolean }> = (props) => {
  const { overflowInFinal, ...restProps } = props;
  const mergedMaxCount = props.max?.count ?? 3;
  const childrenCount = toArray(props.children).length;
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
  const [avatarCount, setAvatarCount] = useState(4);
  const [overflowInFinal, setOverflowInFinal] = useState(true);

  return (
    <Flex vertical gap="middle">
      <Flex gap={24}>
        <span>Avatar count: </span>
        <InputNumber
          style={{ width: 120 }}
          min={2}
          max={10}
          value={avatarCount}
          onChange={(value) => setAvatarCount(value!)}
          aria-label="Avatar count"
          mode="spinner"
        />
      </Flex>
      <Flex gap={8}>
        <span>overflowInFinal: </span>
        <Switch
          checked={overflowInFinal}
          onChange={setOverflowInFinal}
          aria-label="overflowInFinal"
        />
      </Flex>

      <AvatarGroupOverflow
        max={{
          count: 3,
          style: { backgroundColor: '#52c41a', color: '#fff' },
        }}
        overflowInFinal={overflowInFinal}
      >
        {Array.from({ length: avatarCount }, (_, i) => (
          <Avatar key={i} style={{ backgroundColor: '#f56a00' }}>
            {String.fromCharCode(65 + i)}
          </Avatar>
        ))}
      </AvatarGroupOverflow>
    </Flex>
  );
};

export default App;
