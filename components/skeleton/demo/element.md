---
order: 2
title:
  zh-CN: 骨架按钮、头像和输入框。
  en-US: Skeleton button and avatar
---

## zh-CN

骨架按钮、头像和输入框。

## en-US

Skeleton button, avatar and input.

```jsx
import { Skeleton, Switch, Form, Radio } from 'antd';

class Demo extends React.Component {
  state = {
    buttonActive: false,
    avatarActive: false,
    inputActive: false,
    listActive: false,
    buttonSize: 'default',
    avatarSize: 'default',
    inputSize: 'default',
    buttonShape: 'default',
    avatarShape: 'circle',
    listSize: 'default',
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
      inputActive,
      buttonSize,
      avatarSize,
      inputSize,
      buttonShape,
      avatarShape,
      listSize,
      listActive,
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
        <br />
        <div>
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="InputActive">
              <Switch checked={inputActive} onChange={this.handleActiveChange('inputActive')} />
            </Form.Item>
            <Form.Item label="InputSize">
              <Radio.Group value={inputSize} onChange={this.handleSizeChange('inputSize')}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
          <Skeleton.Input style={{ width: '300px' }} active={inputActive} size={inputSize} />
        </div>
        <br />
        <div>
          <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="ListActive">
              <Switch checked={listActive} onChange={this.handleActiveChange('listActive')} />
            </Form.Item>
            <Form.Item label="ListSize">
              <Radio.Group value={listSize} onChange={this.handleSizeChange('listSize')}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
          <Skeleton.List style={{ width: '100%' }} active={listActive} size={listSize} />
          <Skeleton.List style={{ width: '100%' }} active={listActive} size={listSize} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
