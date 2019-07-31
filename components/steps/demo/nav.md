---
order: 11
title:
  zh-CN: 导航步骤
  en-US: Navgation Steps
---

## zh-CN

导航类型的步骤条。

## en-US

Navgation steps.

```jsx
import { Steps, Divider } from 'antd';

const { Step } = Steps;

class Demo extends React.Component {
  state = {
    current: 0,
    current1: 0,
    current2: 0,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  onChange1 = current1 => {
    console.log('onChange1:', current1);
    this.setState({ current1 });
  };

  onChange2 = current2 => {
    console.log('onChange2:', current2);
    this.setState({ current2 });
  };

  render() {
    const { current, current1, current2 } = this.state;
    const containerStyle = {
      padding: '8px 64px 0 64px',
      boxShadow: '1px 1px 3px #ccc',
      marginBottom: 24,
    };

    return (
      <div>
        <div style={containerStyle}>
          <Steps type="nav" size="small" current={current} onChange={this.onChange}>
            <Step title="Step 1" status="finish" description="This is a description." />
            <Step title="Step 2" status="finish" description="This is a description." />
            <Step title="Step 4" description="This is a description." />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="nav" current={current1} onChange={this.onChange1}>
            <Step title="Step 1" />
            <Step title="Step 2" />
            <Step title="Step 3" />
            <Step title="Step 4" />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="nav" size="small" current={current2} onChange={this.onChange2}>
            <Step title="Step 1" />
            <Step title="Step 2" />
            <Step title="Step 3" />
            <Step title="Step 4" />
          </Steps>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
