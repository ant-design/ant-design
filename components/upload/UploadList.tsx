import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import PictureTwoTone from '@ant-design/icons/PictureTwoTone';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';

import { cloneElement, isValidElement } from '../_util/reactNode';
import { UploadListProps, UploadFile, UploadListType } from './interface';
import { previewImage, isImageUrl } from './utils';
import Tooltip from '../tooltip';
import Progress from '../progress';
import { ConfigContext } from '../config-provider';
import Button, { ButtonProps } from '../button';
import useForceUpdate from '../_util/hooks/useForceUpdate';

const InternalUploadList: React.ForwardRefRenderFunction<unknown, UploadListProps> = (
  {
    listType,
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon: customRemoveIcon,
    downloadIcon: customDownloadIcon,
    progress: progressProps,
    appendAction,
  },
  ref,
) => {
  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach(file => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(file.originFileObj instanceof File || file.originFileObj instanceof Blob) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj as File).then((previewDataUrl: string) => {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [listType, items, previewFile]);

  const handlePreview = (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return;
    }
    e.preventDefault();
    return onPreview(file);
  };

  const handleDownload = (file: UploadFile) => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const handleClose = (file: UploadFile) => {
    if (onRemove) {
      onRemove(file);
    }
  };

  const handleIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === 'uploading';
    const fileIcon = isImgUrl && isImgUrl(file) ? <PictureTwoTone /> : <FileTwoTone />;
    let icon: React.ReactNode = isLoading ? <LoadingOutlined /> : <PaperClipOutlined />;
    if (listType === 'picture') {
      icon = isLoading ? <LoadingOutlined /> : fileIcon;
    } else if (listType === 'picture-card') {
      icon = isLoading ? locale.uploading : fileIcon;
    }
    return icon;
  };

  const handleActionIconRender = (
    customIcon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title?: string,
  ) => {
    const btnProps: ButtonProps = {
      type: 'text',
      size: 'small',
      title,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        callback();
        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: `${prefixCls}-list-item-card-actions-btn`,
    };
    if (isValidElement(customIcon)) {
      const btnIcon = cloneElement(customIcon, {
        ...customIcon.props,
        onClick: () => {},
      });

      return <Button {...btnProps} icon={btnIcon} />;
    }
    return (
      <Button {...btnProps}>
        <span>{customIcon}</span>
      </Button>
    );
  };

  // Test needs
  React.useImperativeHandle(ref, () => ({
    handlePreview,
    handleDownload,
  }));

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('upload', customizePrefixCls);
  const list = items.map(file => {
    let progress;
    const iconNode = handleIconRender(file);
    let icon = <div className={`${prefixCls}-text-icon`}>{iconNode}</div>;
    if (listType === 'picture' || listType === 'picture-card') {
      if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
        const uploadingClassName = classNames({
          [`${prefixCls}-list-item-thumbnail`]: true,
          [`${prefixCls}-list-item-file`]: file.status !== 'uploading',
        });
        icon = <div className={uploadingClassName}>{iconNode}</div>;
      } else {
        const thumbnail =
          isImgUrl && isImgUrl(file) ? (
            <img
              src={file.thumbUrl || file.url}
              alt={file.name}
              className={`${prefixCls}-list-item-image`}
            />
          ) : (
            iconNode
          );
        const aClassName = classNames({
          [`${prefixCls}-list-item-thumbnail`]: true,
          [`${prefixCls}-list-item-file`]: isImgUrl && !isImgUrl(file),
        });
        icon = (
          <a
            className={aClassName}
            onClick={e => handlePreview(file, e)}
            href={file.url || file.thumbUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {thumbnail}
          </a>
        );
      }
    }

    if (file.status === 'uploading') {
      // show loading icon if upload progress listener is disabled
      const loadingProgress =
        'percent' in file ? (
          <Progress {...progressProps} type="line" percent={file.percent} />
        ) : null;

      progress = (
        <div className={`${prefixCls}-list-item-progress`} key="progress">
          {loadingProgress}
        </div>
      );
    }
    const infoUploadingClass = classNames({
      [`${prefixCls}-list-item`]: true,
      [`${prefixCls}-list-item-${file.status}`]: true,
      [`${prefixCls}-list-item-list-type-${listType}`]: true,
    });
    const linkProps =
      typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;

    const removeIcon = showRemoveIcon
      ? handleActionIconRender(
          (typeof customRemoveIcon === 'function' ? customRemoveIcon(file) : customRemoveIcon) || <DeleteOutlined />,
          () => handleClose(file),
          prefixCls,
          locale.removeFile,
        )
      : null;

    const downloadIcon =
      showDownloadIcon && file.status === 'done'
        ? handleActionIconRender(
            (typeof customDownloadIcon=== 'function' ? customDownloadIconi(file) : customDownloadIcon) || <DownloadOutlined />,
            () => handleDownload(file),
            prefixCls,
            locale.downloadFile,
          )
        : null;
    const downloadOrDelete = listType !== 'picture-card' && (
      <span
        key="download-delete"
        className={`${prefixCls}-list-item-card-actions ${listType === 'picture' ? 'picture' : ''}`}
      >
        {downloadIcon}
        {removeIcon}
      </span>
    );
    const listItemNameClass = classNames({
      [`${prefixCls}-list-item-name`]: true,
      [`${prefixCls}-list-item-name-icon-count-${
        [downloadIcon, removeIcon].filter(x => x).length
      }`]: true,
    });
    const preview = file.url
      ? [
          <a
            key="view"
            target="_blank"
            rel="noopener noreferrer"
            className={listItemNameClass}
            title={file.name}
            {...linkProps}
            href={file.url}
            onClick={e => handlePreview(file, e)}
          >
            {file.name}
          </a>,
          downloadOrDelete,
        ]
      : [
          <span
            key="view"
            className={listItemNameClass}
            onClick={e => handlePreview(file, e)}
            title={file.name}
          >
            {file.name}
          </span>,
          downloadOrDelete,
        ];
    const style: React.CSSProperties = {
      pointerEvents: 'none',
      opacity: 0.5,
    };
    const previewIcon = showPreviewIcon ? (
      <a
        href={file.url || file.thumbUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={file.url || file.thumbUrl ? undefined : style}
        onClick={e => handlePreview(file, e)}
        title={locale.previewFile}
      >
        <EyeOutlined />
      </a>
    ) : null;

    const actions = listType === 'picture-card' && file.status !== 'uploading' && (
      <span className={`${prefixCls}-list-item-actions`}>
        {previewIcon}
        {file.status === 'done' && downloadIcon}
        {removeIcon}
      </span>
    );

    let message;
    if (file.response && typeof file.response === 'string') {
      message = file.response;
    } else {
      message = (file.error && file.error.statusText) || locale.uploadError;
    }
    const iconAndPreview = (
      <span>
        {icon}
        {preview}
      </span>
    );
    const dom = (
      <div className={infoUploadingClass}>
        <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
        {actions}
        <Animate transitionName="fade" component="">
          {progress}
        </Animate>
      </div>
    );
    const listContainerNameClass = classNames({
      [`${prefixCls}-list-picture-card-container`]: listType === 'picture-card',
    });
    return (
      <div key={file.uid} className={listContainerNameClass}>
        {file.status === 'error' ? (
          <Tooltip title={message} getPopupContainer={node => node.parentNode as HTMLElement}>
            {dom}
          </Tooltip>
        ) : (
          <span>{dom}</span>
        )}
      </div>
    );
  });
  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
    [`${prefixCls}-list-rtl`]: direction === 'rtl',
  });
  const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
  const transitionName = list.length === 0 ? '' : `${prefixCls}-${animationDirection}`;
  return (
    <Animate transitionName={transitionName} component="div" className={listClassNames}>
      {list}
      {React.isValidElement(appendAction)
        ? React.cloneElement(appendAction, { key: 'appendAction' })
        : appendAction}
    </Animate>
  );
};

const UploadList = React.forwardRef<unknown, UploadListProps>(InternalUploadList);

UploadList.displayName = 'UploadList';

UploadList.defaultProps = {
  listType: 'text' as UploadListType, // or picture
  progress: {
    strokeWidth: 2,
    showInfo: false,
  },
  showRemoveIcon: true,
  showDownloadIcon: false,
  showPreviewIcon: true,
  previewFile: previewImage,
  isImageUrl,
};

export default UploadList;
