---
order: 24
title:
  zh-CN: 允许自定义选择标签的样式
  en-US: Custom Tag Render
---

## zh-CN

...

## en-US

Allows a custom render function can be provided for tags

```jsx
import { Select, Tag } from 'antd';

const OPTIONS = ['Hello', 'World', '42'];

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  let color: React.CSSProperties;

  if (parseInt(value, 10)) {
    color = 'gold';
  } else {
    color = 'cyan';
  }

  return (
    <Tag
      color={color}
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
