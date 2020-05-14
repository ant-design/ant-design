import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import Animate from 'rc-animate';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';
import ErrorBoundary from './ErrorBoundary';
import { replaceElement } from '../_util/reactNode';

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
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    this.props.onClose?.(e);
  };

  animationEnd = () => {
    this.setState({
      closing: false,
      closed: true,
    });
    this.props.afterClose?.();
  };

  getShowIcon() {
    const { banner, showIcon } = this.props;
    // banner 模式默认有 Icon
    return banner && showIcon === undefined ? true : showIcon;
  }

  getType() {
    const { banner, type } = this.props;
    if (type !== undefined) {
      return type;
    }
    // banner 模式默认为警告
    return banner ? 'warning' : 'info';
  }

  getClosable() {
    const { closable, closeText } = this.props;
    // closeable when closeText is assigned
    return closeText ? true : closable;
  }

  getIconType() {
    const { description } = this.props;
    // use outline icon in alert with description
    return (description ? iconMapOutlined : iconMapFilled)[this.getType()] || null;
  }

  renderIconNode({ prefixCls }: { prefixCls: string }) {
    const { icon } = this.props;
    const iconType = this.getIconType();
    if (icon) {
      return replaceElement(icon, <span className={`${prefixCls}-icon`}>{icon}</span>, () => ({
        className: classNames(`${prefixCls}-icon`, {
          [(icon as any).props.className]: (icon as any).props.className,
        }),
      }));
    }
    return React.createElement(iconType, { className: `${prefixCls}-icon` });
  }

  renderCloseIcon({ prefixCls }: { prefixCls: string }) {
    const { closeText } = this.props;
    return this.getClosable() ? (
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
  }

  renderAlert = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      description,
      prefixCls: customizePrefixCls,
      message,
      banner,
      className = '',
      style,
      onMouseEnter,
      onMouseLeave,
      onClick,
    } = this.props;
    const { closing, closed } = this.state;

    const prefixCls = getPrefixCls('alert', customizePrefixCls);

    const isShowIcon = this.getShowIcon();
    const type = this.getType();
    const closable = this.getClosable();

    const alertCls = classNames(
      prefixCls,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-closing`]: closing,
        [`${prefixCls}-with-description`]: !!description,
        [`${prefixCls}-no-icon`]: !isShowIcon,
        [`${prefixCls}-banner`]: !!banner,
        [`${prefixCls}-closable`]: closable,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    const closeIcon = this.renderCloseIcon({ prefixCls });

    const dataOrAriaProps = getDataOrAriaProps(this.props);

    const iconNode = this.renderIconNode({ prefixCls });

    return closed ? null : (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-slide-up`}
        onEnd={this.animationEnd}
      >
        <div
          data-show={!closing}
          className={alertCls}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          {...dataOrAriaProps}
        >
          {isShowIcon ? iconNode : null}
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
