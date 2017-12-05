import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  title: React.ReactNode;
  children?: any;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static defaultProps = {
    prefixCls: 'ant-anchor',
    href: '#',
  };

  static contextTypes = {
    antAnchor: PropTypes.object,
  };

  context: {
    antAnchor: any;
  };

  componentDidMount() {
    this.context.antAnchor.registerLink(this.props.href);
  }

  componentWillUnmount() {
    this.context.antAnchor.unregisterLink(this.props.href);
  }

  handleClick = () => {
    this.context.antAnchor.scrollTo(this.props.href);
  }

  render() {
    const {
      prefixCls,
      href,
      title,
      children,
    } = this.props;
    const active = this.context.antAnchor.activeLink === href;
    const wrapperClassName = classNames(`${prefixCls}-link`, {
      [`${prefixCls}-link-active`]: active,
    });
    const titleClassName = classNames(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active,
    });
    return (
      <div className={wrapperClassName}>
        <a
          className={titleClassName}
          href={href}
          title={typeof title === 'string' ? title : ''}
          onClick={this.handleClick}
        >
          {title}
        </a>
        {children}
      </div>
    );
  }
}
