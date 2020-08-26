import * as React from 'react';
import RcUpload from 'rc-upload';
import classNames from 'classnames';
import Dragger from './Dragger';
import UploadList from './UploadList';
import {
  RcFile,
  ShowUploadListInterface,
  UploadProps,
  UploadFile,
  UploadLocale,
  UploadChangeParam,
  UploadType,
  UploadListType,
} from './interface';
import { T, fileToObject, getFileItem, removeFileItem } from './utils';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import useSyncState from '../_util/hooks/useSyncState';
import useForceUpdate from '../_util/hooks/useForceUpdate';

export { UploadProps };

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (props, ref) => {
  const {
    fileList: fileListProp,
    defaultFileList,
    onRemove,
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
    prefixCls: customizePrefixCls,
    className,
    type,
    children,
    style,
  } = props;

  const [getFileList, setFileList] = useSyncState<Array<UploadFile>>(
    fileListProp || defaultFileList || [],
  );
  const [dragState, setDragState] = React.useState<string>('drop');

  const upload = React.useRef<any>();

  React.useEffect(() => {
    setFileList(fileListProp || defaultFileList || []);
    devWarning(
      'fileList' in props || !('value' in props),
      'Upload',
      '`value` is not a valid prop, do you mean `fileList`?',
    );
  }, []);

  React.useEffect(() => {
    if ('fileList' in props) {
      setFileList(fileListProp || []);
    }
  }, [fileListProp]);

  const onChange = (info: UploadChangeParam) => {
    if (!('fileList' in props)) {
      setFileList(info.fileList);
    }

    const { onChange: onChangeProp } = props;
    if (onChangeProp) {
      onChangeProp({
        ...info,
        fileList: [...info.fileList],
      });
    }
  };

  const onStart = (file: RcFile) => {
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = getFileList().concat();

    const fileIndex = nextFileList.findIndex(({ uid }: UploadFile) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    onChange({
      file: targetItem,
      fileList: nextFileList,
    });
  };

  const onSuccess = (response: any, file: UploadFile, xhr: any) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const targetItem = getFileItem(file, getFileList());
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    targetItem.xhr = xhr;
    onChange({
      file: { ...targetItem },
      fileList: getFileList().concat(),
    });
  };

  const onProgress = (e: { percent: number }, file: UploadFile) => {
    const targetItem = getFileItem(file, getFileList());
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    onChange({
      event: e,
      file: { ...targetItem },
      fileList: getFileList().concat(),
    });
  };

  const onError = (error: Error, response: any, file: UploadFile) => {
    const targetItem = getFileItem(file, getFileList());
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    onChange({
      file: { ...targetItem },
      fileList: getFileList().concat(),
    });
  };

  const handleRemove = (file: UploadFile) => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, getFileList());

      if (removedFileList) {
        file.status = 'removed';
        if (upload.current) {
          upload.current.abort(file);
        }

        onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type);
  };

  const beforeUpload = (file: RcFile, fileListArgs: RcFile[]) => {
    const { beforeUpload: beforeUploadProp } = props;
    if (!beforeUploadProp) {
      return true;
    }
    const result = beforeUploadProp(file, fileListArgs);
    if (result === false) {
      // Get unique file list
      const uniqueList: UploadFile<any>[] = [];
      getFileList()
        .concat(fileListArgs.map(fileToObject))
        .forEach(f => {
          if (uniqueList.every(uf => uf.uid !== f.uid)) {
            uniqueList.push(f);
          }
        });

      onChange({
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
  // Test needs
  const forceUpdate = useForceUpdate();
  React.useImperativeHandle(ref, () => ({
    onStart,
    onSuccess,
    onProgress,
    onError,
    fileList: getFileList(),
    upload: upload.current,
    forceUpdate,
  }));

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('upload', customizePrefixCls);

  const rcUploadProps = {
    onStart,
    onError,
    onProgress,
    onSuccess,
    ...props,
    prefixCls,
    beforeUpload,
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

  const renderUploadList = (button?: React.ReactNode) =>
    showUploadList ? (
      <LocaleReceiver componentName="Upload" defaultLocale={defaultLocale.Upload}>
        {(locale: UploadLocale) => {
          const { showRemoveIcon, showPreviewIcon, showDownloadIcon, removeIcon, downloadIcon } =
            typeof showUploadList === 'boolean' ? ({} as ShowUploadListInterface) : showUploadList;
          return (
            <UploadList
              listType={listType}
              items={getFileList()}
              previewFile={previewFile}
              onPreview={onPreview}
              onDownload={onDownload}
              onRemove={handleRemove}
              showRemoveIcon={!disabled && showRemoveIcon}
              showPreviewIcon={showPreviewIcon}
              showDownloadIcon={showDownloadIcon}
              removeIcon={removeIcon}
              downloadIcon={downloadIcon}
              iconRender={iconRender}
              locale={{ ...locale, ...propLocale }}
              isImageUrl={isImageUrl}
              progress={progress}
              appendAction={button}
            />
          );
        }}
      </LocaleReceiver>
    ) : (
      button
    );

  if (type === 'drag') {
    const dragCls = classNames(
      prefixCls,
      {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: getFileList().some(file => file.status === 'uploading'),
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
          onDrop={onFileDrop}
          onDragOver={onFileDrop}
          onDragLeave={onFileDrop}
          style={style}
        >
          <RcUpload {...rcUploadProps} ref={upload} className={`${prefixCls}-btn`}>
            <div className={`${prefixCls}-drag-container`}>{children}</div>
          </RcUpload>
        </div>
        {renderUploadList()}
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
      <RcUpload {...rcUploadProps} ref={upload} />
    </div>
  );

  if (listType === 'picture-card') {
    return (
      <span className={classNames(className, `${prefixCls}-picture-card-wrapper`)}>
        {renderUploadList(uploadButton)}
      </span>
    );
  }

  return (
    <span className={className}>
      {uploadButton}
      {renderUploadList()}
    </span>
  );
};

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    React.PropsWithChildren<UploadProps> & React.RefAttributes<any>
  > {
  Dragger: typeof Dragger;
}

const Upload = React.forwardRef<unknown, UploadProps>(InternalUpload) as CompoundedComponent;

Upload.Dragger = Dragger;

Upload.displayName = 'Upload';

Upload.defaultProps = {
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

export default Upload;
