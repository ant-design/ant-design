import * as React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import PictureTwoTone from '@ant-design/icons/PictureTwoTone';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import { UploadListProps, UploadFile, UploadListType } from '../interface';
import { previewImage, isImageUrl } from '../utils';
import { ConfigContext } from '../../config-provider';
import Button, { ButtonProps } from '../../button';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ListItem from './ListItem';

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
    removeIcon,
    downloadIcon,
    progress,
    appendAction,
    itemRender,
  },
  ref,
) => {
  const forceUpdate = useForceUpdate();

  // ============================= Effect =============================
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

  // ============================= Events =============================
  const onInternalPreview = (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return;
    }
    e.preventDefault();
    return onPreview(file);
  };

  const onInternalDownload = (file: UploadFile) => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const onInternalClose = (file: UploadFile) => {
    if (onRemove) {
      onRemove(file);
    }
  };

  const internalIconRender = (file: UploadFile) => {
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

  const actionIconRender = (
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

  // ============================== Ref ===============================
  // Test needs
  React.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload,
  }));

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  // ============================= Render =============================
  const prefixCls = getPrefixCls('upload', customizePrefixCls);
  const list = items.map(file => (
    <ListItem
      key={file.uid}
      locale={locale}
      prefixCls={prefixCls}
      file={file}
      items={items}
      progress={progress}
      listType={listType}
      isImgUrl={isImgUrl}
      showPreviewIcon={showPreviewIcon}
      showRemoveIcon={showRemoveIcon}
      showDownloadIcon={showDownloadIcon}
      removeIcon={removeIcon}
      downloadIcon={downloadIcon}
      iconRender={internalIconRender}
      actionIconRender={actionIconRender}
      itemRender={itemRender}
      onPreview={onInternalPreview}
      onDownload={onInternalDownload}
      onClose={onInternalClose}
    />
  ));
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
