import React from 'react';
import PropTypes from 'prop-types';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
}

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static __ANT_BREADCRUMB_ITEM = true;

  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    href: PropTypes.string,
  };

  render() {
    const { prefixCls, separator, children, ...restProps } = this.props;
    let link;
    if ('href' in this.props) {
      link = <a className={`${prefixCls}-link`} {...restProps}>{children}</a>;
    } else {
      link = <span className={`${prefixCls}-link`} {...restProps}>{children}</span>;
    }
    if (children) {
      return (
        <span>
          {link}
          <span className={`${prefixCls}-separator`}>{separator}</span>
        </span>
      );
    }
    return null;
  }
}
