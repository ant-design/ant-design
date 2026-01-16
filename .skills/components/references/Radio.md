# Radio — 单选框

## 功能概述

用于在多个备选项中选中单个状态。

## 应用场景

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 输入字段

### Radio/Radio.Button 属性

#### 必填

- 无必填属性。

#### 可选

- `checked`: boolean，指定当前是否选中，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数，版本 6.0.0。
- `defaultChecked`: boolean，初始是否选中，默认 false。
- `disabled`: boolean，禁用 Radio，默认 false。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数，版本 6.0.0。
- `value`: any，根据 value 进行比较，判断是否选中。

### Radio 属性

#### 必填

- 无必填属性。

#### 可选

- `block`: boolean，将 RadioGroup 宽度调整为其父宽度的选项，默认 false，版本 5.21.0。
- `buttonStyle`: `outline` | `solid`，RadioButton 的风格样式，目前有描边和填色两种风格，默认 `outline`。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数，版本 6.0.0。
- `defaultValue`: any，默认选中的值。
- `disabled`: boolean，禁选所有子单选器，默认 false。
- `name`: string，RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性。若未设置，则将回退到随机生成的名称。
- `options`: string\[] | number\[] | Array<[CheckboxOptionType](#checkboxoptiontype)>，以配置形式设置子元素。
- `optionType`: `default` | `button`，用于设置 Radio `options` 类型，默认 `default`，版本 4.4.0。
- `orientation`: `horizontal` | `vertical`，排列方向，默认 `horizontal`。
- `size`: `large` | `middle` | `small`，大小，只对按钮样式生效。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数，版本 6.0.0。
- `value`: any，用于设置当前选中的值。
- `vertical`: boolean，值为 true，Radio Group 为垂直方向。与 `orientation` 同时存在，以 `orientation` 优先，默认 false。
- `onChange`: function(e:Event)，选项变化时的回调函数。
- `blur()`: 移除焦点。
- `focus()`: 获取焦点。

### CheckboxOptionType 属性

#### 必填

- 无必填属性。

#### 可选

- `label`: `string`，用于作为 Radio 选项展示的文本，版本 4.4.0。
- `value`: `string` | `number` | `boolean`，关联 Radio 选项的值，版本 4.4.0。
- `style`: `React.CSSProperties`，应用到 Radio 选项的 style，版本 4.4.0。
- `className`: `string`，Radio 选项的类名，版本 5.25.0。
- `disabled`: `boolean`，指定 Radio 选项是否要禁用，默认 `false`，版本 4.4.0。
- `title`: `string`，添加 Title 属性值，版本 4.4.0。
- `id`: `string`，添加 Radio Id 属性值，版本 4.4.0。
- `onChange`: `(e: CheckboxChangeEvent) => void;`，当 Radio Group 的值发送改变时触发，版本 4.4.0。
- `required`: `boolean`，指定 Radio 选项是否必填，默认 `false`，版本 4.4.0。

## 方法

无公开方法。

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
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>

      <Radio.Group
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
          { label: 'Orange', value: 'Orange', disabled: true },
        ]}
        value="Apple"
      />

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
