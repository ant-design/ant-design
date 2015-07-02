'use strict';

import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

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
    router: React.PropTypes.func.isRequired
  },
  render() {
    var crumbs, routes, params;
    if (this.context.router) {
      routes = this.context.router.getCurrentRoutes();
      params = this.context.router.getCurrentParams();
      crumbs = routes.map(function(route, i) {
        var name = route.name.replace(/\:(.*)/g, function(replacement, key) {
          return params[key] || replacement;
        });
        var link;
        if (i === routes.length - 1) {
          link = <span>{name}</span>;
        } else {
          link = <Link to={route.path} params={params}>{name}</Link>;
        }
        return <BreadcrumbItem>{link}</BreadcrumbItem>;
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
