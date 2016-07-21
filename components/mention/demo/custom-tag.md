---
order: 2
title: 自定义建议
---

## zh-CN

自定义建议

注意，自定义建议时，onSearchChange 必须不能为空。

## en-US

Customize suggestions.

````jsx
import { Mention } from 'antd';
const Nav = Mention.Nav;

const webFrameworks = [
  { name: 'React', type: 'JavaScript' },
  { name: 'Angular', type: 'JavaScript' },
  { name: 'Laravel', type: 'PHP', disabled: true },
  { name: 'Flask', type: 'Python' },
  { name: 'Django', type: 'Python' },
];

const CustomNavMention = React.createClass({
  getInitialState() {
    return {
      suggestions: [],
      loading: false,
    };
  },
  onSearchChange(value) {
    const searchValue = value.toLowerCase();
    const filtered = webFrameworks.filter(item =>
      item.name.toLowerCase().indexOf(searchValue) !== -1
    );
    const suggestions = filtered.map(suggestion =>
      <Nav value={suggestion.name} >
        <span>{suggestion.name} - {suggestion.type} </span>
      </Nav>);
    this.setState({ suggestions });
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
  <CustomNavMention />,
  mountNode
);
````
