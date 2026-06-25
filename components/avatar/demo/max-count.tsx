import React, { useState } from 'react';
import { toArray } from '@rc-component/util';
import { Avatar, Flex, InputNumber, Space, Switch } from 'antd';
import type { AvatarGroupProps } from '../AvatarGroup';

const defaultMaxCount = 3;

const AvatarGroupOverflow: React.FC<AvatarGroupProps & { overflowInFinal?: boolean }> = (props) => {
  const { overflowInFinal, ...restProps } = props;
  const mergedMaxCount = props.max?.count ?? defaultMaxCount;
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
  const [maxCount, setMaxCount] = useState(3);
  const [overflowInFinal, setOverflowInFinal] = useState(false);

  return (
    <Flex vertical gap="middle">
      <Space>
        <div>
          <span>Avatar 数量:</span>
          <InputNumber
            min={2}
            max={10}
            value={avatarCount}
            onChange={(value) => setAvatarCount(value ?? defaultMaxCount)}
            aria-label="Avatar 数量"
            mode="spinner"
          />
        </div>
        <div>
          <span>maxCount:</span>
          <InputNumber
            min={1}
            max={10}
            value={maxCount}
            onChange={(value) => setMaxCount(value ?? defaultMaxCount)}
            aria-label="maxCount"
            mode="spinner"
          />
        </div>
        <div>
          <span>overflowInFinal:</span>
          <Switch
            style={{ width: 50 }}
            checked={overflowInFinal}
            onChange={setOverflowInFinal}
            aria-label="overflowInFinal"
          />
        </div>
      </Space>

      <AvatarGroupOverflow
        max={{
          count: maxCount,
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
