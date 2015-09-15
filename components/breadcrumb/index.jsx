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
    router: React.PropTypes.object,
    routes: React.PropTypes.array,
    params: React.PropTypes.object
  },
  render() {
    let crumbs;
    let ReactRouter = this.props.router;
    let routes = this.props.routes;
    let params = this.props.params;
    if (routes && routes.length > 0 && ReactRouter) {
      let Link = ReactRouter.Link;
      crumbs = routes.map(function(route, i) {
        let name = route.breadcrumbName.replace(/\:(.*)/g, function(replacement, key) {
          return params[key] || replacement;
        });
        let link;
        let path = route.path.indexOf('/') === 0 ? route.path : ('/' + route.path);
        if (i === routes.length - 1) {
          link = <span>{name}</span>;
        } else {
          link = <Link to={path} params={params}>{name}</Link>;
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
