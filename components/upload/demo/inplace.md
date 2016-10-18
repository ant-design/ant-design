---
order: 9
title:
  zh-CN: 上传图片原位显示
  en-US: Show uploaded image in-place
---

## zh-CN

上传图片原位显示。

## en-US

Show uploaded image in-place.

```jsx
import { Upload, Icon } from 'antd';

const Demo = React.createClass({
  getInitialState() {
    return {};
  },
  handleChange(info) {
    if (info.file.status === 'done') {
      this.setState({
        // Get this url from response in real world.
        imageUrl: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
      });
    }
  },
  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="/upload.do"
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} role="presentation" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
```

```css
#components-upload-demo-inplace .avatar-uploader,
#components-upload-demo-inplace .avatar-uploader-trigger,
#components-upload-demo-inplace .avatar {
  width: 150px;
  height: 150px;
}
#components-upload-demo-inplace .avatar-uploader {
  display: block;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
#components-upload-demo-inplace .avatar-uploader-trigger {
  display: table-cell;
  vertical-align: middle;
  font-size: 28px;
}
```
