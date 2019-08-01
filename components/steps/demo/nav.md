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
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    const { current, current1, current2 } = this.state;
    const containerStyle = {
      padding: '0 64px',
      border: '1px solid rgb(235, 237, 240)',
      marginBottom: 24,
    };

    return (
      <div>
        <div style={containerStyle}>
          <Steps type="navigation" size="small" current={current} onChange={this.onChange}>
            <Step title="Step 1" status="finish" description="This is a description." />
            <Step title="Step 2" status="finish" description="This is a description." />
            <Step title="Step 3" description="This is a description." />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="navigation" current={current} onChange={this.onChange}>
            <Step title="Step 1" />
            <Step title="Step 2" />
            <Step title="Step 3" />
            <Step title="Step 4" />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="navigation" size="small" current={current} onChange={this.onChange}>
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
