---
order: 3
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供额外的交互能力。

## en-US

Provide additional interactive capacity.

```jsx
import { Typography } from 'antd';

const { Paragraph } = Typography;

class Demo extends React.Component {
  state = {
    str: 'This is an editable text.',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  render() {
    return (
      <div>
        <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
        <Paragraph copyable>This is a copyable text.</Paragraph>
        <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
