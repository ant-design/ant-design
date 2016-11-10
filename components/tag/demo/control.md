---
order: 2
title:
  zh-CN: 动态添加和删除
  en-US: Add & Remove Dynamically
---

## zh-CN

用数组生成一组标签，可以动态添加和删除，通过监听删除动画结束的事件 `afterClose` 实现。

## en-US

Generating a set of Tags by array, you can add and remove dynamically.
It's based on `afterClose` event, which will be triggered while the close animation end.

````jsx
import { Tag, Button } from 'antd';

let index = 3;
class EditableTagGroup extends React.Component {
  state = {
    tags: [
      { key: 1, name: 'Unremovable' },
      { key: 2, name: 'Tag 2' },
      { key: 3, name: 'Tag 3' },
    ],
  };

  handleClose = (key) => {
    const tags = [...this.state.tags].filter(tag => (tag.key !== key) && tag);
    console.log(tags);
    this.setState({ tags });
  }

  addTag = () => {
    index += 1;
    const tags = [...this.state.tags, { key: index, name: `New tag ${index}` }];
    console.log(tags);
    this.setState({ tags });
  }

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
  }
}

ReactDOM.render(<EditableTagGroup />, mountNode);
````
