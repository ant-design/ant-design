/**
 * uuid: b10012f5
 * title: 过期状态
 */

import React from 'react';
import { QrCode } from '@alipay/tech-ui';

export default () => (
  <QrCode value="http://www.tmall.com" expired onRefresh={() => console.log('已刷新')} />
);
