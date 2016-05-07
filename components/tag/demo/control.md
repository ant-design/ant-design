---
order: 2
title: 数据生成标签
---

用数组生成一组标签。

> 使用 `afterClose` 而不是 `onClose`，删除时有动画效果。

````jsx
import { Tag, Button } from 'antd';

let index = 2;
const App = React.createClass({
  getInitialState() {
    return {
      tags: [
        { key: 1, name: '标签一' },
        { key: 2, name: '标签二' },
      ],
    };
  },
  onClose(key, e) {
    e.preventDefault();
    if (key === 1) {
      console.log('can not close it', this.state.tags);
      this.setState({ tags: [...this.state.tags] });
      return;
    }
    this.handleClose(key);
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
    return (
      <div>
        {this.state.tags.map(tag =>
          <Tag key={tag.key} closable onClose={(e) => this.onClose(tag.key, e)}
            afterClose={() => this.handleClose(tag.key)}>{tag.name}</Tag>
        )}
        <div>
          <Button onClick={this.addTag}>添加标签</Button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, mountNode);
````
