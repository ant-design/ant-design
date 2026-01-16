# Descriptions — 描述列表

## 功能概述

展示多个只读字段的组合。

## 应用场景

- 常见于详情页的信息展示。

## 输入字段

### Descriptions 属性

#### 必填

- 无必填属性。

#### 可选

- `bordered`: boolean，是否展示边框，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `colon`: boolean，配置 `Descriptions.Item` 的 `colon` 的默认值。表示是否显示 label 后面的冒号，默认 true。
- `column`: number | [Record<Breakpoint, number>](https://github.com/ant-design/ant-design/blob/84ca0d23ae52e4f0940f20b0e22eabe743f90dca/components/descriptions/index.tsx#L111C21-L111C56)，一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`，默认 3。
- `~~contentStyle~~`: CSSProperties，自定义内容样式，请使用 `styles.content` 替换，版本 4.10.0。
- `extra`: ReactNode，描述列表的操作区域，显示在右上方，版本 4.5.0。
- `items`: [DescriptionsItem](#descriptionitem)[]，描述列表项内容，版本 5.8.0。
- `~~labelStyle~~`: CSSProperties，自定义标签样式，请使用 `styles.label` 替换，版本 4.10.0。
- `layout`: `horizontal` | `vertical`，描述布局，默认 `horizontal`。
- `size`: `default` | `middle` | `small`，设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效）。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `title`: ReactNode，描述列表的标题，显示在最顶部。

### DescriptionItem 属性

#### 必填

- 无必填属性。

#### 可选

- `~~contentStyle~~`: CSSProperties，自定义内容样式，请使用 `styles.content` 替换，版本 4.9.0。
- `label`: ReactNode，内容的描述。
- `~~labelStyle~~`: CSSProperties，自定义标签样式，请使用 `styles.label` 替换，版本 4.9.0。
- `span`: number| `filled` | [Screens](/components/grid-cn#col)，包含列的数量（`filled` 铺满当前行剩余部分），默认 1，版本 `screens: 5.9.0`，`filled: 5.22.0`。

## 方法

无公开方法。

## 使用建议

详情页信息展示使用 Descriptions；需要边框时设置 `bordered`；响应式使用 column 对象配置。

## 示例代码

```tsx
import { Badge, Button, Descriptions } from 'antd';
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
      </>
    ),
  },
];

const App: React.FC = () => (
  <>
    <Descriptions title="User Info" items={items} />

    <Descriptions title="User Info" bordered items={items} />

    <Descriptions title="User Info" extra={<Button type="primary">Edit</Button>} items={items} />

    <Descriptions
      title="Responsive"
      column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
      items={items}
    />
  </>
);
```

## 返回结果

渲染一个描述列表，用于展示只读字段信息。
