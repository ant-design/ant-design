---
order: 2
title: 
  zh-CN: 动态添加和删除
  en-US: Dynamically add and remove
---

## zh-CN

用数组生成一组标签，可以动态添加和删除。

使用 `afterClose` 删除时有动画效果。

## en-US

Generating a set of tag by array, you can dynamically add and remove.

Using 'afterClose' property, There are animated when a tag was removed.

````jsx
import { Tag, Button } from 'antd';

let index = 3;
const App = React.createClass({
  getInitialState() {
    return {
      tags: [
        { key: 1, name: 'Unremovable' },
        { key: 2, name: 'Tag 2' },
        { key: 3, name: 'Tag 3' },
      ],
    };
  },
  handleClose(key) {
    const tags = [...this.state.tags].filter(tag => (tag.key !== key) && tag);
    console.log(tags);
    this.setState({ tags });
  },
  addTag() {
    const tags = [...this.state.tags];
    index += 1;
    tags.push({ key: index, name: `New tag ${index}` });
    this.setState({ tags });
  },
  render() {
    const { tags } = this.state;
    return (
      <div>
        {tags.map(tag =>
          <Tag key={tag.key} closable={tag.key !== 1} afterClose={() => this.handleClose(tag.key)}>
            {tag.name}
          </Tag>
        )}
        <Button size="small" type="dashed" onClick={this.addTag}>+ New tag</Button>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
