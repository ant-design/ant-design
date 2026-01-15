# Switch — 开关

## 功能概述

开关选择器，用于两种状态之间的切换。

## 输入字段

### 必填

无必填属性。

### 可选

- `checked`: boolean，指定当前是否选中（受控）。
- `defaultChecked`: boolean，默认是否选中。
- `disabled`: boolean，禁用状态。
- `loading`: boolean，加载状态。
- `size`: string，开关大小，可选 `default` | `small`，默认 `default`。
- `checkedChildren`: ReactNode，选中时内容。
- `unCheckedChildren`: ReactNode，非选中时内容。
- `autoFocus`: boolean，自动获取焦点。
- `defaultValue`: boolean，默认是否选中（同 defaultChecked，5.12.0+）。
- `value`: boolean，是否选中（同 checked，5.12.0+）。
- `onChange`: (checked, event) => void，变化回调。
- `onClick`: (checked, event) => void，点击回调。

### 方法

- `focus()`: 获取焦点。
- `blur()`: 移除焦点。

## 使用建议

开关代替 Checkbox 用于状态切换；需要文字描述时使用 `checkedChildren` 和 `unCheckedChildren`；异步操作时使用 `loading`。

## 示例代码

```tsx
import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (checked: boolean) => {
    setLoading(true);
    // 模拟异步操作
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <Space direction="vertical">
      {/* 基础用法 */}
      <Switch defaultChecked />

      {/* 禁用状态 */}
      <Switch defaultChecked disabled />

      {/* 尺寸 */}
      <Switch size="small" />

      {/* 带文字 */}
      <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />

      {/* 带图标 */}
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />

      {/* 加载状态 */}
      <Switch loading={loading} onChange={handleChange} />
    </Space>
  );
};
```

## 返回结果

渲染一个开关组件，用于两种状态的切换。
