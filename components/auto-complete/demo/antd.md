---
order: 3
title:
  zh-CN: 自定义输入组件
  en-US: Customize Input Component
---

## zh-CN

自定义输入组件。

## en-US

Customize Input Component

````__react
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

const Complete = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  handleKeyPress(ev) {
    console.log('handleKeyPress', ev);
  },
  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={this.handleChange}
        placeholder="input here"
      >
        <textarea onKeyPress={this.handleKeyPress} style={{ height: 50 }}/>
      </AutoComplete>
    );
  },
});

ReactDOM.render(<Complete />, mountNode);
````
