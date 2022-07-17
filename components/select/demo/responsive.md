---
order: 24
title:
  zh-CN: 响应式 maxTagCount
  en-US: Responsive maxTagCount
---

## zh-CN

多选下通过响应式布局让选项自动收缩。该功能对性能有所消耗，不推荐在大表单场景下使用。

## en-US

Auto collapse to tag with responsive case. Not recommend use in large form case since responsive calculation has a perf cost.

```tsx
import type { SelectProps } from 'antd';
import { Select, Space } from 'antd';
import React, { useState } from 'react';

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}

const App: React.FC = () => {
  const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);

  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue);
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Select {...selectProps} />
      <Select {...selectProps} disabled />
    </Space>
  );
};

export default App;
```
