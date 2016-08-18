---
order: 2
title: 动态添加和删除
---

用数组生成一组标签，可以动态添加和删除。

> 使用 `afterClose` 删除时有动画效果。

````jsx
import { Tag, Button } from 'antd';

let index = 3;
const App = React.createClass({
  getInitialState() {
    return {
      tags: [
        { key: 1, name: '不可移除' },
        { key: 2, name: '标签二' },
        { key: 3, name: '标签三' },
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
    tags.push({ key: index, name: `新标签${index}` });
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
        <Button size="small" type="dashed" onClick={this.addTag}>+ 添加标签</Button>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
