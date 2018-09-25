---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

头像有三种尺寸，两种形状可选。
头像支持自定义大小。
## en-US

Three sizes and two shapes are available.
Avatar support custom size

```jsx
import { Avatar } from "antd";
class CustomizeAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_size: 64
    };
  }
  handle = e => {
    let avatar_size = parseInt(e.target.value, 10);
    this.setState({ avatar_size });
  };

  render() {
    return (
      <div>
        <div>
          <Avatar size={this.state.avatar_size} icon="user" />
          <Avatar size="large" icon="user" />
          <Avatar icon="user" />
          <Avatar size="small" icon="user" />
        </div>
        Custom size: <br />
        <input
          type="range"
          min="32"
          max="64"
          value={this.state.avatar_size}
          name="avatar_size"
          onChange={e => this.handle(e)}
        />
        <div>
          <Avatar shape="square" size={this.state.avatar_size} icon="user" />
          <Avatar shape="square" size="large" icon="user" />
          <Avatar shape="square" icon="user" />
          <Avatar shape="square" size="small" icon="user" />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<CustomizeAvatar />, mountNode);
```

<style>
#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>
