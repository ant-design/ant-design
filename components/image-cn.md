---
category: Components
group: 数据展示
title: Image
subtitle: 图片
description: 可预览的图片。
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 需要展示图片时使用。
- 加载显示大图或加载失败时容错处理。

## 代码演示 {#examples}

### 基本用法

单击图像可以放大显示。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image
    width={200}
    alt="basic"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
);

export default App;
```

### 渐进加载

通过 `placeholder` 属性设置占位符。当 `placeholder` 为 `{ progress: true }` 时显示水彩墨水加载动画；设置为 `{ progress: { percent: number } }` 时显示进度条；也可以传入自定义 React 节点作为占位符。

```tsx
import React, { useEffect, useState } from 'react';
import { Button, Flex, Image, theme } from 'antd';

const GeneratingProgress: React.FC = () => {
  const { token } = theme.useToken();
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<'idle' | 'generating' | 'complete'>('idle');
  const imageStyles = {
    root: { borderRadius: token.borderRadiusLG },
    image: { borderRadius: token.borderRadiusLG },
    cover: { borderRadius: token.borderRadiusLG },
  };

  useEffect(() => {
    if (status === 'generating' && percent < 100) {
      const timer = setTimeout(() => {
        setPercent((prev) => Math.min(prev + Math.random() * 8 + 2, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (status === 'generating' && percent >= 100) {
      const timer = setTimeout(() => {
        setStatus('complete');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [status, percent]);

  const handleStart = () => {
    setPercent(0);
    setStatus('generating');
  };

  const imageNode =
    status === 'complete' ? (
      <Image
        width={200}
        height={200}
        styles={imageStyles}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    ) : (
      <Image
        width={200}
        height={200}
        styles={imageStyles}
        placeholder={{
          progress: {
            percent: Math.round(percent),
            render: (progress, p) => (
              <>
                {progress}
                <div style={{ marginTop: 8 }}>Generating {p}%</div>
              </>
            ),
          },
        }}
      />
    );

  return (
    <Flex vertical gap={8}>
      <Button type="primary" onClick={handleStart} disabled={status === 'generating'}>
        Generate
      </Button>
      {imageNode}
    </Flex>
  );
};

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [random, setRandom] = useState<number>(() => Date.now());
  const imageStyles = {
    root: { borderRadius: token.borderRadiusLG },
    image: { borderRadius: token.borderRadiusLG },
    cover: { borderRadius: token.borderRadiusLG },
  };

  return (
    <>
      <Flex gap={16} wrap>
        <Image width={200} height={200} styles={imageStyles} placeholder={{ progress: true }} />
        <Image
          width={200}
          height={200}
          styles={imageStyles}
          placeholder={{ progress: { render: () => 'loading...' } }}
        />
        <Image
          width={200}
          height={200}
          styles={imageStyles}
          placeholder={{ progress: { percent: 50 } }}
        />
        <Image
          width={200}
          height={200}
          styles={imageStyles}
          placeholder={{
            progress: {
              percent: 75,
              render: (progress, p) => (
                <>
                  {progress}
                  <div style={{ marginTop: 8 }}>Generating {p}%</div>
                </>
              ),
            },
          }}
        />
      </Flex>
      <Flex gap={16} wrap style={{ marginTop: 16 }}>
        <Flex vertical gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setRandom(Date.now());
            }}
          >
            Reload Image
          </Button>
          <Image
            width={200}
            height={200}
            alt="basic image"
            styles={imageStyles}
            src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
            placeholder={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: token.borderRadiusLG,
                }}
              />
            }
          />
        </Flex>
        <GeneratingProgress />
      </Flex>
    </>
  );
};

export default App;
```

### 容错处理

加载失败显示图像占位符。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image
    alt="basic image"
    width={200}
    height={200}
    src="error"
    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
  />
);

export default App;
```

### 多张图片预览

点击左右切换按钮可以预览多张图片。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image.PreviewGroup
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}
  >
    <Image
      alt="svg image"
      width={200}
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={200}
      alt="svg image"
      src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    />
  </Image.PreviewGroup>
);

export default App;
```

### 相册模式

从一张图片点开相册。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image.PreviewGroup
    items={[
      'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
      'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
      'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
    ]}
  >
    <Image
      alt="webp image"
      width={200}
      src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
    />
  </Image.PreviewGroup>
);

export default App;
```

### 自定义预览图片

可以设置不同的预览图片。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image
    width={200}
    alt="basic image"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
    preview={{
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }}
  />
);

export default App;
```

### 受控的预览

可以使预览受控。

```tsx
import React, { useState } from 'react';
import { Button, Image, InputNumber } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  return (
    <>
      <div>
        scaleStep:{' '}
        <InputNumber
          min={0.1}
          max={5}
          defaultValue={0.5}
          step={0.1}
          onChange={(val) => setScaleStep(val!)}
        />
      </div>
      <br />
      <Button type="primary" onClick={() => setOpen(true)}>
        show image preview
      </Button>
      <Image
        width={200}
        style={{ display: 'none' }}
        alt="basic image"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
        preview={{
          open,
          scaleStep,
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          onOpenChange: (value) => {
            setOpen(value);
          },
        }}
      />
    </>
  );
};

