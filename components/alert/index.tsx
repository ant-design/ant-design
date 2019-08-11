import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Close,
  CheckCircle,
  ExclamationCircle,
  InfoCircle,
  CloseCircle,
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import Animate from 'rc-animate';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';

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
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
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
  success: CheckCircle,
  info: InfoCircle,
  error: CloseCircle,
  warning: ExclamationCircle,
};

export default class Alert extends React.Component<AlertProps, AlertState> {
  state = {
    closing: true,
    closed: false,
  };

  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;

    this.setState({
      closing: false,
    });
    (this.props.onClose || noop)(e);
  };

  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true,
    });
    (this.props.afterClose || noop)();
  };

  renderAlert = ({ getPrefixCls }: ConfigConsumerProps) => {
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
        [`${prefixCls}-close`]: !this.state.closing,
        [`${prefixCls}-with-description`]: !!description,
        [`${prefixCls}-no-icon`]: !showIcon,
        [`${prefixCls}-banner`]: !!banner,
        [`${prefixCls}-closable`]: closable,
      },
      className,
    );

    const closeIcon = closable ? (
      <span
        role="button"
        onClick={this.handleClose}
        className={`${prefixCls}-close-icon`}
        tabIndex={0}
      >
        {closeText ? <span className={`${prefixCls}-close-text`}>{closeText}</span> : <Close />}
      </span>
    ) : null;

    const dataOrAriaProps = getDataOrAriaProps(this.props);

    const iconNode =
      (icon &&
        (React.isValidElement<{ className?: string }>(icon) ? (
          React.cloneElement(icon, {
            className: classNames({
              [icon.props.className as string]: icon.props.className,
              [`${prefixCls}-icon`]: true,
            }),
          })
        ) : (
          <span className={`${prefixCls}-icon`}>{icon}</span>
        ))) ||
      React.createElement(iconType, { className: `${prefixCls}-icon` });

    return this.state.closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div data-show={this.state.closing} className={alertCls} style={style} {...dataOrAriaProps}>
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
