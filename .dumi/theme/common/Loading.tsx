import React, { type FC } from 'react';
import { Skeleton, Space } from 'antd';

const Loading: FC = () => (
  <Space direction="vertical" style={{ width: '100%' }} size={40}>
    <Skeleton title={false} active paragraph={{ rows: 3 }} />
    <Skeleton active paragraph={{ rows: 3 }} />
  </Space>
);

export default Loading;
