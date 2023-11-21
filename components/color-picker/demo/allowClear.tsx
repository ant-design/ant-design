import React from 'react';
import { ColorPicker, theme } from 'antd';

export default () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return <ColorPicker defaultValue={colorPrimary} allowClear />;
};
