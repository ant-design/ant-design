# 多文件选择

- order: 5

按住 ctrl 可选择多个文件，`ie10+` 支持。

---

````jsx
var Upload = antd.Upload;
var message = antd.message;
var Icon = antd.Icon;

var props = {
  action: '/upload.do',
  multiple: true,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(info.file.name + ' 上传成功。');
    } else if (info.file.status === 'error') {
      message.error(info.file.name + ' 上传失败。');
    }
  }
};

React.render(
  <Upload {...props}>
    <button type="button" className="ant-btn ant-btn-ghost">
      <Icon type="upload" /> 点击上传
    </button>
  </Upload>
, document.getElementById('components-upload-demo-multiple'));
````

