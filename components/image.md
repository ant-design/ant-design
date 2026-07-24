---
category: Components
group: Data Display
title: Image
description: Preview-able image.
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

## Examples

### Basic Usage

Click the image to zoom in.

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

### Progressive Loading

Set placeholder via `placeholder` prop. When `placeholder` is `{ progress: true }`, it shows a watercolor ink loading animation; when set to `{ progress: { percent: number } }`, it shows a progress bar; you can also pass a custom React node as placeholder.

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

### Fault tolerant

Load failed to display image placeholder.

```tsx
import React from 'react';
import { Image } from 'antd';

const App: React.FC = () => (
  <Image
    alt="basic image"
    width={200}
    height={200}
    src="error"
    fallback="data:image/png;base64,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"
  />
);

export default App;
```

### Multiple image preview

Click the left and right switch buttons to preview multiple images.

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

### Preview from one image

Preview a collection from one image.

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

### Custom preview image

You can set different preview image.

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

### Controlled Preview

You can make preview controlled.

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

### Custom toolbar render

You can customize the toolbar and add a button for downloading the original image or downloading the flipped and rotated image.

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

### Custom preview render

You can customize the preview content.

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

### preview mask

mask effect.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Image by passing objects/functions through `classNames` and `styles`.

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



### nested

Nested in the modal

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

Common props ref：[Common props](/docs/react/common-props)

