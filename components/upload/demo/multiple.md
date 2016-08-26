---
order: 5
hidden: true
title: 
  zh-CN: 多文件选择
  en-US: Multifile Selection
---

## zh-CN

按住 ctrl 可选择多个文件，`ie10+` 支持。

## en-US

You can select multiple files with CTRL holding down. `IE10+` supported.

````jsx
import { Upload, message, Button, Icon } from 'antd';

const props = {
  action: '/upload.do',
  multiple: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} upload sucessfully。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload unsuccessfully。`);
    }
  },
};

ReactDOM.render(
  <Upload {...props}>
    <Button type="ghost">
      <Icon type="upload" /> upload
    </Button>
  </Upload>
, mountNode);
````
