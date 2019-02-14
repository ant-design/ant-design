import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Group from './button-group';
import omit from 'omit.js';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Wave from '../_util/wave';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import Loading from '../icon/icons/Loading';

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

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger');
export type ButtonType = (typeof ButtonTypes)[number];
const ButtonShapes = tuple('circle', 'circle-outline', 'round');
export type ButtonShape = (typeof ButtonShapes)[number];
const ButtonSizes = tuple('large', 'default', 'small');
export type ButtonSize = (typeof ButtonSizes)[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: string | React.ReactNode;
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

interface ButtonState {
  loading?: boolean | { delay?: number };
  hasTwoCNChar: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static Group: typeof Group;
  static __ANT_BUTTON = true;

  static defaultProps = {
    loading: false,
    ghost: false,
    block: false,
  };

  static propTypes = {
    type: PropTypes.string,
    shape: PropTypes.oneOf(ButtonShapes),
    size: PropTypes.oneOf(ButtonSizes),
    htmlType: PropTypes.oneOf(ButtonHTMLTypes),
    onClick: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    block: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps: ButtonProps, prevState: ButtonState) {
    if (nextProps.loading instanceof Boolean) {
      return {
        ...prevState,
        loading: nextProps.loading,
      };
    }
    return null;
  }

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

  componentDidUpdate(prevProps: ButtonProps) {
    this.fixTwoCNChar();

    if (prevProps.loading && typeof prevProps.loading !== 'boolean') {
      clearTimeout(this.delayTimeout);
    }

    const { loading } = this.props;
    if (loading && typeof loading !== 'boolean' && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
    } else if (prevProps.loading === this.props.loading) {
      return;
    } else {
      this.setState({ loading });
    }
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

  renderButton = ({ getPrefixCls, autoInsertSpaceInButton }: ConfigConsumerProps) => {
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

    warning(
      typeof icon !== 'string',
      `Passing string to 'icon' is deprecated and will be removed in next major release. Please pass a ReactNode to 'icon' instead.`,
    );

    const { loading, hasTwoCNChar } = this.state;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);
    const autoInsertSpace = autoInsertSpaceInButton !== false;

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

    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefixCls}-block`]: block,
    });

    const iconType = loading ? <Loading /> : icon;
    const iconNode =
      iconType && (typeof iconType === 'string' ? <Icon type={iconType} /> : iconType);
    const kids =
      children || children === 0
        ? React.Children.map(children, child =>
            insertSpace(child as React.ReactChild, this.isNeedInserted() && autoInsertSpace),
          )
        : null;

    const linkButtonRestProps = omit(rest as AnchorButtonProps, ['htmlType']);
    if (linkButtonRestProps.href !== undefined) {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          onClick={this.handleClick}
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

polyfill(Button);

export default Button;
