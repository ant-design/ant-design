---
order: 4
title:
  zh-CN: Avatar.Group
  en-US: Avatar.Group
---

## zh-CN

头像组合展现。

## en-US

Avatar group display.

```tsx
import { Avatar, Switch, Divider } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

class Demo extends React.Component {
  render() {
    return (
      <>
        <Avatar.Group style={{ marginTop: 16 }}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
        <Divider />
        <Avatar.Group
          maxLength={2}
          excessItemsStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
