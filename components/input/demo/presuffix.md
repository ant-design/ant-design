---
order: 8
title:
    zh-CN: 前缀和后缀
    en-US: prefix and suffix
---

## zh-CN

在输入框上添加前缀或后缀图标。

## en-US

Add a prefix or suffix icon on the input.

````jsx
import { Input, Icon } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      domain: '',
    };
    this.onChangeUserName = this.emitChange.bind(this, 'userName');
    this.onChangeDomain = this.emitChange.bind(this, 'domain');
  }
  emitEmpty(type) {
    this[`${type}Input`].focus();
    this.setState({
      [type]: '',
    });
  }
  emitChange(type, e) {
    this.setState({
      [type]: e.target.value,
    });
  }
  renderClearIcon(type) {
    const value = this.state[type];
    const empty = this.emitEmpty.bind(this, type);
    return value ? (
      <Icon
        type="close-circle"
        onClick={empty}
      />
    ) : null;
  }
  renderUserNameInput() {
    const { userName } = this.state;
    return (
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Enter your userName"
          prefix={<Icon type="user" />}
          suffix={this.renderClearIcon('userName')}
          value={userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
      </div>
    );
  }
  renderDomainInput() {
    const { domain } = this.state;
    return (
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Input your domain"
          addonBefore="Http://"
          addonAfter=".com"
          suffix={this.renderClearIcon('domain')}
          value={domain}
          onChange={this.onChangeDomain}
          ref={node => this.domainInput = node}
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderUserNameInput()}
        {this.renderDomainInput()}
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

````css
.anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}
.anticon-close-circle:hover {
  color: #999;
}
````
