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

````jsx
import { AutoComplete } from 'antd';

const Complete = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  render() {
    const { dataSource } = this.state;
    return (<AutoComplete
      dataSource={dataSource}
      style={{ width: 200 }}
      onChange={this.handleChange}
    />);
  },
});

ReactDOM.render(<Complete />, mountNode);
````
