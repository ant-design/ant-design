import DownOutlined from '@ant-design/icons/DownOutlined';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import type { DropdownProps } from '../dropdown/dropdown';
import Dropdown from '../dropdown/dropdown';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  overlay?: DropdownProps['overlay'];
  dropdownProps?: DropdownProps;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  className?: string;
  children?: React.ReactNode;
}
interface BreadcrumbItemInterface extends React.FC<BreadcrumbItemProps> {
  __ANT_BREADCRUMB_ITEM: boolean;
}
const BreadcrumbItem: BreadcrumbItemInterface = ({
  prefixCls: customizePrefixCls,
  separator = '/',
  children,
  overlay,
  dropdownProps,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  /** If overlay is have Wrap a Dropdown */
  const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
    if (overlay) {
      return (
        <Dropdown overlay={overlay} placement="bottom" {...dropdownProps}>
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            <DownOutlined />
          </span>
        </Dropdown>
      );
    }
    return breadcrumbItem;
  };

  let link;
  if ('href' in restProps) {
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

  // wrap to dropDown
  link = renderBreadcrumbNode(link);
  if (children) {
    return (
      <li>
        {link}
        {separator && <span className={`${prefixCls}-separator`}>{separator}</span>}
      </li>
    );
  }
  return null;
};

BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;

export default BreadcrumbItem;
