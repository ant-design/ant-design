---
order: 4
title:
  zh-CN: 智能提示
  en-US: Automatic completion
---

## zh-CN

输入框自动完成功能，下面是一个账号注册表单的例子。

推荐使用 [AutoComplete](/components/auto-complete/) 组件。

## en-US

Automatic completion of select input.

Using the [AutoComplete](/components/auto-complete/) component is strongly recommended instead as it is more flexible and capable.


````jsx
import { Select } from 'antd';
const Option = Select.Option;

class App extends React.Component {
  state = {
    options: [],
  }
  handleChange = (value) => {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ options });
  }
  render() {
    // filterOption needs to be false，as the value is dynamically generated
    return (
      <Select
        mode="combobox"
        style={{ width: 200 }}
        onChange={this.handleChange}
        filterOption={false}
        placeholder="Enter the account name"
      >
        {this.state.options}
      </Select>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
