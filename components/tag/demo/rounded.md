---
order: 8
title:
  zh-CN: 圆形
  en-US: Rounded
---

## zh-CN

通过使用 `rounded` 道具使用圆形标签

## en-US

Use rounded Tag by using the `rounded` props.

```jsx
import { Tag } from 'antd';
import { FacebookOutlined, SyncOutlined } from '@ant-design/icons';

function preventDefault(e) {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
}

ReactDOM.render(
  <>
    <Tag rounded>Tag 1</Tag>
    <Tag color="#f50" rounded>
      #f50
    </Tag>
    <Tag rounded icon={<FacebookOutlined />} color="#3b5999">
      Facebook
    </Tag>
    <Tag rounded icon={<SyncOutlined spin />} color="processing">
      processing
    </Tag>
    <Tag rounded closable onClose={preventDefault}>
      Prevent Default
    </Tag>
  </>,
  mountNode,
);
```
