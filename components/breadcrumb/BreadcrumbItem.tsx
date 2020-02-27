import * as React from 'react';
import { DownOutlined } from '@ant-design/icons';
import omit from 'omit.js';

import DropDown, { DropDownProps } from '../dropdown/dropdown';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  overlay?: DropDownProps['overlay'];
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static __ANT_BREADCRUMB_ITEM = true;

  static defaultProps = {
    separator: '/',
  };

  renderBreadcrumbItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, separator, children, ...restProps } = this.props;
    const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
    let link;
    if ('href' in this.props) {
      link = (
        <a className={`${prefixCls}-link`} {...omit(restProps, ['overlay'])}>
          {children}
        </a>
      );
    } else {
      link = (
        <span className={`${prefixCls}-link`} {...omit(restProps, ['overlay'])}>
          {children}
        </span>
      );
    }

    // wrap to dropDown
    link = this.renderBreadcrumbNode(link, prefixCls);
    if (children) {
      return (
        <span>
          {link}
          {separator && separator !== '' && (
            <span className={`${prefixCls}-separator`}>{separator}</span>
          )}
        </span>
      );
    }
    return null;
  };

  /**
   * if overlay is have
   * Wrap a DropDown
   */
  renderBreadcrumbNode = (breadcrumbItem: React.ReactNode, prefixCls: string) => {
    const { overlay } = this.props;
    if (overlay) {
      return (
        <DropDown overlay={overlay} placement="bottomCenter">
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            <DownOutlined />
          </span>
        </DropDown>
      );
    }
    return breadcrumbItem;
  };

  render() {
    return <ConfigConsumer>{this.renderBreadcrumbItem}</ConfigConsumer>;
  }
}
