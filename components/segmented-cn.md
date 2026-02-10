---
category: Components
group: 数据展示
title: Segmented
subtitle: 分段控制器
description: 用于展示多个选项并允许用户选择其中单个选项。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-9tSSoO_MkIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

自 `antd@4.20.0` 版本开始提供该组件。

## 何时使用 {#when-to-use}

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string>
    options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
    onChange={(value) => {
      console.log(value); // string
    }}
  />
);

export default Demo;
```

### 垂直方向

垂直方向。

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    orientation="vertical"
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### Block 分段选择器

`block` 属性使其适合父元素宽度。

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string | number> options={[123, 456, 'longtext-longtext-longtext-longtext']} block />
);

export default Demo;
```

### 胶囊形状

胶囊型的 Segmented。

```tsx
import React, { useState } from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';

import type { SizeType } from '../../config-provider/SizeContext';

const Demo: React.FC = () => {
  const [size, setSize] = useState<SizeType>('middle');
  return (
    <Flex gap="small" align="flex-start" vertical>
      <Segmented<SizeType> options={['small', 'middle', 'large']} value={size} onChange={setSize} />
      <Segmented
        size={size}
        shape="round"
        options={[
          { value: 'light', icon: <SunOutlined /> },
          { value: 'dark', icon: <MoonOutlined /> },
        ]}
      />
    </Flex>
  );
};

export default Demo;
```

### 不可用

Segmented 不可用。

```tsx
import React from 'react';
import { Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
    <Segmented
      options={[
        'Daily',
        { label: 'Weekly', value: 'Weekly', disabled: true },
        'Monthly',
        { label: 'Quarterly', value: 'Quarterly', disabled: true },
        'Yearly',
      ]}
    />
  </Flex>
);

export default App;
```

### 受控模式

受控的 Segmented。

```tsx
import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState<string>('Map');
  return (
    <Segmented<string>
      options={['Map', 'Transit', 'Satellite']}
      value={value}
      onChange={setValue}
    />
  );
};

export default Demo;
```

### 自定义渲染

自定义渲染每一个 Segmented Item。

```tsx
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" alt="User 1" />
              <div>User 1</div>
            </div>
          ),
          value: 'user1',
          tooltip: { title: 'hello user1', color: 'gold' },
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }} alt="User 2">
                K
              </Avatar>
              <div>User 2</div>
            </div>
          ),
          value: 'user2',
          tooltip: { title: 'hello user2', color: 'pink' },
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="User 3" />
              <div>User 3</div>
            </div>
          ),
          value: 'user3',
          tooltip: { title: 'hello user3', color: 'geekblue' },
        },
      ]}
    />
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Spring</div>
              <div>Jan-Mar</div>
            </div>
          ),
          value: 'spring',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Summer</div>
              <div>Apr-Jun</div>
            </div>
          ),
          value: 'summer',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </div>
          ),
          value: 'autumn',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Winter</div>
              <div>Oct-Dec</div>
            </div>
          ),
          value: 'winter',
        },
      ]}
    />
  </Flex>
);

export default App;
```

### 动态数据

动态加载数据。

```tsx
import React, { useState } from 'react';
import { Button, Flex, Segmented } from 'antd';

const Demo: React.FC = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const handleLoadOptions = () => {
    setOptions((prev) => [...prev, 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };

  return (
    <Flex gap="small" align="flex-start" vertical>
      <Segmented options={options} />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </Flex>
  );
};

export default Demo;
```

### 三种大小

我们为 `<Segmented />` 组件定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

```tsx
import React from 'react';
import { Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented size="large" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented size="small" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </Flex>
);

export default App;
```

### 设置图标

