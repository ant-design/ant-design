import { Button, Col, QRCode, Row } from 'antd';
import React from 'react';

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCodeCanvas.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const downloadQRCodeSvg = () => {
  const svg = document.getElementById('myqrcodesvg')?.querySelector<SVGElement>('svg');
  if (svg) {
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const img = new Image();
    img.src = href;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svg.clientWidth || 134;
      canvas.height = svg.clientHeight || 134;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'QRCodeSvg.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(href);
    };
  }
};

const App: React.FC = () => (
  <Row>
    <Col span={12}>
      <div id="myqrcode">
        <QRCode value="https://ant.design/" style={{ marginBottom: 16 }} />
      </div>
    </Col>
    <Col span={12}>
      <div id="myqrcodesvg">
        <QRCode renderAs="svg" value="https://ant.design/" style={{ marginBottom: 16 }} />
      </div>
    </Col>
    <Col span={12}>
      <Button type="primary" onClick={downloadQRCode}>
        Download Canvas QR
      </Button>
    </Col>
    <Col span={12}>
      <Button type="primary" onClick={downloadQRCodeSvg}>
        Download Svg QR
      </Button>
    </Col>
  </Row>
);

export default App;
