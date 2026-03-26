---
category: Components
group: 通用
title: FloatButton
subtitle: 悬浮按钮
description: 悬浮于页面上方的按钮。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tXAoQqyr-ioAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hSAwR7cnabwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 用于网站上的全局功能；
- 无论浏览到何处都可以看见的按钮。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => <FloatButton onClick={() => console.log('onClick')} />;

export default App;
```

### 类型

通过 `type` 改变悬浮按钮的类型。

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />
    <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ insetInlineEnd: 94 }} />
  </>
);

export default App;
```

### 形状

通过 `shape` 设置不同的形状。

```tsx
import React from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      shape="circle"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    />
    <FloatButton
      shape="square"
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<CustomerServiceOutlined />}
    />
  </>
);

export default App;
```

### 描述

可以通过 `content` 设置文字内容。

> 仅当 `shape` 属性为 `square` 时支持。由于空间较小，推荐使用比较精简的双数文字。

```tsx
import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP INFO"
      shape="square"
      style={{ insetInlineEnd: 24 }}
    />
    <FloatButton content="HELP INFO" shape="square" style={{ insetInlineEnd: 94 }} />
    <FloatButton
      icon={<FileTextOutlined />}
      content="HELP"
      shape="square"
      style={{ insetInlineEnd: 164 }}
    />
  </>
);

export default App;
```

### 含有气泡卡片的悬浮按钮

设置 tooltip 属性，即可开启气泡卡片。

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton
      style={{ insetBlockEnd: 108 }}
      tooltip={{
        // tooltipProps is supported starting from version 5.25.0.
        title: 'Since 5.25.0+',
        color: 'blue',
        placement: 'top',
      }}
    />
    <FloatButton tooltip={<div>Documents</div>} />
  </>
);

export default App;
```

### 浮动按钮组

按钮组合使用时，推荐使用 `<FloatButton.Group />`，并通过设置 `shape` 属性改变悬浮按钮组的形状。悬浮按钮组的 `shape` 会覆盖内部 FloatButton 的 `shape` 属性。

```tsx
import React from 'react';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
    <FloatButton.Group shape="square" style={{ insetInlineEnd: 94 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton />
      <FloatButton icon={<SyncOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
```

### 菜单模式

设置 `trigger` 属性即可开启菜单模式。提供 `hover` 和 `click` 两种触发方式。

```tsx
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ insetInlineEnd: 24 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  </>
);

export default App;
```

### 受控模式

通过 `open` 设置组件为受控模式，需要配合 `trigger` 一起使用。

```tsx
import React, { useState } from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, Switch } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      <Switch onChange={setOpen} checked={open} style={{ margin: 16 }} />
      <FloatButton.Group
        open={open}
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        open={open}
        shape="square"
        trigger="click"
        style={{ insetInlineEnd: 88 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default App;
```

### 弹出方向

自定义弹出位置，提供了四个预设值：`top`、`right`、`bottom`、`left`，默认值为 `top`。

```tsx
import React from 'react';
import {
  CommentOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';

const BOX_SIZE = 100;
const BUTTON_SIZE = 40;

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

const boxStyle: React.CSSProperties = {
  width: BOX_SIZE,
  height: BOX_SIZE,
  position: 'relative',
};

const insetInlineEnd: React.CSSProperties['insetInlineEnd'][] = [
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -(BUTTON_SIZE / 2),
  (BOX_SIZE - BUTTON_SIZE) / 2,
  BOX_SIZE - BUTTON_SIZE / 2,
];

const bottom: React.CSSProperties['bottom'][] = [
  BOX_SIZE - BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
];

const icons = [
  <UpOutlined key="up" />,
  <RightOutlined key="right" />,
  <DownOutlined key="down" />,
  <LeftOutlined key="left" />,
];

const App: React.FC = () => (
  <Flex justify="space-evenly" align="center" style={wrapperStyle}>
    <div style={boxStyle}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          insetInlineEnd: insetInlineEnd[i],
          bottom: bottom[i],
        };
        return (
          <FloatButton.Group
            key={placement}
            trigger="click"
            placement={placement}
            style={style}
            icon={icons[i]}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
        );
      })}
    </div>
  </Flex>
);

