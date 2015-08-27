import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import Message from '../message';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';
let fileIndex = 0;

const AntUpload = React.createClass({
  getInitialState() {
    return {
      downloadList: []
    };
  },
  onStart(file) {
    let nextDownloadList = this.state.downloadList;
    nextDownloadList.push({
      index: fileIndex++,
      uid: file.uid || '',
      filename: file.name,
      file: file,
      status: 'downloading'
    });
    this.setState({
      downloadList: nextDownloadList
    });
    this.props.onStart(file);
  },
  onSuccess(ret, file) {
    Message.success(file.name + '上传完成');
    let targetItem = getFileItem(file, this.state.downloadList);
    targetItem.status = 'done';
    this.setState({
      downloadList: this.state.downloadList
    });
    this.props.onSuccess(ret, file);
  },
  onProgress(e, file) {
    this.props.onProgress(e, file);
  },
  onError(err, responce, file) {
    Message.error('上传失败');
    this.props.onError(err, responce, file);
  },
  onRemove(file){
    this.props.onRemove(file);
  },
  getDefaultProps() {
    return {
      type: 'select',
      name: '',
      multipart: false,
      action: '',
      data: {},
      accept: '',
      uploadTip: '',
      onStart() {
      },
      onError() {
      },
      onSuccess() {
      },
      onProgress() {
      }
    };
  },
  render() {
    let type = this.props.type || 'select';
    let props = assign({}, this.props, {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
    });
    if (type === 'drag') {
      return (
        <div className={prefixCls + ' ' + prefixCls + '-drag'}>
          <Upload {...props}>
            <div className={prefixCls + '-drag-container'}>
              {this.props.children}
            </div>
          </Upload>
        </div>
      );
    } else if (type === 'select') {
      return (
        <div>
          <div className={prefixCls + ' ' + prefixCls + '-select'}>
            <Upload {...props}>
              {this.props.children}
            </Upload>
          </div>
          <UploadList items={this.state.downloadList} onRemove={this.onRemove}/>
        </div>
      );
    }
  }
});

AntUpload.Dragger = React.createClass({
  render() {
    return <AntUpload {...this.props} type="drag" style={{height: this.props.height}}/>;
  }
});

export default AntUpload;
