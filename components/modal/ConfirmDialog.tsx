import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import { clsx } from 'clsx';

import { CONTAINER_MAX_OFFSET } from '../_util/hooks';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
import type { ThemeConfig } from '../config-provider';
import ConfigProvider from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { useLocale } from '../locale';
import useToken from '../theme/useToken';
import CancelBtn from './components/ConfirmCancelBtn';
import OkBtn from './components/ConfirmOkBtn';
import type { ModalContextProps } from './context';
import { ModalContextProvider } from './context';
import type { ModalFuncProps, ModalLocale } from './interface';
import Modal from './Modal';
import Confirm from './style/confirm';

export interface ConfirmDialogProps extends ModalFuncProps {
  prefixCls: string;
  afterClose?: () => void;
  close?: (...args: any[]) => void;
  /**
   * `close` prop support `...args` that pass to the developer
   * that we can not break this.
   * Provider `onClose` for internal usage
   */
  onConfirm?: (confirmed: boolean) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls?: string;
  iconPrefixCls?: string;

  /**
   * Only passed by static method
   */
  theme?: ThemeConfig;

  /** @private Internal Usage. Do not override this */
  locale?: ModalLocale;

  /**
   * Do not throw if is await mode
   */
  isSilent?: () => boolean;
}

export const ConfirmContent: React.FC<ConfirmDialogProps & { confirmPrefixCls: string }> = (
  props,
) => {
  const {
    prefixCls,
    icon,
    okText,
    cancelText,
    confirmPrefixCls,
    type,
    okCancel,
    footer,
    // Legacy for static function usage
    locale: staticLocale,
    ...restProps
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Modal');

    warning(
      !(typeof icon === 'string' && icon.length > 2),
      'breaking',
      `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
    );
  }

  // Icon
  let mergedIcon: React.ReactNode = icon;

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  if (!icon && icon !== null) {
    switch (type) {
      case 'info':
        mergedIcon = <InfoCircleFilled />;
        break;

      case 'success':
        mergedIcon = <CheckCircleFilled />;
        break;

      case 'error':
        mergedIcon = <CloseCircleFilled />;
        break;

      default:
        mergedIcon = <ExclamationCircleFilled />;
    }
  }

  // 默认为 true，保持向下兼容
  const mergedOkCancel = okCancel ?? type === 'confirm';

  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

  const [locale] = useLocale('Modal');

  const mergedLocale = staticLocale || locale;

  // ================== Locale Text ==================
  const okTextLocale = okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText);
  const cancelTextLocale = cancelText || mergedLocale?.cancelText;

  // ================= Context Value =================
  const { closable } = restProps;
  const { onClose } = closable && typeof closable === 'object' ? closable : {};

  const memoizedValue = React.useMemo<ModalContextProps>(() => {
    return {
      autoFocusButton,
      cancelTextLocale,
      okTextLocale,
      mergedOkCancel,
      onClose,
      ...restProps,
    };
  }, [autoFocusButton, cancelTextLocale, okTextLocale, mergedOkCancel, onClose, restProps]);

  // ====================== Footer Origin Node ======================
  const footerOriginNode = (
    <>
      <CancelBtn />
      <OkBtn />
    </>
  );

  const hasTitle = props.title !== undefined && props.title !== null;

  const bodyCls = `${confirmPrefixCls}-body`;

  return (
    <div className={`${confirmPrefixCls}-body-wrapper`}>
      <div className={clsx(bodyCls, { [`${bodyCls}-has-title`]: hasTitle })}>
        {mergedIcon}
        <div className={`${confirmPrefixCls}-paragraph`}>
          {hasTitle && <span className={`${confirmPrefixCls}-title`}>{props.title}</span>}
          <div className={`${confirmPrefixCls}-content`}>{props.content}</div>
        </div>
      </div>
      {footer === undefined || typeof footer === 'function' ? (
        <ModalContextProvider value={memoizedValue}>
          <div className={`${confirmPrefixCls}-btns`}>
            {typeof footer === 'function'
              ? footer(footerOriginNode, { OkBtn, CancelBtn })
              : footerOriginNode}
          </div>
        </ModalContextProvider>
      ) : (
        footer
      )}
      <Confirm prefixCls={prefixCls} />
    </div>
  );
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    close,
    zIndex,
    maskStyle,
    direction,
    prefixCls,
    wrapClassName,
    rootPrefixCls,
    bodyStyle,
    closable = false,
    onConfirm,
    styles,
    title,
    okButtonProps,
    cancelButtonProps,
  } = props;

  const { cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps } =
    useComponentConfig('modal');

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Modal');

    [
      ['bodyStyle', 'styles.body'],
      ['maskStyle', 'styles.mask'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const confirmPrefixCls = `${prefixCls}-confirm`;

  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  const classString = clsx(
    confirmPrefixCls,
    `${confirmPrefixCls}-${props.type}`,
    { [`${confirmPrefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  // ========================= zIndex =========================
  const [, token] = useToken();

  const mergedZIndex = React.useMemo(() => {
    if (zIndex !== undefined) {
      return zIndex;
    }

    // Static always use max zIndex
    return token.zIndexPopupBase + CONTAINER_MAX_OFFSET;
  }, [zIndex, token]);

  // ========================= Render =========================
  return (
    <Modal
      {...props}
      className={classString}
      wrapClassName={clsx({ [`${confirmPrefixCls}-centered`]: !!props.centered }, wrapClassName)}
      onCancel={() => {
        close?.({ triggerCancel: true });
        onConfirm?.(false);
      }}
      title={title}
      footer={null}
      transitionName={getTransitionName(rootPrefixCls || '', 'zoom', props.transitionName)}
      maskTransitionName={getTransitionName(rootPrefixCls || '', 'fade', props.maskTransitionName)}
      maskClosable={maskClosable}
      style={style}
      styles={{ body: bodyStyle, mask: maskStyle, ...styles }}
      width={width}
      zIndex={mergedZIndex}
      closable={closable}
    >
      <ConfirmContent
        {...props}
        confirmPrefixCls={confirmPrefixCls}
        okButtonProps={{ ...contextOkButtonProps, ...okButtonProps }}
        cancelButtonProps={{ ...contextCancelButtonProps, ...cancelButtonProps }}
      />
    </Modal>
  );
};

const ConfirmDialogWrapper: React.FC<ConfirmDialogProps> = (props) => {
  const { rootPrefixCls, iconPrefixCls, direction, theme } = props;

  return (
    <ConfigProvider
      prefixCls={rootPrefixCls}
      iconPrefixCls={iconPrefixCls}
      direction={direction}
      theme={theme}
    >
      <ConfirmDialog {...props} />
    </ConfigProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ConfirmDialog.displayName = 'ConfirmDialog';
  ConfirmDialogWrapper.displayName = 'ConfirmDialogWrapper';
}

export default ConfirmDialogWrapper;
