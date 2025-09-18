import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import Dialog from '@rc-component/dialog';
import { composeRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';

import ContextIsolator from '../_util/ContextIsolator';
import useClosable, { pickClosable } from '../_util/hooks/useClosable';
import useMergedMask from '../_util/hooks/useMergedMask';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { Breakpoint } from '../_util/responsiveObserver';
import { canUseDocElement } from '../_util/styleChecker';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Skeleton from '../skeleton';
import { usePanelRef } from '../watermark/context';
import type { ModalClassNamesType, ModalProps, ModalStylesType, MousePosition } from './interface';
import { Footer, renderCloseIcon } from './shared';
import useStyle from './style';

let mousePosition: MousePosition;

// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    open,
    wrapClassName,
    centered,
    getContainer,
    focusTriggerAfterClose = true,
    style,
    width = 520,
    footer,
    classNames: modalClassNames,
    styles: modalStyles,
    children,
    loading,
    confirmLoading,
    zIndex: customizeZIndex,
    mousePosition: customizeMousePosition,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    destroyOnHidden,
    destroyOnClose,
    panelRef = null,
    closable,
    mask: modalMask,
    ...restProps
  } = props;

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    centered: contextCentered,
    cancelButtonProps: contextCancelButtonProps,
    okButtonProps: contextOkButtonProps,
    mask: contextMask,
  } = useComponentConfig('modal');

  const { modal: modalContext } = React.useContext(ConfigContext);

  const [closableAfterclose, onClose] = React.useMemo(() => {
    if (typeof closable === 'boolean') {
      return [undefined, undefined];
    }
    return [closable?.afterClose, closable?.onClose];
  }, [closable]);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const [mergedMask, maskBlurClassName] = useMergedMask(modalMask, contextMask, prefixCls);

  const mergedProps: ModalProps = {
    ...props,
    width,
    panelRef,
    focusTriggerAfterClose,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ModalClassNamesType,
    ModalStylesType,
    ModalProps
  >(
    [contextClassNames, modalClassNames, maskBlurClassName],
    [contextStyles, modalStyles],
    undefined,
    {
      props: mergedProps,
    },
  );

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmLoading) {
      return;
    }
    onCancel?.(e);
    onClose?.();
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOk?.(e);
    onClose?.();
  };

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Modal');

    [
      ['bodyStyle', 'styles.body'],
      ['maskStyle', 'styles.mask'],
      ['destroyOnClose', 'destroyOnHidden'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: centered ?? contextCentered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
  });

  const dialogFooter =
    footer !== null && !loading ? (
      <Footer
        {...props}
        okButtonProps={{ ...contextOkButtonProps, ...okButtonProps }}
        onOk={handleOk}
        cancelButtonProps={{ ...contextCancelButtonProps, ...cancelButtonProps }}
        onCancel={handleCancel}
      />
    ) : null;

  const [rawClosable, mergedCloseIcon, closeBtnIsDisabled, ariaProps] = useClosable(
    pickClosable(props),
    pickClosable(modalContext),
    {
      closable: true,
      closeIcon: <CloseOutlined className={`${prefixCls}-close-icon`} />,
      closeIconRender: (icon) => renderCloseIcon(prefixCls, icon),
    },
  );

  const mergedClosable = rawClosable
    ? {
        disabled: closeBtnIsDisabled,
        closeIcon: mergedCloseIcon,
        afterClose: closableAfterclose,
        ...ariaProps,
      }
    : false;
  // ============================ Refs ============================
  // Select `ant-modal-container` by `panelRef`
  const innerPanelRef = usePanelRef(`.${prefixCls}-container`);
  const mergedPanelRef = composeRef(panelRef, innerPanelRef) as React.Ref<HTMLDivElement>;

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Modal', customizeZIndex);

  // =========================== Width ============================
  const [numWidth, responsiveWidth] = React.useMemo<
    [string | number | undefined, Partial<Record<Breakpoint, string | number>> | undefined]
  >(() => {
    if (width && typeof width === 'object') {
      return [undefined, width];
    }
    return [width, undefined];
  }, [width]);

  const responsiveWidthVars = React.useMemo(() => {
    const vars: Record<string, string> = {};
    if (responsiveWidth) {
      Object.keys(responsiveWidth).forEach((breakpoint) => {
        const breakpointWidth = responsiveWidth[breakpoint as Breakpoint];
        if (breakpointWidth !== undefined) {
          vars[`--${prefixCls}-${breakpoint}-width`] =
            typeof breakpointWidth === 'number' ? `${breakpointWidth}px` : breakpointWidth;
        }
      });
    }
    return vars;
  }, [responsiveWidth]);

  // =========================== Render ===========================
  return (
    <ContextIsolator form space>
      <zIndexContext.Provider value={contextZIndex}>
        <Dialog
          width={numWidth}
          {...restProps}
          zIndex={zIndex}
          getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
          prefixCls={prefixCls}
          rootClassName={classNames(
            hashId,
            rootClassName,
            cssVarCls,
            rootCls,
            mergedClassNames.root,
          )}
          rootStyle={mergedStyles.root}
          footer={dialogFooter}
          visible={open}
          mousePosition={customizeMousePosition ?? mousePosition}
          onClose={handleCancel as any}
          closable={mergedClosable}
          closeIcon={mergedCloseIcon}
          focusTriggerAfterClose={focusTriggerAfterClose}
          transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
          maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
          mask={mergedMask}
          className={classNames(hashId, className, contextClassName)}
          style={{
            ...contextStyle,
            ...style,
            ...responsiveWidthVars,
          }}
          classNames={{
            ...mergedClassNames,
            wrapper: classNames(mergedClassNames.wrapper, wrapClassNameExtended),
          }}
          styles={mergedStyles}
          panelRef={mergedPanelRef}
          destroyOnHidden={destroyOnHidden ?? destroyOnClose}
        >
          {loading ? (
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 4 }}
              className={`${prefixCls}-body-skeleton`}
            />
          ) : (
            children
          )}
        </Dialog>
      </zIndexContext.Provider>
    </ContextIsolator>
  );
};

export default Modal;
