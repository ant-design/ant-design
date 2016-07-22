---
order: 1
title: 异步加载
---

## zh-CN

匹配内容列表为异步返回时。

## en-US

asnyc

````jsx
import { Mention } from 'antd';

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
const AsyncMention = React.createClass({
  getInitialState() {
    return {
      suggestions: [],
      loading: false,
    };
  },
  fetchSuggestions(value, callback) {
    setTimeout(() => {
      callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  },
  onSearchChange(value) {
    this.fetchSuggestions(value, (suggestions) => {
      this.setState({
        suggestions,
        loading: false,
      });
    });
    this.setState({
      loading: true,
    });
  },
  render() {
    const { suggestions, loading } = this.state;
    return (
      <Mention
        style={{ width: 500, height: 100 }}
        loading={loading}
        suggestions={suggestions}
        onSearchChange={this.onSearchChange}
      />
    );
  },
});

ReactDOM.render(
  <AsyncMention />,
  mountNode
);
````
