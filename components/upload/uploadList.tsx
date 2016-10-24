import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
import Progress from '../progress';
import classNames from 'classnames';
import { UploadListProps } from './interface';

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

export default class UploadList extends React.Component<UploadListProps, any> {
  static defaultProps = {
    listType: 'text',  // or picture
    progressAttr: {
      strokeWidth: 3,
      showInfo: false,
    },
    prefixCls: 'ant-upload',
  };

  handleClose = (file) => {
    const onRemove = this.props.onRemove;
    if (onRemove) {
      onRemove(file);
    }
  }

  handlePreview = (file, e) => {
    e.preventDefault();
    const onPreview = this.props.onPreview;
    if (!onPreview) {
      return;
    }

    return onPreview(file);
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    (this.props.items || []).forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !(window as any).FileReader || !(window as any).File ||
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
  }

  render() {
    const { prefixCls, items = [], listType } = this.props;
    const list = items.map(file => {
      let progress;
      let icon = <Icon type="paper-clip" />;

      if (listType === 'picture' || listType === 'picture-card') {
        if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
          if (listType === 'picture-card') {
            icon = <div className={`${prefixCls}-list-item-uploading-text`}>文件上传中</div>;
          } else {
            icon = <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" />;
          }
        } else {
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
              href={file.url}
              target="_blank" rel="noopener noreferrer"
            >
              <img src={file.thumbUrl || file.url} alt={file.name} />
            </a>
          );
        }
      }

      if (file.status === 'uploading') {
        progress = (
          <div className={`${prefixCls}-list-item-progress`}>
            <Progress type="line" {...this.props.progressAttr} percent={file.percent} />
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
            {
              file.url
              ? (
                <a
                  href={file.url}
                  target="_blank" rel="noopener noreferrer"
                  className={`${prefixCls}-list-item-name`}
                  onClick={e => this.handlePreview(file, e)}
                >
                  {file.name}
                </a>
              ) : (
                <span
                  className={`${prefixCls}-list-item-name`}
                  onClick={e => this.handlePreview(file, e)}
                >
                  {file.name}
                </span>
              )
            }
            {
              listType === 'picture-card' && file.status !== 'uploading'
              ? (
                <span>
                  <a
                    href={file.url}
                    target="_blank" rel="noopener noreferrer"
                    style={{ pointerEvents: file.url ? '' : 'none' }}
                    onClick={e => this.handlePreview(file, e)}
                  >
                    <Icon type="eye-o" />
                  </a>
                  <Icon type="delete" onClick={() => this.handleClose(file)} />
                </span>
              ) : <Icon type="cross" onClick={() => this.handleClose(file)} />
            }
          </div>
          {progress}
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
    });
    return (
      <Animate
        transitionName={`${prefixCls}-margin-top`}
        component="div"
        className={listClassNames}
      >
        {list}
      </Animate>
    );
  }
}
