---
category: Components
group: 数据展示
title: Tour
subtitle: 漫游式引导
description: 用于分步引导用户了解产品功能的气泡组件。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NMvqRZpuJfQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*D70qQJJmzhgAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

常用于引导用户了解产品功能。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          draggable={false}
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Divider />
      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default App;
```

### 非模态

使用 `mask={false}` 可以将引导变为非模态，同时为了强调引导本身，建议与 `type="primary"` 组合使用。

```tsx
import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          draggable={false}
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin non-modal Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>

      <Tour open={open} onClose={() => setOpen(false)} mask={false} type="primary" steps={steps} />
    </>
  );
};

export default App;
```

### 位置

改变引导相对于目标的位置，共有 12 种位置可供选择。当 `target={null}` 时引导将会展示在正中央。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Center',
      description: 'Displayed in the center of screen.',
      target: null,
    },
    {
      title: 'Right',
      description: 'On the right of target.',
      placement: 'right',
      target: () => ref.current,
    },
    {
      title: 'Top',
      description: 'On the top of target.',
      placement: 'top',
      target: () => ref.current,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} ref={ref}>
        Begin Tour
      </Button>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default App;
```

### 自定义遮罩样式

自定义遮罩样式。

```tsx
import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          draggable={false}
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
      mask: {
        style: {
          boxShadow: 'inset 0 0 15px #fff',
        },
        color: 'rgba(40, 0, 255, .4)',
      },
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
      mask: false,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>

      <Divider />

      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        mask={{
          style: {
            boxShadow: 'inset 0 0 15px #333',
          },
          color: 'rgba(80, 255, 255, .4)',
        }}
      />
    </>
  );
};

export default App;
```

### 自定义指示器

自定义指示器。

```tsx
import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type { GetRef, TourProps } from 'antd';
import { Button, Divider, Space, Tour } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef<GetRef<typeof Button>>(null);
  const ref2 = useRef<GetRef<typeof Button>>(null);
  const ref3 = useRef<GetRef<typeof Button>>(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current!,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current!,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current!,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Divider />
      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
};

export default App;
```

### 自定义操作按钮

自定义操作按钮。

```tsx
import React, { useRef, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type { GetRef, TourProps } from 'antd';
import { Button, Divider, Space, Tour } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef<GetRef<typeof Button>>(null);
  const ref2 = useRef<GetRef<typeof Button>>(null);
  const ref3 = useRef<GetRef<typeof Button>>(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current!,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current!,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current!,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Divider />
      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3} icon={<EllipsisOutlined />} />
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        actionsRender={(originNode, { current, total }) => (
          <>
            {current !== total - 1 && (
              <Button
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Skip
              </Button>
            )}
            {originNode}
          </>
        )}
      />
    </>
  );
};

export default App;
```

### 自定义高亮区域的样式

使用 `gap` 参数来控制高亮区域的边距和圆角。

- `5.9.0` 之前不支持单独设置两个方向上的边距和数组类型的 `offset` 参数。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Col, Row, Slider, Space, Tour, Typography } from 'antd';
import type { TourProps } from 'antd';

const { Text } = Typography;

