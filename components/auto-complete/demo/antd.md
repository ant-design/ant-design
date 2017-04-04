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

````jsx
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  handleChange = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200, height: 50 }}
        onSelect={onSelect}
        onChange={this.handleChange}
        placeholder="input here"
      >
        <textarea onKeyPress={this.handleKeyPress} style={{ height: 50 }} />
      </AutoComplete>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
````
