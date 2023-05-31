import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import pickAttrs from 'rc-util/lib/pickAttrs';
import type { ReactElement } from 'react';
import * as React from 'react';
import { replaceElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import ErrorBoundary from './ErrorBoundary';

// CSSINJS
import useStyle from './style';

export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
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
  closeIcon?: React.ReactNode;
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
  closeText: AlertProps['closeText'];
  closeIcon: AlertProps['closeIcon'];
  handleClose: AlertProps['onClose'];
}

const CloseIcon: React.FC<CloseIconProps> = (props) => {
  const { isClosable, closeText, prefixCls, closeIcon, handleClose } = props;
  return isClosable ? (
    <button type="button" onClick={handleClose} className={`${prefixCls}-close-icon`} tabIndex={0}>
      {closeText ? <span className={`${prefixCls}-close-text`}>{closeText}</span> : closeIcon}
    </button>
  ) : null;
};

type CompoundedComponent = React.FC<AlertProps> & {
  ErrorBoundary: typeof ErrorBoundary;
};

const Alert: CompoundedComponent = ({
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
  closeIcon = <CloseOutlined />,
  action,
  ...props
}) => {
  const [closed, setClosed] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    props.onClose?.(e);
  };

  const getType = () => {
    const { type } = props;
    if (type !== undefined) {
      return type;
    }
    // banner mode defaults to 'warning'
    return banner ? 'warning' : 'info';
  };

  // closeable when closeText is assigned
  const isClosable = closeText ? true : closable;
  const type = getType();

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
    className,
    rootClassName,
    hashId,
  );

  const dataOrAriaProps = pickAttrs(props, {
    aria: true,
    data: true,
  });

  return wrapSSR(
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({
        maxHeight: node.offsetHeight,
      })}
      onLeaveEnd={afterClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          ref={ref}
          data-show={!closed}
          className={classNames(alertCls, motionClassName)}
          style={{ ...style, ...motionStyle }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          role="alert"
          {...dataOrAriaProps}
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
            isClosable={!!isClosable}
            closeText={closeText}
            prefixCls={prefixCls}
            closeIcon={closeIcon}
            handleClose={handleClose}
          />
        </div>
      )}
    </CSSMotion>,
  );
};

Alert.ErrorBoundary = ErrorBoundary;

if (process.env.NODE_ENV !== 'production') {
  Alert.displayName = 'Alert';
}

export default Alert;
