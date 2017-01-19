---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。通过 dataSource 设置自动完成的数据源

## en-US

Basic Usage, set datasource of autocomplete with `dataSource` property.

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
  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={this.handleChange}
        placeholder="input here"
      />
    );
  },
});

ReactDOM.render(<Complete />, mountNode);
````
