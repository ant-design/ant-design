import React from 'react';
import classnames from 'classnames';
import AnchorHelper, { scrollTo } from './anchorHelper';

export interface AnchorLinkProps {
  href: string;
  onClick: (href: string) => void;
  active?: boolean;
  prefixCls?: string;
  children?: any;
  title?: Element;
  bounds: number;
  target?: () => HTMLElement | Window;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static contextTypes = {
    anchorHelper: React.PropTypes.any,
  };

  static childContextTypes = {
    anchorHelper: React.PropTypes.any,
  };

  static defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor',
  };

  context: {
    anchorHelper: AnchorHelper;
  };

  constructor(props, context) {
    super(props, context);
  }

  getChildContext() {
    return {
      anchorHelper: this.context.anchorHelper,
    };
  }
  renderAnchorLink = (child) => {
    const { href } = child.props;
    if (href) {
      this.context.anchorHelper.addLink(href);
      return React.cloneElement(child, {
        onClick: this.context.anchorHelper.scrollTo,
        prefixCls: this.props.prefixCls,
      });
    }
    return child;
  }
  render() {
    const { prefixCls, href, children, onClick, title, bounds } = this.props;
    const { anchorHelper } = this.context;
    const active = anchorHelper && anchorHelper.getCurrentAnchor(bounds) === href;
    const cls = classnames({
      [`${prefixCls}-link`]: true,
      [`${prefixCls}-link-active`]: active,
    });
    const scrollToFn = anchorHelper ? anchorHelper.scrollTo : scrollTo;
    return <div className={cls}>
      <span
        ref={(component) => component && active && anchorHelper ? anchorHelper.setActiveAnchor(component) : null}
        className={`${prefixCls}-link-title`}
        onClick={() => onClick ? onClick(href) : scrollToFn(href)}
      >{title}</span>
      {React.Children.map(children, this.renderAnchorLink)}
    </div>;
  }
}
