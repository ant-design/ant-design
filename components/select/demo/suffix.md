---
order: 20
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

基本使用。

## en-US

Basic Usage.

```tsx
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';

const smileIcon = <SmileOutlined />;
const mehIcon = <MehOutlined />;
const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <>
    <Select
      suffixIcon={smileIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select suffixIcon={mehIcon} defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </Select>
  </>
);

export default App;
```