export default App;
```

### 回到顶部

返回页面顶部的操作按钮。

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <div style={{ height: '300vh', padding: 10 }}>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <div>Scroll to bottom</div>
    <FloatButton.BackTop />
  </div>
);

export default App;
```

### 徽标数

右上角附带圆形徽标数字的悬浮按钮。

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton shape="circle" style={{ insetInlineEnd: 24 + 70 + 70 }} badge={{ dot: true }} />
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        href="https://ant.design/index-cn"
        tooltip={<div>custom badge color</div>}
        badge={{ count: 5, color: 'blue' }}
      />
      <FloatButton badge={{ count: 5 }} />
    </FloatButton.Group>
    <FloatButton.Group shape="circle">
      <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 123, overflowCount: 999 }} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default App;
```


### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 FloatButton 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import type { FloatButtonProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: `${token.paddingXS}px ${token.padding}px`,
    height: 'auto',
  },
  content: {
    color: token.colorText,
  },
}));

const stylesObject: FloatButtonProps['styles'] = {
  root: {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  },
};

const stylesFn: FloatButtonProps['styles'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: {
        backgroundColor: '#171717',
      },
      content: {
        color: '#fff',
      },
    } satisfies FloatButtonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 + 70 }}>
      <FloatButton
        type="primary"
        classNames={classNames}
        href="https://ant.design/index-cn"
        styles={stylesFn}
        tooltip={<div>custom style class</div>}
      />
      <FloatButton
        type="default"
        classNames={classNames}
        styles={stylesObject}
        icon={<QuestionCircleOutlined />}
      />
    </FloatButton.Group>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

> 自 `antd@5.0.0` 版本开始提供该组件。

### 共同的 API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| icon | 自定义图标 | ReactNode | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| content | 文字及其它内容 | ReactNode | - |  |
| ~~description~~ | 请使用 `content` 代替 | ReactNode | - |  |
| tooltip | 气泡卡片的内容 | ReactNode \| [TooltipProps](/components/tooltip-cn#api) | - | TooltipProps: 5.25.0 |
| type | 设置按钮类型 | `default` \| `primary` | `default` |  |
| shape | 设置按钮形状 | `circle` \| `square` | `circle` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onClick | 点击按钮时的回调 | (event) => void | - |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| target | 相当于 a 标签的 target 属性，href 存在时生效 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` | 5.21.0 |
| badge | 带徽标数字的悬浮按钮（不支持 `status` 以及相关属性） | [BadgeProps](/components/badge-cn#api) | - | 5.4.0 |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| shape | 设置包含的 FloatButton 按钮形状 | `circle` \| `square` | `circle` |  |
| trigger | 触发方式（有触发方式为菜单模式） | `click` \| `hover` | - |  |
| open | 受控展开，需配合 trigger 一起使用 | boolean | - |  |
| closeIcon | 自定义关闭按钮 | React.ReactNode | `<CloseOutlined />` |  |
| placement | 自定义菜单弹出位置 | `top` \| `left` \| `right` \| `bottom` | `top` | 5.21.0 |
| onOpenChange | 展开收起时的回调，需配合 trigger 一起使用 | (open: boolean) => void | - |  |
| onClick | 点击按钮时的回调（仅在菜单模式中有效） | (event) => void | - | 5.3.0 |

### FloatButton.BackTop

| 参数             | 说明                               | 类型              | 默认值       | 版本 |
| ---------------- | ---------------------------------- | ----------------- | ------------ | ---- |
| duration         | 回到顶部所需时间（ms）             | number            | 450          |      |
| target           | 设置需要监听其滚动事件的元素       | () => HTMLElement | () => window |      |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number            | 400          |      |
| onClick          | 点击按钮的回调函数                 | () => void        | -            |      |

## Semantic DOM

### FloatButton

https://ant.design/components/float-button-cn/semantic.md

### FloatButton.Group

https://ant.design/components/float-button-cn/semantic_group.md

## 主题变量（Design Token）{#design-token}



## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| marginLG | 控制元素外边距，大尺寸。 | number |  |
| marginXXL | 控制元素外边距，最大尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |
| zIndexPopupBase | 浮层类组件的基础 Z 轴值，用于一些悬浮类的组件的可以基于该值 Z 轴控制层级，例如 FloatButton、 Affix、Modal 等 | number |  |


