import type { FC } from 'react';
import React from 'react';
import { Alert, theme } from 'antd';

const LiveError: FC<{ error: Error | null }> = ({ error }) => {
  const { token } = theme.useToken();

  return error ? (
    <Alert banner type="error" message={error.toString()} style={{ color: token.colorError }} />
  ) : null;
};

export default LiveError;
