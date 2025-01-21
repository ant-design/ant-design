import React from 'react';
import { Button, QRCode, Segmented, Space } from 'antd';
import type { QRCodeProps } from 'antd';

function doDownload(url: string, fileName: string) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const downloadCanvasQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    doDownload(url, 'QRCode.png');
  }
};

const downloadSvgQRCode = () => {
  const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
  const svgData = new XMLSerializer().serializeToString(svg!);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  doDownload(url, 'QRCode.svg');
};

const App: React.FC = () => {
  const [renderType, setRenderType] = React.useState<QRCodeProps['type']>('canvas');
  return (
    <Space id="myqrcode" direction="vertical">
      <Segmented options={['canvas', 'svg']} value={renderType} onChange={setRenderType} />
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
