import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import Message from '../message';
import UploadList from './uploadList';
const prefixCls = 'ant-upload';

let AntUpload = React.createClass({
  getInitialState() {
    return {
      downloadList: []
    };
  },
  handleStart(file) {
    var i = this.state.downloadList.length;
    var nextDownloadList = this.state.downloadList;
    nextDownloadList.push({
      id: i,
      uid: file.uid || '',
      filename: file.name,
      status: 'downloading'
    });
    this.setState({
      downloadList: nextDownloadList
    });
  },
  handleSuccess(ret, file) {
    var matchWay = file.uid === '' ? 'byName' : 'byUid';
    Message.success(file.name + '上传完成');
    for (var i = 0; i < this.state.downloadList.length; i++) {
      if (matchWay === 'byName') {
        if (this.state.downloadList[i].filename === file.name) {
          this.state.downloadList[i].status = 'done';
        }
      } else {
        if (this.state.downloadList[i].uid === file.uid) {
          this.state.downloadList[i].status = 'done';
        }
      }
    }
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
    var type = this.props.type || 'select';
    var props = assign({}, this.props);

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
    props.onError = (err) => {
      this.handleError(err);
      props.error.call(this, err);
    };
    if (type === 'drag') {
      return (
        <Upload {...props}>
          <div className={prefixCls + ' ' + prefixCls + '-drag'}>
            <div className={prefixCls + '-drag-container'}>
              {this.props.children}
            </div>
          </div>
        </Upload>
      );
    } else if (type === 'select') {
      return (
        <div className={prefixCls + ' ' + prefixCls + '-select'}>
          <Upload {...props}>
            <button className='ant-btn ant-btn-ghost'>
              <i className='anticon anticon-upload'></i> 点击上传
            </button>
          </Upload>
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
