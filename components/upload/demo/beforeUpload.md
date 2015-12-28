# 限制用户上传的文件

- order: 7

可以通过 `beforeUpload` 在文件上传之前进行干预，如限制用户只能上传 JPG 文件。

---

````jsx
import { Upload, Button, Icon, message } from 'antd';

const props = {
  action: '/upload.do',
  beforeUpload: function(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只能上传 JPG 文件哦！');
    }
    return isJPG;
  }
};

ReactDOM.render(
  <Upload {...props}>
    <Button type="ghost">
      <Icon type="upload" /> 点击上传
    </Button>
  </Upload>
, document.getElementById('components-upload-demo-beforeupload'));
````
