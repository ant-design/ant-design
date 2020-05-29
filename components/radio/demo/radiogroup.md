---
order: 1
title:
  zh-CN: 单选组合
  en-US: Radio Group
---

## zh-CN

一组互斥的 Radio 配合使用。

## en-US

A group of radio components.

```jsx
import { Radio } from 'antd';

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
    return (
      <>
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio color="magenta" value={1}>
            magenta
          </Radio>
          <Radio color="red" value={2}>
            red
          </Radio>
          <Radio color="volcano" value={3}>
            volcano
          </Radio>
          <Radio color="orange" value={4}>
            orange
          </Radio>
        </Radio.Group>
        <br />
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio color="gold" value={1}>
            gold
          </Radio>
          <Radio color="lime" value={2}>
            lime
          </Radio>
          <Radio color="green" value={3}>
            green
          </Radio>
          <Radio color="cyan" value={4}>
            cyan
          </Radio>
        </Radio.Group>
        <br />
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio color="blue" value={1}>
            blue
          </Radio>
          <Radio color="geekblue" value={2}>
            geekblue
          </Radio>
          <Radio color="purple" value={3}>
            purple
          </Radio>
          <Radio color="#2db7f5" value={4}>
            #2db7f5
          </Radio>
        </Radio.Group>
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
