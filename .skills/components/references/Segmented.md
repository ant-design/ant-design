# Segmented — 分段控制器

## 功能概述

用于展示多个选项并允许用户选择其中单个选项。

## 应用场景

- 用于展示多个选项并允许用户选择其中单个选项；。
- 当切换选中选项时，关联区域的内容会发生变化。

## 输入字段

### Segmented 属性

#### 必填

- 无必填属性。

#### 可选

- `block`: boolean，将宽度调整为父元素宽度的选项，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Segmented 组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: string | number，默认选中的值。
- `disabled`: boolean，是否禁用，默认 false。
- `onChange`: function(value: string | number)，选项变化时的回调函数。
- `options`: string\[] | number\[] | SegmentedItemType\[]，数据化配置选项内容，默认 []。
- `orientation`: `horizontal` | `vertical`，排列方向，默认 `horizontal`。
- `size`: `large` | `middle` | `small`，控件尺寸，默认 `middle`。
- `styles`: Record<[SemanticDOM](#semantic-dom) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties>，用于自定义 Segmented 组件内部各语义化结构的行内 style，支持对象或函数。
- `vertical`: boolean，排列方向，与 `orientation` 同时存在，以 `orientation` 优先，默认 `false`，版本 5.21.0。
- `value`: string | number，当前选中的值。
- `shape`: `default` | `round`，形状，默认 `default`，版本 5.24.0。
- `name`: string，Segmented 下所有 `input[type="radio"]` 的 `name` 属性。若未设置，则将回退到随机生成的名称，版本 5.23.0。

### SegmentedItemType 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，自定义类名。
- `disabled`: boolean，分段项的禁用状态，默认 false。
- `icon`: ReactNode，分段项的显示图标。
- `label`: ReactNode，分段项的显示文本。
- `tooltip`: string | [TooltipProps](../tooltip/index.zh-CN.md#api)，分段项的工具提示。
- `value`: string | number，分段项的值。

## 方法

无公开方法。

## 使用建议

平级选项切换使用分段控制器；配合 Tabs 内容区使用；少量选项时替代 Radio.Group。

## 示例代码

```tsx
import { useState } from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState<string>('Map');

  return (
    <Space direction="vertical">
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />

      <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />

      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly', disabled: true },
          { label: 'Monthly', value: 'monthly' },
        ]}
      />

      <Segmented
        options={[
          { label: 'List', value: 'list', icon: <BarsOutlined /> },
          { label: 'Kanban', value: 'kanban', icon: <AppstoreOutlined /> },
        ]}
      />

      <Segmented
        options={[
          { value: 'list', icon: <BarsOutlined /> },
          { value: 'kanban', icon: <AppstoreOutlined /> },
        ]}
      />

      <Segmented size="small" options={['Daily', 'Weekly', 'Monthly']} />
      <Segmented options={['Daily', 'Weekly', 'Monthly']} />
      <Segmented size="large" options={['Daily', 'Weekly', 'Monthly']} />

      <Segmented block options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />

      <Segmented
        options={[
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Spring</div>
                <div>Jan-February</div>
              </div>
            ),
            value: 'spring',
          },
          {
            label: (
              <div style={{ padding: 4 }}>
                <div>Summer</div>
                <div>May-February</div>
              </div>
            ),
            value: 'summer',
          },
        ]}
      />
    </Space>
  );
};
```

## 返回结果

渲染一个分段控制器组件。
