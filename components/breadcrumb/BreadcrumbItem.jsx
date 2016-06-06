import React from 'react';

export default class BreadcrumbItem extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    separator: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    href: React.PropTypes.string,
  }

  render() {
    const { prefixCls, separator, children, ...restProps } = this.props;
    let link;
    if ('href' in this.props) {
      link = <a className={`${prefixCls}-link`} {...restProps}>{children}</a>;
    } else {
      link = <span className={`${prefixCls}-link`} {...restProps}>{children}</span>;
    }
    return (
      <span>
        {link}
        <span className={`${prefixCls}-separator`}>{separator}</span>
      </span>
    );
  }
}
