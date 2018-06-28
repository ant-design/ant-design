---
order: 1
title:
  zh-CN: 左侧滑出
  en-US: Left Silder
---

## zh-CN

基础抽屉，点击触发按钮抽屉从左滑出，点击遮罩区关闭

## en-US

Basic drawer.

```jsx
import { Drawer, Button } from 'antd';

class App extends React.Component {
  state = { visible: false };
  toogerHotjar = () => {
    const hotjar = document.getElementById('_hj_feedback_container');
    if (hotjar.style.display === 'none') {
      hotjar.style.display = '';
    } else {
      hotjar.style.display = 'none';
    }
  };
  showDrawer = () => {
    this.toogerHotjar();
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.toogerHotjar();
      }
    );
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
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
