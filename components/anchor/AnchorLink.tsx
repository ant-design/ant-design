import * as React from 'react';
import classNames from 'classnames';
import { AntAnchor } from './Anchor';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import AnchorContext from './context';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

class AnchorLink extends React.Component<AnchorLinkProps, any, AntAnchor> {
  static defaultProps = {
    href: '#',
  };

  static contextType = AnchorContext;

  context: AntAnchor;

  componentDidMount() {
    this.context.registerLink(this.props.href);
  }

  componentDidUpdate({ href: prevHref }: AnchorLinkProps) {
    const { href } = this.props;
    if (prevHref !== href) {
      this.context.unregisterLink(prevHref);
      this.context.registerLink(href);
    }
  }

  componentWillUnmount() {
    this.context.unregisterLink(this.props.href);
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { scrollTo, onClick } = this.context;
    const { href, title } = this.props;
    onClick?.(e, { title, href });
    scrollTo(href);
  };

  renderAnchorLink = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, href, title, children, className, target } = this.props;
    const prefixCls = getPrefixCls('anchor', customizePrefixCls);
    const active = this.context.activeLink === href;
    const wrapperClassName = classNames(
      `${prefixCls}-link`,
      {
        [`${prefixCls}-link-active`]: active,
      },
      className,
    );
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
