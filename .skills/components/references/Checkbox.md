# Checkbox — 多选框

## 功能概述

收集用户的多项选择。

## 应用场景

- 在一组可选项中进行多项选择时；。
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 输入字段

### Checkbox 属性

#### 必填

- 无必填属性。

#### 可选

- `checked`: boolean，指定当前是否选中，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultChecked`: boolean，初始是否选中，默认 false。
- `disabled`: boolean，失效状态，默认 false。
- `indeterminate`: boolean，设置 indeterminate 状态，只负责样式控制，默认 false。
- `onChange`: (e: CheckboxChangeEvent) => void，变化时的回调函数。
- `onBlur`: function()，失去焦点时的回调。
- `onFocus`: function()，获得焦点时的回调。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `blur()`: 移除焦点。
- `focus()`: 获取焦点。
- `nativeElement`: 返回 Checkbox 的 DOM 节点，版本 5.17.3。

### Checkbox.Group 属性

#### 必填

- 无必填属性。

#### 可选

- `defaultValue`: (string | number)\[]，默认选中的选项，默认 \[]。
- `disabled`: boolean，整组失效，默认 false。
- `name`: string，CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性。
- `options`: string\[] | number\[] | Option\[]，指定可选项，默认 \[]。
- `value`: (string | number | boolean)\[]，指定选中的选项，默认 \[]。
- `title`: `string`，选项的 title。
- `className`: `string`，选项的类名，版本 5.25.0。
- `style`: `React.CSSProperties`，选项的样式。
- `onChange`: (checkedValue: T[]) => void，变化时的回调函数。

## 方法

无公开方法。

## 使用建议

单个多选框使用 Checkbox；多个相关选项使用 Checkbox.Group；全选功能使用 `indeterminate` 状态。

## 示例代码

```tsx
import { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps, GetProp } from 'antd';

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const App: React.FC = () => {
  const [checkedList, setCheckedList] = useState<string[]>(['Apple', 'Orange']);

  const checkAll = options.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? options.map((o) => o.value) : []);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Checkbox.Group
        options={options}
        value={checkedList}
        onChange={(list) => setCheckedList(list as string[])}
      />
    </>
  );
};
```

## 返回结果

渲染多选框组件，支持单选和多选场景。