给 Segmented Item 设置 Icon。

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    options={[
      { label: 'List', value: 'List', icon: <BarsOutlined /> },
      { label: 'Kanban', value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### 只设置图标

在 Segmented Item 选项中只设置 Icon。

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### 配合 name 使用

可以为 Segmented 配置 `name` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把 Segmented 下的 input 真正看作是一组（例如可以通过方向键始终**在同一组内**更改选项）。

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string> options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} name="group" />
);

export default Demo;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Segmented 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { CloudOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 2px;
  `,
}));

const styleFn: SegmentedProps['styles'] = (info) => {
  if (info.props.vertical) {
    return {
      root: {
        border: '1px solid #77BEF0',
        padding: 4,
        width: 100,
      },
      icon: {
        color: '#77BEF0',
      },
      item: {
        textAlign: 'start',
      },
    } satisfies SegmentedProps['styles'];
  }
  return {};
};

const styles: SegmentedProps['styles'] = {
  root: {
    padding: 4,
    width: 260,
  },
};

const options: SegmentedProps['options'] = [
  {
    label: 'Boost',
    value: 'boost',
    icon: <RocketOutlined />,
  },
  {
    label: 'Stream',
    value: 'stream',
    icon: <ThunderboltOutlined />,
  },
  {
    label: 'Cloud',
    value: 'cloud',
    icon: <CloudOutlined />,
  },
];

const App: React.FC = () => {
  const segmentedSharedProps: SegmentedProps = {
    options,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Segmented {...segmentedSharedProps} styles={styles} />
      <Segmented {...segmentedSharedProps} styles={styleFn} vertical />
    </Flex>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

> 自 `antd@4.20.0` 版本开始提供该组件。

### Segmented

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false |  |
| classNames | 用于自定义 Segmented 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | 默认选中的值 | string \| number |  |  |
| disabled | 是否禁用 | boolean | false |  |
| onChange | 选项变化时的回调函数 | function(value: string \| number) |  |  |
| options | 数据化配置选项内容 | string\[] \| number\[] \| SegmentedItemType\[] | [] |  |
| orientation | 排列方向 | `horizontal` \| `vertical` | `horizontal` |  |
| size | 控件尺寸 | `large` \| `middle` \| `small` | `middle` |  |
| styles | 用于自定义 Segmented 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties> | - |  |
| vertical | 排列方向，与 `orientation` 同时存在，以 `orientation` 优先 | boolean | `false` | 5.21.0 |
| value | 当前选中的值 | string \| number |  |  |
| shape | 形状 | `default` \| `round` | `default` | 5.24.0 |
| name | Segmented 下所有 `input[type="radio"]` 的 `name` 属性。若未设置，则将回退到随机生成的名称 | string |  | 5.23.0 |

### SegmentedItemType

| 属性 | 描述 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 自定义类名 | string | - |  |
| disabled | 分段项的禁用状态 | boolean | false |  |
| icon | 分段项的显示图标 | ReactNode | - |  |
| label | 分段项的显示文本 | ReactNode | - |  |
| tooltip | 分段项的工具提示 | string \| [TooltipProps](../tooltip/index.zh-CN.md#api) | - |  |
| value | 分段项的值 | string \| number | - |  |

## Semantic DOM

https://ant.design/components/segmented-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Segmented)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemActiveBg | 选项激活态背景颜色 | string | rgba(0,0,0,0.15) |
| itemColor | 选项文本颜色 | string | rgba(0,0,0,0.65) |
| itemHoverBg | 选项悬浮态背景颜色 | string | rgba(0,0,0,0.06) |
| itemHoverColor | 选项悬浮态文本颜色 | string | rgba(0,0,0,0.88) |
| itemSelectedBg | 选项选中时背景颜色 | string | #ffffff |
| itemSelectedColor | 选项选中时文字颜色 | string | rgba(0,0,0,0.88) |
| trackBg | Segmented 控件容器背景色 | string | #f5f5f5 |
| trackPadding | Segmented 控件容器的 padding | string \| number | 2 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowTertiary | 控制元素三级盒子阴影样式。 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| controlPaddingHorizontal | 控制元素水平内间距。 | number |  |
| controlPaddingHorizontalSM | 控制元素中小尺寸水平内间距。 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


