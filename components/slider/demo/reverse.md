---
order: 8
title:
  zh-CN: 反向
  en-US: Reverse
---

## zh-CN

设置 `reverse` 可以将滑动条置反。

## en-US

Using `reverse` to render slider reversely.

```jsx
import { Slider, Switch } from 'antd';

class Demo extends React.Component {
  state = {
    reverse: true,
  };

  handleReverseChange = reverse => {
    this.setState({ reverse });
  };

  render() {
    const { reverse } = this.state;
    return (
      <>
        <Slider defaultValue={30} reverse={reverse} />
        <Slider range defaultValue={[20, 50]} reverse={reverse} />
        Reversed: <Switch size="small" checked={reverse} onChange={this.handleReverseChange} />
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
