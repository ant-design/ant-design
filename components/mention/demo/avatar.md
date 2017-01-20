---
order: 3
title: 
  zh-CN: 头像
  en-US: Icon Image
---

## zh-CN

自定义建议（含头像）

注意，自定义建议时，onSearchChange 必须不能为空。

## en-US

Customize suggestions

````__react
import { Mention } from 'antd';
const Nav = Mention.Nav;

const webFrameworks = [
  { name: 'React', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg' },
  { name: 'Angular', type: 'JavaScript', icon: 'https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png' },
  { name: 'Dva', type: 'Javascript', icon: 'https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png' },
  { name: 'Flask', type: 'Python', icon: 'https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png' },
];

const CustomNavMention = React.createClass({
  getInitialState() {
    return {
      suggestions: [],
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
    const { suggestions } = this.state;
    return (
      <Mention
        style={{ width: '100%', height: 100 }}
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
