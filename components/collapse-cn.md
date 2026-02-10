---
category: Components
group: 数据展示
title: Collapse
subtitle: 折叠面板
description: 可以折叠/展开的内容区域。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B7HKR5OBe8gAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sir-TK0HkWcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## 代码演示 {#examples}

### 折叠面板

可以同时展开多个面板，这个例子默认展开了第一个。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default App;
```

### 面板尺寸

折叠面板有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把折叠面板设为大、小尺寸。若不设置 `size`，则尺寸默认为中。

```tsx
import React from 'react';
import { Collapse, Divider } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Default Size</Divider>
    <Collapse
      items={[{ key: '1', label: 'This is default size panel header', children: <p>{text}</p> }]}
    />
    <Divider titlePlacement="start">Small Size</Divider>
    <Collapse
      size="small"
      items={[{ key: '1', label: 'This is small size panel header', children: <p>{text}</p> }]}
    />
    <Divider titlePlacement="start">Large Size</Divider>
    <Collapse
      size="large"
      items={[{ key: '1', label: 'This is large size panel header', children: <p>{text}</p> }]}
    />
  </>
);

export default App;
```

### 手风琴

手风琴模式，始终只有一个面板处在激活状态。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => <Collapse accordion items={items} />;

export default App;
```

### 面板嵌套

嵌套折叠面板。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const itemsNest: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel nest panel',
    children: <p>{text}</p>,
  },
];

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Collapse defaultActiveKey="1" items={itemsNest} />,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse onChange={onChange} items={items} />;
};

export default App;
```

### 简洁风格

一套没有边框的简洁样式。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = (
  <p style={{ paddingInlineStart: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: text,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: text,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: text,
  },
];

const App: React.FC = () => <Collapse items={items} bordered={false} defaultActiveKey={['1']} />;

export default App;
```

### 自定义面板

自定义各个面板的背景色、圆角、边距和图标。

```tsx
import type { CSSProperties } from 'react';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const App: React.FC = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle)}
    />
  );
};

export default App;
```

### 隐藏箭头

你可以通过 `showArrow={false}` 隐藏 `CollapsePanel` 组件的箭头图标。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header with arrow icon',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header with no arrow icon',
    children: <p>{text}</p>,
    showArrow: false,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />;
};

export default App;
```

### 额外节点

自定义渲染每个面板右上角的内容。

```tsx
import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Select } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => {
  const [expandIconPlacement, setExpandIconPlacement] =
    useState<CollapseProps['expandIconPlacement']>('start');

  const onPlacementChange = (newExpandIconPlacement: CollapseProps['expandIconPlacement']) => {
    setExpandIconPlacement(newExpandIconPlacement);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPlacement={expandIconPlacement}
        items={items}
      />
      <br />
      <span>Expand Icon Placement: </span>
      <Select
        value={expandIconPlacement}
        style={{ margin: '0 8px' }}
        onChange={onPlacementChange}
        options={[
          { label: 'start', value: 'start' },
          { label: 'end', value: 'end' },
        ]}
      />
    </>
  );
};

export default App;
```

### 幽灵折叠面板

将折叠面板的背景变成透明。

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => <Collapse defaultActiveKey={['1']} ghost items={items} />;

export default App;
```

### 可折叠触发区域

通过 `collapsible` 属性，可以设置面板的可折叠触发区域。

```tsx
import React from 'react';
import { Collapse, Space } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => (
  <Space vertical>
    <Collapse
      collapsible="header"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can be collapsed by clicking text or icon',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="icon"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can only be collapsed by clicking icon',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="disabled"
      items={[
        {
          key: '1',
          label: "This panel can't be collapsed",
          children: <p>{text}</p>,
        },
      ]}
    />
  </Space>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Collapse 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Collapse, Flex } from 'antd';
import { createStaticStyles } from 'antd-style';

import type { CollapseProps } from '..';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `,
}));

const element = (
  <p>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: element,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: element,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: element,
  },
];

