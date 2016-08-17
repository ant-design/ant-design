---
order: 0
title: 
  zh-CN: 点击上传
  en-US: upload by clicking
---

## zh-CN

用户点击按钮弹出文件选择框。

## en-US

classic mode. File selection dialog pops up when upload button is clicked 

````jsx
import { Upload, message, Button, Icon } from 'antd';

const props = {
  name: 'file',
  action: '/upload.do',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    }
  },
};

ReactDOM.render(
  <Upload {...props}>
    <Button type="ghost">
      <Icon type="upload" /> 点击上传
    </Button>
  </Upload>
, mountNode);
````
