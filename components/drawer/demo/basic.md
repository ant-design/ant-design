---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

第一个抽屉。

## en-US

Basic drawer.

```jsx
import { Drawer, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          width={400}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