const styles: CollapseProps['styles'] = {
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: '12px 16px',
    color: '#141414',
  },
};

const stylesFn: CollapseProps['styles'] = ({ props }) => {
  if (props.size === 'large') {
    return {
      root: {
        backgroundColor: '#fff',
        border: '1px solid #696FC7',
        borderRadius: 8,
      },
      header: {
        backgroundColor: '#F5EFFF',
        padding: '12px 16px',
        color: '#141414',
      },
    } satisfies CollapseProps['styles'];
  }
};

const App: React.FC = () => {
  const sharedProps: CollapseProps = { classNames, items };

  return (
    <Flex vertical gap="middle">
      <Collapse {...sharedProps} defaultActiveKey={['1']} styles={styles} />
      <Collapse {...sharedProps} defaultActiveKey={['2']} styles={stylesFn} size="large" />
    </Flex>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

### Collapse

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| accordion | 手风琴模式 | boolean | false |  |
| activeKey | 当前激活 tab 面板的 key | string\[] \| string <br/> number\[] \| number | [手风琴模式](#collapse-demo-accordion)下默认第一个元素 |  |
| bordered | 带边框风格的折叠面板 | boolean | true |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsible | 所有子面板是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 |
| defaultActiveKey | 初始化选中面板的 key | string\[] \| string<br/> number\[] \| number | - |  |
| ~~destroyInactivePanel~~ | 销毁折叠隐藏的面板 | boolean | false |  |
| destroyOnHidden | 销毁折叠隐藏的面板 | boolean | false | 5.25.0 |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - |  |
| expandIconPlacement | 设置图标位置 | `start` \| `end` | `start` | - |
| ~~expandIconPosition~~ | 设置图标位置，请使用 `expandIconPlacement` 替换 | `start` \| `end` | - | 4.21.0 |
| ghost | 使折叠面板透明且无边框 | boolean | false | 4.4.0 |
| size | 设置折叠面板大小 | `large` \| `middle` \| `small` | `middle` | 5.2.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onChange | 切换面板的回调 | function | - |  |
| items | 折叠项目内容 | [ItemType](#itemtype) | - | 5.6.0 |

### ItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 语义化结构 className | [`Record<header \| body, string>`](#semantic-dom) | - | 5.21.0 |
| collapsible | 是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - |  |
| children | body 区域内容 | ReactNode | - |  |
| extra | 自定义渲染每个面板右上角的内容 | ReactNode | - |  |
| forceRender | 被隐藏时是否渲染 body 区域 DOM 结构 | boolean | false |  |
| key | 对应 activeKey | string \| number | - |  |
| label | 面板标题 | ReactNode | - | - |
| showArrow | 是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon） | boolean | true |  |
| styles | 语义化结构 style | [`Record<header \| body, CSSProperties>`](#semantic-dom) | - | 5.21.0 |

### Collapse.Panel

:::warning{title=已废弃}
版本 >= 5.6.0 时请使用 items 方式配置面板。
:::

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 (icon: 4.24.0) |
| extra | 自定义渲染每个面板右上角的内容 | ReactNode | - |  |
| forceRender | 被隐藏时是否渲染 body 区域 DOM 结构 | boolean | false |  |
| header | 面板标题 | ReactNode | - |  |
| key | 对应 activeKey | string \| number | - |  |
| showArrow | 是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon） | boolean | true |  |

## Semantic DOM

https://ant.design/components/collapse-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Collapse)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderlessContentBg | 简约风格折叠面板的内容背景 | string | transparent |
| borderlessContentPadding | 简约风格折叠面板的内容内边距 | Padding<string \| number> \| undefined | 4px 16px 16px |
| contentBg | 折叠面板内容背景 | string | #ffffff |
| contentPadding | 折叠面板内容内边距 | Padding<string \| number> \| undefined | 16px 16px |
| headerBg | 折叠面板头部背景 | string | rgba(0,0,0,0.02) |
| headerPadding | 折叠面板头部内边距 | Padding<string \| number> \| undefined | 12px 16px |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


