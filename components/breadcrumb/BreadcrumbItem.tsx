import DownOutlined from '@ant-design/icons/DownOutlined';
import * as React from 'react';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { DropdownProps } from '../dropdown/dropdown';
import Dropdown from '../dropdown/dropdown';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  menu?: DropdownProps['menu'];
  dropdownProps?: DropdownProps;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  className?: string;
  children?: React.ReactNode;

  // Deprecated
  /** @deprecated Please use `menu` instead */
  overlay?: DropdownProps['overlay'];
}
type CompoundedComponent = React.FC<BreadcrumbItemProps> & {
  __ANT_BREADCRUMB_ITEM: boolean;
};
const BreadcrumbItem: CompoundedComponent = (props) => {
  const {
    prefixCls: customizePrefixCls,
    separator = '/',
    children,
    menu,
    overlay,
    dropdownProps,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);

  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    warning(
      !('overlay' in props),
      'Breadcrumb.Item',
      '`overlay` is deprecated. Please use `menu` instead.',
    );
  }

  /** If overlay is have Wrap a Dropdown */
  const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
    if (menu || overlay) {
      const mergeDropDownProps: DropdownProps = {
        ...dropdownProps,
      };
      if ('overlay' in props) {
        mergeDropDownProps.overlay = overlay;
      }

      return (
        <Dropdown menu={menu} placement="bottom" {...mergeDropDownProps}>
          <span className={`${prefixCls}-overlay-link`}>
            {breadcrumbItem}
            <DownOutlined />
          </span>
        </Dropdown>
      );
    }
    return breadcrumbItem;
  };

  let link: React.ReactNode;
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
  if (children !== undefined && children !== null) {
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
