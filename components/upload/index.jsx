import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import Message from '../message';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';

const AntUpload = React.createClass({
  getInitialState() {
    return {
      downloadList: []
    };
  },
  handleStart(file) {
    let i = this.state.downloadList.length;
    let nextDownloadList = this.state.downloadList;
    nextDownloadList.push({
      index: i,
      uid: file.uid || '',
      filename: file.name,
      status: 'downloading'
    });
    this.setState({
      downloadList: nextDownloadList
    });
  },
  handleSuccess(ret, file) {
    Message.success(file.name + '上传完成');
    let targetItem = getFileItem(file, this.state.downloadList);
    targetItem.status = 'done';
    this.setState({
      downloadList: this.state.downloadList
    });
  },
  handleProgress() {
  },
  handleError() {
    Message.error('上传失败');
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
      start: function() {},
      error: function() {},
      success: function() {},
      progress: function() {}
    };
  },
  render() {
    let type = this.props.type || 'select';
    let props = assign({}, this.props);

    props.onStart = (file) => {
      this.handleStart(file);
      props.start.call(this, file);
    };
    props.onSuccess = (ret, file) => {
      this.handleSuccess(ret, file);
      props.success.call(this, ret, file);
    };
    props.onProgress = (step) => {
      this.handleProgress(step);
      props.progress.call(this, step);
    };
    props.onError = (err, responce, file) => {
      this.handleError(err);
      props.error.call(this, err, responce, file);
    };
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
          <UploadList items={this.state.downloadList} />
        </div>
      );
    }
  }
});

AntUpload.Dragger = React.createClass({
  render() {
    return <AntUpload {...this.props} type="drag" style={{height: this.props.height}} />;
  }
});

export default AntUpload;
