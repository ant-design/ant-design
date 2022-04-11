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
import { Skeleton, Space, Divider, Switch, Form, Radio, Button, Input } from 'antd';

class Demo extends React.Component {
  state = {
    active: false,
    block: false,
    size: 'default',
    buttonShape: 'default',
    avatarShape: 'circle',
  };

  handleActiveChange = checked => {
    this.setState({ active: checked });
  };

  handleBlockChange = checked => {
    this.setState({ block: checked });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleShapeChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  render() {
    const { active, size, buttonShape, avatarShape, block } = this.state;
    return (
      <>
        <Space>
          <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
          <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
          <Skeleton.Input active={active} size={size} />
        </Space>
        <br />
        <br />
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        <br />
        <br />
        <Skeleton.Input active={active} size={size} block={block} />
        <br />
        <br />
        <Skeleton.Image />
        <Divider />
        <Form layout="inline" style={{ margin: '16px 0' }}>
          <Form.Item label="Active">
            <Switch checked={active} onChange={this.handleActiveChange} />
          </Form.Item>
          <Form.Item label="Button and Input Block">
            <Switch checked={block} onChange={this.handleBlockChange} />
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

export default () => <Demo />;
```
