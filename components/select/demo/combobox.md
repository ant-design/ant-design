---
order: 4
title: 智能提示
---

输入框自动完成功能，下面是一个账号注册表单的例子。

````jsx
import { Select } from 'antd';
const Option = Select.Option;

const Test = React.createClass({
  getInitialState() {
    return {
      options: [],
    };
  },
  handleChange(value) {
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
  },
  render() {
    // filterOption 需要设置为 false，数据是动态设置的
    return (
      <Select combobox
        style={{ width: 200 }}
        onChange={this.handleChange}
        filterOption={false}
        placeholder="请输入账户名"
      >
        {this.state.options}
      </Select>
    );
  },
});

ReactDOM.render(<Test />, mountNode);
````
