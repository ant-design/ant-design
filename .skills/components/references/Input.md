# Input — 输入框

## 功能概述

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 应用场景

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 输入字段

### Input 属性

#### 必填

- 无必填属性。

#### 可选

- `~~addonAfter~~`: ReactNode，带标签的 input，设置后置标签，请使用 Space.Compact 替换。
- `~~addonBefore~~`: ReactNode，带标签的 input，设置前置标签，请使用 Space.Compact 替换。
- `allowClear`: boolean | { clearIcon: ReactNode }，可以点击清除图标删除内容。
- `~~bordered~~`: boolean，是否有边框, 请使用 `variant` 替换，默认 true，版本 4.5.0。
- `classNames`: Record<[SemanticDOM](#semantic-input), string> | (info: { props })=> Record<[SemanticDOM](#semantic-input), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `count`: [CountConfig](#countconfig)，字符计数配置，版本 5.10.0。
- `defaultValue`: string，输入框默认内容。
- `disabled`: boolean，是否禁用状态，默认为 false，默认 false。
- `id`: string，输入框的 id。
- `maxLength`: number，最大长度。
- `prefix`: ReactNode，带有前缀图标的 input。
- `showCount`: boolean | { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode }，是否展示字数，默认 false，版本 4.18.0 info.value: 4.23.0。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `styles`: Record<[SemanticDOM](#semantic-input), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-input), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `size`: `large` | `middle` | `small`，控件大小。注：标准表单内的输入框大小限制为 `middle`。
- `suffix`: ReactNode，带有后缀图标的 input。
- `type`: string，声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)，默认 `text`。
- `value`: string，输入框内容。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onChange`: function(e)，输入框内容变化时的回调。
- `onPressEnter`: function(e)，按下回车的回调。
- `onClear`: () => void，按下清除按钮的回调，版本 5.20.0。

### Input.TextArea 属性

#### 必填

- 无必填属性。

#### 可选

- `autoSize`: boolean | object，自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-textarea), string> | (info: { props })=> Record<[SemanticDOM](#semantic-textarea), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `styles`: Record<[SemanticDOM](#semantic-textarea) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-textarea) , CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

### Input.Search 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-search), string> | (info: { props })=> Record<[SemanticDOM](#semantic-search), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `enterButton`: ReactNode，是否有确认按钮，可设为按钮文字。该属性会与 `addonAfter` 冲突，默认 false。
- `loading`: boolean，搜索 loading，默认 false。
- `onSearch`: function(value, event, { source: "input" | "clear" })，点击搜索图标、清除图标，或按下回车键时的回调。
- `styles`: Record<[SemanticDOM](#semantic-search) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-search) , CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

### Input.Password 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-password), string>，语义化结构 class。
- `iconRender`: (visible) => ReactNode，自定义切换按钮，默认 (visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)，版本 4.3.0。
- `styles`: Record<[SemanticDOM](#semantic-password), CSSProperties>，语义化结构 style。
- `visibilityToggle`: boolean | [VisibilityToggle](#visibilitytoggle)，是否显示切换按钮或者控制密码显隐，默认 true。

### Input.OTP 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-otp), string> | (info: { props })=> Record<[SemanticDOM](#semantic-otp), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: string，默认值。
- `disabled`: boolean，是否禁用，默认 false。
- `formatter`: (value: string) => string，格式化展示，留空字段会被 ` ` 填充。
- `separator`: ReactNode |((i: number) => ReactNode)，分隔符，在指定索引的输入框后渲染分隔符，版本 5.24.0。
- `mask`: boolean | string，自定义展示，和 `formatter` 的区别是不会修改原始值，默认 `false`，版本 `5.17.0`。
- `length`: number，输入元素数量，默认 6。
- `status`: 'error' | 'warning'，设置校验状态。
- `styles`: Record<[SemanticDOM](#semantic-otp) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-otp) , CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `size`: `small` | `middle` | `large`，输入框大小，默认 `middle`。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 `underlined`: 5.24.0。
- `value`: string，输入框内容。
- `onChange`: (value: string) => void，当输入框内容全部填充时触发回调。
- `onInput`: (value: string[]) => void，输入值变化时触发的回调，版本 `5.22.0`。

### VisibilityToggle 属性

#### 必填

- 无必填属性。

#### 可选

- `visible`: boolean，用于手动控制密码显隐，默认 false，版本 4.24。
- `onVisibleChange`: (visible) => void，显隐密码的回调，版本 4.24。

## 方法

- `blur`: 取消焦点
- `focus`: 参数 (option?: { preventScroll?: boolean, cursor?: 'start' | 'end' | 'all' })，获取焦点，版本 option - 4.10.0

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
      <Input.TextArea
        rows={4}
        placeholder="请输入备注"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="自动调整高度" />

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
    <Input.Search placeholder="搜索..." onSearch={(value) => console.log('搜索:', value)} />

    <Input.Search
      placeholder="搜索..."
      enterButton="搜索"
      onSearch={(value) => console.log('搜索:', value)}
    />

    <Input.Search placeholder="搜索..." loading enterButton="搜索" />
  </>
);
```

### 场景 6: 密码输入 (Input.Password) 与 OTP

```tsx
import { Input, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input.Password placeholder="请输入密码" />

    <Input.Password
      placeholder="输入密码"
      visibilityToggle={{
        visible: true,
        onVisibleChange: (visible) => console.log('visible:', visible),
      }}
    />

    <Input.OTP length={6} placeholder="输入验证码" />
    <Input.OTP length={6} formatter={(str) => str.toUpperCase()} />
    <Input.OTP length={4} mask showInput />
  </Space>
);
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
