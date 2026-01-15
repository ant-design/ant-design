# Input — 输入框

## 功能概述

通过鼠标或键盘输入内容，是最基础的表单域包装。支持文本、密码、搜索、文本域等多种输入模式。

## 核心概念

### 输入框数据流模式

```
用户输入/粘贴
     ↓
 onChange 事件触发
     ↓
 更新 state（受控）或内部状态（非受控）
     ↓
 UI 重新渲染显示新值
```

### 关键数据结构

```tsx
// Input 事件对象类型
interface InputChangeEvent {
  target: {
    value: string; // 当前输入值
  };
  currentTarget: {
    value: string;
  };
}

// Input.TextArea 数据结构
interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  rows?: number; // 行数
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

// Input.Search 搜索事件
interface SearchEvent {
  value: string;
  source?: 'input' | 'submit'; // 搜索来源
}

// Input.OTP（验证码）数据结构
interface OTPProps {
  length?: number; // 验证码长度
  value?: string; // 验证码值
  onChange?: (value: string) => void;
  status?: 'error' | 'warning';
}
```

## 输入字段

### 必填

无必填字段，可直接使用。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | string | - | 输入框内容（受控模式） |
| `defaultValue` | string | - | 默认内容（非受控模式） |
| `placeholder` | string | - | 占位提示文本 |
| `size` | `'large'` \| `'middle'` \| `'small'` | `'middle'` | 尺寸 |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` \| `'underlined'` | `'outlined'` | 形态变体 |
| `disabled` | boolean | false | 禁用状态 |
| `readOnly` | boolean | false | 只读状态 |
| `prefix` | ReactNode | - | 前缀图标或内容 |
| `suffix` | ReactNode | - | 后缀图标或内容 |
| `allowClear` | boolean \| { clearIcon } | false | 允许清除内容 |
| `maxLength` | number | - | 最大输入长度 |
| `showCount` | boolean \| { formatter } | false | 显示字数统计 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |

### Input.TextArea 专有属性

- `rows`: number，初始行数。
- `autoSize`: boolean | { minRows, maxRows }，自适应高度。
- `showCount`: boolean | { formatter }，显示字数统计。
- `maxLength`: number，最大长度限制。

### Input.Search 专有属性

- `enterButton`: boolean | ReactNode，搜索按钮，设置 `true` 时显示默认搜索图标。
- `loading`: boolean，加载状态。
- `onSearch`: (value, event, info) => void，搜索回调。

### Input.Password 专有属性

- `visibilityToggle`: boolean | { visible, onVisibleChange }，密码可见性切换，默认 `true`。
- `iconRender`: (visible) => ReactNode，自定义密码图标。

### Input.OTP 专有属性（5.16.0+）

- `length`: number，验证码长度，默认 `6`。
- `formatter`: (value) => string，格式化函数。
- `mask`: boolean | string，掩码字符，设置后显示掩码。
- `variant`: string，形态变体。

### 事件回调

- `onChange`: (e: ChangeEvent<HTMLInputElement>) => void，内容变化回调。
- `onPressEnter`: (e: KeyboardEvent) => void，按下回车键回调。
- `onFocus`: (e: FocusEvent<HTMLInputElement>) => void，获取焦点回调。
- `onBlur`: (e: FocusEvent<HTMLInputElement>) => void，失去焦点回调。
- `onInput`: (e: FormEvent<HTMLInputElement>) => void，输入事件。

## 常见场景示例

### 场景 1: 基础输入框

```tsx
import { Input } from 'antd';

