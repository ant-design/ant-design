# Checkbox — 多选框

## 功能概述

多选框，用于在一组选项中进行多项选择。

## 输入字段

### Checkbox 属性

- `checked`: boolean，指定是否选中（受控）。
- `defaultChecked`: boolean，默认是否选中。
- `disabled`: boolean，禁用状态。
- `indeterminate`: boolean，半选状态（用于全选）。
- `autoFocus`: boolean，自动获取焦点。
- `onChange`: (e: CheckboxChangeEvent) => void，变化回调。

### Checkbox.Group 属性

- `options`: (string | number | { label, value, disabled })[]，选项配置。
- `value`: (string | number)[]，选中的值（受控）。
- `defaultValue`: (string | number)[]，默认选中的值。
- `disabled`: boolean，禁用所有选项。
- `name`: string，input 的 name 属性。
- `onChange`: (checkedValues) => void，变化回调。

### CheckboxChangeEvent

```tsx
interface CheckboxChangeEvent {
  target: {
    checked: boolean;
    value?: any;
  };
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}
```

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
