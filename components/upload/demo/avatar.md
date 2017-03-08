---
order: 1
title:
  zh-CN: 用户头像
  en-US: Avatar
---

## zh-CN

点击上传用户头像，并使用 `beforeUpload` 限制用户上传的图片格式和大小。

> `beforeUpload` 的返回值可以是一个 Promise 以支持也支持异步检查：[示例](http://react-component.github.io/upload/examples/beforeUpload.html)。

## en-US

Click to upload user's avatar, and validate size and format of picture with `beforeUpload`.

> The return value of function `beforeUpload` can be a Promise to check asynchronously. [demo](http://react-component.github.io/upload/examples/beforeUpload.html)

````jsx
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {};

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}

ReactDOM.render(<Avatar />, mountNode);
````

````css
.avatar-uploader,
.avatar-uploader-trigger,
.avatar {
  width: 150px;
  height: 150px;
}
.avatar-uploader {
  display: block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar-uploader-trigger {
  display: table-cell;
  vertical-align: middle;
  font-size: 28px;
  color: #999;
}
````
