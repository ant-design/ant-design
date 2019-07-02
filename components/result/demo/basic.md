---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

默认支持的各种状态的展示。

## en-US

The display of the default status.

```jsx
import { Result, Radio, Button } from 'antd';

const StatusMap = {
  success: {
    title: 'Successfully Purchased Cloud Server ECS!',
    subTitle:
      'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
    extra: [
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ],
  },
  info: {
    title: 'Your operation has been executed',
    extra: (
      <Button type="primary" key="console">
        Go Console
      </Button>
    ),
  },
  error: {
    title: 'Submission Failed',
    subTitle: 'Please check and modify the following information before resubmitting.',
    extra: [
      <Button type="primary" key="console">
        Go Console
      </Button>,
    ],
  },
  warning: {
    title: 'There are some problems with your operation.',
    extra: (
      <Button type="primary" key="console">
        Go Console
      </Button>
    ),
  },
};

const StatusArray = Object.keys(StatusMap);

class ResultDemo extends React.Component {
  state = {
    status: 'success',
  };

  onChange = e => {
    console.log('status checked', e.target.value);
    this.setState({
      status: e.target.value,
    });
  };

  render() {
    const { status } = this.state;
    const resultProps = StatusMap[status];
    return (
      <div>
        <p>
          <Radio.Group onChange={this.onChange} value={status}>
            {StatusArray.map(statusItem => (
              <Radio value={statusItem}>{statusItem}</Radio>
            ))}
          </Radio.Group>
        </p>
        <Result status={status} {...resultProps} />
      </div>
    );
  }
}

ReactDOM.render(<ResultDemo />, mountNode);
```
