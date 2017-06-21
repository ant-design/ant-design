import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnchorHelper, { scrollTo } from './anchorHelper';

export interface AnchorLinkProps {
  href: string;
  onClick?: (href: string, component: Element) => void;
  active?: boolean;
  prefixCls?: string;
  children?: any;
  title: React.ReactNode;
  offsetTop?: number;
  bounds?: number;
  target?: () => HTMLElement | Window;
  affix?: boolean;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static __ANT_ANCHOR_LINK = true;
  static contextTypes = {
    anchorHelper: PropTypes.any,
  };

  static defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor',
  };

  context: {
    anchorHelper: AnchorHelper;
  };

  private _component: HTMLAnchorElement;

  setActiveAnchor() {
    const { bounds, offsetTop, href, affix } = this.props;
    const { anchorHelper } = this.context;
    const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
    if (active && anchorHelper) {
      anchorHelper.setActiveAnchor(this._component);
    }
  }

  componentDidMount() {
    this.setActiveAnchor();
  }

  componentDidUpdate() {
    this.setActiveAnchor();
  }

  renderAnchorLink = (child: React.ReactChild) => {
    // Here child is a ReactChild type
    if (typeof child !== 'string' && typeof child !== 'number') {
      const { href } = child.props;
      if (href) {
        this.context.anchorHelper.addLink(href);
        return React.cloneElement(child, {
          onClick: this.props.onClick,
          prefixCls: this.props.prefixCls,
          affix: this.props.affix,
          offsetTop: this.props.offsetTop,
        });
      }
    }
    return child;
  }

  refsTo = (component: HTMLAnchorElement) => {
    this._component = component;
  }

  scrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { onClick, href } = this.props;
    const { anchorHelper } = this.context;
    if (onClick) {
      onClick(href, this._component);
    } else {
      const scrollToFn = anchorHelper ? anchorHelper.scrollTo : scrollTo;
      scrollToFn(href, this.props.offsetTop);
    }
  }

  render() {
    const { prefixCls, href, children, title, bounds, offsetTop, affix } = this.props;
    const { anchorHelper } = this.context;
    const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
    const cls = classNames({
      [`${prefixCls}-link`]: true,
      [`${prefixCls}-link-active`]: active,
    });
    return (
      <div className={cls}>
        <a
          ref={this.refsTo}
          className={`${prefixCls}-link-title`}
          onClick={this.scrollTo}
          href={href}
          title={typeof title === 'string' ? title : ''}
        >
          {title}
        </a>
        {React.Children.map(children, this.renderAnchorLink)}
      </div>
    );
  }
}
