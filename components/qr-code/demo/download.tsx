import React from 'react';
import { QrCode, Button } from 'antd';

const App: React.FC = () => {
  const downloadQrCode = () => {
    const canvas = document.getElementById('myqrcode')?.getElementsByTagName('canvas')[0];
    const url = canvas?.toDataURL() || '';
    const a = document.createElement('a');
    a.download = 'qr-code.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div id="myqrcode">
      <QrCode value="https://ant.design/" />
      <Button style={{ marginBlockStart: 16 }} onClick={downloadQrCode}>
        下载二维码
      </Button>
    </div>
  );
};

export default App;
