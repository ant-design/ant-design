# 拖拽上传

- order: 1

款式2

---

````jsx
var Upload = antd.Upload;

var props = {
  type: 'uploadDragStyleSimple',
  name: 'file',
  action: '/upload.do',
  data: {},
  accept: '',
  uploadTip: '',
  error: function() {},
  success: function() {},
  progress: function() {},
  start: function(){

  }
};

React.render(
  <Upload {...props} />,
  document.getElementById('components-upload-demo-dragstyle2')
);
````
