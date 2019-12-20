import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { AntAnchor } from './Anchor';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static defaultProps = {
    href: '#',
  };

  static contextTypes = {
    antAnchor: PropTypes.object,
  };

  context: {
    antAnchor: AntAnchor;
  };

  componentDidMount() {
    this.context.antAnchor.registerLink(this.props.href);
  }

  componentDidUpdate({ href: prevHref }: AnchorLinkProps) {
    const { href } = this.props;
    if (prevHref !== href) {
      this.context.antAnchor.unregisterLink(prevHref);
      this.context.antAnchor.registerLink(href);
    }
  }

  componentWillUnmount() {
    this.context.antAnchor.unregisterLink(this.props.href);
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { scrollTo, onClick } = this.context.antAnchor;
    const { href, title } = this.props;
    if (onClick) {
      onClick(e, { title, href });
    }
    scrollTo(href);
  };

  renderAnchorLink = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, href, title, children, className, target } = this.props;
    const prefixCls = getPrefixCls('anchor', customizePrefixCls);
    const active = this.context.antAnchor.activeLink === href;
    const wrapperClassName = classNames(className, `${prefixCls}-link`, {
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
          target={target}
          onClick={this.handleClick}
        >
          {title}
        </a>
        {children}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAnchorLink}</ConfigConsumer>;
  }
}

export default AnchorLink;
