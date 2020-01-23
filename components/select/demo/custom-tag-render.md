---
order: 24
title:
  zh-CN: '...'
  en-US: Custom Tag Render
---

## zh-CN

...

## en-US

Allows a custom render function can be provided for tags

```jsx
import { Select, Tag } from 'antd';

const { Option } = Select;

const OPTIONS = ['Hello', '42', 'World', 'Extra'];
const children = [];
for (let i = 0; i < OPTIONS.length; i++) {
  children.push(<Option key={OPTIONS[i]}>{OPTIONS[i]}</Option>);
}

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  let color: React.CSSProperties;

  if (!closable) {
    color = 'gold';
  } else if (parseInt(value, 10)) {
    color = 'green';
  } else {
    color = 'red';
  }

  return (
    <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    mode="tags"
    style={{ width: '100%' }}
    placeholder="Enter emails"
    defaultValue={OPTIONS}
    tagRender={tagRender}
    maxTagCount={3}
    onChange={handleChange}
  >
    {children}
  </Select>,
  mountNode,
);
```
