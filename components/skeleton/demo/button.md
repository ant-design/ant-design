---
order: 2
title:
  zh-CN: 骨架按钮和头像
  en-US: Skeleton button and avatar
---

## zh-CN

骨架按钮和头像。

## en-US

Skeleton button and avatar.

```jsx
import { Skeleton, Switch, Form, Radio } from 'antd';

class Demo extends React.Component {
  state = {
    buttonActive: false,
    avatarActive: false,
    buttonSize: 'default',
    avatarSize: 'default',
    buttonShape: 'default',
    avatarShape: 'circle',
  };

  handleActiveChange = prop => checked => {
    this.setState({ [prop]: checked });
  };

  handleSizeChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  handleShapeChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  render() {
    const {
      buttonActive,
      avatarActive,
      buttonSize,
      avatarSize,
      buttonShape,
      avatarShape,
    } = this.state;
    return (
      <div>
        <div>
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="ButtonActive">
              <Switch checked={buttonActive} onChange={this.handleActiveChange('buttonActive')} />
            </Form.Item>
            <Form.Item label="ButtonSize">
              <Radio.Group value={buttonSize} onChange={this.handleSizeChange('buttonSize')}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="ButtonShape">
              <Radio.Group value={buttonShape} onChange={this.handleShapeChange('buttonShape')}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="round">Round</Radio.Button>
                <Radio.Button value="circle">Circle</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
          <Skeleton.Button active={buttonActive} size={buttonSize} shape={buttonShape} />
        </div>
        <br />
        <div>
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="AvatarActive">
              <Switch checked={avatarActive} onChange={this.handleActiveChange('avatarActive')} />
            </Form.Item>
            <Form.Item label="AvatarSize">
              <Radio.Group value={avatarSize} onChange={this.handleSizeChange('avatarSize')}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="AvatarShape">
              <Radio.Group value={avatarShape} onChange={this.handleShapeChange('avatarShape')}>
                <Radio.Button value="square">Square</Radio.Button>
                <Radio.Button value="circle">Circle</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
          <Skeleton.Avatar active={avatarActive} size={avatarSize} shape={avatarShape} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
