import classNames from 'classnames';
import Dialog from 'rc-dialog';
import * as React from 'react';
import { getTransitionName } from '../_util/motion';
import { canUseDocElement } from '../_util/styleChecker';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
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
  } = React.useContext(ConfigContext);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  warning(
    !('visible' in props),
    'Modal',
    `\`visible\` will be removed in next major version, please use \`open\` instead.`,
  );

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    open,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,

    // Deprecated
    visible,

    width = 520,
    footer,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
  });

  if (process.env.NODE_ENV !== 'production') {
    warning(!('visible' in props), 'Modal', '`visible` is deprecated, please use `open` instead.');
  }

  const dialogFooter =
    footer === undefined ? <Footer {...props} onOk={handleOk} onCancel={handleCancel} /> : footer;

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <Dialog
          width={width}
          {...restProps}
          getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
          prefixCls={prefixCls}
          rootClassName={classNames(hashId, rootClassName)}
          wrapClassName={wrapClassNameExtended}
          footer={dialogFooter}
          visible={open ?? visible}
          mousePosition={restProps.mousePosition ?? mousePosition}
          onClose={handleCancel}
          closeIcon={renderCloseIcon(prefixCls, closeIcon)}
          focusTriggerAfterClose={focusTriggerAfterClose}
          transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
          maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
          className={classNames(hashId, className)}
        />
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default Modal;
