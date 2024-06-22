import React from 'react';
import { Button, QRCode, Segmented, Space } from 'antd';
import type { QRCodeProps } from 'antd';

const downloadCanvasQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'QRCode.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const downloadSvgQRCode = () => {
  const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
  // 获取SVG的XML字符串
  const svgData = new XMLSerializer().serializeToString(svg);
  // 创建Blob对象
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

  // 创建可下载链接
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.download = 'QRCode.svg';
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const App: React.FC = () => {
  const [renderType, setRenderType] = React.useState<QRCodeProps['type']>('canvas');
  return (
    <Space id="myqrcode" direction="vertical">
      <Segmented
        options={['canvas', 'svg']}
        onChange={(val) => setRenderType(val as QRCodeProps['type'])}
      />
      <div>
        <QRCode
          type={renderType}
          value="https://ant.design/"
          bgColor="#fff"
          style={{ marginBottom: 16 }}
          icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Button
          type="primary"
          onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
        >
          Download
        </Button>
      </div>
    </Space>
  );
};

export default App;
