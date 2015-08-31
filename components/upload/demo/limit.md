# 文件列表限制

- order: 3

`limit` 属性控制文件列表数的上限。如设为 1 时，表示只能上传一个文件，新文件会顶掉旧文件。

---

````jsx
var Upload = antd.Upload;

var props = {
  description: '支持扩展名为: .rar .zip ...',
  action: '/upload.do',
  data: {},
  accept: '',
  uploadTip: '',
  limit: 1,
  onStart(file){
    console.log(file.uid);
  }
};

React.render(
  <Upload {...props}>
    <button className="ant-btn ant-btn-ghost">
      <i className="anticon anticon-upload"></i> 点击上传，只支持一个文件
    </button>
  </Upload>,
  document.getElementById('components-upload-demo-limit')
);
````

