import React from 'react';
import { QrCode, Button } from 'antd';

export default () => {
  const downloadQrCode = () => {
    const canvas = document.getElementById('myqrcode')?.getElementsByTagName('canvas')[0];
    const url = canvas?.toDataURL() || ''; // 转为 base
    const a = document.createElement('a');
    a.download = '二维码.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="myqrcode">
      <QrCode
        value="http://www.baidu.com"
        // logo="https://gw-office.alipayobjects.com/basement_prod/c83c53ab-515e-43e2-85d0-4d0da16f11ef.svg"
      />
      <Button style={{ marginBlockStart: 16 }} onClick={downloadQrCode}>
        下载二维码
      </Button>
    </div>
  );
};
