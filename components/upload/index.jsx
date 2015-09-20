import React from 'react';
import Upload from 'rc-upload';
import assign from 'object-assign';
import UploadList from './uploadList';
import getFileItem from './getFileItem';
const prefixCls = 'ant-upload';

function noop() {
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error
  };
}

const AntUpload = React.createClass({
  getInitialState() {
    return {
      fileList: this.props.fileList || this.props.defaultFileList || []
    };
  },
  onStart(file) {
    let targetItem;
    let nextFileList = this.state.fileList.concat();
    if (file.length > 0) {
      targetItem = file.map(function(f) {
        f = fileToObject(f);
        f.status = 'uploading';
        return f;
      });
      nextFileList = nextFileList.concat(file);
    } else {
      targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      nextFileList.push(targetItem);
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList
    });
  },
  removeFile(file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    let index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  },
  onSuccess(response, file) {
    // 服务器端需要返回标准 json 字符串
    // 否则视为失败
    try {
      if (typeof response === 'string') {
        JSON.parse(response);
      }
    } catch (e) {
      this.onError(new Error('No response'), response, file);
      return;
    }
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // 之前已经删除
    if (targetItem) {
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: targetItem,
        fileList: fileList
      });
    }
  },
  onProgress(e, file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    if (targetItem) {
      this.onChange({
        event: e,
        file: file,
        fileList: this.state.fileList
      });
    }
  },
  onError(error, response, file) {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.handleRemove(targetItem);
  },
  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file: file,
        fileList: fileList
      });
    }
  },
  handleManualRemove(file) {
    file.status = 'removed';
    this.handleRemove(file);
  },
  onChange(info) {
    // 1. 有设置外部属性时不改变 fileList
    // 2. 上传中状态（info.event）不改变 fileList
    if (!('fileList' in this.props) && !info.event) {
      this.setState({
        fileList: info.fileList
      });
    }
    this.props.onChange(info);
  },
  getDefaultProps() {
    return {
      type: 'select',
      name: '',
      multipart: false,
      action: '',
      data: {},
      accept: '',
      onChange: noop,
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList
      });
    }
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
                      onRemove={this.handleManualRemove} />
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
