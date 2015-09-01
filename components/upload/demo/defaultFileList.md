# 传入已上传的文件

- order: 1

对已上传的文件进行编辑。

---

````jsx
var Upload = antd.Upload;

var props = {
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
      console.log(info.fileList);
    }
  },
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png'
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png'
  }]
};

React.render(
  <Upload {...props}>
    <button className="ant-btn ant-btn-ghost">
      <i className="anticon anticon-upload"></i> 点击上传
    </button>
  </Upload>
, document.getElementById('components-upload-demo-defaultfilelist'));
````