export default App;
```

### 自定义工具栏

可以自定义工具栏并添加下载原图或翻转旋转后图片的按钮。

```tsx
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
```

### 自定义预览内容

可以自定义预览内容。

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image
    width={200}
    alt="basic image"
    preview={{
      imageRender: () => (
        <video
          muted
          width="100%"
          controls
          src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
        />
      ),
      actionsRender: () => null,
    }}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
);

export default App;
```

### 预览遮罩

遮罩效果。

```tsx
import React from 'react';
import { Image, Space } from 'antd';

const App: React.FC = () => {
  return (
    <Space>
      <Image
        width={100}
        alt="blur preview"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          mask: { blur: true },
          cover: (
            <Space vertical align="center">
              blur
            </Space>
          ),
        }}
      />
      <Image
        alt="Dimmed mask preview"
        width={100}
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        preview={{
          cover: (
            <Space vertical align="center">
              Dimmed mask
            </Space>
          ),
        }}
      />
      <Image
        width={100}
        alt="No mask preview"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        preview={{
          mask: false,
          cover: (
            <Space vertical align="center">
              No mask
            </Space>
          ),
        }}
      />
    </Space>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Image 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Image } from 'antd';
import type { GetProp, ImageProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 4px;
    border-radius: 8px;
    overflow: hidden;
  `,
}));

const styles: ImageProps['styles'] = {
  image: {
    borderRadius: '4px',
  },
};

