import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';
import * as React from 'react';
import type { BreadcrumbProps, InternalRouteType, ItemType } from './Breadcrumb';

type AddParameters<TFunction extends (...args: any) => any, TParameters extends [...args: any]> = (
  ...args: [...Parameters<TFunction>, ...TParameters]
) => ReturnType<TFunction>;

type ItemRender = NonNullable<BreadcrumbProps['itemRender']>;
type InternalItemRenderParams = AddParameters<ItemRender, [href?: string]>;

function getBreadcrumbName(route: InternalRouteType, params: any) {
  if (route.title === undefined || route.title === null) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  return typeof route.title === 'object'
    ? route.title
    : String(route.title).replace(
        new RegExp(`:(${paramsKeys})`, 'g'),
        (replacement, key) => params[key] || replacement,
      );
}

export function renderItem(
  prefixCls: string,
  item: ItemType,
  children: React.ReactNode,
  href?: string,
) {
  if (children === null || children === undefined) {
    return null;
  }

  const { className, onClick, ...restItem } = item;

  const passedProps = {
    ...pickAttrs(restItem, {
      data: true,
      aria: true,
    }),
    onClick,
  };

  if (href !== undefined) {
    return (
      <a {...passedProps} className={classNames(`${prefixCls}-link`, className)} href={href}>
        {children}
      </a>
    );
  }

  return (
    <span {...passedProps} className={classNames(`${prefixCls}-link`, className)}>
      {children}
    </span>
  );
}

export default function useItemRender(prefixCls: string, itemRender?: ItemRender) {
  const mergedItemRender: InternalItemRenderParams = (item, params, routes, path, href) => {
    if (itemRender) {
      return itemRender(item, params, routes, path);
    }

    const name = getBreadcrumbName(item, params);

    return renderItem(prefixCls, item, name, href);
  };

  return mergedItemRender;
}
