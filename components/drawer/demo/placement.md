---
order: 1
title:
  zh-CN: 自定义位置
  en-US: Custom Placement
---

## zh-CN

自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭

## en-US

Basic drawer.

```jsx
import { Drawer, Button, Select } from 'antd';

const Option = Select.Option;

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

  onChange = (placement) => {
    this.setState({
      placement,
    });
  }

  render() {
    return (
      <div>
        <Select
          style={{ width: 120, marginRight: 8 }}
          defaultValue={this.state.placement}
          onChange={this.onChange}
        >
          <Option value="top">上面 top</Option>
          <Option value="right">右边 right</Option>
          <Option value="bottom">下面 bottom</Option>
          <Option value="left">左边 left</Option>
        </Select>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={this.state.placement}
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
