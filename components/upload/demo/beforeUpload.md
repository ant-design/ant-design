---
order: 7
title:
  zh-CN: 限制用户上传的文件
  en-US: Filter uploads files
---

## zh-CN

可以通过 `beforeUpload` 在文件上传之前进行干预，如限制用户只能上传 JPG 文件。

也支持异步检查，`beforeUpload` 的返回值可以是一个 Promise：[示例](http://react-component.github.io/upload/examples/beforeUpload.html)。

## en-US
You can use `beforeUpload` to check whether user can upload, for example, limit file type only to be JPG. Checking can also be asynchronous. The return value can also be a Promise for function `beforeUpload`

````jsx
import { Upload, Button, Icon, message } from 'antd';

const props = {
  action: '/upload.do',
  multiple: true,
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('you can only upload JPG file~');
    }
    return isJPG;
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
