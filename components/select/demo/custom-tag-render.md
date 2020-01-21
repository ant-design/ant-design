---
order: 24
title:
  zh-CN: 隐藏已选择选项
  en-US: Custom Tag Render
---

## zh-CN

隐藏下拉列表中已选择的选项。

## en-US

Allows a custom render function to be provided for tags

```jsx
import { Select, Tag } from 'antd';

const { Option } = Select;

const OPTIONS = ['hello@world.void', '42', 'void@example.com', 'Extra'];
const children = [];
for (let i = 0; i < OPTIONS.length; i++) {
  children.push(<Option key={OPTIONS[i]}>{OPTIONS[i]}</Option>);
}

function tagRender(props) {

  const { label, getTagCloseProps } = props;
  const closeProps = getTagCloseProps();
  let color: React.CSSProperties;

  if (/\S+@\S+\.\S+/.test(label as string)) {
    color = 'green'
  } else if (!closeProps.isClosable) {
    color = 'gold'
  } else {
    color = 'red'
  }

  return (
    <Tag
      color={color}
      closable={closeProps.isClosable}
      onMouseDown={closeProps.onMouseDown}
      onClose={closeProps.onClick}
      style={{
        marginRight: 3
      }}
    >
      {label}
    </Tag>
  )
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
