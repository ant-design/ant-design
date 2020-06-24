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
import { Avatar, Switch } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

class Demo extends React.Component {
  state = { hovered: false };

  change = value => {
    this.setState({ hovered: value });
  };

  render() {
    return (
      <>
        <div>
          Hovered：
          <Switch checked={this.state.loading} onChange={this.change} />
        </div>
        <Avatar.Group hovered={this.state.hovered} style={{ marginTop: 16 }}>
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
