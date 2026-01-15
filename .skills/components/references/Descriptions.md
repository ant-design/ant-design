# Descriptions — 描述列表

## 功能概述

成组展示多个只读字段。常见于详情页的信息展示。

## 输入字段

### 必填

- `items`: DescriptionItem[]，描述项配置数组。

### DescriptionItem 结构

```tsx
interface DescriptionItem {
  key: string; // 唯一标识
  label: ReactNode; // 标签
  children: ReactNode; // 内容
  span?: number; // 占列数
  labelStyle?: CSSProperties; // 标签样式
  contentStyle?: CSSProperties; // 内容样式
}
```

### 可选

- `title`: ReactNode，标题。
- `extra`: ReactNode，操作区域。
- `bordered`: boolean，是否有边框。
- `layout`: string，布局，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `column`: number | object，一行显示的列数，默认 `3`。
  - 响应式：`{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }`
- `size`: string，尺寸，可选 `default` | `middle` | `small`。
- `colon`: boolean，显示冒号，默认 `true`。
- `labelStyle`: CSSProperties，标签样式。
- `contentStyle`: CSSProperties，内容样式。

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
    {/* 基础用法 */}
    <Descriptions title="User Info" items={items} />

    {/* 带边框 */}
    <Descriptions title="User Info" bordered items={items} />

    {/* 带操作 */}
    <Descriptions title="User Info" extra={<Button type="primary">Edit</Button>} items={items} />

    {/* 响应式 */}
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