const stylesFn: ImageProps['styles'] = (info): GetProp<ImageProps, 'styles', 'Return'> => {
  if (info.props.preview) {
    return {
      root: {
        border: '2px solid #A594F9',
        borderRadius: 8,
        padding: 4,
        transition: 'all 0.3s ease',
      },
      image: {
        borderRadius: 4,
        filter: 'grayscale(50%)',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: ImageProps = {
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    width: 160,
    alt: 'Example image',
    classNames,
  };

  return (
    <Flex gap="medium">
      <Image {...sharedProps} styles={styles} />
      <Image {...sharedProps} styles={stylesFn} preview={{ open: false }} />
    </Flex>
  );
};

export default App;
```



### 嵌套

嵌套在弹框当中使用

```tsx
import React, { useState } from 'react';
import { Button, Divider, Image, Modal } from 'antd';

const App: React.FC = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShow1(true);
        }}
      >
        showModal
      </Button>
      <Modal
        open={show1}
        afterOpenChange={(open) => {
          setShow1(open);
        }}
        onCancel={() => {
          setShow1(false);
        }}
        onOk={() => setShow1(false)}
      >
        <Button
          onClick={() => {
            setShow2(true);
          }}
        >
          test2
        </Button>
        <Modal
          open={show2}
          afterOpenChange={(open) => {
            setShow2(open);
          }}
          onCancel={() => {
            setShow2(false);
          }}
          onOk={() => setShow2(false)}
        >
          <Button
            onClick={() => {
              setShow3(true);
            }}
          >
            test3
          </Button>
          <Modal
            open={show3}
            afterOpenChange={(open) => {
              setShow3(open);
            }}
            onCancel={() => {
              setShow3(false);
            }}
            onOk={() => setShow3(false)}
          >
            <Image
              width={200}
              alt="svg image"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <Divider />
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image
                width={200}
                alt="svg image"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
          </Modal>
        </Modal>
      </Modal>
    </>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

### Image

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| alt | 图像描述 | string | - |  | × |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| fallback | 加载失败容错地址 | string | - |  | 5.28.0 |
| height | 图像高度 | string \| number | - |  | × |
| placeholder | 加载占位，支持 ReactNode 或配置对象 | [PlaceholderType](#placeholdertype) | - |  | × |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [PreviewType](#previewtype) | true |  | `preview.closeIcon`: 5.14.0，`preview.mask`: 6.0.0，`preview.mask.closable`: 6.4.0 |
| src | 图片地址 | string | - |  | × |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  | 6.0.0 |
| width | 图像宽度 | string \| number | - |  | × |
| onError | 加载错误回调 | (event: Event) => void | - |  | × |

其他属性见 [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PlaceholderType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| progress | 进度配置，设置为 `true` 显示渐变动画，设置 `{ percent: number }` 显示进度，`render` 自定义渲染 | boolean \| [ImageProgressConfig](#imageprogressconfig) | - |  |

### ImageProgressConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| percent | 进度值 | number | - |  |
| render | 自定义渲染，接收默认的进度 UI 和百分比 | (progress: React.ReactNode, percent: number) => React.ReactNode | - |  |

### PreviewType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actionsRender | 自定义工具栏渲染 | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| closeIcon | 自定义关闭 Icon | React.ReactNode | - |  |
| cover | 自定义预览遮罩 | React.ReactNode \| [CoverConfig](#coverconfig) | - | CoverConfig v6.0 开始支持 |
| focusTrap | 预览打开时是否在预览内捕获焦点 | boolean | true | 6.4.0 |
| ~~destroyOnClose~~ | 关闭预览时销毁子元素，已移除，不再支持 | boolean | false |  |
| ~~forceRender~~ | 强制渲染预览图，已移除，不再支持 | boolean | - |  |
| getContainer | 指定预览挂载的节点，但依旧为全屏展示，false 为挂载在当前位置 | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | 自定义预览内容 | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo) }) => React.ReactNode | - |  |
| mask | 预览遮罩效果 | boolean \| { enabled?: boolean, blur?: boolean, closable?: boolean } | true | mask.closable: 6.4.0 |
| ~~maskClassName~~ | 缩略图遮罩类名，请使用 `classNames.cover` 替换 | string | - |  |
| maxScale | 最大缩放倍数 | number | 50 |  |
| minScale | 最小缩放倍数 | number | 1 |  |
| movable | 预览图片大于视口时是否可拖拽移动 | boolean | true |  |
| open | 是否显示预览 | boolean | - |  |
| rootClassName | 预览图的根 DOM 类名，会同时作用在图片和预览层最外侧 | string | - |  |
| scaleStep | `1 + scaleStep` 为缩放放大的每步倍数 | number | 0.5 |  |
| src | 自定义预览 src | string | - |  |
| styles | 自定义语义化结构样式 | Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| ~~toolbarRender~~ | 自定义工具栏，请使用 `actionsRender` 替换 | (originalNode: React.ReactElement, info: Omit<ToolbarRenderInfoType, 'current' \| 'total'>) => React.ReactNode | - |  |
| ~~visible~~ | 是否显示，请使用 `open` 替换 | boolean | - |  |
| onOpenChange | 预览打开状态变化的回调 | (visible: boolean) => void | - |  |
| onTransform | 预览图 transform 变化的回调 | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | 当 `visible` 发生改变时的回调，请使用 `onOpenChange` 替换 | (visible: boolean, prevVisible: boolean) => void | - |  |

### PreviewGroup

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| fallback | 加载失败容错地址 | string | - |  |
| items | 预览数组 | string[] \| { src: string, crossOrigin: string, ... }[] | - |  |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [PreviewGroupType](#previewgrouptype) | true |  |

### PreviewGroupType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actionsRender | 自定义工具栏渲染 | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| closeIcon | 自定义关闭 Icon | React.ReactNode | - |  |
| countRender | 自定义预览计数内容 | (current: number, total: number) => React.ReactNode | - |  |
| focusTrap | 预览打开时是否在预览内捕获焦点 | boolean | true | 6.4.0 |
| current | 当前预览图的 index | number | - |  |
| ~~forceRender~~ | 强制渲染预览图，已移除，不再支持 | boolean | - |  |
| getContainer | 指定预览挂载的节点，但依旧为全屏展示，false 为挂载在当前位置 | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | 自定义预览内容 | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo), current: number }) => React.ReactNode | - |  |
| mask | 预览遮罩效果 | boolean \| { enabled?: boolean, blur?: boolean, closable?: boolean } | true | mask.closable: 6.4.0 |
| ~~maskClassName~~ | 缩略图遮罩类名，请使用 `classNames.cover` 替换 | string | - |  |
| minScale | 最小缩放倍数 | number | 1 |  |
| maxScale | 最大放大倍数 | number | 50 |  |
| movable | 预览图片大于视口时是否可拖拽移动 | boolean | true |  |
| open | 是否显示预览 | boolean | - |  |
| ~~rootClassName~~ | 预览图的根 DOM 类名，会同时作用在图片和预览层最外侧，请使用 `classNames.root` 替换 | string | - |  |
| styles | 自定义语义化结构样式 | Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| scaleStep | `1 + scaleStep` 为缩放放大的每步倍数 | number | 0.5 |  |
| ~~toolbarRender~~ | 自定义工具栏，请使用 `actionsRender` 替换 | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| ~~visible~~ | 是否显示，请使用 `open` 替换 | boolean | - |  |
| onOpenChange | 预览打开状态变化回调，额外携带当前预览图索引 | (visible: boolean, info: { current: number }) => void | - |  |
| onChange | 切换预览图的回调 | (current: number, prevCurrent: number) => void | - |  |
| onTransform | 预览图 transform 变化的回调 | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | 当 `visible` 发生改变时的回调，请使用 `onOpenChange` 替换 | (visible: boolean, prevVisible: boolean, current: number) => void | - |  |

