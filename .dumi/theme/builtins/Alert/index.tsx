import type { AlertProps } from 'antd';
import { Alert } from 'antd';
import type { FC } from 'react';
import React from 'react';

const MdAlert: FC<AlertProps> = ({ style, ...props }) => (
  <Alert {...props} style={{ margin: '24px 0', ...style }} />
);

export default MdAlert;
