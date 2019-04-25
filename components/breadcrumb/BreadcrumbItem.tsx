import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static __ANT_BREADCRUMB_ITEM = true;

  static defaultProps = {
    separator: '/',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string,
  };

  renderBreadcrumbItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, separator, children, ...restProps } = this.props;
    const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
    let link;
    if ('href' in this.props) {
      link = (
        <a className={`${prefixCls}-link`} {...restProps}>
          {children}
        </a>
      );
    } else {
      link = (
        <span className={`${prefixCls}-link`} {...restProps}>
          {children}
        </span>
      );
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
  };

  render() {
    return <ConfigConsumer>{this.renderBreadcrumbItem}</ConfigConsumer>;
  }
}
