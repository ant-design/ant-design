---
order: 2
title: 
  zh-CN: 传入已上传的文件
  en-US: Set files that have been uploaded
---

## zh-CN

对已上传的文件进行编辑。

## en-US

Edit uploaded files


````__react
import { Upload, Button, Icon } from 'antd';

const props = {
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
      console.log(info.fileList);
    }
  },
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
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
