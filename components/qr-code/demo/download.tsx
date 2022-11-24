import React from 'react';
import { QrCode, Button } from 'antd';

const downloadQrCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  const url = canvas?.toDataURL();
  if (url) {
    const a = document.createElement('a');
    a.download = 'qr-code.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const App: React.FC = () => (
  <div id="myqrcode">
    <QrCode value="https://ant.design/" />
    <Button style={{ marginBlockStart: 16 }} onClick={downloadQrCode}>
      Download
    </Button>
  </div>
);

export default App;
