import { Alert, AlertProps } from 'antd';
import React, { FC } from 'react';

const MdAlert: FC<AlertProps> = ({ style, ...props }) => {
  return <Alert {...props} style={{ margin: '24px 0', ...style }} />;
};

export default MdAlert;
