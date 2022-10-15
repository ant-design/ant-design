import * as React from 'react';
import { Typography } from 'antd';
import useSiteToken from '../../../hooks/useSiteToken';

export interface GroupProps {
  id?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { id, title, children } = props;
  const { token } = useSiteToken();

  return (
    <div style={{ marginBottom: token.marginXXL * 2 }}>
      <Typography.Title
        id={id}
        level={2}
        style={{ fontWeight: 200, marginBottom: token.gridSpaceXXL * 2 }}
      >
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
