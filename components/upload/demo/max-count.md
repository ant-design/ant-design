---
order: 10
title:
  zh-CN: 限制数量
  en-US: Max Count
---

## zh-CN

通过 `maxCount` 限制上传数量。当为 `1` 时，始终用最新上传的代替当前。

## en-US

Limit files with `maxCount`. Will replace current one when `maxCount` is `1`.

```jsx
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

ReactDOM.render(
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={3}
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
    </Upload>
  </Space>,
  mountNode,
);
```
