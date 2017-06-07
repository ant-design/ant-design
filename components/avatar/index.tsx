import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from 'classnames';

export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /** Size of avatar, options:`large`, `small`, `default` */
  size?: 'large' | 'small' | 'default';
  /** Src of image avatar */
  src?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: any;
}

export default class Avatar extends React.Component<AvatarProps, any> {
  static defaultProps = {
    prefixCls: 'ant-avatar',
    shape: 'circle',
    size: 'default',
  };
  refs: {
    avatarChildren: HTMLElement;
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
    };
  }

  componentDidMount() {
    const childrenNode = this.refs.avatarChildren;
    if (childrenNode) {
      const childrenWidth = childrenNode.offsetWidth;
      const avatarWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
      // add 4px gap for each side to get better performance
      if (avatarWidth - 8 < childrenWidth) {
        this.setState({
          scale: (avatarWidth - 8) / childrenWidth,
        });
      }
    }
  }

  render() {
    const {
      prefixCls, shape, size, src, icon, className, ...others,
    } = this.props;

    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        sizeCls = '';
        break;
    }

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src,
      [`${prefixCls}-icon`]: icon,
    });

    let children = this.props.children;
    if (src) {
      children = <img src={src} />;
    } else if (icon) {
      children = <Icon type={icon} />;
    } else {
      const childrenNode = this.refs.avatarChildren;
      if (childrenNode && this.state.scale !== 1) {
        const childrenStyle: React.CSSProperties = {
          transform: `scale(${this.state.scale})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${childrenNode.offsetWidth / 2}px)`,
        };
        children = <span className={`${prefixCls}-string`} ref="avatarChildren" style={childrenStyle}>{children}</span>;
      } else {
        children = <span className={`${prefixCls}-string`} ref="avatarChildren">{children}</span>;
      }
    }
    return (
      <span {...others} className={classString}>
        {children}
      </span>
    );
  }
}
