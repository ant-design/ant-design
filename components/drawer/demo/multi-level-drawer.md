---
order: 5
title:
  zh-CN: 多层抽屉
  en-US: Multi-level drawer
---

## zh-CN

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

## en-US

Open a new drawer on top of an existing drawer to handle multi branch tasks.

```jsx
import { Drawer, Button } from 'antd';

class App extends React.Component {
  state = { visible: false, childrenDrawer: false };

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

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Drawer
          title="Multi-level drawer"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose}>Cancel</Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Button type="primary" onClick={this.showChildrenDrawer}>
            Two-level drawer
          </Button>
          <Drawer
            title="Two-level Drawer"
            width={320}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            This is two-level drawer
          </Drawer>
        </Drawer>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.site-multi-level-drawer-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  border-radius: 0 0 4px 4px;
  background: #fff;
}

.site-multi-level-drawer-footer button:first-child {
  margin-right: 8px;
}

[class*='-drawer-rtl'] .site-multi-level-drawer-footer {
  text-align: left;
  right: 0;
  left: auto;
}

[class*='-drawer-rtl'] .site-multi-level-drawer-footer button:first-child {
  margin-right: 0;
  margin-left: 8px;
}
```

<style>
[data-theme="dark"] .site-multi-level-drawer-footer {
  border-top: 1px solid #303030;
  background: #1f1f1f;
}
</style>
