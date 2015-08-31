# 点击上传

- order: 0

经典款式，用户点击按钮弹出文件选择框。

---

````jsx
var Upload = antd.Upload;

var props = {
  action: '/upload.do',
  onChange(info) {
    console.log(info.file);
    console.log(info.fileList);
  }
};

React.render(
  <Upload {...props}>
    <button className="ant-btn ant-btn-ghost">
      <i className="anticon anticon-upload"></i> 点击上传
    </button>
  </Upload>,
  document.getElementById('components-upload-demo-basic')
);
````
