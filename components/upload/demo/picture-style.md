# 图片列表样式

- order: 6

上传文件为图片，可展示本地缩略图。

`IE8/9` 不支持浏览器本地缩略图展示([ref](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL))，可以写 `thumbUrl` 属性来代替。

---

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
  }]
};

ReactDOM.render(
  <Upload {...props}>
    <Button type="ghost">
      <Icon type="upload" /> 点击上传
    </Button>
  </Upload>
, document.getElementById('components-upload-demo-picture-style'));
````
