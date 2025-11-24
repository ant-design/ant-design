import * as React from 'react';
import type { MenuItemProps as RcMenuItemProps } from '@rc-component/menu';
import { Item } from '@rc-component/menu';
import { omit, toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import { cloneElement } from '../_util/reactNode';
import type { SiderContextProps } from '../layout/Sider';
import { SiderContext } from '../layout/Sider';
import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';
import type { MenuContextProps } from './MenuContext';
import MenuContext from './MenuContext';

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

type MenuItemComponent = React.FC<MenuItemProps>;

type RestArgs<T> = T extends (arg: any, ...args: infer P) => any ? P : never;

type GenericProps<T = unknown> = T extends infer U extends MenuItemProps
  ? unknown extends U
    ? MenuItemProps
    : U
  : MenuItemProps;

type GenericComponent = Omit<MenuItemComponent, ''> &
  (<T extends MenuItemProps>(
    props: GenericProps<T>,
    ...args: RestArgs<MenuItemComponent>
  ) => ReturnType<MenuItemComponent>);

const MenuItem: GenericComponent = (props) => {
  const { className, children, icon, title, danger, extra } = props;
  const {
    prefixCls,
    firstLevel,
    direction,
    disableMenuItemTitleTooltip,
    inlineCollapsed: isInlineCollapsed,
    styles,
    classNames,
  } = React.useContext<MenuContextProps>(MenuContext);
  const renderItemChildren = (inlineCollapsed: boolean) => {
    const label = (children as React.ReactNode[])?.[0];
    const wrapNode = (
      <span
        className={clsx(
          `${prefixCls}-title-content`,
          firstLevel ? classNames.itemContent : classNames.subMenu.itemContent,
          {
            [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0,
          },
        )}
        style={firstLevel ? styles.itemContent : styles.subMenu.itemContent}
      >
        {children}
      </span>
    );
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    if (!icon || (React.isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && firstLevel && typeof label === 'string') {
        return <div className={`${prefixCls}-inline-collapsed-noicon`}>{label.charAt(0)}</div>;
      }
    }
    return wrapNode;
  };

  const { siderCollapsed } = React.useContext<SiderContextProps>(SiderContext);

  let tooltipTitle = title;

  if (typeof title === 'undefined') {
    tooltipTitle = firstLevel ? children : '';
  } else if (title === false) {
    tooltipTitle = '';
  }

  const tooltipProps: TooltipProps = { title: tooltipTitle };

  if (!siderCollapsed && !isInlineCollapsed) {
    tooltipProps.title = null;
    // Reset `open` to fix control mode tooltip display not correct
    // ref: https://github.com/ant-design/ant-design/issues/16742
    tooltipProps.open = false;
  }

  const childrenLength = toArray(children).length;

  let returnNode = (
    <Item
      {...omit(props, ['title', 'icon', 'danger'])}
      className={clsx(
        firstLevel ? classNames.item : classNames.subMenu.item,
        {
          [`${prefixCls}-item-danger`]: danger,
          [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1,
        },
        className,
      )}
      style={firstLevel ? styles.item : styles.subMenu.item}
      title={typeof title === 'string' ? title : undefined}
    >
      {cloneElement(icon, (oriProps) => ({
        className: clsx(
          oriProps.className,
          `${prefixCls}-item-icon`,
          firstLevel ? classNames.itemIcon : classNames.subMenu.itemIcon,
        ),
        style: {
          ...oriProps.style,
          ...(firstLevel ? styles.itemIcon : styles.subMenu.itemIcon),
        },
      }))}
      {renderItemChildren(isInlineCollapsed)}
    </Item>
  );

  if (!disableMenuItemTitleTooltip) {
    returnNode = (
      <Tooltip
        {...tooltipProps}
        placement={direction === 'rtl' ? 'left' : 'right'}
        classNames={{ root: `${prefixCls}-inline-collapsed-tooltip` }}
      >
        {returnNode}
      </Tooltip>
    );
  }
  return returnNode;
};

export default MenuItem;
