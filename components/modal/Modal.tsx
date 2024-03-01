import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import Dialog from 'rc-dialog';

import useClosable from '../_util/hooks/useClosable';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { canUseDocElement } from '../_util/styleChecker';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import { usePanelRef } from '../watermark/context';
import type { ModalProps, MousePosition } from './interface';
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
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    modal,
  } = React.useContext(ConfigContext);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Modal');

    [
      ['visible', 'open'],
      ['bodyStyle', 'styles.body'],
      ['maskStyle', 'styles.mask'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    open,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    closable,
    focusTriggerAfterClose = true,
    style,
    // Deprecated
    visible,

    width = 520,
    footer,
    classNames: modalClassNames,
    styles: modalStyles,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
  });

  const dialogFooter = footer !== null && (
    <Footer {...props} onOk={handleOk} onCancel={handleCancel} />
  );

  const [mergedClosable, mergedCloseIcon] = useClosable({
    closable,
    closeIcon: typeof closeIcon !== 'undefined' ? closeIcon : modal?.closeIcon,
    customCloseIconRender: (icon) => renderCloseIcon(prefixCls, icon),
    defaultCloseIcon: <CloseOutlined className={`${prefixCls}-close-icon`} />,
    defaultClosable: true,
  });

  // ============================ Refs ============================
  // Select `ant-modal-content` by `panelRef`
  const panelRef = usePanelRef(`.${prefixCls}-content`);

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Modal', restProps.zIndex);

  // =========================== Render ===========================
  return wrapCSSVar(
    <NoCompactStyle>
      <NoFormStyle status override>
        <zIndexContext.Provider value={contextZIndex}>
          <Dialog
            width={width}
            {...restProps}
            zIndex={zIndex}
            getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
            prefixCls={prefixCls}
            rootClassName={classNames(hashId, rootClassName, cssVarCls, rootCls)}
            footer={dialogFooter}
            visible={open ?? visible}
            mousePosition={restProps.mousePosition ?? mousePosition}
            onClose={handleCancel}
            closable={mergedClosable}
            closeIcon={mergedCloseIcon}
            focusTriggerAfterClose={focusTriggerAfterClose}
            transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
            maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
            className={classNames(hashId, className, modal?.className)}
            style={{ ...modal?.style, ...style }}
            classNames={{
              ...modal?.classNames,
              ...modalClassNames,
              wrapper: classNames(wrapClassNameExtended, modalClassNames?.wrapper),
            }}
            styles={{
              ...modal?.styles,
              ...modalStyles,
            }}
            panelRef={panelRef}
          />
        </zIndexContext.Provider>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default Modal;
