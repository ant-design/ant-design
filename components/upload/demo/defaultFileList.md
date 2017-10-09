---
order: 2
title:
  zh-CN: 已上传的文件列表
  en-US: Default Files
---

## zh-CN

使用 `defaultFileList` 设置已上传的内容。

## en-US

Use `defaultFileList` for uploaded files when page init.

````jsx
import { Upload, Button, Icon } from 'antd';

const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [{
    uid: 1,
    name: 'xxx.png',
    status: 'done',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: 2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }, {
    uid: 3,
    name: 'zzz.png',
    status: 'error',
    reponse: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  }],
};

ReactDOM.render(
  <Upload {...props}>
    <Button>
      <Icon type="upload" /> Upload
    </Button>
  </Upload>
, mountNode);
````
