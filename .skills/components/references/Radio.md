# Radio — 单选框

## 功能概述

单选框，用于在一组选项中进行单项选择。

## 输入字段

### Radio 属性

- `value`: any，选项值。
- `checked`: boolean，指定是否选中（受控）。
- `defaultChecked`: boolean，默认是否选中。
- `disabled`: boolean，禁用状态。
- `autoFocus`: boolean，自动获取焦点。
- `onChange`: (e: RadioChangeEvent) => void，变化回调。

### Radio.Group 属性

- `options`: (string | number | { label, value, disabled })[]，选项配置。
- `value`: any，当前选中值（受控）。
- `defaultValue`: any，默认选中值。
- `disabled`: boolean，禁用所有选项。
- `name`: string，input 的 name 属性。
- `size`: string，按钮样式时的尺寸，可选 `large` | `middle` | `small`。
- `buttonStyle`: string，按钮样式风格，可选 `outline` | `solid`，默认 `outline`。
- `optionType`: string，选项类型，可选 `default` | `button`，默认 `default`。
- `onChange`: (e: RadioChangeEvent) => void，变化回调。

### Radio.Button

按钮样式的单选框。

## 使用建议

选项少且用户需要看到所有选项时使用单选框；选项多时使用 Select；按钮样式用于快速切换场景。

## 示例代码

```tsx
import { useState } from 'react';
import { Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Space direction="vertical">
      {/* 基础用法 */}
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>

      {/* options 配置 */}
      <Radio.Group
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange', disabled: true },
        ]}
        value="Apple"
      />

      {/* 按钮样式 */}
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
      </Radio.Group>
    </Space>
  );
};
```

## 返回结果

渲染单选框组件，支持普通和按钮样式。
