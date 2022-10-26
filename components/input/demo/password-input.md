---
order: 10
title:
  zh-CN: 密码框
  en-US: Password box
---

## zh-CN

密码框。

## en-US

Input type of password.

```tsx
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Space direction="vertical">
      <Input.Password placeholder="input password" />
      <Input.Password
        placeholder="input password"
        iconRender={isVisible => (isVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Space direction="horizontal">
        <Input.Password
          placeholder="input password"
          visible={visible}
          onVisibleChange={isVisible => setVisible(isVisible)}
        />
        <Button style={{ width: 80 }} onClick={() => setVisible(prevState => !prevState)}>
          {visible ? 'Hide' : 'Show'}
        </Button>
      </Space>
    </Space>
  );
};

export default App;
```
