import React from 'react';

let prefixCls = 'ant-breadcrumb';

let BreadcrumbItem = React.createClass({
  render() {
    var link = <a className={prefixCls + '-link'} {...this.props}>{this.props.children}</a>;
    var slash = <span className={prefixCls + '-slash'}>/</span>;
    if (typeof this.props.href === 'undefined') {
      link = <span className={prefixCls + '-link'} {...this.props}>{this.props.children}</span>;
    }
    return <span>{link}{slash}</span>;
  }
});

let Breadcrumb = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    let crumbs, routes, params;
    let ReactRouter = this.props.router;
    if (this.context.router && ReactRouter) {
      var Link = ReactRouter.Link;
      routes = this.context.router.state.branch;
      params = this.context.router.state.params;
      crumbs = routes.map(function(route, i) {
        var name = route.breadcrumbName.replace(/\:(.*)/g, function(replacement, key) {
          return params[key] || replacement;
        });
        var link;
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
