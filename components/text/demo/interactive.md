---
order: 1
title:
  zh-CN: 可交互
  en-US: Interactive
---

## zh-CN

提供额外的交互能力。

## en-US

Provide additional interactive capacity.

```jsx
import { Text } from 'antd';

class Demo extends React.Component {
  state = {
    str: 'editable text',
  };

  onChange = (str) => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  render() {
    return (
      <div>
        <Text onChange={this.onChange} editable>{this.state.str}</Text>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
