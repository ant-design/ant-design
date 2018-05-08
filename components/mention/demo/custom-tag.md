---
order: 2
title:
  zh-CN: 自定义建议
  en-US: Customize Suggestion
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

function onSelect(suggestion, data) {
  console.log('onSelect', suggestion, data);
}

class CustomNavMention extends React.Component {
  state = {
    suggestions: [],
  }
  onSearchChange = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = webFrameworks.filter(item =>
      item.name.toLowerCase().indexOf(searchValue) !== -1
    );
    const suggestions = filtered.map(suggestion => (
      <Nav
        value={suggestion.name}
        data={suggestion}
      >
        <span>{suggestion.name} - {suggestion.type}</span>
      </Nav>
    ));
    this.setState({ suggestions });
  }
  render() {
    const { suggestions } = this.state;
    return (
      <Mention
        placeholder="@someone"
        style={{ width: '100%' }}
        suggestions={suggestions}
        onSearchChange={this.onSearchChange}
        onSelect={onSelect}
      />
    );
  }
}

ReactDOM.render(<CustomNavMention />, mountNode);
````
