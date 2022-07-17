---
order: 12
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```tsx
import { SmileOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import React, { useState } from 'react';

const { TreeNode } = TreeSelect;
const icon = <SmileOutlined />;

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      showSearch
      suffixIcon={icon}
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      <TreeNode value="parent 1" title="parent 1">
        <TreeNode value="parent 1-0" title="parent 1-0">
          <TreeNode value="leaf1" title="my leaf" />
          <TreeNode value="leaf2" title="your leaf" />
        </TreeNode>
        <TreeNode value="parent 1-1" title="parent 1-1">
          <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
        </TreeNode>
      </TreeNode>
    </TreeSelect>
  );
};

export default App;
```
