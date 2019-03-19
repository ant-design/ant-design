---
order: 4
title:
  zh-CN: 隐藏情况下计算字符对齐
  en-US: Calculate text style when hiding
debug: true
---

## zh-CN

切换 Avatar 显示的时候，文本样式应该居中并正确调整字体大小。

## en-US

Text inside Avatar should be set a proper font size when toggle it's visibility.

````jsx
import { Avatar, Button } from 'antd';

class App extends React.Component {
  state = {
    hide: false,
  };

  toggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  render() {
    const { hide } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>Toggle Avatar</Button>
        <Avatar size="large" style={{ background: '#7265e6', display: hide ? 'none' : '' }}>
          Avatar
        </Avatar>
        <Avatar size="large" src="invalid" style={{ background: '#00a2ae', display: hide ? 'none' : '' }}>
          Invalid src
        </Avatar>
        <div style={{ display: hide ? 'none' : '' }}>
          <Avatar size="large" style={{ background: '#7265e6' }}>
            Avatar
          </Avatar>
          <Avatar size="large" src="invalid" style={{ background: '#00a2ae' }}>
            Invalid src
          </Avatar>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
