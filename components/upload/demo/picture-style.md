---
order: 6
title: 图片列表样式
---

上传文件为图片，可展示本地缩略图。

`IE8/9` 不支持浏览器本地缩略图展示（[Ref](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)），可以写 `thumbUrl` 属性来代替。

````jsx
import { Upload, Button, Icon } from 'antd';

const props = {
  action: '/upload.do',
  listType: 'picture',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }],
};

ReactDOM.render(
  <div>
    <Upload {...props}>
      <Button type="ghost">
        <Icon type="upload" /> 点击上传
      </Button>
    </Upload>
    <br />
    <br />
    <Upload {...props} className="upload-list-inline">
      <Button type="ghost">
        <Icon type="upload" /> 点击上传
      </Button>
    </Upload>
  </div>
, mountNode);
````

````css
/* 加几行样式将上传项变成平铺样式 */
.upload-list-inline .ant-upload-list-item {
  display: inline-block;
  width: 200px;
  margin-right: 8px;
}
````
