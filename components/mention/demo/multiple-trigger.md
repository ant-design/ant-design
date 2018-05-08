---
order: 8
title:
  zh-CN: 自定义触发字符
  en-US: Customize Trigger Token
---

## zh-CN

通过 `prefix` 属性自定义触发字符。默认为 `@`, 可以定义为数组。

## en-US

Customize Trigger Token by `prefix` props. Default to `@`, `Array<string>` also supported.

````jsx
import { Mention } from 'antd';
const { toString } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
const tags = ['1.0', '2.0', '3.0'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
    };
  }
  onSearchChange = (value, trigger) => {
    console.log('onSearchChange', value, trigger);
    const dataSource = trigger === '@' ? users : tags;
    this.setState({
      suggestions: dataSource.filter(item => item.indexOf(value) !== -1),
    });
  }
  render() {
    return (
      <Mention
        style={{ width: '100%' }}
        onChange={onChange}
        placeholder="input @ to mention people, # to mention tag"
        prefix={['@', '#']}
        onSearchChange={this.onSearchChange}
        suggestions={this.state.suggestions}
        onSelect={onSelect}
      />
    );
  }
}

ReactDOM.render(
  <App />
, mountNode);
````
