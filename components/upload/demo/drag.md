# 拖拽上传

- order: 1

可以把文件拖入指定区域，完成上传，同样支持点击上传。

---

````jsx
var Dragger = antd.Upload.Dragger;

var props = {
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
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <i className="anticon anticon-inbox"></i>
    </p>
    <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
    <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
  </Dragger>,
  document.getElementById('components-upload-demo-drag')
);
````

<style>
#components-upload-demo-drag {
  height: 300px;
}
</style>
