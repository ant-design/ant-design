# 拖拽上传

- order: 4

样式简单一些。

---

````jsx
var Dragger = antd.Upload.Dragger;
var Icon = antd.Icon;

var props = {
  name: 'file',
  action: '/upload.do'
};

ReactDOM.render(
  <Dragger {...props}>
    <Icon type="plus" />
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
