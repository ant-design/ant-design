---
order: 3
title: 头像
---

## zh-CN

自定义建议（含头像）

注意，自定义建议时，onSearchChange 必须不能为空。

## en-US

Customize suggestions

````jsx
import { Mention } from 'antd';
const Nav = Mention.Nav;

const webFrameworks = [
  { name: 'React', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg' },
  { name: 'Angular', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png' },
  { name: 'Laravel', type: 'PHP', icon: 'http://laravel-china.org/assets/img/laravel-logo.png' },
  { name: 'Flask', type: 'Python', icon: 'https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png' },
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
      <Nav value={suggestion.name} data={suggestion} disabled={suggestion.disabled}>
        <span>
          <img alt={suggestion.name} style={{ height: 16, width: 16, marginRight: 5, float: 'left' }} src={suggestion.icon} />
          {suggestion.name} - {suggestion.type}
        </span>
      </Nav>);
    this.setState({
      suggestions,
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
  <CustomNavMention />,
  mountNode
);
````
