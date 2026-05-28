import type { MenuProps as RcMenuProps } from '@rc-component/menu';

type RcItemType = NonNullable<NonNullable<RcMenuProps['items']>[number]>;
type RcMenuDividerType = Extract<RcItemType, { type: 'divider' }>;
type RcMenuItemGroupType = Extract<RcItemType, { type: 'group' }>;
type RcMenuItemType = Extract<RcItemType, { type?: 'item' }>;
type RcSubMenuType = Extract<RcItemType, { type?: 'submenu' }>;

export type DataAttributes = {
  [Key in `data-${string}`]: unknown;
};

export interface MenuItemType extends RcMenuItemType, DataAttributes {
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
