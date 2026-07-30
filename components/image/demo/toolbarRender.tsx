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
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, iconPrefixCls, cssVar } = props;
  return {
    wrapper: css`
      padding: 0 ${cssVar.paddingLG};
      color: ${cssVar.colorWhite};
      font-size: ${cssVar.fontSizeXL};
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 100px;
      .${iconPrefixCls} {
        padding: ${cssVar.paddingSM};
        cursor: pointer;
        &:hover {
          opacity: 0.3;
        }
        &[disabled] {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }
    `,
  };
});

const imageList = [
  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
];

// you can download flipped and rotated image
// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
const App: React.FC = () => {
  const { styles } = useStyles();

  const [current, setCurrent] = React.useState(0);

  // or you can download flipped and rotated image
  // https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
  const onDownload = () => {
    const url = imageList[current];
    const suffix = url.slice(url.lastIndexOf('.'));
    const filename = Date.now() + suffix;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        link.remove();
      });
  };

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
          <Space size={12} className={styles.wrapper}>
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
