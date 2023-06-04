import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import classNames from 'classnames';
import * as React from 'react';
import ActionButton from '../_util/ActionButton';
import { getTransitionName } from '../_util/motion';
import warning from '../_util/warning';
import type { ThemeConfig } from '../config-provider';
import ConfigProvider from '../config-provider';
import { useLocale } from '../locale';
import Dialog from './Modal';
import type { ModalFuncProps, ModalLocale } from './interface';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close?: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls: string;
  iconPrefixCls?: string;
  theme?: ThemeConfig;

  /** @private Internal Usage. Do not override this */
  locale?: ModalLocale;
}

export function ConfirmContent(
  props: ConfirmDialogProps & {
    confirmPrefixCls: string;
  },
) {
  const {
    icon,
    onCancel,
    onOk,
    close,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    confirmPrefixCls,
    rootPrefixCls,
    type,
    okCancel,
    footer,
    // Legacy for static function usage
    locale: staticLocale,
  } = props;

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Modal',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

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

  const okType = props.okType || 'primary';
  // 默认为 true，保持向下兼容
  const mergedOkCancel = okCancel ?? type === 'confirm';

  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

  const [locale] = useLocale('Modal');

  const mergedLocale = staticLocale || locale;

  const cancelButton = mergedOkCancel && (
    <ActionButton
      actionFn={onCancel}
      close={close}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelText || mergedLocale?.cancelText}
    </ActionButton>
  );

  return (
    <div className={`${confirmPrefixCls}-body-wrapper`}>
      <div className={`${confirmPrefixCls}-body`}>
        {mergedIcon}
        {props.title === undefined ? null : (
          <span className={`${confirmPrefixCls}-title`}>{props.title}</span>
        )}
        <div className={`${confirmPrefixCls}-content`}>{props.content}</div>
      </div>
      {footer === undefined ? (
        <div className={`${confirmPrefixCls}-btns`}>
          {cancelButton}
          <ActionButton
            type={okType}
            actionFn={onOk}
            close={close}
            autoFocus={autoFocusButton === 'ok'}
            buttonProps={okButtonProps}
            prefixCls={`${rootPrefixCls}-btn`}
          >
            {okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText)}
          </ActionButton>
        </div>
      ) : (
        footer
      )}
    </div>
  );
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const {
    close,
    zIndex,
    afterClose,
    visible,
    open,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    direction,
    prefixCls,
    wrapClassName,
    rootPrefixCls,
    iconPrefixCls,
    theme,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      visible === undefined,
      'Modal',
      `\`visible\` is deprecated, please use \`open\` instead.`,
    );
  }

  const confirmPrefixCls = `${prefixCls}-confirm`;

  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  const classString = classNames(
    confirmPrefixCls,
    `${confirmPrefixCls}-${props.type}`,
    { [`${confirmPrefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  return (
    <ConfigProvider
      prefixCls={rootPrefixCls}
      iconPrefixCls={iconPrefixCls}
      direction={direction}
      theme={theme}
    >
      <Dialog
        prefixCls={prefixCls}
        className={classString}
        wrapClassName={classNames(
          { [`${confirmPrefixCls}-centered`]: !!props.centered },
          wrapClassName,
        )}
        onCancel={() => close?.({ triggerCancel: true })}
        open={open}
        title=""
        footer={null}
        transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
        maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
        mask={mask}
        maskClosable={maskClosable}
        maskStyle={maskStyle}
        style={style}
        bodyStyle={bodyStyle}
        width={width}
        zIndex={zIndex}
        afterClose={afterClose}
        keyboard={keyboard}
        centered={centered}
        getContainer={getContainer}
        closable={closable}
        closeIcon={closeIcon}
        modalRender={modalRender}
        focusTriggerAfterClose={focusTriggerAfterClose}
      >
        <ConfirmContent {...props} confirmPrefixCls={confirmPrefixCls} />
      </Dialog>
    </ConfigProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ConfirmDialog.displayName = 'ConfirmDialog';
}

export default ConfirmDialog;
