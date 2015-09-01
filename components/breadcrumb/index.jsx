import React from 'react';

let prefixCls = 'ant-breadcrumb';

let BreadcrumbItem = React.createClass({
  propTypes: {
    href: React.PropTypes.string
  },
  render() {
    let link = <a className={prefixCls + '-link'} {...this.props}>{this.props.children}</a>;
    let slash = <span className={prefixCls + '-slash'}>/</span>;
    if (typeof this.props.href === 'undefined') {
      link = <span className={prefixCls + '-link'} {...this.props}>{this.props.children}</span>;
    }
    return <span>{link}{slash}</span>;
  }
});

let Breadcrumb = React.createClass({
  propTypes: {
    router: React.PropTypes.object
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    let crumbs, routes, params;
    let ReactRouter = this.props.router;
    if (this.context.router && ReactRouter) {
      let Link = ReactRouter.Link;
      routes = this.context.router.state.branch;
      params = this.context.router.state.params;
      crumbs = routes.map(function(route, i) {
        let name = route.breadcrumbName.replace(/\:(.*)/g, function(replacement, key) {
          return params[key] || replacement;
        });
        let link;
        if (i === routes.length - 1) {
          link = <span>{name}</span>;
        } else {
          link = <Link to={route.path} params={params}>{name}</Link>;
        }
        return <BreadcrumbItem key={name}>{link}</BreadcrumbItem>;
      });
    } else {
      crumbs = this.props.children;
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
