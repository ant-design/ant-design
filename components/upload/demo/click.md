# 点击上传

- order: 2

经典款式

---

````jsx
var Upload = antd.Upload;
var props = {
  type: 'uploadClickStyle',
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
  document.getElementById('components-upload-demo-click')
);
````
