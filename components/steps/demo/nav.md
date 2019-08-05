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
import { Steps } from 'antd';

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
    const { current } = this.state;
    const containerStyle = {
      border: '1px solid rgb(235, 237, 240)',
      marginBottom: 24,
    };

    return (
      <div>
        <div style={containerStyle}>
          <Steps type="navigation" size="small" current={current} onChange={this.onChange}>
            <Step
              title="Step 1"
              subTitle="00:00:05"
              status="finish"
              description="This is a description."
            />
            <Step
              title="Step 2"
              subTitle="00:01:02"
              status="process"
              description="This is a description."
            />
            <Step
              title="Step 3"
              subTitle="waiting for longlong time"
              status="wait"
              description="This is a description."
            />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="navigation" current={current} onChange={this.onChange}>
            <Step status="finish" title="Step 1" />
            <Step status="process" title="Step 2" />
            <Step status="wait" title="Step 3" />
            <Step status="wait" title="Step 4" />
          </Steps>
        </div>
        <div style={containerStyle}>
          <Steps type="navigation" size="small" current={current} onChange={this.onChange}>
            <Step status="finish" title="finish 1" />
            <Step status="finish" title="finish 2" />
            <Step status="process" title="current process" />
            <Step status="wait" title="wait" disabled />
          </Steps>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
