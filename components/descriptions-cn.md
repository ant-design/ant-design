---
category: Components
group: 数据展示
title: Descriptions
subtitle: 描述列表
description: 展示多个只读字段的组合。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*fHdlTpif6XQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d27AQJrowGAAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

常见于详情页的信息展示。

```tsx | pure
// >= 5.8.0 可用，推荐的写法 ✅

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

<Descriptions title="User Info" items={items} />;

// <5.8.0 可用，>=5.8.0 时不推荐 🙅🏻‍♀️

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </Descriptions.Item>
</Descriptions>;
```

## 代码演示 {#examples}

### 基本

简单的展示。

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

const App: React.FC = () => <Descriptions title="User Info" items={items} />;

export default App;
```

### 带边框的

带边框和背景颜色列表。

```tsx
import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const App: React.FC = () => <Descriptions title="User Info" bordered items={items} />;

export default App;
```



### 自定义尺寸

自定义尺寸，适应在各种容器中展示。

```tsx
import React, { useState } from 'react';
import { Button, Descriptions, Radio } from 'antd';
import type { DescriptionsProps, RadioChangeEvent } from 'antd';

const borderedItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Time',
    children: '18:00:00',
  },
  {
    key: '4',
    label: 'Amount',
    children: '$80.00',
  },
  {
    key: '5',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '6',
    label: 'Official',
    children: '$60.00',
  },
  {
    key: '7',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Time',
    children: '18:00:00',
  },
  {
    key: '4',
    label: 'Amount',
    children: '$80.00',
  },
  {
    key: '5',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '6',
    label: 'Official',
    children: '$60.00',
  },
];

const App: React.FC = () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

  const onChange = (e: RadioChangeEvent) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={borderedItems}
      />
      <br />
      <br />
      <Descriptions
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={items}
      />
    </div>
  );
};

export default App;
```

### 响应式

通过响应式的配置可以实现在小屏幕设备上的完美呈现。

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Time',
    children: '18:00:00',
  },
  {
    label: 'Amount',
    children: '$80.00',
  },
  {
    label: 'Discount',
    span: { xl: 2, xxl: 2 },
    children: '$20.00',
  },
  {
    label: 'Official',
    span: { xl: 2, xxl: 2 },
    children: '$60.00',
  },
  {
    label: 'Config Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: 'Hardware Info',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
];

const App: React.FC = () => (
  <Descriptions
    title="Responsive Descriptions"
    bordered
    column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
    items={items}
  />
);

export default App;
```

### 垂直

垂直的列表。

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Address',
    span: 2,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '5',
    label: 'Remark',
    children: 'empty',
  },
];

const App: React.FC = () => <Descriptions title="User Info" layout="vertical" items={items} />;

export default App;
```

### 垂直带边框的

垂直带边框和背景颜色的列表。

```tsx
import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    span: 2,
    children: '2019-04-24 18:00:00',
  },
  {
    key: '6',
    label: 'Status',
    span: 3,
    children: <Badge status="processing" text="Running" />,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const App: React.FC = () => (
  <Descriptions title="User Info" layout="vertical" bordered items={items} />
);

export default App;
```


### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Descriptions 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Descriptions, Flex } from 'antd';
import type { DescriptionsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 10px;
  `,
}));

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
];

const styles: DescriptionsProps['styles'] = {
  label: {
    color: '#000',
  },
};

const stylesFn: DescriptionsProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      root: {
        borderRadius: 8,
        border: '1px solid #CDC1FF',
      },
      label: { color: '#A294F9' },
    } satisfies DescriptionsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const descriptionsProps: DescriptionsProps = {
    title: 'User Info',
    items,
    bordered: true,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Descriptions {...descriptionsProps} styles={styles} size="small" />
      <Descriptions {...descriptionsProps} styles={stylesFn} size="default" />
    </Flex>
  );
};

export default App;
```



### 整行

整行的展示。

```tsx
import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    label: 'Live',
    span: 'filled', // span = 2
    children: 'Hangzhou, Zhejiang',
  },
  {
    label: 'Remark',
    span: 'filled', // span = 3
    children: 'empty',
  },
  {
    label: 'Address',
    span: 1, // span will be 3 and warning for span is not align to the end
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

const App: React.FC = () => <Descriptions bordered title="User Info" items={items} />;

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

### Descriptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值。表示是否显示 label 后面的冒号 | boolean | true |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number \| [Record<Breakpoint, number>](https://github.com/ant-design/ant-design/blob/84ca0d23ae52e4f0940f20b0e22eabe743f90dca/components/descriptions/index.tsx#L111C21-L111C56) | 3 |  |
| ~~contentStyle~~ | 自定义内容样式，请使用 `styles.content` 替换 | CSSProperties | - | 4.10.0 |
| extra | 描述列表的操作区域，显示在右上方 | ReactNode | - | 4.5.0 |
| items | 描述列表项内容 | [DescriptionsItem](#descriptionitem)[] | - | 5.8.0 |
| ~~labelStyle~~ | 自定义标签样式，请使用 `styles.label` 替换 | CSSProperties | - | 4.10.0 |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` |  |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |  |

### DescriptionItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ~~contentStyle~~ | 自定义内容样式，请使用 `styles.content` 替换 | CSSProperties | - | 4.9.0 |
| label | 内容的描述 | ReactNode | - |  |
| ~~labelStyle~~ | 自定义标签样式，请使用 `styles.label` 替换 | CSSProperties | - | 4.9.0 |
| span | 包含列的数量（`filled` 铺满当前行剩余部分） | number\| `filled` \| [Screens](/components/grid-cn#col) | 1 | `screens: 5.9.0`，`filled: 5.22.0` |

> span 是 Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。当同时配置 `style` 和 `labelStyle`（或 `contentStyle`）时，两者会同时作用。样式冲突时，后者会覆盖前者。

## Semantic DOM

https://ant.design/components/descriptions-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Descriptions)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colonMarginLeft | 冒号左间距 | number | 2 |
| colonMarginRight | 冒号右间距 | number | 8 |
| contentColor | 内容区域文字颜色 | string | rgba(0,0,0,0.88) |
| extraColor | 额外区域文字颜色 | string | rgba(0,0,0,0.88) |
| itemPaddingBottom | 子项下间距 | number | 16 |
| itemPaddingEnd | 子项结束间距 | number | 16 |
| labelBg | 标签背景色 | string | rgba(0,0,0,0.02) |
| labelColor | 标签文字颜色 | string | rgba(0,0,0,0.45) |
| titleColor | 标题文字颜色 | string | rgba(0,0,0,0.88) |
| titleMarginBottom | 标题下间距 | number | 20 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextSecondary | 作为第二梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| padding | 控制元素的内间距。 | number |  |
| paddingLG | 控制元素的大内间距。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


