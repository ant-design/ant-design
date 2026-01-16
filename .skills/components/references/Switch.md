# Switch — 开关

## 功能概述

使用开关切换两种状态之间。

## 应用场景

- 需要表示开关状态/两种状态之间的切换时；。
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 输入字段

### Switch 属性

#### 必填

- 无必填属性。

#### 可选

- `checked`: boolean，指定当前是否选中，默认 false。
- `checkedChildren`: ReactNode，选中时的内容。
- `className`: string，Switch 器类名。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultChecked`: boolean，初始是否选中，默认 false。
- `defaultValue`: boolean，`defaultChecked` 的别名，版本 5.12.0。
- `disabled`: boolean，是否禁用，默认 false。
- `loading`: boolean，加载中的开关，默认 false。
- `size`: string，开关大小，可选值：`default` `small`，默认 `default`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `unCheckedChildren`: ReactNode，非选中时的内容。
- `value`: boolean，`checked` 的别名，版本 5.12.0。
- `onChange`: function(checked: boolean, event: Event)，变化时的回调函数。
- `onClick`: function(checked: boolean, event: Event)，点击时的回调函数。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <Space direction="vertical">
      <Switch defaultChecked />

      <Switch defaultChecked disabled />

      <Switch size="small" />

      <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />

      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />

      <Switch loading={loading} onChange={handleChange} />
    </Space>
  );
};
```

## 返回结果

渲染一个开关组件，用于两种状态的切换。
