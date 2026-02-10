---
category: Components
title: Badge
subtitle: 徽标数
description: 图标右上角的圆形徽标数字。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e0qITYqF394AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*v8EQT7KoGbcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group: 数据展示
---

## 何时使用 {#when-to-use}

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示 {#examples}

### 基本

简单的徽章展示，当 `count` 为 `0` 时，默认不显示，但是可以使用 `showZero` 修改为显示。

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';

const App: React.FC = () => (
  <Space size="middle">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);

export default App;
```

### 独立使用

不包裹任何元素即是独立使用，可自定样式展现。

> 在右上角的 badge 则限定为红色。

```tsx
import React, { useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [show, setShow] = useState(true);

  return (
    <Space>
      <Switch checked={show} onChange={() => setShow(!show)} />
      <Badge count={show ? 11 : 0} showZero color="#faad14" />
      <Badge count={show ? 25 : 0} />
      <Badge count={show ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : 0} />
      <Badge
        className="site-badge-count-109"
        count={show ? 109 : 0}
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
  );
};

export default App;
```

### 封顶数字

超过 `overflowCount` 的会显示为 `${overflowCount}+`，默认的 `overflowCount` 为 `99`。

```tsx
import React from 'react';
import { Avatar, Badge, Space } from 'antd';

const App: React.FC = () => (
  <Space size="large">
    <Badge count={99}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={100}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);

export default App;
```

### 讨嫌的小红点

没有具体的数字。

```tsx
import React from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';

const App: React.FC = () => (
  <Space>
    <Badge dot>
      <NotificationOutlined style={{ fontSize: 16 }} />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </Space>
);

export default App;
```

### 动态

展示动态变化的效果。

```tsx
import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);

  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };

  const random = () => {
    const newCount = Math.floor(Math.random() * 100);
    setCount(newCount);
  };

  const onChange = (checked: boolean) => {
    setShow(checked);
  };

  return (
    <Space vertical>
      <Space size="large">
        <Badge count={count}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Space.Compact>
          <Button onClick={decline} icon={<MinusOutlined />} />
          <Button onClick={increase} icon={<PlusOutlined />} />
          <Button onClick={random} icon={<QuestionOutlined />} />
        </Space.Compact>
      </Space>
      <Space size="large">
        <Badge dot={show}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Switch onChange={onChange} checked={show} />
      </Space>
    </Space>
  );
};

export default App;
```

### 可点击

用 a 标签进行包裹即可。

```tsx
import React from 'react';
import { Avatar, Badge } from 'antd';

const App: React.FC = () => (
  <a href="#">
    <Badge count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </a>
);

export default App;
```

### 自定义位置偏移

设置状态点的位置偏移，格式为 `[left, top]`，表示状态点距默认位置左侧、上方的偏移量。

```tsx
import React from 'react';
import { Avatar, Badge } from 'antd';

const App: React.FC = () => (
  <Badge count={5} offset={[10, 10]}>
    <Avatar shape="square" size="large" />
  </Badge>
);

export default App;
```

### 大小

可以设置有数字徽标的大小。

```tsx
import React from 'react';
import { Avatar, Badge, Space } from 'antd';

const App: React.FC = () => (
  <Space size="middle">
    <Badge size="default" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
    <Badge size="small" count={5}>
      <Avatar shape="square" size="large" />
    </Badge>
  </Space>
);

export default App;
```

### 状态点

用于表示状态的小圆点。

```tsx
import React from 'react';
import { Badge, Space } from 'antd';

const App: React.FC = () => (
  <>
    <Space>
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
      <Badge status="warning" />
    </Space>
    <br />
    <Space vertical>
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="Warning" />
    </Space>
  </>
);

export default App;
```

### 多彩徽标

我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

```tsx
import React from 'react';
import { Badge, Divider, Space } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Presets</Divider>
    <Space vertical>
      {colors.map((color) => (
        <Badge key={color} color={color} text={color} />
      ))}
    </Space>
    <Divider titlePlacement="start">Custom</Divider>
    <Space vertical>
      <Badge color="#f50" text="#f50" />
      <Badge color="rgb(45, 183, 245)" text="rgb(45, 183, 245)" />
      <Badge color="hsl(102, 53%, 61%)" text="hsl(102, 53%, 61%)" />
      <Badge color="hwb(205 6% 9%)" text="hwb(205 6% 9%)" />
    </Space>
  </>
);

