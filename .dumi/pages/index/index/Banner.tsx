import * as React from 'react';
import { theme } from 'antd';

export default function Banner() {
  const token = theme.useToken();
  console.log('>>>>', token);

  return <div>Banner!!!</div>;
}
