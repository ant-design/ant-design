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
        imageUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
```
