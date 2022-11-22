/**
 * uuid: f54dc6af
 * title: errorLevel例子
 */

import React, { useState } from 'react';
import { Radio, QrCode } from 'antd';

export default () => {
  const [level, setLevel] = useState<string>('L');
  return (
    <div>
      <Radio.Group value={level} onChange={(e) => setLevel(e.target.value)}>
        <Radio.Button value="L">L</Radio.Button>
        <Radio.Button value="M">M</Radio.Button>
        <Radio.Button value="Q">Q</Radio.Button>
        <Radio.Button value="H">H</Radio.Button>
      </Radio.Group>
      <QrCode
        errorLevel={level}
        value="https://hitu.alipay.com/packages/@alipay/tech-ui/home"
        logo="https://gw-office.alipayobjects.com/basement_prod/c83c53ab-515e-43e2-85d0-4d0da16f11ef.svg"
      />
    </div>
  );
};
