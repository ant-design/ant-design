import type { ReactElement } from 'react';
import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CSSMotion from '@rc-component/motion';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { composeRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';

import type { ClosableType } from '../_util/hooks/useClosable';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { replaceElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';

export interface AlertRef {
  nativeElement: HTMLDivElement;
}

export type AlertSemanticName =
  | 'root'
  | 'icon'
  | 'section'
  | 'title'
  | 'description'
  | 'actions'
  | 'close';

export type AlertClassNamesType = SemanticClassNamesType<AlertProps, AlertSemanticName>;
export type AlertStylesType = SemanticStylesType<AlertProps, AlertSemanticName>;

export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?:
    | boolean
    | (Exclude<ClosableType, boolean> & {
        /** Callback when close Alert */
        onClose?: React.MouseEventHandler<HTMLButtonElement>;
      });
  /**
   * @deprecated please use `closable.closeIcon` instead.
   * Close text to show
   */
  closeText?: React.ReactNode;
  /** Content of Alert */
  title?: React.ReactNode;
  /**
   * @deprecated please use `title` instead.
   */
  message?: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /**
   * @deprecated please use `closable.onClose` instead.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /** Trigger when animation ending of Alert */
  /**
   * @deprecated please use `closable.afterClose` instead.
   */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  classNames?: AlertClassNamesType;
  styles?: AlertStylesType;
  rootClassName?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  /**
   * @deprecated please use `closable.closeIcon` instead.
   */
  closeIcon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  id?: string;
}

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

interface IconNodeProps {
  type: AlertProps['type'];
  icon: AlertProps['icon'];
  prefixCls: AlertProps['prefixCls'];
  description: AlertProps['description'];
  className?: string;
  style?: React.CSSProperties;
}

const IconNode: React.FC<IconNodeProps> = (props) => {
  const { icon, prefixCls, type, className, style } = props;
  const iconType = iconMapFilled[type!] || null;
  if (icon) {
    return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
      className: classNames(
        (
          icon as ReactElement<{
            className?: string;
          }>
        ).props.className,
        className,
      ),
      style,
    })) as ReactElement;
  }
  return React.createElement(iconType, {
    className,
    style,
  });
};

type CloseIconProps = {
  isClosable: boolean;
  prefixCls: AlertProps['prefixCls'];
  closeIcon: AlertProps['closeIcon'];
  handleClose: AlertProps['onClose'];
  ariaProps: React.AriaAttributes;
  className?: string;
  style?: React.CSSProperties;
};

const CloseIconNode: React.FC<CloseIconProps> = (props) => {
  const { isClosable, prefixCls, closeIcon, handleClose, ariaProps, className, style } = props;
  const mergedCloseIcon =
    closeIcon === true || closeIcon === undefined ? <CloseOutlined /> : closeIcon;
  return isClosable ? (
    <button
      type="button"
      onClick={handleClose}
      className={classNames(`${prefixCls}-close-icon`, className)}
      tabIndex={0}
      style={style}
      {...ariaProps}
    >
      {mergedCloseIcon}
    </button>
  ) : null;
};

