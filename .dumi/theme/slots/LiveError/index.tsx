import type { FC } from 'react';
import React, { useContext } from 'react';
import { LiveContext } from 'dumi';
import { Alert, theme } from 'antd';

const LiveError: FC = () => {
  const { error } = useContext(LiveContext);
  const { token } = theme.useToken();

  return error ? (
    <Alert banner type="error" message={error} style={{ color: token.colorError }} />
  ) : null;
};

export default LiveError;
