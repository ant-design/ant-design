---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 添加状态。

## en-US

Add status with `status`.

```tsx
import React, { useState } from 'react';
import { AutoComplete, Space, Form } from 'antd';

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});
const ValidateInputs: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <AutoComplete options={options} onSearch={onSearch} status="error" style={{ width: 200 }} />
      <AutoComplete options={options} onSearch={onSearch} status="warning" style={{ width: 200 }} />
      <Form.Item status="error" hasFeedback help="Error">
        <AutoComplete options={options} onSearch={onSearch} style={{ width: 200 }} />
      </Form.Item>
      <Form.Item status="warning" hasFeedback help="Warning">
        <AutoComplete options={options} onSearch={onSearch} style={{ width: 200 }} />
      </Form.Item>
      <Form.Item status="validating" hasFeedback help="Please waiting...">
        <AutoComplete options={options} onSearch={onSearch} style={{ width: 200 }} />
      </Form.Item>
      <Form.Item status="success" hasFeedback help="It's OK">
        <AutoComplete options={options} onSearch={onSearch} style={{ width: 200 }} />
      </Form.Item>
    </Space>
  );
};

ReactDOM.render(<ValidateInputs />, mountNode);
```
