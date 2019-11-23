---
order: 12
title:
  zh-CN: 自定义显示 icon
  en-US: custom show icon
---

## zh-CN

根据类型默认显示对应 icon

## en-US

Displays the corresponding by default by type icon

```jsx
import { Upload, Icon, Modal } from 'antd';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const fileSufIconList = [
  { type: 'file-pdf', suf: ['.pdf'] },
  { type: 'file-excel', suf: ['.xlsx', '.xls', '.csv'] },
  { type: 'file-word', suf: ['.doc', '.docx'] },
  {
    type: 'picture',
    suf: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg'],
  },
];

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'pdf.pdf',
        status: 'done',
        url: 'http://cdn07.foxitsoftware.cn/pub/foxit/cpdf/FoxitCompanyProfile.pdf',
      },
      {
        uid: '-3',
        name: 'doc.doc',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.doc',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'error',
      },
      {
        uid: '-5',
        name: 'pdf.pdf',
        status: 'error',
      },
      {
        uid: '-6',
        name: 'doc.doc',
        status: 'error',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleCustomIconRender = (file, listType) => {
    console.log(1, file, listType);
    let icon = <Icon type={file.status === 'uploading' ? 'loading' : 'paper-clip'} />;
    if (listType === 'picture' || listType === 'picture-card') {
      if (listType === 'picture-card' && file.status === 'uploading') {
        // icon = <Icon type="loading" />; // or icon = 'uploading...';
      } else {
        icon = (
          <Icon
            type={get(
              find(fileSufIconList, item =>
                includes(item.suf, file.name && file.name.substr(file.name.lastIndexOf('.'))),
              ),
              'type',
              'file-unknown',
            )}
            theme="twoTone"
          />
        );
      }
    }
    return icon;
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customIconRender={this.handleCustomIconRender}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<PicturesWall />, mountNode);
```

```css
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
```
