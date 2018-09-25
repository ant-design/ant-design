---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

头像有三种尺寸，两种形状可选。

## en-US

Three sizes and two shapes are available.

````jsx
import { Avatar } from "antd";
class CustomizeAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_size: 64
    };
  }
  handle = (e) => {
    let avatar_size = parseInt(e.target.value,10);
    this.setState({ avatar_size });
  };

  render() {
    return (
      <div>
    <div style={{height:"80px"}}>
      <Avatar size={this.state.avatar_size} icon="user" />
    </div>
    <input
      type="range"
      min="32"
      max="64"
      value={this.state.avatar_size}
      name="avatar_size"
      onChange={(e) => this.handle(e)}
    />
    <div style={{height:"80px"}}>
      <Avatar shape="square" size={this.state.avatar_size} icon="user" />
    </div>
  </div>
    );
  }
}

ReactDOM.render(
  <CustomizeAvatar/>,
  mountNode
);
```

<style>
#components-avatar-demo-basic .ant-avatar {
  margin-top: 16px;
  margin-right: 16px;
}
</style>
