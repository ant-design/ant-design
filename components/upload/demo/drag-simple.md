# 拖拽上传

- order: 3

样式简单一些。

---

````jsx
var Dragger = antd.Upload.Dragger;

var props = {
  name: 'file',
  action: '/upload.do',
  data: {},
  accept: '',
  uploadTip: ''
};

React.render(
  <Dragger {...props}>
    <i className="anticon anticon-plus"></i>
  </Dragger>,
  document.getElementById('components-upload-demo-drag-simple')
);
````

<style>
#components-upload-demo-drag-simple {
  width: 246px;
  height: 146px;
}
</style>
