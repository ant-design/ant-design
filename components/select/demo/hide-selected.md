---
order: 22
title:
  zh-CN: 隐藏已选择选项
  en-US: Hide Already Selected
---

## zh-CN

隐藏下拉列表中已选择的选项。

## en-US

Hide already selected options in the dropdown.

```tsx
import { Select } from 'antd';
import React, { useState } from 'react';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: '100%' }}
    >
      {filteredOptions.map(item => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};

export default App;
```
