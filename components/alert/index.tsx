import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon, { ThemeType } from '../icon';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import warning from '../_util/warning';

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
  iconType?: string;
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

export default class Alert extends React.Component<AlertProps, AlertState> {
  state: AlertState = {
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
    let { closable, type, showIcon, iconType } = this.props;

    const prefixCls = getPrefixCls('alert', customizePrefixCls);

    // banner模式默认有 Icon
    showIcon = banner && showIcon === undefined ? true : showIcon;
    // banner模式默认为警告
    type = banner && type === undefined ? 'warning' : type || 'info';

    let iconTheme: ThemeType = 'filled';
    warning(!iconType, `The prop 'iconType' is deprecated and will be removed in next major release. Please use 'icon' instead.`);
    if (!iconType) {
      switch (type) {
        case 'success':
          iconType = 'check-circle';
          break;
        case 'info':
          iconType = 'info-circle';
          break;
        case 'error':
          iconType = 'close-circle';
          break;
        case 'warning':
          iconType = 'exclamation-circle';
          break;
        default:
          iconType = 'default';
      }

      // use outline icon in alert with description
      if (!!description) {
        iconTheme = 'outlined';
      }
    }

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
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || <Icon type="close" />}
      </a>
    ) : null;

    const dataOrAriaProps = getDataOrAriaProps(this.props);

    const iconNode = (icon &&
      (React.isValidElement<{ className?: string }>(icon) ? (
        React.cloneElement(icon, {
          className: classNames({
            [icon.props.className as string]: icon.props.className,
            [`${prefixCls}-icon`]: true,
          }),
        })
      ) : (
        <span className={`${prefixCls}-icon`}>{icon}</span>
      ))) || <Icon className={`${prefixCls}-icon`} type={iconType} theme={iconTheme} />;

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