const App: React.FC = () => {
  const tourNodeRef = useRef(null);
  const [radius, setRadius] = useState(8);
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [offset, setOffset] = useState(2);
  const [open, setOpen] = useState(false);
  const [offsetDirection, setOffsetDirection] = useState<'both' | 'individual'>('individual');

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          draggable={false}
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => tourNodeRef.current,
    },
  ];

  const offsetGap =
    offsetDirection === 'both'
      ? { offset }
      : {
          offset: [offsetX, offsetY] as [number, number],
        };
  return (
    <div ref={tourNodeRef}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Space style={{ display: 'flex', marginTop: 12 }} vertical>
        <Row>
          <Col span={6}>
            <Text>Radius:</Text>
          </Col>
          <Col span={12}>
            <Slider value={radius} onChange={(val) => val && setRadius(val)} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text> offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offset}
              max={50}
              onChange={(val) => val && setOffset(val)}
              onFocus={() => setOffsetDirection('both')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Horizontal offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offsetX}
              max={50}
              onChange={(val) => val && setOffsetX(val)}
              onFocus={() => setOffsetDirection('individual')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Text>Vertical offset:</Text>
          </Col>
          <Col span={12}>
            <Slider
              value={offsetY}
              max={50}
              onChange={(val) => val && setOffsetY(val)}
              onFocus={() => setOffsetDirection('individual')}
            />
          </Col>
        </Row>
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        gap={{ ...offsetGap, radius }}
      />
    </div>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Tour 的[语义化结构](#semantic-dom)样式。

```tsx
import React, { useRef, useState } from 'react';
import { Button, Divider, Flex, Space, Tour } from 'antd';
import type { TourProps, TourStepProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const btnProps: {
  nextButtonProps: TourStepProps['nextButtonProps'];
  prevButtonProps: TourStepProps['prevButtonProps'];
} = {
  nextButtonProps: {
    style: {
      border: '1px solid #CDC1FF',
      color: '#CDC1FF',
    },
  },
  prevButtonProps: {
    style: {
      backgroundColor: '#CDC1FF',
      color: '#fff',
    },
  },
};

const classNames = createStaticStyles(({ css }) => ({
  root: css`border-radius: 4px;`,
  section: css`border-radius: 8px;`,
}));

const stylesObject: TourProps['styles'] = {
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  section: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '2px solid #4096ff',
  },
  cover: {
    borderRadius: '12px 12px 0 0',
  },
};

const stylesFunction: TourProps['styles'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
      section: {
        backgroundColor: 'rgb(205,193,255, 0.8)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      cover: {
        borderRadius: '12px 12px 0 0',
      },
    } satisfies TourProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const ref1 = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ref3 = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [openFn, setOpenFn] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current || document.body,
      prevButtonProps: {},
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current || document.body,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current || document.body,
    },
  ];

  const sharedProps: TourProps = {
    steps,
    classNames,
    arrow: false,
  };

  return (
    <Flex vertical gap="middle">
      <Flex gap="middle">
        <Button type="primary" onClick={() => setOpen(true)}>
          Begin Tour Object
        </Button>
        <Button type="primary" onClick={() => setOpenFn(true)}>
          Begin Tour Function
        </Button>
      </Flex>
      <Divider />
      <Tour {...sharedProps} open={open} onClose={() => setOpen(false)} styles={stylesObject} />
      <Tour
        {...sharedProps}
        steps={steps.map((s) => ({ ...s, ...btnProps }))}
        type="primary"
        open={openFn}
        onClose={() => setOpenFn(false)}
        styles={stylesFunction}
      />
      <Space>
        <Button ref={ref1} type="primary">
          Upload
        </Button>
        <Button ref={ref2}>Save</Button>
        <Button ref={ref3} type="dashed">
          Other Actions
        </Button>
      </Space>
    </Flex>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

### Tour

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | `boolean` \| `{ pointAtCenter: boolean}` | `true` |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closeIcon | 自定义关闭按钮 | `React.ReactNode` | `true` | 5.9.0 |
| disabledInteraction | 禁用高亮区域交互 | `boolean` | `false` | 5.13.0 |
| gap | 控制高亮区域的圆角边框和显示间距 | `{ offset?: number \| [number, number]; radius?: number }` | `{ offset?: 6 ; radius?: 2 }` | 5.0.0 (数组类型的 `offset`: 5.9.0 ) |
| keyboard | 是否启用键盘快捷行为 | boolean | true | 6.2.0 |
| placement | 引导卡片相对于目标元素的位置 | `center` `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | 关闭引导时的回调函数 | `Function` | - |  |
| onFinish | 引导完成时的回调 | `Function` | - |  |
| mask | 是否启用蒙层，也可传入配置改变蒙层样式和填充色 | `boolean \| { style?: React.CSSProperties; color?: string; }` | `true` |  |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | `default` |  |
| open | 打开引导 | `boolean` | - |  |
| onChange | 步骤改变时的回调，current 为当前的步骤 | `(current: number) => void` | - |  |
| current | 当前处于哪一步 | `number` | - |  |
| scrollIntoViewOptions | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数 | `boolean \| ScrollIntoViewOptions` | `true` | 5.2.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| indicatorsRender | 自定义指示器 | `(current: number, total: number) => ReactNode` | - | 5.2.0 |
| actionsRender | 自定义操作按钮 | `(originNode: ReactNode, info: { current: number, total: number }) => ReactNode` | - | 5.25.0 |
| zIndex | Tour 的层级 | number | 1001 | 5.3.0 |
| getPopupContainer | 设置 Tour 浮层的渲染节点，默认是 body | `(node: HTMLElement) => HTMLElement` | body | 5.12.0 |

### TourStep 引导步骤卡片

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| target | 获取引导卡片指向的元素，为空时居中于屏幕 | `() => HTMLElement` \| `HTMLElement` | - |  |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | `boolean` \| `{ pointAtCenter: boolean}` | `true` |  |
| closeIcon | 自定义关闭按钮 | `React.ReactNode` | `true` | 5.9.0 |
| cover | 展示的图片或者视频 | `ReactNode` | - |  |
| title | 标题 | `ReactNode` | - |  |
| description | 主要描述部分 | `ReactNode` | - |  |
| placement | 引导卡片相对于目标元素的位置 | `center` `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | 关闭引导时的回调函数 | `Function` | - |  |
| mask | 是否启用蒙层，也可传入配置改变蒙层样式和填充色，默认跟随 Tour 的 `mask` 属性 | `boolean \| { style?: React.CSSProperties; color?: string; }` | `true` |  |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | `default` |  |
| nextButtonProps | 下一步按钮的属性 | `{ children: ReactNode; onClick: Function }` | - |  |
| prevButtonProps | 上一步按钮的属性 | `{ children: ReactNode; onClick: Function }` | - |  |
| scrollIntoViewOptions | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认跟随 Tour 的 `scrollIntoViewOptions` 属性 | `boolean \| ScrollIntoViewOptions` | `true` | 5.2.0 |

## Semantic DOM

https://ant.design/components/tour-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Tour)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closeBtnSize | 关闭按钮尺寸 | number | 22 |
| primaryNextBtnHoverBg | Primary 模式下一步按钮悬浮背景色 | string | rgb(240,240,240) |
| primaryPrevBtnBg | Primary 模式上一步按钮背景色 | string | rgba(255,255,255,0.15) |
| zIndexPopup | 弹层 z-index | number | 1070 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowTertiary | 控制元素三级盒子阴影样式。 | string |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorBgTextActive | 控制文本在激活状态下的背景色。 | string |  |
| colorBgTextHover | 控制文本在悬停状态下的背景色。 | string |  |
| colorFill | 最深的填充色，用于拉开与二、三级填充色的区分度，目前只用在 Slider 的 hover 效果。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorIconHover | 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorWhite | 不随主题变化的纯白色 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| sizePopupArrow | 组件箭头的尺寸 | number |  |


