---
order: 2
title:
  zh-CN: 前置/后置标签
  en-US: Pre / Post tab
---

## zh-CN

用于配置一些固定组合。

## en-US

Using pre & post tabs example.

```tsx
import { SettingOutlined } from '@ant-design/icons';
import { Button, Cascader, Input, Select, Space } from 'antd';
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
    <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
    <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    <br />
    <br />
    上方是 button + icon，下方是纯 icon
    <Input
      addonAfter={
        <Button>
          <SettingOutlined />
        </Button>
      }
      defaultValue="mysite"
    />
    <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
    <br />
    Input addon Button:
    <Input addonAfter={<Button type="primary">Submit</Button>} defaultValue="mysite" />
    <Input addonAfter={<Button>Submit</Button>} defaultValue="mysite" />
    <br />
    <br />
    <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
    <Input
      addonBefore={<Cascader placeholder="cascader" style={{ width: 150 }} />}
      defaultValue="mysite"
    />
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
