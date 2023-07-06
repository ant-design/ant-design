import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';
import React from 'react';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const App: React.FC = () => {
  const onOriginalImgDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  // you can download the flipped and rotated image
  const onTransformImgDownload = ({
    flipY,
    flipX,
    rotate,
  }: {
    flipY: boolean;
    flipX: boolean;
    rotate: number;
  }) => {
    const img = document.createElement('img');
    img.src = src;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const { naturalWidth, naturalHeight } = img;

      // flip and rotate in canvas
      const angle = (rotate * Math.PI) / 180;
      const sinAngle = Math.sin(angle);
      const cosAngle = Math.cos(angle);
      canvas.width = Math.abs(naturalWidth * cosAngle) + Math.abs(naturalHeight * sinAngle);
      canvas.height = Math.abs(naturalWidth * sinAngle) + Math.abs(naturalHeight * cosAngle);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.rotate(angle);
      ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
  };

  return (
    <Image
      width={200}
      src={src}
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
          },
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <DownloadOutlined onClick={onOriginalImgDownload} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
          </Space>
        ),
      }}
    />
  );
};

export default App;
