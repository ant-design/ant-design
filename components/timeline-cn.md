---
category: Components
group: 数据展示
title: Timeline
subtitle: 时间轴
description: 垂直展示的时间流信息。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FkTySqNt3sYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yIl9S4hAIBcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示 {#examples}

### 基本用法

基本的时间轴。

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### 变体样式

通过 `variant` 设置时间轴的样式。

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    variant="filled"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### 等待及排序

节点支持 `loading` 属性表示加载，`reverse` 属性用于控制节点排序。

```tsx
import React, { useState } from 'react';
import { Button, Flex, Timeline } from 'antd';

const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      <Timeline
        reverse={reverse}
        items={[
          {
            content: 'Create a services site 2015-09-01',
          },
          {
            content: 'Solve initial network problems 2015-09-01',
          },
          {
            content: 'Technical testing 2015-09-01',
          },
          {
            loading: true,
            content: 'Recording...',
          },
        ]}
      />
      <Button type="primary" onClick={handleClick}>
        Toggle Reverse
      </Button>
    </Flex>
  );
};

export default App;
```


### 交替展现

内容在时间轴两侧轮流出现。

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    mode="alternate"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        color: 'green',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      },
      {
        color: 'red',
        content: 'Network problems being solved 2015-09-01',
      },
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: 'Technical testing 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### 水平布局

水平方向的时间线。

```tsx
import React from 'react';
import { Divider, Flex, Timeline } from 'antd';
import type { TimelineProps } from 'antd';

const sharedProps: TimelineProps = {
  orientation: 'horizontal',
  items: [
    {
      content: 'Init',
    },
    {
      content: 'Start',
    },
    {
      content: 'Pending',
    },
    {
      content: 'Complete',
    },
  ],
};

const App: React.FC = () => (
  <Flex vertical>
    <Timeline {...sharedProps} mode="start" />
    <Divider />
    <Timeline {...sharedProps} mode="end" />
    <Divider />
    <Timeline {...sharedProps} mode="alternate" />
  </Flex>
);

export default App;
```


### 自定义时间轴点

可以设置为图标或其他自定义元素。

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { theme, Timeline } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Timeline
      items={[
        {
          content: 'Create a services site 2015-09-01',
        },
        {
          content: 'Solve initial network problems 2015-09-01',
        },
        {
          icon: (
            <ClockCircleOutlined
              style={{
                fontSize: 20,
                // Only need to set when `fontSize` is customized
                background: token.colorBgContainer,
              }}
            />
          ),
          color: 'red',
          content: 'Technical testing 2015-09-01',
        },
        {
          content: 'Network problems being solved 2015-09-01',
        },
      ]}
    />
  );
};

export default App;
```

### 另一侧时间轴点

时间轴点可以在另一侧。

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    mode="end"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        icon: <ClockCircleOutlined />,
        color: 'red',
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### 标题

使用 `title` 标签单独展示时间。

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Timeline } from 'antd';

const App: React.FC = () => {
  const [mode, setMode] = useState<'start' | 'alternate' | 'end'>('start');

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="start">Start</Radio>
        <Radio value="end">End</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline
        mode={mode}
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
          {
            content: 'Technical testing',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Network problems being solved',
          },
        ]}
      />
    </>
  );
};

export default App;
```

### 标题占比

使用 `titleSpan` 设置标题占比空间。

```tsx
import React from 'react';
import { Flex, Timeline, Typography } from 'antd';
import type { TimelineProps } from 'antd';

const items: TimelineProps['items'] = [
  { title: '05:10', content: 'Create a services' },
  { title: '09:03', content: 'Solve initial network problems' },
  { content: 'Technical testing' },
  { title: '11:28', content: 'Network problems being solved' },
];

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 100px
      </Typography.Title>
      <Timeline items={items} titleSpan="100px" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 25%
      </Typography.Title>
      <Timeline items={items} titleSpan="25%" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 18, mode = end
      </Typography.Title>
      <Timeline items={items} titleSpan={18} mode="end" />
    </Flex>
  );
};

export default App;
```

### 语义化自定义

通过语义化结构，可以实现更丰富的定制样式。

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
        },
      },
      {
        content: '...for a long time...',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
          content: {
            opacity: 0.45,
          },
        },
      },
      {
        content: 'Technical testing 2015-09-01',
      },

      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Timeline 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
    border-radius: 4px;
  `,
}));

const styles: TimelineProps['styles'] = {
  itemIcon: {
    borderColor: '#1890ff',
  },
};

const stylesFn: TimelineProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return {
      root: {
        padding: '10px 6px',
        border: '1px solid #A294F9',
      },
      itemIcon: {
        borderColor: '#A294F9',
      },
    } satisfies TimelineProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: TimelineProps = {
    classNames,
    items: [
      {
        title: '2015-09-01',
        content: 'Create a services site',
      },
      {
        title: '2015-09-01 09:12:11',
        content: 'Solve initial network problems',
      },
      {
        content: 'Technical testing',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Timeline {...sharedProps} orientation="horizontal" styles={styles} />
      <Timeline {...sharedProps} orientation="vertical" styles={stylesFn} />
    </Flex>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

### Timeline

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| items | 选项配置 | [Items](#Items)[] | - |  |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `start` \| `alternate` \| `end` | `start` |  |
| orientation | 设置时间轴的方向 | `vertical` \| `horizontal` | `vertical` |  |
| ~~pending~~ | 指定最后一个幽灵节点是否存在或内容，请使用 `item.loading` 代替 | ReactNode | false |  |
| ~~pendingDot~~ | 当最后一个幽灵节点存在時，指定其时间图点，请使用 `item.icon` 代替 | ReactNode | &lt;LoadingOutlined /&gt; |  |
| reverse | 节点排序 | boolean | false |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titleSpan | 设置标题占比空间，为到 dot 中心点距离 <InlinePopover previewURL="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1NJISa7bpqgAAAAAR5AAAAgAerJ8AQ/original"></InlinePopover> | number \| string | 12 |  |
| variant | 设置样式变体 | `filled` \| `outlined` | `outlined` |  |

### Items

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue`、`red`、`green`、`gray`，或自定义的色值 | string | `blue` |
| content | 设置内容 | ReactNode | - |
| ~~children~~ | 设置内容，请使用 `content` 替换 | ReactNode | - |
| ~~dot~~ | 自定义时间轴点，请使用 `icon` 替换 | ReactNode | - |
| icon | 自定义节点图标 | ReactNode | - |
| ~~label~~ | 设置标签，请使用 `title` 替换 | ReactNode | - |
| loading | 设置加载状态 | boolean | false |
| placement | 自定义节点位置 | `start` \| `end` | - |
| ~~position~~ | 自定义节点位置，请使用 `placement` 替换 | `start` \| `end` | - |
| title | 设置标题 | ReactNode | - |

## Semantic DOM

### Timeline

https://ant.design/components/timeline-cn/semantic.md

### Timeline Items

https://ant.design/components/timeline-cn/semantic_items.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Timeline)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dotBg | 节点背景色 | string |  |
| dotBorderWidth | 节点边框宽度 | string \| number | 2 |
| dotSize | 节点大小 | string \| number |  |
| itemPaddingBottom | 时间项下间距 | number | 20 |
| tailColor | 轨迹颜色 | string | rgba(5,5,5,0.06) |
| tailWidth | 轨迹宽度 | string \| number | 2 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorSuccess | 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


