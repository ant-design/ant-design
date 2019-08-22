import React, { Component } from 'react';
import { Upload, Tooltip, Icon, Modal, Progress, message } from 'antd';

const { Dragger } = Upload;

interface PicSearcherProps {}

interface PicSearcherState {
  loading: Boolean;
  modalVisible: Boolean;
  icons: Array<string>;
  justCopied: string | null;
  fileList: Array<any>;
}

interface iconObject {
  class_name: string;
  score: number;
}

class PicSearcher extends Component<PicSearcherProps, PicSearcherState> {
  copyId?: number;

  state = {
    loading: false,
    modalVisible: false,
    icons: [],
    justCopied: null,
    fileList: [],
  };

  componentDidMount() {
    document.addEventListener('paste', this.onPaste);
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.onPaste);
    window.clearTimeout(this.copyId);
  }

  onCopied = (type: string, text: string) => {
    message.success(
      <span>
        <code className="copied-code">{text}</code> copied 🎉
      </span>,
    );
    this.setState({ justCopied: type }, () => {
      this.copyId = window.setTimeout(() => {
        this.setState({ justCopied: null });
      }, 2000);
    });
  };

  onPaste = (event: ClipboardEvent) => {
    const items = event.clipboardData && event.clipboardData.items;
    let file = null;
    if (items && items.length) {
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    if (file) this.uploadFile(file);
  };

  uploadFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.predict(reader.result);
      this.setState(() => ({
        fileList: [{ uid: 1, name: file.name, status: 'done', url: reader.result }],
      }));
    };
    reader.readAsDataURL(file);
  };

  predict = async (imageBase64: any) => {
    this.setState(() => ({ loading: true }));
    const res = await fetch(
      '//1647796581073291.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/cr-sh.cr-fc-predict__stable/cr-fc-predict/',
      {
        method: 'post',
        body: JSON.stringify({
          modelId: 'data_icon',
          type: 'ic',
          imageBase64,
        }),
      },
    );
    const icons = await res.json();
    console.log(icons);
    this.setState(() => ({ icons, loading: false }));
  };

  toggleModal = () => {
    this.setState(prev => ({ modalVisible: !prev.modalVisible }));
  };

  customRequest = (options: any) => {
    this.uploadFile(options.file);
  };

  render() {
    const { modalVisible, icons, fileList } = this.state;
    return (
      <div className="icon-pic-searcher">
        <Tooltip title="截图搜索，支持 CTL+V 粘贴图片" visible>
          <Icon type="camera" className="icon-pic-btn" onClick={this.toggleModal} />
        </Tooltip>
        <Modal
          title="截图搜索"
          visible={modalVisible}
          onOk={this.toggleModal}
          onCancel={this.toggleModal}
        >
          <Dragger
            listType="picture"
            customRequest={this.customRequest}
            fileList={fileList}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击/拖拽/粘贴上传</p>
          </Dragger>
          <div className="icon-pic-search-result">
            {icons.map((icon: iconObject) => (
              <div key={icon.class_name}>
                <Icon type={icon.class_name.replace(/\s/g, '-')} />
                <Progress percent={Math.ceil(icon.score * 100)} />
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default PicSearcher;
