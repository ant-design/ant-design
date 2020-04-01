---
order: 99
title:
  zh-CN: 废弃的 Block 组
  en-US: Deprecated Button Group
debug: true
---

## zh-CN

Debug usage

## en-US

Debug usage

```jsx
import { Button } from 'antd';

function getGroup(props) {
  return (
    <div>
      <Button.Group {...props}>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
      </Button.Group>
    </div>
  );
}

ReactDOM.render(
  <div>
    {getGroup({ size: 'small' })}
    {getGroup()}
    {getGroup({ size: 'large' })}
  </div>,
  mountNode,
);
```