const App: React.FC = () => (
  <Input placeholder="请输入内容" onChange={(e) => console.log(e.target.value)} />
);
```

### 场景 2: 受控输入框与清除

```tsx
import { useState } from 'react';
import { Input } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="输入框内容"
      allowClear
      onClear={() => setValue('')}
      maxLength={20}
      showCount
    />
  );
};
```

### 场景 3: 带前后缀的输入框

```tsx
import { DollarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

const App: React.FC = () => (
  <>
    <Input prefix={<UserOutlined />} placeholder="用户名" />
    <Input prefix={<DollarOutlined />} suffix="CNY" placeholder="金额" />
    <Input prefix={<LockOutlined />} suffix="strong" placeholder="密码强度" />
  </>
);
```

### 场景 4: 文本域 (TextArea)

```tsx
import { useState } from 'react';
import { Input } from 'antd';

const App: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <>
      {/* 基础文本域 */}
      <Input.TextArea
        rows={4}
        placeholder="请输入备注"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* 自适应高度 */}
      <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="自动调整高度" />

      {/* 显示字数统计 */}
      <Input.TextArea rows={4} maxLength={200} showCount placeholder="最多 200 字" />
    </>
  );
};
```

### 场景 5: 搜索框 (Input.Search)

```tsx
import { Input } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础搜索 */}
    <Input.Search placeholder="搜索..." onSearch={(value) => console.log('搜索:', value)} />

    {/* 自定义按钮 */}
    <Input.Search
      placeholder="搜索..."
      enterButton="搜索"
      onSearch={(value) => console.log('搜索:', value)}
    />

    {/* 加载状态 */}
    <Input.Search placeholder="搜索..." loading enterButton="搜索" />
  </>
);
```

### 场景 6: 密码输入 (Input.Password) 与 OTP

```tsx
import { Input, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 基础密码输入 */}
    <Input.Password placeholder="请输入密码" />

    {/* 隐藏密码 */}
    <Input.Password
      placeholder="输入密码"
      visibilityToggle={{
        visible: true,
        onVisibleChange: (visible) => console.log('visible:', visible),
      }}
    />

    {/* OTP（验证码）- 5.16.0+ */}
    <Input.OTP length={6} placeholder="输入验证码" />
    <Input.OTP length={6} formatter={(str) => str.toUpperCase()} />
    <Input.OTP length={4} mask showInput />
  </Space>
);
```

## AI 生成指引

### 场景判断表

| 用户需求     | 选择方案              | 关键属性                                |
| ------------ | --------------------- | --------------------------------------- |
| 简单文本输入 | Input 基础组件        | placeholder, value, onChange            |
| 带清除功能   | Input + allowClear    | allowClear, onClear                     |
| 显示输入统计 | Input + showCount     | showCount, maxLength                    |
| 多行文本输入 | Input.TextArea        | rows, autoSize                          |
| 搜索功能     | Input.Search          | enterButton, onSearch                   |
| 密码输入     | Input.Password        | visibilityToggle, iconRender            |
| 验证码输入   | Input.OTP (5.16.0+)   | length, mask, formatter                 |
| 带图标或标签 | Input + prefix/suffix | prefix, suffix, addonBefore, addonAfter |
| 受控组件     | value + onChange      | value, onChange                         |
| 非受控组件   | defaultValue          | defaultValue                            |

### 类型导入

```tsx
import type {
  ChangeEvent, // 变化事件类型
  InputProps, // Input 组件 props 类型
  InputRef, // Input ref 类型
  InputStatus, // 状态类型
  OTPProps, // OTP props 类型
  PasswordProps, // Password props 类型
  SearchProps, // Search props 类型
  TextAreaProps, // TextArea props 类型
} from 'antd';
```

## 使用建议

在 Form 中使用时配合 `Form.Item` 的 `name` 属性实现自动绑定；使用 `allowClear` 提升用户体验；密码输入使用 `Input.Password`；长文本使用 `Input.TextArea`；搜索场景使用 `Input.Search`；大量数据输入配合 `maxLength` 和 `showCount`。

## 示例代码

```tsx
import { Input, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input placeholder="Basic usage" />
    <Input.Search placeholder="Search" enterButton />
    <Input.Password placeholder="Password" />
    <Input.TextArea rows={4} placeholder="TextArea" />
  </Space>
);
```

## 返回结果

渲染一个可输入的表单控件，支持各种输入模式和状态。
