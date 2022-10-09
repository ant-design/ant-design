import * as React from 'react';
import { theme, Typography } from 'antd';

export interface GroupProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Group(props: GroupProps) {
  const { title, children } = props;
  const { token } = theme.useToken();

  return (
    <div style={{ marginBottom: token.gridSpaceXL * 6.25 }}>
      <Typography.Title level={2} style={{ fontWeight: 200 }}>
        {title}
      </Typography.Title>
      {children && <div style={{ marginTop: token.gridSpaceXXL * 2 }}>{children}</div>}
    </div>
  );
}
