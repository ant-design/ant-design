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
import { Tag, Input, Button } from 'antd';

class EditableTagGroup extends React.Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) =>
          <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
            {tag}
          </Tag>
        )}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text" size="small"
            style={{ width: 65 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New</Button>}
      </div>
    );
  }
}

ReactDOM.render(<EditableTagGroup />, mountNode);
````
