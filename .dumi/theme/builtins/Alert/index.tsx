import type { AlertProps } from 'antd';
import { Alert } from 'antd';
import React from 'react';

const MdAlert = ({ style, ...props }: AlertProps) => (
  <Alert {...props} style={{ margin: '24px 0', ...style }} />
);

export default MdAlert;
