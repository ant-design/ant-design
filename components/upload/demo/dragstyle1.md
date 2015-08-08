# 拖拽上传

- order: 0

款式1

---

````jsx
var Upload = antd.Upload;

var props = {
  type: 'uploadDragStyleWithPicAndWords',
  name: 'file',
  action: '/upload.do',
  data: {},
  accept: 'i',
  uploadTip: '',
  error: function(err) {
    console.log(err)
  },
  success: function() {},
  progress: function() {},
  start: function(file){
    console.log(file)
  }
};

React.render(
  <Upload {...props} />,
  document.getElementById('components-upload-demo-dragstyle1')
);
````
