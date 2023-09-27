import type { ReactElement } from 'react';
import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import pickAttrs from 'rc-util/lib/pickAttrs';

import { replaceElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
// CSSINJS
import useStyle from './style';

export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /**
   * @deprecated please use `closeIcon` instead.
   * Close text to show
   */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message?: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  /** Custom closeIcon */
  closeIcon?: boolean | React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
}

const IconNode: React.FC<IconNodeProps> = (props) => {
  const { icon, prefixCls, type } = props;
  const iconType = iconMapFilled[type!] || null;
  if (icon) {
    return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
      className: classNames(`${prefixCls}-icon`, {
        [(icon as ReactElement).props.className]: (icon as ReactElement).props.className,
      }),
    })) as ReactElement;
  }
  return React.createElement(iconType, { className: `${prefixCls}-icon` });
};

interface CloseIconProps {
  isClosable: boolean;
  prefixCls: AlertProps['prefixCls'];
  closeIcon: AlertProps['closeIcon'];
  handleClose: AlertProps['onClose'];
}

const CloseIcon: React.FC<CloseIconProps> = (props) => {
  const { isClosable, prefixCls, closeIcon, handleClose } = props;
  const mergedCloseIcon =
    closeIcon === true || closeIcon === undefined ? <CloseOutlined /> : closeIcon;
  return isClosable ? (
    <button type="button" onClick={handleClose} className={`${prefixCls}-close-icon`} tabIndex={0}>
      {mergedCloseIcon}
    </button>
  ) : null;
};

const Alert: React.FC<AlertProps> = (props) => {
  const {
    description,
    prefixCls: customizePrefixCls,
    message,
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
    ...otherProps
  } = props;

  const [closed, setClosed] = React.useState(false);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Alert');
    warning.deprecated(!closeText, 'closeText', 'closeIcon');
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const { getPrefixCls, direction, alert } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    props.onClose?.(e);
  };

  const type = React.useMemo<AlertProps['type']>(() => {
    if (props.type !== undefined) {
      return props.type;
    }
    // banner mode defaults to 'warning'
    return banner ? 'warning' : 'info';
  }, [props.type, banner]);

  // closeable when closeText or closeIcon is assigned
  const isClosable = React.useMemo(() => {
    if (closeText) {
      return true;
    }
    if (typeof closable === 'boolean') {
      return closable;
    }
    // should be true when closeIcon is 0 or ''
    return closeIcon !== false && closeIcon !== null && closeIcon !== undefined;
  }, [closeText, closeIcon, closable]);

  // banner mode defaults to Icon
  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  const alertCls = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !isShowIcon,
      [`${prefixCls}-banner`]: !!banner,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    alert?.className,
    className,
    rootClassName,
    hashId,
  );

  const restProps = pickAttrs(otherProps, { aria: true, data: true });

  return wrapSSR(
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({ maxHeight: node.offsetHeight })}
      onLeaveEnd={afterClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          ref={ref}
          data-show={!closed}
          className={classNames(alertCls, motionClassName)}
          style={{ ...alert?.style, ...style, ...motionStyle }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          role="alert"
          {...restProps}
        >
          {isShowIcon ? (
            <IconNode
              description={description}
              icon={props.icon}
              prefixCls={prefixCls}
              type={type}
            />
          ) : null}
          <div className={`${prefixCls}-content`}>
            {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
            {description ? <div className={`${prefixCls}-description`}>{description}</div> : null}
          </div>
          {action ? <div className={`${prefixCls}-action`}>{action}</div> : null}
          <CloseIcon
            isClosable={isClosable}
            prefixCls={prefixCls}
            closeIcon={closeText || closeIcon}
            handleClose={handleClose}
          />
        </div>
      )}
    </CSSMotion>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

export default Alert;
