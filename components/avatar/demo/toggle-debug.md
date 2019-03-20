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
    hide: true,
    size: 'large',
    scale: 1,
  };

  toggle = () => {
    this.setState({
      hide: !this.state.hide,
    });
  }

  toggleSize = () => {
    const sizes = ['small', 'default', 'large'];
    let current = sizes.indexOf(this.state.size) + 1;
    if (current > 2) {
      current = 0;
    }
    this.setState({
      size: sizes[current],
    });
  }

  changeScale = () => {
    this.setState({
      scale: this.state.scale === 1 ? 2 : 1,
    });
  }

  render() {
    const { hide, size, scale } = this.state;
    return (
      <div>
        <Button onClick={this.toggle}>Toggle Avatar visibility</Button>
        <Button onClick={this.toggleSize}>Toggle Avatar size</Button>
        <Button onClick={this.changeScale}>Change Avatar scale</Button>
        <br />
        <br />
        <div style={{ textAlign: 'center', transform: `scale(${scale})`, marginTop: 24 }}>
          <Avatar size={size} style={{ background: '#7265e6', display: hide ? 'none' : '' }}>
            Avatar
          </Avatar>
          <Avatar size={size} src="invalid" style={{ background: '#00a2ae', display: hide ? 'none' : '' }}>
            Invalid
          </Avatar>
          <div style={{ display: hide ? 'none' : '' }}>
            <Avatar size={size} style={{ background: '#7265e6' }}>
              Avatar
            </Avatar>
            <Avatar size={size} src="invalid" style={{ background: '#00a2ae' }}>
              Invalid
            </Avatar>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
