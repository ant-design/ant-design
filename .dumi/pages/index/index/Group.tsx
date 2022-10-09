import * as React from 'react';
import { Typography } from 'antd';
import useSiteToken from '../../../hooks/useSiteToken';

export interface GroupProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { title, children } = props;
  const { token } = useSiteToken();

  return (
    <div style={{ marginBottom: token.marginXXL * 2 }}>
      <Typography.Title level={2} style={{ fontWeight: 200, marginBottom: token.gridSpaceXXL * 2 }}>
        {title}
      </Typography.Title>
      {children ? (
        <div>{children}</div>
      ) : (
        <div style={{ borderRadius: token.radiusLG, minHeight: 300, background: '#e9e9e9' }} />
      )}
    </div>
  );
}
