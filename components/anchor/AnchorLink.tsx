import React from 'react';
import classNames from 'classnames';
import AnchorHelper, { scrollTo } from './anchorHelper';

export interface AnchorLinkProps {
  href: string;
  onClick: (href: string, component: Element) => void;
  active?: boolean;
  prefixCls?: string;
  children?: any;
  title?: React.ReactNode;
  bounds: number;
  target?: () => HTMLElement | Window;
  affix?: boolean;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static contextTypes = {
    anchorHelper: React.PropTypes.any,
  };

  static defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor',
  };

  context: {
    anchorHelper: AnchorHelper;
  };

  private _component: Element;

  setActiveAnchor() {
    const { bounds, href, affix } = this.props;
    const { anchorHelper } = this.context;
    const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(bounds) === href;
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

  renderAnchorLink = (child) => {
    const { href } = child.props;
    if (href) {
      this.context.anchorHelper.addLink(href);
      return React.cloneElement(child, {
        onClick: this.props.onClick,
        prefixCls: this.props.prefixCls,
        affix: this.props.affix,
      });
    }
    return child;
  }

  refsTo = (component) => {
    this._component = component;
  }

  scrollTo = (e) => {
    e.preventDefault();
    const { onClick, href } = this.props;
    const { anchorHelper } = this.context;
    if (onClick) {
      onClick(href, this._component);
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
