import type {
  MenuDividerType as RcMenuDividerType,
  MenuItemGroupType as RcMenuItemGroupType,
  MenuItemType as RcMenuItemType,
  SubMenuType as RcSubMenuType,
} from 'rc-menu/lib/interface';

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
