/**
 * uuid: b83bf277
 * title: popover 带 logo 例子
 */

import React from 'react';
import { QrCode } from 'antd';

export default () => (
  <QrCode
    value="http://www.tmall.com"
    logo="https://gw-office.alipayobjects.com/basement_prod/c83c53ab-515e-43e2-85d0-4d0da16f11ef.svg"
    logoSize={64}
    popover
  />
);
