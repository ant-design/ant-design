# Segmented — 分段控制器

## 功能概述

分段控制器。用于展示多个选项并允许用户选择其中单个选项。

## 输入字段

### 必填

- `options`: (string | number | SegmentedItemType)[]，选项配置。

### SegmentedItemType 结构

```tsx
interface SegmentedItemType {
  label: ReactNode; // 显示文本
  value: string | number; // 选项值
  icon?: ReactNode; // 图标
  disabled?: boolean; // 禁用
  className?: string; // 类名
}
```

### 可选

- `value`: string | number，当前值（受控）。
- `defaultValue`: string | number，默认值。
- `block`: boolean，撑满容器宽度，默认 `false`。
- `disabled`: boolean，禁用所有选项。
- `size`: string，尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `vertical`: boolean，垂直排列（5.22.0+）。
- `shape`: string，形状，可选 `default` | `round`（5.22.0+）。
- `onChange`: (value) => void，选项变化回调。

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
      {/* 基础用法 */}
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />

      {/* 受控 */}
      <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />

      {/* 禁用 */}
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly', disabled: true },
          { label: 'Monthly', value: 'monthly' },
        ]}
      />

      {/* 带图标 */}
      <Segmented
        options={[
          { label: 'List', value: 'list', icon: <BarsOutlined /> },
          { label: 'Kanban', value: 'kanban', icon: <AppstoreOutlined /> },
        ]}
      />

      {/* 仅图标 */}
      <Segmented
        options={[
          { value: 'list', icon: <BarsOutlined /> },
          { value: 'kanban', icon: <AppstoreOutlined /> },
        ]}
      />

      {/* 不同尺寸 */}
      <Segmented size="small" options={['Daily', 'Weekly', 'Monthly']} />
      <Segmented options={['Daily', 'Weekly', 'Monthly']} />
      <Segmented size="large" options={['Daily', 'Weekly', 'Monthly']} />

      {/* 撑满 */}
      <Segmented block options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />

      {/* 自定义渲染 */}
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
