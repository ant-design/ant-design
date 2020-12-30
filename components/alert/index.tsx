import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import ErrorBoundary from './ErrorBoundary';
import { replaceElement } from '../_util/reactNode';

export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
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
  banner?: boolean;
  icon?: React.ReactNode;
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

const iconMapOutlined = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

interface AlertInterface extends React.FC<AlertProps> {
  ErrorBoundary: typeof ErrorBoundary;
}

const Alert: AlertInterface = ({
  description,
  prefixCls: customizePrefixCls,
  message,
  banner,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  afterClose,
  showIcon,
  closable,
  closeText,
  action,
  ...props
}) => {
  const [closed, setClosed] = React.useState(false);

  const ref = React.useRef<HTMLElement>();
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    props.onClose?.(e);
  };

  const getType = () => {
    const { type } = props;
    if (type !== undefined) {
      return type;
    }
    // banner 模式默认为警告
    return banner ? 'warning' : 'info';
  };

  // closeable when closeText is assigned
  const isClosable = closeText ? true : closable;
  const type = getType();

  const renderIconNode = () => {
    const { icon } = props;
    // use outline icon in alert with description
    const iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;
    if (icon) {
      return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
        className: classNames(`${prefixCls}-icon`, {
          [(icon as any).props.className]: (icon as any).props.className,
        }),
      }));
    }
    return React.createElement(iconType, { className: `${prefixCls}-icon` });
  };

  const renderCloseIcon = () =>
    isClosable ? (
      <button
        type="button"
        onClick={handleClose}
        className={`${prefixCls}-close-icon`}
        tabIndex={0}
      >
        {closeText ? (
          <span className={`${prefixCls}-close-text`}>{closeText}</span>
        ) : (
          <CloseOutlined />
        )}
      </button>
    ) : null;

  // banner 模式默认有 Icon
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
  );

  const dataOrAriaProps = getDataOrAriaProps(props);

  return (
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={node => ({
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
          {isShowIcon ? renderIconNode() : null}
          <div className={`${prefixCls}-content`}>
            <div className={`${prefixCls}-message`}>{message}</div>
            <div className={`${prefixCls}-description`}>{description}</div>
          </div>

          {action ? <div className={`${prefixCls}-action`}>{action}</div> : null}

          {renderCloseIcon()}
        </div>
      )}
    </CSSMotion>
  );
};

Alert.ErrorBoundary = ErrorBoundary;

export default Alert;
