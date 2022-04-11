import React from 'react';
import { Badge, Avatar } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default () => (
  <>
    {' '}
    <Badge count={5}>
      {' '}
      <Avatar shape="square" size="large" />{' '}
    </Badge>{' '}
    <Badge count={0} showZero>
      {' '}
      <Avatar shape="square" size="large" />{' '}
    </Badge>{' '}
    <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
      {' '}
      <Avatar shape="square" size="large" />{' '}
    </Badge>{' '}
  </>
);
