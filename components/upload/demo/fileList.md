---
order: 2
title: 完全控制的上传列表
---

使用 `fileList` 对列表进行完全控制，可以实现各种自定义功能，以下演示三种情况：

1) 上传列表数量的限制。

2) 读取远程路径并显示链接。

3) 按照服务器返回信息筛选成功上传的文件。

````jsx
import { Upload, Button, Icon } from 'antd';

const MyUpload = React.createClass({
  getInitialState() {
    return {
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
    };
  },
  handleChange(info) {
    let fileList = info.fileList;

    // 1. 上传列表数量的限制
    //    只显示最近上传的一个，旧的会被新的顶掉
    fileList = fileList.slice(-2);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.url;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
  },
  render() {
    const props = {
      action: '/upload.do',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    );
  },
});

ReactDOM.render(<MyUpload />, mountNode);
````
