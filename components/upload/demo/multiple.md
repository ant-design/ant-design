# 多文件选择

- order: 5

按住 ctrl 可选择多个文件，`ie10+` 支持。

---

````jsx
var Upload = antd.Upload;
var message = antd.message;

var props = {
  action: '/upload.do',
  multiple: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
  }
};

React.render(
  <Upload {...props}>
    <button type="button" className="ant-btn ant-btn-ghost">
      <i className="anticon anticon-upload"></i> 点击上传
    </button>
  </Upload>
, document.getElementById('components-upload-demo-multiple'));
````

