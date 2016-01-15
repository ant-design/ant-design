# 图片卡片样式

- order: 8

上传文件为图片，可展示本地缩略图。

---

````jsx
import { Upload, Icon } from 'antd';

const props = {
  action: '/upload.do',
  listType: 'picture-card',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }]
};

ReactDOM.render(
<div className="clearfix">
  <div style={{float: 'left'}}>
    <Upload {...props}>
      <div className="upload-trigger">
        <Icon type="plus" />
        <div className="upload-trigger-text">上传照片</div>
      </div>
    </Upload>
  </div>
  <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" className="upload-example">
    <img src="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"/>
    <span>示例</span>
  </a>
</div>
, mountNode);
````

````css
/* 配合样式可以做出上传按钮和示例效果 */
.upload-trigger {
  width: 96px;
  height: 96px;
  padding: 24px 0;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #fbfbfb;
  text-align: center;
  cursor: pointer;
}

.upload-trigger i {
  font-size: 28px;
  color: #999;
}

.upload-trigger-text {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.upload-example {
  position: relative;
  display: inline-block;
  height: 96px;
  width: 96px;
  margin-left: 8px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
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
