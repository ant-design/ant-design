---
order: 3
title: 拖拽上传
---

可以把文件拖入指定区域，完成上传，同样支持点击上传。

````jsx
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  showUploadList: false,
  action: '/upload.do',
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
  <div>
    <div style={{ width: 246, height: 140 }}>
      <Dragger {...props}>
        <Icon type="plus" />
      </Dragger>
    </div>
    <div style={{ marginTop: 16, height: 180 }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
        <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
      </Dragger>
    </div>
  </div>
, mountNode);
````
