---
category: Components
title: Divider
subtitle: 分割线
description: 区隔内容的分割线。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7sMiTbzvaDoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KPSEQ74PLg4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示 {#examples}

### 水平分割线

默认为水平分割线，可在中间加入文字。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider dashed />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);

export default App;
```

### 带文字的分割线

分割线中带有文字，可以用 `titlePlacement` 指定文字位置。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="start">Left Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="end">Right Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="start" styles={{ content: { margin: 0 } }}>
      Left Text margin with 0
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="end" styles={{ content: { margin: '0 50px' } }}>
      Right Text margin with 50px
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);

export default App;
```

### 设置分割线的间距大小

间距的大小。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider size="small" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider size="middle" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider size="large" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);

export default App;
```

### 分割文字使用正文样式

使用 `plain` 可以设置为更轻量的分割文字样式。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider plain>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="start" plain>
      Left Text
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="end" plain>
      Right Text
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);

export default App;
```

### 垂直分割线

使用 `orientation="vertical"` 或者 `vertical` 设置为行内的垂直分割线。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    Text
    <Divider orientation="vertical" />
    <a href="#">Link</a>
    <Divider vertical />
    <a href="#">Link</a>
  </>
);

export default App;
```



### 变体

分隔线默认为 `solid`（实线）变体。您可以将其更改为 `dashed`（虚线）或 `dotted`（点线）。

```tsx
import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider style={{ borderColor: '#7cb305' }}>Solid</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider variant="dotted" style={{ borderColor: '#7cb305' }}>
      Dotted
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider variant="dashed" style={{ borderColor: '#7cb305' }} dashed>
      Dashed
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义分割线的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Divider } from 'antd';
import type { DividerProps } from 'antd';

const classNamesObject: DividerProps['classNames'] = {
  root: 'demo-divider-root',
  content: 'demo-divider-content',
  rail: 'demo-divider-rail',
};

const classNamesFn: DividerProps['classNames'] = (info) => {
  if (info.props.titlePlacement === 'start') {
    return {
      root: 'demo-divider-root--start',
    } satisfies DividerProps['classNames'];
  }
  return {
    root: 'demo-divider-root--default',
  } satisfies DividerProps['classNames'];
};

const stylesObject: DividerProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  content: { fontStyle: 'italic' },
  rail: { opacity: 0.85 },
};

const stylesFn: DividerProps['styles'] = (info) => {
  if (info.props.size === 'small') {
    return {
      root: { opacity: 0.6, cursor: 'default' },
    } satisfies DividerProps['styles'];
  }
  return {
    root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' },
  } satisfies DividerProps['styles'];
};

const App: React.FC = () => (
  <div>
    <Divider classNames={classNamesObject}>classNames Object</Divider>
    <Divider titlePlacement="start" classNames={classNamesFn}>
      classNames Function
    </Divider>
    <Divider styles={stylesObject}>styles Object</Divider>
    <Divider size="small" styles={stylesFn}>
      styles Function
    </Divider>
  </div>
);

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 嵌套的标题 | ReactNode | - |  |
| className | 分割线样式类 | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dashed | 是否虚线 | boolean | false |  |
| orientation | 水平或垂直类型 | `horizontal` \| `vertical` | `horizontal` | - |
| ~~orientationMargin~~ | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 `titlePlacement` 不能为 `center`。如果传入 `string` 类型的数字且不带单位，默认单位是 px | string \| number | - |  |
| plain | 文字是否显示为普通正文样式 | boolean | false | 4.2.0 |
| style | 分割线样式对象 | CSSProperties | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| size | 间距大小，仅对水平布局有效 | `small` \| `middle` \| `large` | - | 5.25.0 |
| titlePlacement | 分割线标题的位置 | `start` \| `end` \| `center` | `center` | - |
| ~~type~~ | 水平还是垂直类型 | `horizontal` \| `vertical` | `horizontal` | - |
| variant | 分割线是虚线、点线还是实线 | `dashed` \| `dotted` \| `solid` | solid | 5.20.0 |
| vertical | 是否垂直，和 orientation 同时配置以 orientation 优先 | boolean | false | - |

## Semantic DOM

https://ant.design/components/divider-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Divider)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientationMargin | 文本与边缘距离，取值 0 ～ 1 | number | 0.05 |
| textPaddingInline | 文本横向内间距 | PaddingInline<string \| number> \| undefined | 1em |
| verticalMarginInline | 纵向分割线的横向外间距 | MarginInline<string \| number> \| undefined | 8 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginLG | 控制元素外边距，大尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |


