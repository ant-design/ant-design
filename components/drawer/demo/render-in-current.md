---
order: 2
title:
  zh-CN: 渲染在当前 DOM
  en-US: Render in current dom
---

## zh-CN

渲染在当前 dom 里。自定义容器，查看 getContainer API。

## en-US

Render in current dom. custom container, check getContainer API.

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
        <div
          style={{
            height: 200,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #eee',
            borderRadius: 2,
          }}
        >
          render in this
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
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <p>Some contents...</p>
          </Drawer>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
