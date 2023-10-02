import { ItemGroup } from 'rc-menu';
import type {
  MenuDividerType as RcMenuDividerType,
  MenuItemGroupType as RcMenuItemGroupType,
  MenuItemType as RcMenuItemType,
  SubMenuType as RcSubMenuType,
} from 'rc-menu/lib/interface';
import * as React from 'react';
import MenuDivider from '../MenuDivider';
import MenuItem from '../MenuItem';
import SubMenu from '../SubMenu';

export interface MenuItemType extends RcMenuItemType {
  danger?: boolean;
  icon?: React.ReactNode;
  title?: string;
}

export interface SubMenuType<T extends MenuItemType = MenuItemType>
  extends Omit<RcSubMenuType, 'children'> {
  icon?: React.ReactNode;
  theme?: 'dark' | 'light';
  children: ItemType<T>[];
}

export interface MenuItemGroupType<T extends MenuItemType = MenuItemType>
  extends Omit<RcMenuItemGroupType, 'children'> {
  children?: ItemType<T>[];
  key?: React.Key;
}

export interface MenuDividerType extends RcMenuDividerType {
  dashed?: boolean;
  key?: React.Key;
}

export type ItemType<T extends MenuItemType = MenuItemType> =
  | T
  | SubMenuType<T>
  | MenuItemGroupType<T>
  | MenuDividerType
  | null;

function convertItemsToNodes(list: ItemType[]) {
  return (list || [])
    .map((opt, index) => {
      if (opt && typeof opt === 'object') {
        const { label, children, key, type, ...restProps } = opt as any;
        const mergedKey = key ?? `tmp-${index}`;

        // MenuItemGroup & SubMenuItem
        if (children || type === 'group') {
          if (type === 'group') {
            // Group
            return (
              <ItemGroup key={mergedKey} {...restProps} title={label}>
                {convertItemsToNodes(children)}
              </ItemGroup>
            );
          }

          // Sub Menu
          return (
            <SubMenu key={mergedKey} {...restProps} title={label}>
              {convertItemsToNodes(children)}
            </SubMenu>
          );
        }

        // MenuItem & Divider
        if (type === 'divider') {
          return <MenuDivider key={mergedKey} {...restProps} />;
        }

        return (
          <MenuItem key={mergedKey} {...restProps}>
            {label}
          </MenuItem>
        );
      }

      return null;
    })
    .filter((opt) => opt);
}

// FIXME: Move logic here in v5
/**
 * We simply convert `items` to ReactNode for reuse origin component logic. But we need move all the
 * logic from component into this hooks when in v5
 */
export default function useItems(items?: ItemType[]) {
  return React.useMemo(() => {
    if (!items) {
      return items;
    }

    return convertItemsToNodes(items);
  }, [items]);
}
