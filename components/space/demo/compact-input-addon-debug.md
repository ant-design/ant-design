---
order: 99
title:
  zh-CN: 调试 Input 前置/后置标签
  en-US: Input addon debug
debug: true
---

## zh-CN

调试 Input 前置/后置标签。

## en-US

Input addon debug.

```tsx
import { SettingOutlined, CopyOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space, Button } from 'antd';
import React from 'react';

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

const App: React.FC = () => (
  <Space direction="vertical">
    <Space.Compact>
      <Button>Prefix</Button>
      <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact>
      <Input placeholder="prefix" />
      <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
      <Button icon={<CopyOutlined />} />
    </Space.Compact>
    <Space.Compact>
      <Input.Search />
      <Input.Search />
      <Button icon={<CopyOutlined />} />
    </Space.Compact>
    <Space.Compact>
      <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
      <Button type="primary">Submit</Button>
      <Input placeholder="suffix" addonAfter={<SettingOutlined />} />
    </Space.Compact>
    <Space.Compact>
      <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact>
      <Button>Prefix</Button>
      <Input
        addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
        defaultValue="mysite"
      />
      <Button type="primary">Submit</Button>
    </Space.Compact>
  </Space>
);

export default App;
```

```css
.select-before {
  width: 90px;
}

.select-after {
  width: 80px;
}

[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}
```
