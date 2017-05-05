---
order: 4
title:
  zh-CN: 热门标签
  en-US: Hot Tags
---

## zh-CN

选择你感兴趣的话题。

## en-US

Select your favourite topics.

````jsx
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

const tagsFromServer = ['Movie', 'Books', 'Music'];

class HotTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div>
        <strong>Hots: </strong>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<HotTags />, mountNode);
````
