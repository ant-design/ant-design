import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

export interface AvatarState {
  scale: number;
  isImgExist: boolean;
}

export default class Avatar extends React.Component<AvatarProps, AvatarState> {
  static defaultProps = {
    prefixCls: 'ant-avatar',
    shape: 'circle',
    size: 'default',
  };

  private avatarChildren: any;

  constructor(props: AvatarProps) {
    super(props);
    this.state = {
      scale: 1,
      isImgExist: true,
    };
  }

  componentDidMount() {
    this.setScale();
  }

  componentDidUpdate(prevProps: AvatarProps, prevState: AvatarState) {
    if (prevProps.children !== this.props.children
        || (prevState.scale !== this.state.scale && this.state.scale === 1)
        || (prevState.isImgExist !== this.state.isImgExist)) {
      this.setScale();
    }
  }

  setScale = () => {
    const childrenNode = this.avatarChildren;
    if (childrenNode) {
      const childrenWidth = childrenNode.offsetWidth;
      const avatarNode = ReactDOM.findDOMNode(this) as Element;
      const avatarWidth = avatarNode.getBoundingClientRect().width;
      // add 4px gap for each side to get better performance
      if (avatarWidth - 8 < childrenWidth) {
        this.setState({
          scale: (avatarWidth - 8) / childrenWidth,
        });
      } else {
        this.setState({
          scale: 1,
        });
      }
    }
  }

  handleImgLoadError = () => this.setState({ isImgExist: false });

  render() {
    const {
      prefixCls, shape, size, src, icon, className, ...others,
    } = this.props;

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    const classString = classNames(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && this.state.isImgExist,
      [`${prefixCls}-icon`]: icon,
    });

    let children = this.props.children;
    if (src && this.state.isImgExist) {
      children = (
        <img
          src={src}
          onError={this.handleImgLoadError}
        />
      );
    } else if (icon) {
      children = <Icon type={icon} />;
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || this.state.scale !== 1) {
        const childrenStyle: React.CSSProperties = {
          msTransform: `scale(${this.state.scale})`,
          WebkitTransform: `scale(${this.state.scale})`,
          transform: `scale(${this.state.scale})`,
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${Math.round(childrenNode.offsetWidth / 2)}px)`,
        };
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={span => this.avatarChildren = span}
            style={childrenStyle}
          >
            {children}
          </span>
        );
      } else {
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={span => this.avatarChildren = span}
          >
            {children}
          </span>
        );
      }
    }
    return (
      <span {...others} className={classString}>
        {children}
      </span>
    );
  }
}
