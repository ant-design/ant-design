import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import Message from '../message';
const prefixCls = 'ant-upload';

var DownloadList = React.createClass({
  handleClose(e) {
    e.target.parentNode.style.display = 'none';
  },

  render() {
    var downloadItem = function(file){
      var statusIcon = file.status === 'done' ? <i className='anticon anticon-check upload-success-icon'></i> : <i className='anticon anticon-loading'></i>;
      var closeIcon = file.status === 'done' ? <i className='anticon anticon-cross' ref='theCloseBtn' onClick={this.handleClose}></i> : '';
      return (
        <div className='upload-list-item' key={file.id}>
          {statusIcon}
          <b className='upload-item-name'>{file.filename}</b>
          {closeIcon}
        </div>
      );
    }.bind(this);
    return <div className='upload-list'>{this.props.items.map(downloadItem)}</div>;
  }
});

export default React.createClass({
  getInitialState() {
    return {
      downloadList: []
    };
  },
  handleStart(file) {
    var i = this.state.downloadList.length + 1;
    var nextDownloadList = this.state.downloadList.concat([{id: i, uid: file.uid || '', filename: file.name, status: 'downloading' }]);
    this.setState({downloadList: nextDownloadList});
  },
  handleSuccess(ret, file) {
    var matchWay = file.uid === '' ? 'byName' : 'byUid';
    Message.success(file.name + '上传完成');
    for (var i = 0; i < this.state.downloadList.length; i++){
      if(matchWay === 'byName'){
        if(this.state.downloadList[i].filename === file.name){
          this.state.downloadList[i].status = 'done';
        }
      }else{
        if(this.state.downloadList[i].uid === file.uid){
          this.state.downloadList[i].status = 'done';
        }
      }
    }
    this.setState({downloadList: this.state.downloadList});
  },
  handleProgress() {
    //console.log('handleProcess ', file);
  },
  handleError() {
    //console.log('err ',err)
    Message.error('上传失败');
  },
  getDefaultProps() {
    return {
      type: 'uploadClickStyle',
      name: 'ooxx',
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
    var type = this.props.type;
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
    if (type === 'uploadDragStyleWithPicAndWords') {
      return (
        <div className={prefixCls + '-container'}>

          <Upload {...props}>
            <div className={prefixCls + '-method-drag-picwords'}>
              <p className='upload-drag-icon'>
                <i className='anticon anticon-inbox'></i>
              </p>
              <p className='upload-tip-one'>点击或将文件拖拽到此区域上传</p>
              <p className='upload-tip-two'>支持单个或批量上传,严谨上传公司内部资料及其他违禁文件</p>
            </div>
          </Upload>

        </div>
      );
    } else if (type === 'uploadDragStyleSimple') {
      return (
        <div className={prefixCls + '-method-drag-cross'}>
          <Upload {...props}>
            <div className='upload-drag-area'>
              <i className='anticon anticon-plus'></i>
            </div>
          </Upload>
        </div>
      );
    } else if (type === 'uploadClickStyle') {
      return (
        <div className={prefixCls + '-method-click'}>
          <Upload {...props}>

              <div className='upload-btn'>
                <i className='anticon anticon-upload'></i>
                <button>点击上传</button>
              </div>

          </Upload>
          <div className='upload-text-tip'>{this.props.description}</div>
          <DownloadList items={this.state.downloadList} />
        </div>
      );
    }
  }
});
