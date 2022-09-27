---
order: 3
title:
  zh-CN: input 前置/后置标签
  en-US: Pre / Post tab
---

## zh-CN

input 前置/后置标签。

## en-US

Using pre & post tabs example.

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
    <Space.Compact block>
      <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact block>
      <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
      <Button icon={<CopyOutlined />} />
    </Space.Compact>
    <Space.Compact block>
      <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
    </Space.Compact>
    <Space.Compact block>
      <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact block>
      <Input
        addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
        defaultValue="mysite"
      />
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
