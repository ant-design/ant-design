import React, { cloneElement } from 'react';

const BreadcrumbItem = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-breadcrumb',
      separator: '/',
    };
  },
  propTypes: {
    prefixCls: React.PropTypes.string,
    separator: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    href: React.PropTypes.string,
  },
  render() {
    const { prefixCls, separator, children } = this.props;
    let link = <a className={prefixCls + '-link'} {...this.props}>{children}</a>;
    if (typeof this.props.href === 'undefined') {
      link = <span className={prefixCls + '-link'} {...this.props}>{children}</span>;
    }
    return <span>
      {link}
      <span className={prefixCls + '-separator'}>{separator}</span>
    </span>;
  }
});

const Breadcrumb = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-breadcrumb',
      separator: '/',
    };
  },
  propTypes: {
    prefixCls: React.PropTypes.string,
    separator: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    router: React.PropTypes.object,
    routes: React.PropTypes.array,
    params: React.PropTypes.object
  },
  render() {
    let crumbs;
    const { separator, prefixCls, router, routes, params, children } = this.props;
    const ReactRouter = router;
    if (routes && routes.length > 0 && ReactRouter) {
      let Link = ReactRouter.Link;
      crumbs = routes.map(function(route, i) {
        if (!route.breadcrumbName) {
          return null;
        }
        const name = route.breadcrumbName.replace(/\:(.*)/g, function(replacement, key) {
          return params[key] || replacement;
        });
        let link;
        const path = route.path.indexOf('/') === 0 ? route.path : ('/' + route.path);
        if (i === routes.length - 1) {
          link = <span>{name}</span>;
        } else {
          link = <Link to={path} params={params}>{name}</Link>;
        }
        return <BreadcrumbItem separator={separator} key={name}>{link}</BreadcrumbItem>;
      });
    } else {
      crumbs = React.Children.map(children, (element, index) => {
        return cloneElement(element, {
          separator,
          key: index,
        });
      });
    }
    return (
      <div className={prefixCls}>
        {crumbs}
      </div>
    );
  }
});

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
