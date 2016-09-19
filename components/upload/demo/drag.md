---
order: 3
title:
  zh-CN: 拖拽上传
  en-US: Upload files by dragging and dropping
---

## zh-CN

可以把文件拖入指定区域，完成上传，同样支持点击上传。

## en-US

You can drag files to a specific area, to upload. Meanwhile you can also upload by selecting.


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
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
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
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
    </div>
  </div>
, mountNode);
````
