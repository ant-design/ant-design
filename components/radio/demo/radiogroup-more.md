---
order: 2
title:
  zh-CN: Radio.Group 垂直
  en-US: Vertical Radio.Group
---

## zh-CN

垂直的 Radio.Group，配合更多输入框选项。

## en-US

Vertical Radio.Group, with more radios.

```jsx
import { Radio, Input } from 'antd';

class App extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { value } = this.state;
    return (
      <Radio.Group onChange={this.onChange} value={value}>
        <Radio style={radioStyle} value={1}>
          Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
          Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
          Option C
        </Radio>
        <Radio style={radioStyle} value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Radio.Group>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
