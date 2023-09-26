import * as React from 'react';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import PictureTwoTone from '@ant-design/icons/PictureTwoTone';
import classNames from 'classnames';
import type { CSSMotionListProps } from 'rc-motion';
import CSSMotion, { CSSMotionList } from 'rc-motion';

import useForceUpdate from '../../_util/hooks/useForceUpdate';
import initCollapseMotion from '../../_util/motion';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import type { ButtonProps } from '../../button';
import Button from '../../button';
import { ConfigContext } from '../../config-provider';
import type { InternalUploadFile, UploadFile, UploadListProps } from '../interface';
import { isImageUrl, previewImage } from '../utils';
import ListItem from './ListItem';

interface UploadListRef {
  handlePreview: (file: UploadFile, e?: React.SyntheticEvent<HTMLElement>) => void;
  handleDownload: (file: UploadFile) => void;
}

const InternalUploadList: React.ForwardRefRenderFunction<UploadListRef, UploadListProps> = (
  props,
  ref,
) => {
  const {
    listType = 'text',
    previewFile = previewImage,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl = isImageUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon = true,
    showRemoveIcon = true,
    showDownloadIcon = false,
    removeIcon,
    previewIcon,
    downloadIcon,
    progress = { size: [-1, 2], showInfo: false },
    appendAction,
    appendActionVisible = true,
    itemRender,
    disabled,
  } = props;
  const forceUpdate = useForceUpdate();
  const [motionAppear, setMotionAppear] = React.useState(false);

  // ============================= Effect =============================
  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card' && listType !== 'picture-circle') {
      return;
    }
    (items || []).forEach((file: InternalUploadFile) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(file.originFileObj instanceof File || (file.originFileObj as Blob) instanceof Blob) ||
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

  React.useEffect(() => {
    setMotionAppear(true);
  }, []);

  // ============================= Events =============================
  const onInternalPreview = (file: UploadFile, e?: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return;
    }
    e?.preventDefault();
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
    onRemove?.(file);
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
    } else if (listType === 'picture-card' || listType === 'picture-circle') {
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
      className: `${prefixCls}-list-item-action`,
      disabled,
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

  const { getPrefixCls } = React.useContext(ConfigContext);

  // ============================= Render =============================
  const prefixCls = getPrefixCls('upload', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const listClassNames = classNames(`${prefixCls}-list`, `${prefixCls}-list-${listType}`);

  // >>> Motion config
  const motionKeyList = [...items.map((file) => ({ key: file.uid, file }))];

  const animationDirection =
    listType === 'picture-card' || listType === 'picture-circle' ? 'animate-inline' : 'animate';
  // const transitionName = list.length === 0 ? '' : `${prefixCls}-${animationDirection}`;

  let motionConfig: Omit<CSSMotionListProps, 'onVisibleChanged'> = {
    motionDeadline: 2000,
    motionName: `${prefixCls}-${animationDirection}`,
    keys: motionKeyList,
    motionAppear,
  };

  const listItemMotion = React.useMemo<Partial<CSSMotionListProps>>(() => {
    const motion = {
      ...initCollapseMotion(rootPrefixCls),
    };

    delete motion.onAppearEnd;
    delete motion.onEnterEnd;
    delete motion.onLeaveEnd;

    return motion;
  }, [rootPrefixCls]);

  if (listType !== 'picture-card' && listType !== 'picture-circle') {
    motionConfig = {
      ...listItemMotion,
      ...motionConfig,
    };
  }

  return (
    <div className={listClassNames}>
      <CSSMotionList {...motionConfig} component={false}>
        {({ key, file, className: motionClassName, style: motionStyle }) => (
          <ListItem
            key={key}
            locale={locale}
            prefixCls={prefixCls}
            className={motionClassName}
            style={motionStyle}
            file={file}
            items={items}
            progress={progress}
            listType={listType}
            isImgUrl={isImgUrl}
            showPreviewIcon={showPreviewIcon}
            showRemoveIcon={showRemoveIcon}
            showDownloadIcon={showDownloadIcon}
            removeIcon={removeIcon}
            previewIcon={previewIcon}
            downloadIcon={downloadIcon}
            iconRender={internalIconRender}
            actionIconRender={actionIconRender}
            itemRender={itemRender}
            onPreview={onInternalPreview}
            onDownload={onInternalDownload}
            onClose={onInternalClose}
          />
        )}
      </CSSMotionList>

      {/* Append action */}
      {appendAction && (
        <CSSMotion {...motionConfig} visible={appendActionVisible} forceRender>
          {({ className: motionClassName, style: motionStyle }) =>
            cloneElement(appendAction, (oriProps) => ({
              className: classNames(oriProps.className, motionClassName),
              style: {
                ...motionStyle,
                // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
                pointerEvents: motionClassName ? 'none' : undefined,
                ...oriProps.style,
              },
            }))
          }
        </CSSMotion>
      )}
    </div>
  );
};

const UploadList = React.forwardRef<UploadListRef, UploadListProps>(InternalUploadList);

if (process.env.NODE_ENV !== 'production') {
  UploadList.displayName = 'UploadList';
}

export default UploadList;
