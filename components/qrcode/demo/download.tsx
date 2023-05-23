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
    var svgString = new XMLSerializer().serializeToString(svg);
    var blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    var href = URL.createObjectURL(blob); // revokeObjectURL 别忘记释放资源
    var img = new Image();
    img.src = href;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = svg.clientWidth || 134;
      canvas.height = svg.clientHeight || 134;
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      var a = document.createElement('a');
      a.href = canvas.toDataURL('image/png'); //将画布内的信息导出为png图片数据
      a.download = 'QRCodeSvg.png'; //设定下载名称
      document.body.appendChild(a);
      a.click(); //点击触发下载
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
