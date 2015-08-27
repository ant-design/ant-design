# 点击上传

- order: 1

经典款式，用户点击按钮弹出文件选择框。

---

````jsx
var Upload = antd.Upload;

var props = {
  description: '支持扩展名为: .rar .zip ...',
  action: '/upload.do',
  data: {},
  accept: '',
  uploadTip: '',
  onStart(file){
    console.log(file.uid);
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
