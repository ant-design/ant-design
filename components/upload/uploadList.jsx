import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
const prefixCls = 'ant-upload';
import { Line } from '../progress';
import classNames from 'classnames';

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = function(file, callback) {
  const reader = new FileReader();
  reader.onloadend = function() {
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
    if (this.props.listType !== 'picture') {
      return;
    }
    this.props.items.forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader || !window.File ||
          (!file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      file.thumbUrl = '';
      previewFile(file.originFileObj, (previewDataUrl) => {
        file.thumbUrl = previewDataUrl;
        this.forceUpdate();
      });
    });
  },
  render() {
    let list = this.props.items.map(file => {
      let progress;
      let icon = <Icon type="paper-clip" />;

      if (this.props.listType === 'picture') {
        icon = (file.status === 'uploading' || (!file.thumbUrl && !file.url))
          ? <Icon className={prefixCls + '-list-item-thumbnail'} type="picture" />
          : <a className={prefixCls + '-list-item-thumbnail'}
               href={file.url}
               target="_blank"><img src={file.thumbUrl || file.url} alt={file.name} /></a>;
      }
      if (file.status === 'uploading') {
        progress = <div className={prefixCls + '-list-item-progress'}>
          <Line {...this.props.progressAttr} percent={file.percent} />
        </div>;
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={prefixCls + '-list-item-info'}>
            {icon}
            <span className={prefixCls + '-list-item-name'}>{file.name}</span>
            <Icon type="cross" onClick={this.handleClose.bind(this, file)} />
          </div>
          { progress }
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${this.props.listType}`]: true,
    });
    return <div className={listClassNames}>
      <Animate transitionName={prefixCls + '-margin-top'}>
        {list}
      </Animate>
    </div>;
  }
});