export default App;
```

### 缎带

使用缎带型的徽标。

```tsx
import React from 'react';
import { Badge, Card, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical size="middle" style={{ width: '100%' }}>
    <Badge.Ribbon text="Hippies">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="pink">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="red">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="cyan">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="green">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="purple">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="volcano">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Hippies" color="magenta">
      <Card title="Pushes open the window" size="small">
        and raises the spyglass.
      </Card>
    </Badge.Ribbon>
  </Space>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Badge 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Avatar, Badge, Card, Flex, Space } from 'antd';
import type { BadgeProps } from 'antd';
import { createStaticStyles } from 'antd-style';
import type { RibbonProps } from 'antd/es/badge/Ribbon';

const badgeClassNames = createStaticStyles(({ css }) => ({
  indicator: css`
   font-size: 10px;
  `,
}));

const ribbonClassNames = createStaticStyles(({ css }) => ({
  root: css`
    width: 400px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
  `,
}));

const badgeStyles: BadgeProps['styles'] = {
  root: {
    borderRadius: 8,
  },
};

const ribbonStyles: RibbonProps['styles'] = {
  indicator: {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

const badgeStylesFn: BadgeProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      indicator: {
        fontSize: 14,
        backgroundColor: '#696FC7',
      },
    } satisfies BadgeProps['styles'];
  }
  return {};
};

const ribbonStylesFn: RibbonProps['styles'] = (info) => {
  if (info.props.color === '#696FC7') {
    return {
      content: {
        fontWeight: 'bold',
      },
      indicator: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    } satisfies RibbonProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Space size="large" vertical>
      <Flex gap="middle">
        <Badge size="small" count={5} classNames={badgeClassNames} styles={badgeStyles}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={5} classNames={badgeClassNames} styles={badgeStylesFn}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Flex>
      <Flex vertical gap="middle">
        <Badge.Ribbon text="Custom Ribbon" classNames={ribbonClassNames} styles={ribbonStyles}>
          <Card title="Card with custom ribbon" size="small">
            This card has a customized ribbon with semantic classNames and styles.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon
          text="Custom Ribbon"
          color="#696FC7"
          classNames={ribbonClassNames}
          styles={ribbonStylesFn}
        >
          <Card title="Card with custom ribbon" size="small">
            This card has a customized ribbon with semantic classNames and styles.
          </Card>
        </Badge.Ribbon>
      </Flex>
    </Space>
  );
};

export default App;
```







## API

通用属性参考：[通用属性](/docs/react/common-props)

### Badge

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 自定义小圆点的颜色 | string | - |  |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | ReactNode | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dot | 不展示数字，只有一个小红点 | boolean | false |  |
| offset | 设置状态点的位置偏移 | \[number, number] | - |  |
| overflowCount | 展示封顶的数字值 | number | 99 |  |
| showZero | 当数值为 0 时，是否展示 Badge | boolean | false |  |
| size | 在设置了 `count` 的前提下有效，设置小圆点的大小 | `default` \| `small` | - | - |
| status | 设置 Badge 为状态点 | `success` \| `processing` \| `default` \| `error` \| `warning` | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | ReactNode | - |  |
| title | 设置鼠标放在状态点上时显示的文字 | string | - |  |

### Badge.Ribbon

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| color | 自定义缎带的颜色 | string | - |  |
| placement | 缎带的位置，`start` 和 `end` 随文字方向（RTL 或 LTR）变动 | `start` \| `end` | `end` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| text | 缎带中填入的内容 | ReactNode | - |  |

## Semantic DOM

### Badge

https://ant.design/components/badge-cn/semantic.md

### Badge.Ribbon

https://ant.design/components/badge-cn/semantic_ribbon.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Badge)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dotSize | 点状徽标尺寸 | number | 6 |
| indicatorHeight | 徽标高度 | string \| number | 20 |
| indicatorHeightSM | 小号徽标高度 | string \| number | 14 |
| indicatorZIndex | 徽标 z-index | string \| number | auto |
| statusSize | 状态徽标尺寸 | number | 6 |
| textFontSize | 徽标文本尺寸 | number | 12 |
| textFontSizeSM | 小号徽标文本尺寸 | number | 12 |
| textFontWeight | 徽标文本粗细 | string \| number | normal |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorBorderBg | 控制元素背景边框的颜色。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorHover | 错误色的深色悬浮态 | string |  |
| colorInfo | 用于表示操作信息的 Token 序列，如 Alert 、Tag、 Progress 等组件都有用到该组梯度变量。 | string |  |
| colorSuccess | 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorTextPlaceholder | 控制占位文本的颜色。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseOutBack | 预设动效曲率 | string |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


