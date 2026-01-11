import React from 'react';
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

const imageList = [
  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
];

// you can download flipped and rotated image
// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
const App: React.FC = () => {
  const [current, setCurrent] = React.useState(0);

  // or you can download flipped and rotated image
  // https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const onDownload = () => {
    const url = imageList[current];
    const suffix = url.slice(url.lastIndexOf('.'));
    const filename = Date.now() + suffix;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        
        if (!linkRef.current) {
          linkRef.current = document.createElement('a');
          document.body.appendChild(linkRef.current);
        }
        
        linkRef.current.href = blobUrl;
        linkRef.current.download = filename;
        linkRef.current.click();
        
        URL.revokeObjectURL(blobUrl);
      });
  };

  // Cleanup no useEffect
  useEffect(() => {
    return () => {
      if (linkRef.current) {
        document.body.removeChild(linkRef.current);
        linkRef.current = null;
      }
    };
  }, []);

  return (
    <Image.PreviewGroup
      preview={{
        actionsRender: (
          _,
          {
            transform: { scale },
            actions: {
              onActive,
              onFlipY,
              onFlipX,
              onRotateLeft,
              onRotateRight,
              onZoomOut,
              onZoomIn,
              onReset,
            },
          },
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <LeftOutlined disabled={current === 0} onClick={() => onActive?.(-1)} />
            <RightOutlined
              disabled={current === imageList.length - 1}
              onClick={() => onActive?.(1)}
            />
            <DownloadOutlined onClick={onDownload} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            <UndoOutlined onClick={onReset} />
          </Space>
        ),
        onChange: (index) => {
          setCurrent(index);
        },
      }}
    >
      {imageList.map((item, index) => (
        <Image alt={`image-${index}`} key={item} src={item} width={200} />
      ))}
    </Image.PreviewGroup>
  );
};

export default App;
