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

```jsx
import { AutoComplete, Input } from 'antd';

const { TextArea } = Input;

function onSelect(value) {
  console.log('onSelect', value);
}

class Complete extends React.Component {
  state = {
    options: [],
  };

  handleSearch = value => {
    this.setState({
      options: !value
        ? []
        : [{ value }, { value: value + value }, { value: value + value + value }],
    });
  };

  handleKeyPress = ev => {
    console.log('handleKeyPress', ev);
  };

  render() {
    const { options } = this.state;
    return (
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
      >
        <TextArea
          placeholder="input here"
          className="custom"
          style={{ height: 50 }}
          onKeyPress={this.handleKeyPress}
        />
      </AutoComplete>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
```
