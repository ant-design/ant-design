import React from 'react';
import { useLocation } from 'dumi';
import { Skeleton, Space, Spin } from 'antd';

const Loading: React.FC = () => {
  const { pathname } = useLocation();

  if (
    pathname.startsWith('/components') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/changelog')
  ) {
    return (
      <Space direction="vertical" style={{ width: '100%', marginTop: 24 }} size={40}>
        <Skeleton title={false} active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
      </Space>
    );
  }

  return (
    <Space style={{ width: '100%', margin: '120px 0', justifyContent: 'center' }} align="center">
      <Spin size="large" />
    </Space>
  );
};

export default Loading;
