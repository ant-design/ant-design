import * as React from 'react';
import RcUpload from 'rc-upload';
import classNames from 'classnames';
import Dragger from './Dragger';
import UploadList from './UploadList';
import {
  RcFile,
  UploadProps,
  UploadState,
  UploadFile,
  UploadLocale,
  UploadChangeParam,
  UploadType,
  UploadListType,
} from './interface';
import { T, fileToObject, getFileItem, removeFileItem } from './utils';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';

export { UploadProps };

class Upload extends React.Component<UploadProps, UploadState> {
  static Dragger: typeof Dragger;

  static defaultProps = {
    type: 'select' as UploadType,
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text' as UploadListType, // or picture
    className: '',
    disabled: false,
    supportServerRender: true,
  };

  static getDerivedStateFromProps(nextProps: UploadProps) {
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || [],
      };
    }
    return null;
  }

  recentUploadStatus: boolean | PromiseLike<any>;

  progressTimer: any;

  upload: any;

  constructor(props: UploadProps) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
    };

    devWarning(
      'fileList' in props || !('value' in props),
      'Upload',
      '`value` is not a valid prop, do you mean `fileList`?',
    );
  }

  componentWillUnmount() {
    this.clearProgressTimer();
  }

  saveUpload = (node: any) => {
    this.upload = node;
  };

  onStart = (file: RcFile) => {
    const { fileList } = this.state;
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = fileList.concat();

    const fileIndex = nextFileList.findIndex(({ uid }: UploadFile) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
  };

  onSuccess = (response: any, file: UploadFile, xhr: any) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    targetItem.xhr = xhr;
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  onProgress = (e: { percent: number }, file: UploadFile) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList,
    });
  };

  onError = (error: Error, response: any, file: UploadFile) => {
    this.clearProgressTimer();
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  handleRemove = (file: UploadFile) => {
    const { onRemove } = this.props;
    const { fileList } = this.state;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, fileList);

      if (removedFileList) {
        file.status = 'removed';

        if (this.upload) {
          this.upload.abort(file);
        }

        this.onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  };

  onChange = (info: UploadChangeParam) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...info,
        fileList: [...info.fileList],
      });
    }
  };

  onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    this.setState({
      dragState: e.type,
    });
  };

  beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    const { beforeUpload } = this.props;
    const { fileList: stateFileList } = this.state;
    if (!beforeUpload) {
      return true;
    }
    const result = beforeUpload(file, fileList);
    if (result === false) {
      // Get unique file list
      const uniqueList: UploadFile<any>[] = [];
      stateFileList.concat(fileList.map(fileToObject)).forEach(f => {
        if (uniqueList.every(uf => uf.uid !== f.uid)) {
          uniqueList.push(f);
        }
      });

      this.onChange({
        file,
        fileList: uniqueList,
      });
      return false;
    }
    if (result && (result as PromiseLike<any>).then) {
      return result;
    }
    return true;
  };

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  renderUploadList = (locale: UploadLocale) => {
    const {
      showUploadList,
      listType,
      onPreview,
      onDownload,
      previewFile,
      disabled,
      locale: propLocale,
      iconRender,
      isImageUrl,
      progress,
    } = this.props;
    const {
      showRemoveIcon,
      showPreviewIcon,
      showDownloadIcon,
      removeIcon,
      downloadIcon,
    } = showUploadList as any;
    const { fileList } = this.state;
    return (
      <UploadList
        listType={listType}
        items={fileList}
        previewFile={previewFile}
        onPreview={onPreview}
        onDownload={onDownload}
        onRemove={this.handleRemove}
        showRemoveIcon={!disabled && showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        showDownloadIcon={showDownloadIcon}
        removeIcon={removeIcon}
        downloadIcon={downloadIcon}
        iconRender={iconRender}
        locale={{ ...locale, ...propLocale }}
        isImageUrl={isImageUrl}
        progress={progress}
      />
    );
  };

  renderUpload = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      showUploadList,
      listType,
      type,
      disabled,
      children,
      style,
    } = this.props;
    const { fileList, dragState } = this.state;

    const prefixCls = getPrefixCls('upload', customizePrefixCls);

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      prefixCls,
      beforeUpload: this.beforeUpload,
    };

    delete rcUploadProps.className;
    delete rcUploadProps.style;

    // Remove id to avoid open by label when trigger is hidden
    // !children: https://github.com/ant-design/ant-design/issues/14298
    // disabled: https://github.com/ant-design/ant-design/issues/16478
    //           https://github.com/ant-design/ant-design/issues/24197
    if (!children || disabled) {
      delete rcUploadProps.id;
    }

    const uploadList = showUploadList ? (
      <LocaleReceiver componentName="Upload" defaultLocale={defaultLocale.Upload}>
        {this.renderUploadList}
      </LocaleReceiver>
    ) : null;

    if (type === 'drag') {
      const dragCls = classNames(
        prefixCls,
        {
          [`${prefixCls}-drag`]: true,
          [`${prefixCls}-drag-uploading`]: fileList.some(file => file.status === 'uploading'),
          [`${prefixCls}-drag-hover`]: dragState === 'dragover',
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      );
      return (
        <span>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
            style={style}
          >
            <RcUpload {...rcUploadProps} ref={this.saveUpload} className={`${prefixCls}-btn`}>
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={children ? undefined : { display: 'none' }}>
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </div>
    );

    if (listType === 'picture-card') {
      return (
        <span className={classNames(className, `${prefixCls}-picture-card-wrapper`)}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }

    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderUpload}</ConfigConsumer>;
  }
}

export default Upload;
