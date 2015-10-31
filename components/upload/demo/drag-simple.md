# 拖拽上传

- order: 4

样式简单一些。

---

````jsx
var Dragger = antd.Upload.Dragger;

var props = {
  name: 'file',
  action: '/upload.do'
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
}
</style>
