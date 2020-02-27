import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import Animate from 'rc-animate';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import ErrorBoundary from './ErrorBoundary';

function noop() {}

export interface AlertProps {
  /**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */
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
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
}

export interface AlertState {
  closing: boolean;
  closed: boolean;
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

export default class Alert extends React.Component<AlertProps, AlertState> {
  static ErrorBoundary = ErrorBoundary;

  state = {
    closing: false,
    closed: false,
  };

  handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    this.setState({
      closing: true,
    });
    (this.props.onClose || noop)(e);
  };

  animationEnd = () => {
    this.setState({
      closing: false,
      closed: true,
    });
    (this.props.afterClose || noop)();
  };

  renderAlert = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      description,
      prefixCls: customizePrefixCls,
      message,
      closeText,
      banner,
      className = '',
      style,
      icon,
    } = this.props;
    let { closable, type, showIcon } = this.props;
    const { closing, closed } = this.state;

    const prefixCls = getPrefixCls('alert', customizePrefixCls);

    // banner模式默认有 Icon
    showIcon = banner && showIcon === undefined ? true : showIcon;
    // banner模式默认为警告
    type = banner && type === undefined ? 'warning' : type || 'info';

    // use outline icon in alert with description
    const iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;

    // closeable when closeText is assigned
    if (closeText) {
      closable = true;
    }

    const alertCls = classNames(
      prefixCls,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-closing`]: closing,
        [`${prefixCls}-with-description`]: !!description,
        [`${prefixCls}-no-icon`]: !showIcon,
        [`${prefixCls}-banner`]: !!banner,
        [`${prefixCls}-closable`]: closable,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    const closeIcon = closable ? (
      <button
        type="button"
        onClick={this.handleClose}
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

    const dataOrAriaProps = getDataOrAriaProps(this.props);

    const iconNode =
      (icon &&
        (React.isValidElement<{ className?: string }>(icon) ? (
          React.cloneElement(icon, {
            className: classNames(`${prefixCls}-icon`, {
              [icon.props.className as string]: icon.props.className,
            }),
          })
        ) : (
          <span className={`${prefixCls}-icon`}>{icon}</span>
        ))) ||
      React.createElement(iconType, { className: `${prefixCls}-icon` });

    return closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div data-show={!closing} className={alertCls} style={style} {...dataOrAriaProps}>
          {showIcon ? iconNode : null}
          <span className={`${prefixCls}-message`}>{message}</span>
          <span className={`${prefixCls}-description`}>{description}</span>
          {closeIcon}
        </div>
      </Animate>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAlert}</ConfigConsumer>;
  }
}
