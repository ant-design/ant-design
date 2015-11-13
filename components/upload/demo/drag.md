# 拖拽上传

- order: 3

可以把文件拖入指定区域，完成上传，同样支持点击上传。

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
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
    <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
  </Dragger>,
  document.getElementById('components-upload-demo-drag')
);
````

````css
#components-upload-demo-drag {
  height: 180px;
}
````
