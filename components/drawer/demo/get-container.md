---
order: 2
title:
  zh-CN: 自定义挂载
  en-US: Custom Container
---

## zh-CN

自定义挂载，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭。

## en-US

Custom Container.

```jsx
import { Drawer, Button, Radio } from 'antd';

class App extends React.Component {
  state = { visible: false, value: '.main-wrapper' };

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

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio value={false}>current dom</Radio>
          <Radio value=".main-wrapper">selectors</Radio>
          <Radio value={document.getElementsByClassName('main-container')[0]}>HTMLElement</Radio>
        </Radio.Group>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
        </div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={this.state.value}
          style={{ position: 'absolute' }}
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
