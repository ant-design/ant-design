---
order: 8
title: 图片卡片样式
---

上传文件为图片，可展示本地缩略图。

````jsx
import { Upload, Icon, Modal } from 'antd';

const ImageUploadList = React.createClass({
  getInitialState() {
    return {
      previewVisible: false,
      previewImage: '',
    };
  },
  handleCancel() {
    this.setState({
      previewVisible: false,
    });
  },
  render() {
    const props = {
      action: '/upload.do',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible: true,
        });
      },
    };
    return (
      <div className="clearfix">
        <Upload {...props}>
          <Icon type="plus" />
          <div className="ant-upload-text">上传照片</div>
        </Upload>
        <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" rel="noopener noreferrer" className="upload-example">
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" />
          <span>示例</span>
        </a>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" src={this.state.previewImage} />
        </Modal>
      </div>
    );
  },
});

ReactDOM.render(<ImageUploadList />, mountNode);
````

````css
/* 配合样式可以做出上传按钮和示例效果 */
.ant-upload-select-picture-card i {
  font-size: 28px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.upload-example {
  position: relative;
  display: inline-block;
  height: 96px;
  width: 96px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  vertical-align: top;
}

.upload-example img {
  height: 78px;
  width: 78px;
}

.upload-example:before {
  position: absolute;
  bottom: 8px;
  left: 8px;
  content: ' ';
  width: 78px;
  height: 24px;
  background-color: #808080;
  opacity: .8;
}

.upload-example span {
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 78px;
  height: 24px;
  color: #fff;
  line-height: 24px;
  text-align: center;
}
````
