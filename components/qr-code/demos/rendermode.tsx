/**
 * uuid: f54dc6af
 * title: 渲染为canvas
 */

import React from 'react';
import { QrCode } from '@alipay/tech-ui';

export default () => (
  <>
    <QrCode
      mode="svg"
      value="http://www.baidu.com"
      logo="https://gw-office.alipayobjects.com/basement_prod/c83c53ab-515e-43e2-85d0-4d0da16f11ef.svg"
    />
  </>
);
