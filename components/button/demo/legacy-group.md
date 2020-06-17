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
import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

function getGroup(props) {
  return (
    <div>
      <Button.Group {...props}>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Tooltip title="Tooltip">
          <Button type="primary" icon={<DownloadOutlined />} disabled />
        </Tooltip>
        <Tooltip title="Tooltip">
          <Button type="primary" icon={<DownloadOutlined />} />
        </Tooltip>
      </Button.Group>
    </div>
  );
}

ReactDOM.render(
  <>
    {getGroup({ size: 'small' })}
    <br />
    {getGroup()}
    <br />
    {getGroup({ size: 'large' })}
  </>,
  mountNode,
);
```

```css
#components-button-demo-legacy-group .ant-btn {
  margin: 0;
}
```
