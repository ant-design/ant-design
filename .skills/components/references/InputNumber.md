# InputNumber — 数字输入框

## 功能概述

通过鼠标或键盘输入内容，仅允许输入标准的数字值。支持范围限制、格式化、精度控制等功能。

## 核心概念

### 数字输入流程

```
用户输入/点击增减按钮
     ↓
 验证是否为数字
     ↓
 检查范围限制 (min/max)
     ↓
 应用精度控制 (precision)
     ↓
 触发 onChange 回调
     ↓
 更新 value 并渲染
```

### 关键数据结构

```tsx
// InputNumber 值类型
type NumericValue = number | string | null;

// 输入数值信息
interface InputNumberChangeEvent {
  value: number | null;
  previousValue?: number | null;
  source?: 'input' | 'up' | 'down'; // 值来源
}

// 高精度数值处理
interface InputNumberConfig {
  value?: number | string;
  min?: number;
  max?: number;
  step?: number | string;
  precision?: number; // 小数位数
  stringMode?: boolean; // 字符串模式（高精度）
  formatter?: (value: number) => string; // 格式化显示
  parser?: (displayValue: string) => number; // 解析值
}
```

## 输入字段

### 必填

无必填属性。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | number \| string \| null | - | 当前值（受控） |
| `defaultValue` | number \| string | - | 默认值 |
| `min` | number | `-Infinity` | 最小值 |
| `max` | number | `Infinity` | 最大值 |
| `step` | number \| string | `1` | 每次改变步数 |
| `precision` | number | - | 数值精度（小数位数） |
| `placeholder` | string | - | 占位文本 |
| `size` | `'large'` \| `'middle'` \| `'small'` | `'middle'` | 尺寸 |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` | `'outlined'` | 形态变体 |
| `disabled` | boolean | false | 禁用状态 |
| `readOnly` | boolean | false | 只读状态 |
| `controls` | boolean \| { upIcon, downIcon } | true | 显示增减按钮 |
| `keyboard` | boolean | true | 支持键盘操作 |
| `stringMode` | boolean | false | 字符串模式（高精度） |
| `prefix` | ReactNode | - | 前缀 |
| `suffix` | ReactNode | - | 后缀 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |

### 格式化相关

- `formatter`: (value, info) => string，格式化显示值（e.g., 显示千分位）。
- `parser`: (displayValue) => number，从格式化字符串提取值。
- `decimalSeparator`: string，小数点字符。

### 交互配置

- `changeOnBlur`: boolean，失焦时触发 onChange（5.11.0+），默认 `true`。
- `changeOnWheel`: boolean，滚轮改变值（5.14.0+），默认 `false`。
- `autoFocus`: boolean，自动获取焦点。
- `addonBefore`: ReactNode，前置标签。
- `addonAfter`: ReactNode，后置标签。

### 事件回调

- `onChange`: (value: number | null) => void，值变化回调。
- `onPressEnter`: (e: KeyboardEvent) => void，按下回车回调。
- `onBlur`: (e: FocusEvent) => void，失去焦点回调。
- `onFocus`: (e: FocusEvent) => void，获取焦点回调。
- `onStep`: (value: number, info: { offset: number; type: 'up' | 'down' }) => void，点击增减按钮回调。

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
      {/* 千分位分隔符 */}
      <InputNumber
        value={amount}
        onChange={setAmount}
        formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as any}
        min={0}
        max={1000000}
      />

      {/* 百分比 */}
      <InputNumber
        value={amount}
        onChange={setAmount}
        min={0}
        max={100}
        formatter={(value) => `${value}%`}
        parser={(value) => value!.replace('%', '') as any}
      />

      {/* 货币 */}
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
    {/* 一位小数 */}
    <InputNumber min={0} max={100} step={0.1} precision={1} defaultValue={10.5} placeholder="0.0" />

    {/* 两位小数 */}
    <InputNumber
      min={0}
      max={10000}
      step={0.01}
      precision={2}
      defaultValue={99.99}
      placeholder="0.00"
    />

    {/* 高精度（字符串模式）*/}
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
    {/* 添加前缀 */}
    <InputNumber prefix="+" defaultValue={100} min={0} max={100} />

    {/* 添加后缀 */}
    <InputNumber suffix="°C" defaultValue={20} min={-50} max={50} step={0.5} />

    {/* 完整标签 */}
    <InputNumber addonBefore="¥" addonAfter="CNY" defaultValue={100} min={0} />
  </Space>
);
```

### 场景 5: 禁用增减按钮与只读

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 禁用增减按钮 */}
    <InputNumber controls={false} defaultValue={10} min={0} max={100} placeholder="无增减按钮" />

    {/* 只读状态 */}
    <InputNumber readOnly defaultValue={100} placeholder="只读" />

    {/* 禁用状态 */}
    <InputNumber disabled defaultValue={50} placeholder="禁用" />

    {/* 自定义增减图标 */}
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
      {/* 滚轮改变值 */}
      <InputNumber
        value={value}
        onChange={setValue}
        changeOnWheel
        min={0}
        max={1000}
        placeholder="使用滚轮改变"
      />

      {/* 失焦触发校验 */}
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

      {/* 自定义步长和事件 */}
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

## AI 生成指引

### 场景判断表

| 用户需求           | 选择方案           | 关键属性                  |
| ------------------ | ------------------ | ------------------------- |
| 简单数值输入       | InputNumber 基础   | value, onChange, min, max |
| 金额输入（千分位） | formatter + parser | formatter, parser         |
| 百分比输入         | formatter（%）     | formatter, parser         |
| 小数点输入         | precision + step   | precision, step           |
| 高精度计算（大数） | stringMode         | stringMode, precision     |
| 范围限制           | min + max          | min, max                  |
| 无增减按钮         | controls={false}   | controls                  |
| 只读显示           | readOnly           | readOnly                  |
| 禁用状态           | disabled           | disabled                  |
| 滚轮改变           | changeOnWheel      | changeOnWheel             |
| 失焦触发           | changeOnBlur       | changeOnBlur              |
| 键盘操作           | keyboard           | keyboard                  |

### 类型导入

```tsx
import type {
  GetProp, // 获取组件属性类型
  InputNumberProps, // InputNumber props 类型
  InputNumberRef, // InputNumber ref 类型
} from 'antd';

type NumericValue = string | number | null;
```

## 使用建议

数值输入使用 InputNumber 而非 Input；需要金额格式化时使用 `formatter` 和 `parser`；高精度计算使用 `stringMode`；大范围数值使用 `stringMode` 避免精度丢失；在 Form 中配合 `Form.Item` 使用；显示货币时使用 `prefix`/`suffix`；需要控制小数位数时使用 `precision`。

## 示例代码

```tsx
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 基础用法 */}
    <InputNumber min={1} max={10} defaultValue={3} />

    {/* 格式化 */}
    <InputNumber
      defaultValue={1000}
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
    />

    {/* 小数 */}
    <InputNumber min={0} max={10} step={0.1} defaultValue={0.5} />

    {/* 前后缀 */}
    <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
  </Space>
);
```

## 返回结果

渲染一个数字输入框，支持增减按钮和格式化。
