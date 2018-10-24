import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { AntAnchor } from './Anchor';
import { polyfill } from "react-lifecycles-compat";

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  title: React.ReactNode;
  children?: any;
}

interface AnchorLinkState {
  href: string;
  shouldRegisterLink: boolean;
}

class AnchorLink extends React.Component<AnchorLinkProps, AnchorLinkState> {
  static defaultProps = {
    prefixCls: 'ant-anchor',
    href: '#',
  };

  static contextTypes = {
    antAnchor: PropTypes.object,
  };

  static getDerivedStateFromProps(nextProps: AnchorLinkProps, prevState: AnchorLinkState): Partial<AnchorLinkState> {
    return {
      shouldRegisterLink: prevState.href !== nextProps.href,
    };
  }

  context: {
    antAnchor: AntAnchor;
  };

  constructor(props: AnchorLinkProps) {
    super(props);
    this.state = {
      shouldRegisterLink: true,
      href: props.href,
    }
  }

  componentDidMount() {
    this.registerLink();
  }

  componentWillUnmount() {
    this.context.antAnchor.unregisterLink(this.state.href);
  }

  shouldComponentUpdate(_nextProps: AnchorLinkProps, nextState: AnchorLinkState) {
    return nextState.shouldRegisterLink;
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { scrollTo, onClick } = this.context.antAnchor;
    const { href, title } = this.props;
    if (onClick) {
      onClick(e, { title, href });
    }
    scrollTo(href);
  };

  componentDidUpdate() {
    if (this.state.shouldRegisterLink) {
      this.unregisterLink();
      this.registerLink();
    }
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

  registerLink(): void {
    this.setState({href: this.props.href, shouldRegisterLink: false}, () => {
      this.context.antAnchor.registerLink(this.state.href);
    })
  }

  unregisterLink(): void {
    this.context.antAnchor.unregisterLink(this.state.href);
  }
}

polyfill(AnchorLink);

export default AnchorLink;
