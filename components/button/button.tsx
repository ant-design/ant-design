import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Group from './button-group';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Wave from '../_util/wave';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}

// Insert one space between two chinese characters automatically.
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default class Button extends React.Component<ButtonProps, any> {
  static Group: typeof Group;
  static __ANT_BUTTON = true;

  static defaultProps = {
    loading: false,
    ghost: false,
    block: false,
  };

  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'circle-outline']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.string,
    block: PropTypes.bool,
  };

  private delayTimeout: number;
  private buttonNode: HTMLElement | null;

  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      loading: props.loading,
      hasTwoCNChar: false,
    };
  }

  componentDidMount() {
    this.fixTwoCNChar();
  }

  componentWillReceiveProps(nextProps: ButtonProps) {
    const currentLoading = this.props.loading;
    const loading = nextProps.loading;

    if (currentLoading) {
      clearTimeout(this.delayTimeout);
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
    } else {
      this.setState({ loading });
    }
  }

  componentDidUpdate() {
    this.fixTwoCNChar();
  }

  componentWillUnmount() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  saveButtonRef = (node: HTMLElement | null) => {
    this.buttonNode = node;
  };

  fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    if (!this.buttonNode) {
      return;
    }
    const buttonText = this.buttonNode.textContent || this.buttonNode.innerText;
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.state.hasTwoCNChar) {
        this.setState({
          hasTwoCNChar: true,
        });
      }
    } else if (this.state.hasTwoCNChar) {
      this.setState({
        hasTwoCNChar: false,
      });
    }
  }

  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { loading } = this.state;
    const { onClick } = this.props;
    if (!!loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  isNeedInserted() {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }

  renderButton = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      type,
      shape,
      size,
      className,
      children,
      icon,
      ghost,
      loading: _loadingProp,
      block,
      ...rest
    } = this.props;
    const { loading, hasTwoCNChar } = this.state;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }

    const now = new Date();
    const isChristmas = now.getMonth() === 11 && now.getDate() === 25;
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
      [`${prefixCls}-block`]: block,
      christmas: isChristmas,
    });

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const kids =
      children || children === 0
        ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted()))
        : null;

    const title = isChristmas ? 'Ho Ho Ho!' : rest.title;

    const linkButtonRestProps = rest as AnchorButtonProps;
    if (linkButtonRestProps.href !== undefined) {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          onClick={this.handleClick}
          title={title}
          ref={this.saveButtonRef}
        >
          {iconNode}
          {kids}
        </a>
      );
    }

    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    const { htmlType, ...otherProps } = rest as NativeButtonProps;

    return (
      <Wave>
        <button
          {...otherProps as NativeButtonProps}
          type={htmlType || 'button'}
          className={classes}
          onClick={this.handleClick}
          title={title}
          ref={this.saveButtonRef}
        >
          {iconNode}
          {kids}
        </button>
      </Wave>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}
