---
order: 24
title:
  zh-CN: 自定义选择标签
  en-US: Custom Tag Render
---

## zh-CN

允许自定义选择标签的样式

## en-US

Allows for custom rendering of tags

```jsx
import { Select, Tag } from 'antd';

const OPTIONS = ['gold', 'cyan'];

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag
      color={value}
      closable={closable}
      onClose={onClose} 
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

ReactDOM.render(
  <Select
    mode="tags"
    tagRender={tagRender}
    defaultValue={OPTIONS}
    style={{ width: '100%' }}
  >
    {OPTIONS}
  </Select>,
  mountNode,
);
```
