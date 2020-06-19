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

class BaseExample extends React.Component {
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
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Drawer
          title="Multi-level drawer"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
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
      </>
    );
  }
}

class PushExample extends React.Component {
  state = { visibles: [false, false, false, false], showThreeLevel: true };

  showDrawer = index => () => {
    this.setState(({ visibles }) => ({
      visibles: visibles.map((visible, i) => (index === i ? true : visible)),
    }));
  };

  onClose = index => () => {
    this.setState(({ visibles }) => ({
      visibles: visibles.map((visible, i) => (index === i ? false : visible)),
    }));
  };

  removeThreeLevel = () => {
    this.setState({ showThreeLevel: false });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer(0)} style={{ marginLeft: 10 }}>
          Custom push
        </Button>
        <Drawer
          title="Multi-level Drawer"
          push={{ distance: 256 }}
          mask={false}
          onClose={this.onClose(0)}
          visible={this.state.visibles[0]}
        >
          <Button type="primary" onClick={this.showDrawer(1)}>
            Two-level drawer
          </Button>
          <Drawer
            title="Two-level Drawer"
            push={{ distance: 256 }}
            mask={false}
            onClose={this.onClose(1)}
            visible={this.state.visibles[1]}
          >
            <Button type="primary" onClick={this.showDrawer(2)}>
              Three-level drawer
            </Button>
            {this.state.showThreeLevel && (
              <Drawer
                title="Three-level Drawer"
                push={{ distance: 256 }}
                mask={false}
                onClose={this.onClose(2)}
                visible={this.state.visibles[2]}
              >
                <Button type="primary" onClick={this.showDrawer(3)}>
                  Four-level drawer
                </Button>
                <Drawer
                  title="Four-level Drawer"
                  mask={false}
                  onClose={this.onClose(3)}
                  visible={this.state.visibles[3]}
                >
                  <Button type="primary" onClick={this.removeThreeLevel}>
                    remove Three-level
                  </Button>
                </Drawer>
              </Drawer>
            )}
          </Drawer>
        </Drawer>
      </>
    );
  }
}

function App() {
  return (
    <>
      <BaseExample />
      <PushExample />
    </>
  );
}

ReactDOM.render(<App />, mountNode);
```

<style>
[data-theme="dark"] .site-multi-level-drawer-footer {
  border-top: 1px solid #303030;
  background: #1f1f1f;
}
</style>
