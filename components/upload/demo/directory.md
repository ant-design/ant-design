---
order: 6
title:
  zh-CN: 文件夹上传
  en-US: Upload directory
---

## zh-CN

支持上传一个文件夹里的所有文件。

## en-US

You can select and upload a whole directory.

```jsx
import { Upload, Button } from 'infrad';
import { IUpload } from 'infra-design-icons';

ReactDOM.render(
  <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
    <Button icon={<IUpload />}>Upload Directory</Button>
  </Upload>,
  mountNode,
);
```