const Alert = React.forwardRef<AlertRef, AlertProps>((props, ref) => {
  const {
    description,
    prefixCls: customizePrefixCls,
    message,
    title,
    banner,
    className,
    rootClassName,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon,
    action,
    id,
    styles,
    classNames: alertClassNames,
    ...otherProps
  } = props;

  const mergedTitle = title ?? message;

  const [closed, setClosed] = React.useState(false);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Alert');
    [
      ['closeText', 'closable.closeIcon'],
      ['message', 'title'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const internalRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current!,
  }));

  const {
    getPrefixCls,
    direction,
    closable: contextClosable,
    closeIcon: contextCloseIcon,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('alert');
  const prefixCls = getPrefixCls('alert', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const { onClose: closableOnClose, afterClose: closableAfterClose } =
    closable && typeof closable === 'object' ? closable : {};

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    (closableOnClose ?? props.onClose)?.(e);
  };

  const type = React.useMemo<AlertProps['type']>(() => {
    if (props.type !== undefined) {
      return props.type;
    }
    // banner mode defaults to 'warning'
    return banner ? 'warning' : 'info';
  }, [props.type, banner]);

  // closeable when closeText or closeIcon is assigned
  const isClosable = React.useMemo<boolean>(() => {
    if (typeof closable === 'object' && closable.closeIcon) return true;
    if (closeText) {
      return true;
    }
    if (typeof closable === 'boolean') {
      return closable;
    }
    // should be true when closeIcon is 0 or ''
    if (closeIcon !== false && closeIcon !== null && closeIcon !== undefined) {
      return true;
    }

    return !!contextClosable;
  }, [closeText, closeIcon, closable, contextClosable]);

  // banner mode defaults to Icon
  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  // =========== Merged Props for Semantic ==========
  const mergedProps: AlertProps = {
    ...props,
    prefixCls,
    type,
    showIcon: isShowIcon,
    closable: isClosable,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    AlertClassNamesType,
    AlertStylesType,
    AlertProps
  >([contextClassNames, alertClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const alertCls = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !isShowIcon,
      [`${prefixCls}-banner`]: !!banner,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
    cssVarCls,
    hashId,
  );

  const restProps = pickAttrs(otherProps, { aria: true, data: true });

  const mergedCloseIcon = React.useMemo(() => {
    if (typeof closable === 'object' && closable.closeIcon) {
      return closable.closeIcon;
    }
    if (closeText) {
      return closeText;
    }
    if (closeIcon !== undefined) {
      return closeIcon;
    }
    if (typeof contextClosable === 'object' && contextClosable.closeIcon) {
      return contextClosable.closeIcon;
    }
    return contextCloseIcon;
  }, [closeIcon, closable, closeText, contextCloseIcon]);

  const mergedAriaProps = React.useMemo<React.AriaAttributes>(() => {
    const merged = closable ?? contextClosable;
    if (typeof merged === 'object') {
      return pickAttrs(merged, { data: true, aria: true });
    }
    return {};
  }, [closable, contextClosable]);

  return (
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({ maxHeight: node.offsetHeight })}
      onLeaveEnd={closableAfterClose ?? afterClose}
    >
      {({ className: motionClassName, style: motionStyle }, setRef) => (
        <div
          id={id}
          ref={composeRef(internalRef, setRef)}
          data-show={!closed}
          className={classNames(alertCls, motionClassName)}
          style={{
            ...mergedStyles.root,
            ...contextStyle,
            ...style,
            ...motionStyle,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          role="alert"
          {...restProps}
        >
          {isShowIcon ? (
            <IconNode
              className={classNames(`${prefixCls}-icon`, mergedClassNames.icon)}
              style={mergedStyles.icon}
              description={description}
              icon={props.icon}
              prefixCls={prefixCls}
              type={type}
            />
          ) : null}
          <div
            className={classNames(`${prefixCls}-section`, mergedClassNames.section)}
            style={mergedStyles.section}
          >
            {mergedTitle ? (
              <div
                className={classNames(`${prefixCls}-title`, mergedClassNames.title)}
                style={mergedStyles.title}
              >
                {mergedTitle}
              </div>
            ) : null}
            {description ? (
              <div
                className={classNames(`${prefixCls}-description`, mergedClassNames.description)}
                style={mergedStyles.description}
              >
                {description}
              </div>
            ) : null}
          </div>
          {action ? (
            <div
              className={classNames(`${prefixCls}-actions`, mergedClassNames.actions)}
              style={mergedStyles.actions}
            >
              {action}
            </div>
          ) : null}
          <CloseIconNode
            className={mergedClassNames.close}
            style={mergedStyles.close}
            isClosable={isClosable}
            prefixCls={prefixCls}
            closeIcon={mergedCloseIcon}
            handleClose={handleClose}
            ariaProps={mergedAriaProps}
          />
        </div>
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

export default Alert;
