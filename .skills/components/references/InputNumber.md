# InputNumber — 数字输入框

## 功能概述

通过鼠标或键盘，输入范围内的数值。

## 应用场景

- 当需要获取标准数值时。

## 输入字段

### InputNumber 属性

#### 必填

- 无必填属性。

#### 可选

- `~~addonAfter~~`: ReactNode，带标签的 input，设置后置标签，请使用 Space.Compact 替换，版本 4.17.0。
- `~~addonBefore~~`: ReactNode，带标签的 input，设置前置标签，请使用 Space.Compact 替换，版本 4.17.0。
- `changeOnBlur`: boolean，是否在失去焦点时，触发 `onChange` 事件（例如值超出范围时，重新限制回范围并触发事件），默认 true，版本 5.11.0。
- `changeOnWheel`: boolean，允许鼠标滚轮改变数值，版本 5.14.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `controls`: boolean | { upIcon?: React.ReactNode; downIcon?: React.ReactNode; }，是否显示增减按钮，也可设置自定义箭头图标。
- `decimalSeparator`: string，小数点。
- `placeholder`: string，占位符。
- `defaultValue`: number，初始值。
- `disabled`: boolean，禁用，默认 false。
- `formatter`: function(value: number | string, info: { userTyping: boolean, input: string }): string，指定输入框展示值的格式。
- `keyboard`: boolean，是否启用键盘快捷行为，默认 true。
- `max`: number，最大值，默认 [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)。
- `min`: number，最小值，默认 [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER)。
- `parser`: function(string): number，指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用。
- `precision`: number，数值精度，配置 `formatter` 时会以 `formatter` 为准。
- `readOnly`: boolean，只读，默认 false。
- `status`: 'error' | 'warning'，设置校验状态。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `prefix`: ReactNode，带有前缀图标的 input。
- `suffix`: ReactNode，带有后缀图标的 input，版本 5.20.0。
- `size`: `large` | `middle` | `small`，输入框大小。
- `step`: number | string，每次改变步数，可以为小数，默认 1。
- `stringMode`: boolean，字符值模式，开启后支持高精度小数。同时 `onChange` 将返回 string 类型，默认 false，版本 4.13.0。
- `mode`: `'input' | 'spinner'`，展示输入框或拨轮，默认 `'input'`。
- `value`: number，当前值。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onChange`: function(value: number | string | null)，变化回调。
- `onPressEnter`: function(e)，按下回车的回调。
- `onStep`: (value: number, info: { offset: number, type: 'up' | 'down', emitter: 'handler' | 'keydown' | 'wheel' }) => void，点击上下箭头、键盘、滚轮的回调，版本 4.7.0。

### Ref 属性

#### 必填

- 无必填属性。

#### 可选

- `blur()`: 移除焦点。
- `focus()`: (option?: { preventScroll?: boolean, cursor?: 'start' | 'end' | 'all' })，获取焦点，版本 cursor - 5.22.0。
- `nativeElement`: 获取原生 DOM 元素，版本 5.17.3。

## 方法

无公开方法。

## 常见场景示例

### 场景 1: 基础数字输入

```tsx
import { useState } from 'react';
import { InputNumber } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState<number | null>(3);

  return (
    <InputNumber min={1} max={10} value={value} onChange={setValue} placeholder="请输入数字" />
  );
};
```

### 场景 2: 金额输入（格式化）

```tsx
import { useState } from 'react';
import { InputNumber } from 'antd';

const App: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(1000);

  return (
    <>
      <InputNumber
        value={amount}
        onChange={setAmount}
        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as any}
        min={0}
        max={1000000}
      />

      <InputNumber
        value={amount}
        onChange={setAmount}
        min={0}
        max={100}
        formatter={(value) => `${value}%`}
        parser={(value) => value!.replace('%', '') as any}
      />

      <InputNumber
        prefix="$"
        suffix="USD"
        value={amount}
        onChange={setAmount}
        min={0}
        precision={2}
      />
    </>
  );
};
```

### 场景 3: 小数和精度控制

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <InputNumber min={0} max={100} step={0.1} precision={1} defaultValue={10.5} placeholder="0.0" />

    <InputNumber
      min={0}
      max={10000}
      step={0.01}
      precision={2}
      defaultValue={99.99}
      placeholder="0.00"
    />

    <InputNumber
      min="0"
      max="999999999999.99"
      step="0.01"
      precision={2}
      stringMode
      defaultValue="123456789.12"
      placeholder="高精度数值"
    />
  </Space>
);
```

### 场景 4: 带前后缀和范围限制

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <InputNumber prefix="+" defaultValue={100} min={0} max={100} />

    <InputNumber suffix="°C" defaultValue={20} min={-50} max={50} step={0.5} />

    <InputNumber addonBefore="¥" addonAfter="CNY" defaultValue={100} min={0} />
  </Space>
);
```

### 场景 5: 禁用增减按钮与只读

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <InputNumber controls={false} defaultValue={10} min={0} max={100} placeholder="无增减按钮" />

    <InputNumber readOnly defaultValue={100} placeholder="只读" />

    <InputNumber disabled defaultValue={50} placeholder="禁用" />

    <InputNumber
      controls={{
        upIcon: '▲',
        downIcon: '▼',
      }}
      defaultValue={10}
      min={0}
      max={100}
    />
  </Space>
);
```

### 场景 6: 高级配置（滚轮、失焦触发、状态）

```tsx
import { useState } from 'react';
import { InputNumber, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState<number | null>(100);
  const [error, setError] = useState(false);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <InputNumber
        value={value}
        onChange={setValue}
        changeOnWheel
        min={0}
        max={1000}
        placeholder="使用滚轮改变"
      />

      <InputNumber
        value={value}
        onChange={setValue}
        onBlur={() => {
          setError((value ?? 0) < 0 || (value ?? 0) > 1000);
        }}
        status={error ? 'error' : undefined}
        min={0}
        max={1000}
      />

      <InputNumber
        value={value}
        onChange={setValue}
        onStep={(newValue, info) => {
          console.log(`通过 ${info.type} 按钮改变为:`, newValue);
        }}
        step={5}
        min={0}
        max={100}
      />
    </Space>
  );
};
```

## 使用建议

数值输入使用 InputNumber 而非 Input；需要金额格式化时使用 `formatter` 和 `parser`；高精度计算使用 `stringMode`；大范围数值使用 `stringMode` 避免精度丢失；在 Form 中配合 `Form.Item` 使用；显示货币时使用 `prefix`/`suffix`；需要控制小数位数时使用 `precision`。

## 示例代码

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <InputNumber min={1} max={10} defaultValue={3} />

    <InputNumber
      defaultValue={1000}
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
    />

    <InputNumber min={0} max={10} step={0.1} defaultValue={0.5} />

    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
  </Space>
);
```

## 返回结果

渲染一个数字输入框，支持增减按钮和格式化。
