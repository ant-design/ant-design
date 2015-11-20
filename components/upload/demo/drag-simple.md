# 拖拽上传

- order: 4

样式简单一些。

---

````jsx
import { Upload, Icon } from 'antd';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  showUploadList: false,
  action: '/upload.do'
};

ReactDOM.render(
  <Dragger {...props}>
    <Icon type="plus" />
  </Dragger>,
  document.getElementById('components-upload-demo-drag-simple')
);
````

````css
#components-upload-demo-drag-simple {
  width: 246px;
  height: 146px;
}
````
