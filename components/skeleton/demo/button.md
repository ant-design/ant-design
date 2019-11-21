---
order: 2
title:
  zh-CN: 骨架按钮
  en-US: Skeleton Button
---

## zh-CN

骨架按钮。

## en-US

Skeleton Button.

```jsx
import { Skeleton, Switch, Form, Radio } from 'antd';

class Demo extends React.Component {
  state = {
    active: false,
    size: 'default',
    shape: 'default',
  };

  handleActiveChange = checked => {
    this.setState({ active: checked });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleShapeChange = e => {
    this.setState({ shape: e.target.value });
  };

  render() {
    const { active, size, shape } = this.state;
    return (
      <div>
        <Form layout="inline" style={{ marginBottom: 16 }}>
          <Form.Item label="Active">
            <Switch checked={active} onChange={this.handleActiveChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Shape">
            <Radio.Group value={shape} onChange={this.handleShapeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Skeleton.Button {...this.state} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
