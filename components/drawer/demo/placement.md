---
order: 1
title:
  zh-CN: 自定义位置
  en-US: Custom Placement
---

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭

## en-US

The Drawer can appear from any edge of the screen.

```jsx
import { Drawer, Button, Radio, Space } from 'antd';

class App extends React.Component {
  state = { visible: false, placement: 'left' };

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
      placement: e.target.value,
    });
  };

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
          <Radio.Group defaultValue={placement} onChange={this.onChange}>
            <Radio value="top">top</Radio>
            <Radio value="right">right</Radio>
            <Radio value="bottom">bottom</Radio>
            <Radio value="left">left</Radio>
          </Radio.Group>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
        </Space>
        <Drawer
          title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
