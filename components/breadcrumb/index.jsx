'use strict';

import React from 'react';

let prefixCls = 'ant-breadcrumb';

let BreadcrumbItem = React.createClass({
  render() {
    var link = <a className={prefixCls + '-link'} {...this.props}>{this.props.children}</a>;
    var slash = <span className={prefixCls + '-slash'}>/</span>;
    if (typeof this.props.href === 'undefined') {
      link = <span className={prefixCls + '-link'} {...this.props}>{this.props.children}</span>;
    }
    if (this.props.last) {
      slash = '';
    }
    return <span>{link} {slash}</span>;
  }
});

let Breadcrumb = React.createClass({
  render() {
    if (this.props.children.length > 0) {
      var last = this.props.children[this.props.children.length - 1];
      last.props.last = true;
    }
    return (
      <div className={prefixCls}>
        {this.props.children}
      </div>
    );
  }
});

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