## Interface

### TransformType

```typescript
{
  x: number;
  y: number;
  rotate: number;
  scale: number;
  flipX: boolean;
  flipY: boolean;
}
```

### TransformAction

```typescript
type TransformAction =
  | 'flipY'
  | 'flipX'
  | 'rotateLeft'
  | 'rotateRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'close'
  | 'prev'
  | 'next'
  | 'wheel'
  | 'doubleClick'
  | 'move'
  | 'dragRebound'
  | 'reset';
```

### ToolbarRenderInfoType

```typescript
{
  icons: {
    flipYIcon: React.ReactNode;
    flipXIcon: React.ReactNode;
    rotateLeftIcon: React.ReactNode;
    rotateRightIcon: React.ReactNode;
    zoomOutIcon: React.ReactNode;
    zoomInIcon: React.ReactNode;
  };
  actions: {
    onActive?: (index: number) => void; // 5.21.0 之后支持
    onFlipY: () => void;
    onFlipX: () => void;
    onRotateLeft: () => void;
    onRotateRight: () => void;
    onZoomOut: () => void;
    onZoomIn: () => void;
    onReset: () => void; // 5.17.3 之后支持
    onClose: () => void;
  };
  transform: TransformType,
  current: number;
  total: number;
  image: ImgInfo
}
```

### ImgInfo

```typescript
{
  url: string;
  alt: string;
  width: string | number;
  height: string | number;
}
```

### CoverConfig

```typescript
type CoverConfig = {
  coverNode?: React.ReactNode; // 自定义遮罩元素
  placement?: 'top' | 'bottom' | 'center'; // 设置预览遮罩显示的位置
};
```

## Semantic DOM

https://ant.design/components/image-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Image)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| previewOperationColor | 预览操作图标颜色 | string | rgba(255,255,255,0.65) |
| previewOperationColorDisabled | 预览操作图标禁用颜色 | string | rgba(255,255,255,0.25) |
| previewOperationHoverColor | 预览操作图标悬浮颜色 | string | rgba(255,255,255,0.85) |
| previewOperationSize | 预览操作图标大小 | number | 18 |
| progressAnimationDuration | 加载动画基础时长 | string | 3s |
| zIndexPopup | 预览浮层 z-index | number | 1080 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| colorBgBase | 用于派生背景色梯度的基础变量，v5 中我们添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量。但请不要在代码中直接使用该 Seed Token ！ | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBgMask | 浮层的背景蒙层颜色，用于遮罩浮层下面的内容，Modal、Drawer、Image 等组件的蒙层使用的是该 token | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorTextSecondary | 作为第二梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。 | string |  |
| controlHeightLG | 较高的组件高度 | number |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| marginXL | 控制元素外边距，超大尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| motionEaseOut | 预设动效曲率 | string |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |


