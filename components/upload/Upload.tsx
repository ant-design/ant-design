import * as React from 'react';
import RcUpload, { UploadProps as RcUploadProps } from 'rc-upload';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
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
import useForceUpdate from '../_util/hooks/useForceUpdate';

const LIST_IGNORE = `__LIST_IGNORE_${Date.now()}__`;

export { UploadProps };

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (props, ref) => {
  const {
    fileList,
    defaultFileList,
    onRemove,
    showUploadList,
    listType,
    onPreview,
    onDownload,
    onChange,
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
    itemRender,
    maxCount,
  } = props;

  const [mergedFileList, setMergedFileList] = useMergedState(defaultFileList || [], {
    value: fileList,
  });

  const [dragState, setDragState] = React.useState<string>('drop');
  const forceUpdate = useForceUpdate();

  const upload = React.useRef<any>();

  React.useEffect(() => {
    devWarning(
      'fileList' in props || !('value' in props),
      'Upload',
      '`value` is not a valid prop, do you mean `fileList`?',
    );

    devWarning(
      !('transformFile' in props),
      'Upload',
      '`transformFile` is deprecated. Please use `beforeUpload` directly.',
    );
  }, []);

  // Control mode will auto fill file uid if not provided
  React.useEffect(() => {
    const timestamp = Date.now();

    (fileList || []).forEach((file, index) => {
      file.uid = file.uid ?? `__AUTO__${timestamp}_${index}__`;
    });
  }, [fileList]);

  const onInternalChange = (info: UploadChangeParam) => {
    let cloneList = [...info.fileList];

    // Cut to match count
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else if (maxCount) {
      cloneList = cloneList.slice(0, maxCount);
    }

    setMergedFileList(cloneList);

    onChange?.({
      ...info,
      fileList: cloneList,
    });
  };

  const onBatchStart: RcUploadProps['onBatchStart'] = batchFileInfoList => {
    // Skip file which marked as `LIST_IGNORE`, these file will not add to file list
    const filteredFileInfoList = batchFileInfoList.filter(info => info.parsedFile !== LIST_IGNORE);

    // Nothing to do since no file need upload
    if (!filteredFileInfoList.length) {
      return;
    }

    const objectFileList = filteredFileInfoList.map(info => fileToObject(info.file as RcFile));

    // Concat new files with prev files
    const newFileList = [...mergedFileList];
    objectFileList.forEach(fileObj => {
      if (newFileList.every(existFile => existFile.uid !== fileObj.uid)) {
        newFileList.push(fileObj);
      }
    });

    onInternalChange({
      // Compatible for origin usage since it always get file before
      file: objectFileList[0],
      fileList: newFileList,
    });
  };

  const onStart = (file: RcFile) => {
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = [...mergedFileList];

    const fileIndex = nextFileList.findIndex(({ uid }: UploadFile) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    onInternalChange({
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
    const targetItem = getFileItem(file, mergedFileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    targetItem.xhr = xhr;
    onInternalChange({
      file: { ...targetItem },
      fileList: [...mergedFileList],
    });
  };

  const onProgress = (e: { percent: number }, file: UploadFile) => {
    const targetItem = getFileItem(file, mergedFileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    onInternalChange({
      event: e,
      file: { ...targetItem },
      fileList: [...mergedFileList],
    });
  };

  const onError = (error: Error, response: any, file: UploadFile) => {
    const targetItem = getFileItem(file, mergedFileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    onInternalChange({
      file: { ...targetItem },
      fileList: [...mergedFileList],
    });
  };

  const handleRemove = (file: UploadFile) => {
    let currentFile: UploadFile;
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }

      const removedFileList = removeFileItem(file, mergedFileList);

      if (removedFileList) {
        currentFile = { ...file, status: 'removed' };
        mergedFileList?.forEach(item => {
          const matchKey = currentFile.uid !== undefined ? 'uid' : 'name';
          if (item[matchKey] === currentFile[matchKey]) {
            item.status = 'removed';
          }
        });
        upload.current?.abort(currentFile);

        onInternalChange({
          file: currentFile,
          fileList: removedFileList,
        });
      }
    });
  };

  const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragState(e.type);
  };

  const mergedBeforeUpload = async (file: RcFile, fileListArgs: RcFile[]) => {
    const { beforeUpload, transformFile } = props;

    let parsedFile: File | Blob | string = file;
    if (beforeUpload) {
      const result = await beforeUpload(file, fileListArgs);

      if (result === false) {
        return false;
      }

      if ((typeof result === 'object' || (result as any) === LIST_IGNORE) && result) {
        parsedFile = result as File;
      }
    }

    if (transformFile) {
      parsedFile = await transformFile(parsedFile as any);
    }

    return parsedFile as RcFile;
  };

  // Test needs
  React.useImperativeHandle(ref, () => ({
    onStart,
    onSuccess,
    onProgress,
    onError,
    fileList: mergedFileList,
    upload: upload.current,
    forceUpdate,
  }));

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('upload', customizePrefixCls);

  const rcUploadProps = {
    onBatchStart,
    onStart,
    onError,
    onProgress,
    onSuccess,
    ...props,
    prefixCls,
    beforeUpload: mergedBeforeUpload,
    onChange: undefined,
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
              items={mergedFileList}
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
              itemRender={itemRender}
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
        [`${prefixCls}-drag-uploading`]: mergedFileList.some(file => file.status === 'uploading'),
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
      <span className={classNames(`${prefixCls}-picture-card-wrapper`, className)}>
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
  LIST_IGNORE: {};
}

const Upload = React.forwardRef<unknown, UploadProps>(InternalUpload) as CompoundedComponent;

Upload.Dragger = Dragger;

Upload.LIST_IGNORE = LIST_IGNORE;

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
