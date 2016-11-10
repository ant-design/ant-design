import React from 'react';
import classNames from 'classnames';
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
  affix?: boolean;
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

  scrollTo = (e) => {
    const { onClick, href } = this.props;
    const { anchorHelper } = this.context;
    e.preventDefault();
    if (onClick) {
      onClick(href);
    } else {
      e.stopPreventDefault();
      const scrollToFn = anchorHelper ? anchorHelper.scrollTo : scrollTo;
      scrollToFn(href);
    }
  }

  render() {
    const { prefixCls, href, children, title, bounds, affix } = this.props;
    const { anchorHelper } = this.context;
    const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(bounds) === href;
    const cls = classNames({
      [`${prefixCls}-link`]: true,
      [`${prefixCls}-link-active`]: active,
    });
    return (
      <div className={cls}>
        <a
          ref={(component) => component && active && anchorHelper ? anchorHelper.setActiveAnchor(component) : null}
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
