'use strict';

import React from 'react';

let prefixCls = 'ant-breadcrumb';

let BreadcrumbItem = React.createClass({
  render() {
    var link = <a className={prefixCls + '-link'} {...this.props}>{this.props.children}</a>;
    var slash = <span className={prefixCls + '-slash'}>/</span>;
    if (typeof this.props.href === 'undefined') {
      slash = '';
      link = <span className={prefixCls + '-link'} {...this.props}>{this.props.children}</span>;
    }
    return (
      <span>
        {link}
        {slash}
      </span>
    );
  }
});

let Breadcrumb = React.createClass({
  render() {
    return (
      <div className={prefixCls}>
        {this.props.children}
      </div>
    );
  }
});

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
