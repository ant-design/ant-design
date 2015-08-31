import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import Message from '../message';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';
let fileIndex = 0;

function noop() {
}

const AntUpload = React.createClass({
  getInitialState() {
    return {
      fileList: []
    };
  },
  onStart(file) {
    let nextFileList = this.state.fileList;
    nextFileList.push({
      index: fileIndex++,
      uid: file.uid || '',
      filename: file.name,
      file: file,
      status: 'uploading'
    });
    if (nextFileList.length === this.props.limit + 1) {
      nextFileList = nextFileList.slice(1);
    }
    this.setState({
      fileList: nextFileList
    });
    this.props.onStart(file);
  },
  removeFile(file){
    var fileList = this.state.fileList.concat();
    let targetItem = getFileItem(file, fileList);
    var index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
    }
    this.setState({
      fileList: fileList
    });
  },
  onSuccess(ret, file) {
    var res = this.props.onSuccess(ret, file);
    if (res !== false) {
      var fileList = this.state.fileList.concat();
      Message.success(file.name + '上传完成');
      let targetItem = getFileItem(file, fileList);
      targetItem.status = 'done';
      // 解析出文件上传后的远程地址
      if (typeof this.props.urlResolver === 'function') {
        targetItem.url = this.props.urlResolver(ret);
      }
      this.setState({
        fileList: fileList
      });
    } else {
      this.removeFile(file);
    }
  },
  onProgress(e, file) {
    this.props.onProgress(e, file);
  },
  onError(err, responce, file) {
    Message.error(file.name + ' 上传失败');
    this.removeFile(file);
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
      onStart: noop,
      onError: noop,
      onSuccess: noop,
      onProgress: noop,
      onRemove: noop,
      limit: Number.MAX_VALUE,
      urlResolver: function(ret) {
        try {
          return JSON.parse(ret).url;
        } catch(e) {}
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
          <UploadList items={this.state.fileList}
                      onRemove={this.onRemove}
                      limit={props.limit} />
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
