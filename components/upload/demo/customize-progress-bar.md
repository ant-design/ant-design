---
order: 15
title:
  zh-CN: 自定义进度条样式
  en-US: Customize Progress Bar
---

## zh-CN

使用 `progress` 属性自定义进度条样式。

## en-US

Use `progress` for customize progress bar.

```jsx
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
  },
};

ReactDOM.render(
  <Upload {...props}>
    <Button>
      <UploadOutlined /> Click to Upload
    </Button>
  </Upload>,
  mountNode,
);
```
