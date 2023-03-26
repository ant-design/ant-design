import DownOutlined from '@ant-design/icons/DownOutlined';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { DropdownProps } from '../dropdown/dropdown';
import Dropdown from '../dropdown/dropdown';
import warning from '../_util/warning';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export interface SeparatorType {
  separator?: React.ReactNode;
  key?: React.Key;
}

type MenuType = DropdownProps['menu'];
interface MenuItem {
  title?: React.ReactNode;
  label?: React.ReactNode;
  path?: string;
  href?: string;
}

export interface BreadcrumbItemProps extends SeparatorType {
  prefixCls?: string;
  href?: string;
  menu?: Omit<MenuType, 'items'> & {
    items?: MenuItem[];
  };
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
const BreadcrumbItem: CompoundedComponent = (props: BreadcrumbItemProps) => {
  const {
    prefixCls: customizePrefixCls,
    separator = '/',
    children,
    menu,
    overlay,
    dropdownProps,
    href,
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

      if (menu) {
        const { items, ...menuProps } = menu! || {};
        mergeDropDownProps.menu = {
          ...menuProps,
          items: items?.map(({ title, label, path, ...itemProps }, index) => {
            let mergedLabel: React.ReactNode = label ?? title;

            if (path) {
              mergedLabel = <a href={`${href}${path}`}>{mergedLabel}</a>;
            }

            return {
              ...itemProps,
              key: index,
              label: mergedLabel as string,
            };
          }),
        };
      } else if (overlay) {
        mergeDropDownProps.overlay = overlay;
      }

      return (
        <Dropdown placement="bottom" {...mergeDropDownProps}>
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
  if (href !== undefined) {
    link = (
      <a className={`${prefixCls}-link`} href={href} {...restProps}>
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
      <>
        <li>{link}</li>
        {separator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
      </>
    );
  }
  return null;
};

BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;

export default BreadcrumbItem;
