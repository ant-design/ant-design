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
  start: function(file){
    console.log(file.name)
  },
  error: function() {},
  success: function() {},
  progress: function() {}
};

React.render(
  <Upload {...props} />,
  document.getElementById('components-upload-demo-basic')
);
````
