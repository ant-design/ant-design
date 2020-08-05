---
order: 2.1
title:
  zh-CN: 按钮/头像/输入框/图像
  en-US: Button/Avatar/Input/Image
---

## zh-CN

骨架按钮、头像、输入框和图像。

## en-US

Skeleton Button, Avatar, Input and Image.

```jsx
import { Space, Divider, Switch, Form, Radio } from '@allenai/varnish';
import Skeleton from '..';
// TODO: put back after deploy // import { Skeleton, Space, Divider, Switch, Form, Radio } from '@allenai/varnish';

class Demo extends React.Component {
  state = {
    active: false,
    size: 'default',
    buttonShape: 'default',
    avatarShape: 'circle',
  };

  handleActiveChange = checked => {
    this.setState({ active: checked });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleShapeChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  render() {
    const { active, size, buttonShape, avatarShape } = this.state;
    return (
      <>
        <Space>
          <Skeleton.Button active={active} size={size} shape={buttonShape} />
          <Skeleton.Button active={active} size={size} shape={buttonShape} />
          <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
          <Skeleton.Input style={{ width: 200 }} active={active} size={size} />
        </Space>
        <br />
        <br />
        <Skeleton.Image />
        <Divider />
        <Form layout="inline" style={{ margin: '16px 0' }}>
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
          <Form.Item label="Button Shape">
            <Radio.Group value={buttonShape} onChange={this.handleShapeChange('buttonShape')}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar Shape">
            <Radio.Group value={avatarShape} onChange={this.handleShapeChange('avatarShape')}>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
