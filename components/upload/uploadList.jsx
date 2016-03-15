import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
const prefixCls = 'ant-upload';
import { Line } from '../progress';
import classNames from 'classnames';

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = function (file, callback) {
  const reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
};

export default React.createClass({
  getDefaultProps() {
    return {
      listType: 'text',  // or picture
      items: [],
      progressAttr: {
        strokeWidth: 3,
        showInfo: false
      }
    };
  },
  handleClose(file) {
    this.props.onRemove(file);
  },
  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    this.props.items.forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader || !window.File ||
          !(file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      /*eslint-disable */
      file.thumbUrl = '';
      /*eslint-enable */
      previewFile(file.originFileObj, (previewDataUrl) => {
        /*eslint-disable */
        file.thumbUrl = previewDataUrl;
        /*eslint-enable */
        this.forceUpdate();
      });
    });
  },
  render() {
    let list = this.props.items.map(file => {
      let progress;
      let icon = <Icon type="paper-clip" />;

      if (this.props.listType === 'picture' || this.props.listType === 'picture-card') {
        if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
          if (this.props.listType === 'picture-card') {
            icon = <div className={`${prefixCls}-list-item-uploading-text`}>文件上传中</div>;
          } else {
            icon = <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" />;
          }
        } else {
          icon = (<a className={`${prefixCls}-list-item-thumbnail`}
            href={file.url}
            target="_blank"><img src={file.thumbUrl || file.url} alt={file.name} /></a>
          );
        }
      }

      if (file.status === 'uploading') {
        progress = (
          <div className={`${prefixCls}-list-item-progress`}>
            <Line {...this.props.progressAttr} percent={file.percent} />
          </div>
        );
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>
            {icon}
            {file.url
               ? <a href={file.url} target="_blank" className={`${prefixCls}-list-item-name`}>{file.name}</a>
               : <span className={`${prefixCls}-list-item-name`}>{file.name}</span>}
            {
              this.props.listType === 'picture-card' && file.status !== 'uploading'
              ? (
                <span>
                  <a href={file.url} target="_blank" style={{ pointerEvents: file.url ? '' : 'none' }}><Icon type="eye-o" /></a>
                  <Icon type="delete" onClick={this.handleClose.bind(this, file)} />
                </span>
              ) : <Icon type="cross" onClick={this.handleClose.bind(this, file)} />
            }
          </div>
          { progress }
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${this.props.listType}`]: true,
    });
    return (
      <div className={listClassNames}>
        <Animate transitionName={`${prefixCls}-margin-top`}>
          {list}
        </Animate>
      </div>
    );
  }
});