### Image

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| alt | Image description | string | - |  | × |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| fallback | Fallback URL when load fails | string | - |  | 5.28.0 |
| height | Image height | string \| number | - |  | × |
| placeholder | Loading placeholder, supports ReactNode or config object | [PlaceholderType](#placeholdertype) | - |  | × |
| preview | Preview configuration; set to false to disable | boolean \| [PreviewType](#previewtype) | true |  | `preview.closeIcon`: 5.14.0, `preview.mask`: 6.0.0, `preview.mask.closable`: 6.4.0 |
| src | Image URL | string | - |  | × |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  | 6.0.0 |
| width | Image width | string \| number | - |  | × |
| onError | Callback when loading error occurs | (event: Event) => void | - |  | × |

Other Property ref [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PlaceholderType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| progress | Progress config, set to `true` to show gradient animation, set `{ percent: number }` to show progress, `render` for custom rendering | boolean \| [ImageProgressConfig](#imageprogressconfig) | - |  |

### ImageProgressConfig

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| percent | Progress value | number | - |  |
| render | Custom rendering, receives default progress UI and percentage | (progress: React.ReactNode, percent: number) => React.ReactNode | - |  |

### PreviewType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actionsRender | Custom toolbar render | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| closeIcon | Custom close icon | React.ReactNode | - |  |
| cover | Custom preview mask | React.ReactNode \| [CoverConfig](#coverconfig) | - | CoverConfig support after v6.0 |
| focusTrap | Whether to trap focus within the preview when open | boolean | true | 6.4.0 |
| ~~destroyOnClose~~ | Destroy child elements on preview close (removed, no longer supported) | boolean | false |  |
| ~~forceRender~~ | Force render preview image (removed, no longer supported) | boolean | - |  |
| getContainer | Specify container for preview mounting; still full screen; false mounts at current location | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | Custom preview content | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo) }) => React.ReactNode | - |  |
| mask | preview mask effect | boolean \| { enabled?: boolean, blur?: boolean, closable?: boolean } | true | mask.closable: 6.4.0 |
| ~~maskClassName~~ | Thumbnail mask class name; please use 'classNames.cover' instead | string | - |  |
| maxScale | Maximum zoom scale | number | 50 |  |
| minScale | Minimum zoom scale | number | 1 |  |
| movable | Whether the preview image can be dragged when it is larger than the viewport | boolean | true |  |
| open | Whether to display preview | boolean | - |  |
| rootClassName | Root DOM class name for preview; applies to both image and preview wrapper | string | - |  |
| scaleStep | Each step's zoom multiplier is 1 + scaleStep | number | 0.5 |  |
| src | Custom preview src | string | - |  |
| styles | Custom semantic structure styles | Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| ~~toolbarRender~~ | Custom toolbar; please use 'actionsRender' instead | (originalNode: React.ReactElement, info: Omit<ToolbarRenderInfoType, 'current' \| 'total'>) => React.ReactNode | - |  |
| ~~visible~~ | Whether to show; please use 'open' instead | boolean | - |  |
| onOpenChange | Callback when preview open state changes | (visible: boolean) => void | - |  |
| onTransform | Callback for preview transform changes | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | Callback when 'visible' changes; please use 'onOpenChange' instead | (visible: boolean, prevVisible: boolean) => void | - |  |

### PreviewGroup

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| fallback | Fallback URL for load error | string | - |  |
| items | Array of preview items | string[] \| { src: string, crossOrigin: string, ... }[] | - |  |
| preview | Preview configuration; disable by setting to false | boolean \| [PreviewGroupType](#previewgrouptype) | true |  |

### PreviewGroupType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actionsRender | Custom toolbar render | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| closeIcon | Custom close icon | React.ReactNode | - |  |
| countRender | Custom preview count render | (current: number, total: number) => React.ReactNode | - |  |
| focusTrap | Whether to trap focus within the preview when open | boolean | true | 6.4.0 |
| current | Index of the current preview image | number | - |  |
| ~~forceRender~~ | Force render preview image (removed, no longer supported) | boolean | - |  |
| getContainer | Specify container for preview mounting; still full screen; false mounts at current location | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | Custom preview content | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo), current: number }) => React.ReactNode | - |  |
| mask | preview mask effect | boolean \| { enabled?: boolean, blur?: boolean, closable?: boolean } | true | mask.closable: 6.4.0 |
| ~~maskClassName~~ | Thumbnail mask class name; please use 'classNames.cover' instead | string | - |  |
| minScale | Minimum zoom scale | number | 1 |  |
| maxScale | Maximum zoom scale | number | 50 |  |
| movable | Whether the preview image can be dragged when it is larger than the viewport | boolean | true |  |
| open | Whether to display preview | boolean | - |  |
| ~~rootClassName~~ | Root DOM class name for preview; applies to both image and preview wrapper. Use 'classNames.root' instead | string | - |  |
| styles | Custom semantic structure styles | Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| scaleStep | Each step's zoom multiplier is 1 + scaleStep | number | 0.5 |  |
| ~~toolbarRender~~ | Custom toolbar; please use 'actionsRender' instead | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| ~~visible~~ | Whether to show; please use 'open' instead | boolean | - |  |
| onOpenChange | Callback when preview open state changes, includes current preview index | (visible: boolean, info: { current: number }) => void | - |  |
| onChange | Callback when changing preview image | (current: number, prevCurrent: number) => void | - |  |
| onTransform | Callback for preview transform changes | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | Callback when 'visible' changes; please use 'onOpenChange' instead | (visible: boolean, prevVisible: boolean, current: number) => void | - |  |

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
    onActive?: (index: number) => void; // support after 5.21.0
    onFlipY: () => void;
    onFlipX: () => void;
    onRotateLeft: () => void;
    onRotateRight: () => void;
    onZoomOut: () => void;
    onZoomIn: () => void;
    onReset: () => void; // support after 5.17.3
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
  coverNode?: React.ReactNode; // The custom node of preview mask
  placement?: 'top' | 'bottom' | 'center'; // Set the position of the preview mask display.
};
```

## Semantic DOM

https://ant.design/components/image/semantic.md

## Design Token



## Component Token (Image)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| previewOperationColor | Color of preview operation icon | string | rgba(255,255,255,0.65) |
| previewOperationColorDisabled | Disabled color of preview operation icon | string | rgba(255,255,255,0.25) |
| previewOperationHoverColor | Color of hovered preview operation icon | string | rgba(255,255,255,0.85) |
| previewOperationSize | Size of preview operation icon | number | 18 |
| progressAnimationDuration | Base duration of loading animation | string | 3s |
| zIndexPopup | z-index of preview popup | number | 1080 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| colorBgBase | Used to derive the base variable of the background color gradient. In v5, we added a layer of background color derivation algorithm to produce map token of background color. But PLEASE DO NOT USE this Seed Token directly in the code! | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgMask | The background color of the mask, used to cover the content below the mask, Modal, Drawer, Image and other components use this token | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextSecondary | The second level of text color is generally used in scenarios where text color is not emphasized, such as label text, menu text selection state, etc. | string |  |
| controlHeightLG | LG component height | number |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXL | Control the margin of an element, with an extra-large size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| motionEaseOut | Preset motion curve. | string |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |


