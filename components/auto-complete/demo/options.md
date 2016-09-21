---
order: 2
title:
  zh-CN: 自定义选项
  en-US: Customized
---

## zh-CN

Datasource 的每一项是一个 `AutoComplete.Option`。通过 `AutoComplete.Option` 自定义下拉菜单。

## en-US

Items in dataSource could be an `AutoComplete.Option`.


````jsx
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;

const Complete = React.createClass({
  getInitialState() {
    return {
      result: [],
    };
  },
  handleChange(value) {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    this.setState({ result });
  },
  render() {
    const { result } = this.state;
    const dataSource = result.map((email) => {
      return <Option key={email}>{email}</Option>;
    });
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={dataSource}
        onChange={this.handleChange}
      />
    );
  },
});

ReactDOM.render(<Complete />, mountNode);
````
