import React from 'react';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

// you can download flipped and rotated image
// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
const onDownload = (imgUrl: string) => {
  fetch(imgUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(new Blob([blob]));
      const link = document.createElement<'a'>('a');
      link.href = url;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    });
};

const App: React.FC = () => (
  <Image
    width={200}
    src={src}
    preview={{
      toolbarRender: (
        _,
        {
          image: { url },
          transform: { scale },
          actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
        },
      ) => (
        <Space size={12} className="toolbar-wrapper">
          <DownloadOutlined onClick={() => onDownload(url)} />
          <SwapOutlined rotate={90} onClick={onFlipY} />
          <SwapOutlined onClick={onFlipX} />
          <RotateLeftOutlined onClick={onRotateLeft} />
          <RotateRightOutlined onClick={onRotateRight} />
          <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
          <UndoOutlined onClick={onReset} />
        </Space>
      ),
    }}
  />
);

export default App;
