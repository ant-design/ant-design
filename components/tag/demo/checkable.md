---
order: 3
title:
  zh-CN: 可选择
  en-US: Checkable
---

## zh-CN

可通过 Tag.CheckableTag 实现类似 Checkbox 的效果，该组件为完全受控组件，不支持非受控用法。

## en-US

Tag.CheckableTag works like Checkbox, and it is an absolute controlled component and has no uncontrolled mode.

````__react
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

class UncontrolledCheckableTag extends React.Component {
  state = { checked: false };
  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

ReactDOM.render(
  <div>
    <CheckableTag>Unchecked</CheckableTag>
    <CheckableTag checked>Checked</CheckableTag>
    <UncontrolledCheckableTag>Uncontrolled</UncontrolledCheckableTag>
  </div>,
  mountNode
);
````
