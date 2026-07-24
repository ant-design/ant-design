import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import fallbackProp from '../_util/fallbackProp';
import { CONTAINER_MAX_OFFSET, normalizeMaskConfig } from '../_util/hooks';
import { isFunction, isPlainObject, isReactRenderable } from '../_util/is';
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

const CONFIRM_OMIT_SEMANTIC_NAMES = ['body'] as const;

type ConfirmContentSemantic = {
  classNames: { body?: string };
  styles: { body?: React.CSSProperties };
};

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

export const ConfirmContent: React.FC<
  ConfirmDialogProps & {
    confirmPrefixCls: string;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
  }
> = (props) => {
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
    autoFocusButton,
    focusable,
    contentClassName,
    contentStyle,
    ...restProps
  } = props;

  const { infoIcon, successIcon, errorIcon, warningIcon } = useComponentConfig('modal');

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

  // 支持传入 { icon: null } 或 { icon: false } 来隐藏`Modal.confirm`默认的Icon
  if (icon === undefined) {
    switch (type) {
      case 'info':
        mergedIcon = fallbackProp(infoIcon, <InfoCircleFilled />);
        break;
      case 'success':
        mergedIcon = fallbackProp(successIcon, <CheckCircleFilled />);
        break;
      case 'error':
        mergedIcon = fallbackProp(errorIcon, <CloseCircleFilled />);
        break;
      default:
        mergedIcon = fallbackProp(warningIcon, <ExclamationCircleFilled />);
    }
  }

  // 默认为 true，保持向下兼容
  const mergedOkCancel = okCancel ?? type === 'confirm';

  // Default to `null` so the focus goes to the dialog container instead of
  // auto-focusing the OK button. Auto-focusing a specific button is inconsistent
  // across opens when the dialog is reused, and pulls focus away from the
  // dialog content. See https://github.com/ant-design/ant-design/issues/56963
  const focusableAutoFocusButton = focusable?.autoFocusButton;
  const hasFocusableAutoFocusButton = !!focusable && 'autoFocusButton' in focusable;
  const mergedAutoFocusButton = React.useMemo<null | 'ok' | 'cancel'>(() => {
    if (hasFocusableAutoFocusButton) {
      return focusableAutoFocusButton ?? null;
    }
    if (autoFocusButton !== undefined) {
      return autoFocusButton;
    }
    return null;
  }, [autoFocusButton, focusableAutoFocusButton, hasFocusableAutoFocusButton]);

  const [locale] = useLocale('Modal');

  const mergedLocale = staticLocale || locale;

  // ================== Locale Text ==================
  const okTextLocale = okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText);
  const cancelTextLocale = cancelText || mergedLocale?.cancelText;

  // ================= Context Value =================
  const { closable } = restProps;
  const { onClose } = isPlainObject(closable) ? closable : {};

  const memoizedValue = React.useMemo<ModalContextProps>(() => {
    return {
      autoFocusButton: mergedAutoFocusButton,
      cancelTextLocale,
      okTextLocale,
      mergedOkCancel,
      onClose,
      ...restProps,
    };
  }, [mergedAutoFocusButton, cancelTextLocale, okTextLocale, mergedOkCancel, onClose, restProps]);

  // ====================== Footer Origin Node ======================
  const footerOriginNode = (
    <>
      <CancelBtn />
      <OkBtn />
    </>
  );

  const hasTitle = isReactRenderable(props.title);
  const hasIcon = isReactRenderable(mergedIcon);

  const bodyCls = `${confirmPrefixCls}-body`;

  return (
    <div className={`${confirmPrefixCls}-body-wrapper`}>
      <div
        className={clsx(bodyCls, {
          [`${bodyCls}-has-title`]: hasTitle,
          [`${bodyCls}-no-icon`]: !hasIcon,
        })}
      >
        {mergedIcon}
        <div className={`${confirmPrefixCls}-paragraph`}>
          {hasTitle && <span className={`${confirmPrefixCls}-title`}>{props.title}</span>}
          <div
            className={clsx(`${confirmPrefixCls}-content`, contentClassName)}
            style={contentStyle}
          >
            {props.content}
          </div>
        </div>
      </div>
      {footer === undefined || isFunction(footer) ? (
        <ModalContextProvider value={memoizedValue}>
          <div className={`${confirmPrefixCls}-btns`}>
            {isFunction(footer) ? footer(footerOriginNode, { OkBtn, CancelBtn }) : footerOriginNode}
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
    mask,
    maskClosable,
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
  const semanticStyles = isFunction(styles)
    ? (info: any) => ({ body: bodyStyle, mask: maskStyle, ...styles(info) })
    : { body: bodyStyle, mask: maskStyle, ...styles };
  const modalProps = omit(props, ['bodyStyle', 'maskStyle'] as const);

  const classString = clsx(
    confirmPrefixCls,
    `${confirmPrefixCls}-${props.type}`,
    { [`${confirmPrefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  // ========================== Mask ==========================
  // 默认为 false，保持旧版默认行为
  const mergedMask = React.useMemo(() => {
    const nextMaskConfig = normalizeMaskConfig(mask, maskClosable);

    nextMaskConfig.closable ??= false;

    return nextMaskConfig;
  }, [mask, maskClosable]);

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
      {...modalProps}
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
      mask={mergedMask}
      style={style}
      styles={semanticStyles}
      width={width}
      zIndex={mergedZIndex}
      closable={closable}
      {...{
        _semanticOmit: CONFIRM_OMIT_SEMANTIC_NAMES,
        _renderSemanticContent: ({
          classNames: mergedClassNames,
          styles: mergedStyles,
        }: ConfirmContentSemantic) => (
          <ConfirmContent
            {...props}
            confirmPrefixCls={confirmPrefixCls}
            okButtonProps={{ ...contextOkButtonProps, ...okButtonProps }}
            cancelButtonProps={{ ...contextCancelButtonProps, ...cancelButtonProps }}
            contentClassName={mergedClassNames.body}
            contentStyle={mergedStyles.body}
          />
        ),
      }}
    />
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
