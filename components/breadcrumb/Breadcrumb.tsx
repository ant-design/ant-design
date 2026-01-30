import * as React from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { toArray } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticType } from '../_util/hooks';
import { cloneElement } from '../_util/reactNode';
import type { AnyObject } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import type { DropdownProps } from '../dropdown';
import type { BreadcrumbContextProps } from './BreadcrumbContext';
import BreadcrumbContext from './BreadcrumbContext';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import { InternalBreadcrumbItem } from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import useStyle from './style';
import useItemRender from './useItemRender';
import useItems from './useItems';

export interface BreadcrumbItemType extends React.AriaAttributes {
  key?: React.Key;
  /**
   * Different with `path`. Directly set the link of this item.
   */
  href?: string;
  /**
   * Different with `href`. It will concat all prev `path` to the current one.
   */
  path?: string;
  title?: React.ReactNode;
  /** @deprecated Please use `title` instead */
  breadcrumbName?: string;
  menu?: BreadcrumbItemProps['menu'];
  className?: string;
  style?: React.CSSProperties;
  dropdownProps?: DropdownProps;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;

  /** @deprecated Please use `menu` instead */
  children?: Omit<BreadcrumbItemType, 'children'>[];
  [key: `data-${string}`]: string;
}

export interface BreadcrumbSeparatorType {
  type: 'separator';
  separator?: React.ReactNode;
}

export type ItemType = Partial<BreadcrumbItemType & BreadcrumbSeparatorType>;

export type InternalRouteType = Partial<BreadcrumbItemType & BreadcrumbSeparatorType>;

export type BreadcrumbSemanticType = {
  classNames: {
    root?: string;
    item?: string;
    separator?: string;
  };
  styles: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
    separator?: React.CSSProperties;
  };
};

export type BreadcrumbClassNamesType<T extends AnyObject = AnyObject> = SemanticType<
  BreadcrumbProps<T>,
  BreadcrumbSemanticType['classNames']
>;

export type BreadcrumbStylesType<T extends AnyObject = AnyObject> = SemanticType<
  BreadcrumbProps<T>,
  BreadcrumbSemanticType['styles']
>;

export interface BreadcrumbProps<T extends AnyObject = AnyObject> {
  prefixCls?: string;
  params?: T;
  separator?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  children?: React.ReactNode;

  /** @deprecated Please use `items` instead */
  routes?: ItemType[];

  items?: ItemType[];
  classNames?: BreadcrumbClassNamesType<T>;
  styles?: BreadcrumbStylesType<T>;

  itemRender?: (route: ItemType, params: T, routes: ItemType[], paths: string[]) => React.ReactNode;
}

const getPath = <T extends AnyObject = AnyObject>(params: T, path?: string) => {
  if (path === undefined) {
    return path;
  }
  let mergedPath = (path || '').replace(/^\//, '');
  Object.keys(params).forEach((key) => {
    mergedPath = mergedPath.replace(`:${key}`, params[key]!);
  });
  return mergedPath;
};

const Breadcrumb = <T extends AnyObject = AnyObject>(props: BreadcrumbProps<T>) => {
  const {
    prefixCls: customizePrefixCls,
    separator,
    style,
    className,
    rootClassName,
    routes: legacyRoutes,
    items,
    children,
    itemRender,
    params = {},
    classNames,
    styles,
    dropdownIcon,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    separator: contextSeparator,
    dropdownIcon: contextDropdownIcon,
  } = useComponentConfig('breadcrumb');

  const mergedSeparator = separator ?? contextSeparator ?? '/';
  const mergedDropdownIcon = dropdownIcon ?? contextDropdownIcon ?? <DownOutlined />;

  let crumbs: React.ReactNode;

  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedItems = useItems(items, legacyRoutes);

  // =========== Merged Props for Semantic ==========
  const mergedProps = React.useMemo(() => {
    return {
      ...props,
      separator: mergedSeparator,
    } as BreadcrumbProps<T>;
  }, [props, mergedSeparator]);

  // ========================= Style ==========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    BreadcrumbClassNamesType<T>,
    BreadcrumbStylesType<T>,
    BreadcrumbProps<T>
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Breadcrumb');
    warning.deprecated(!legacyRoutes, 'routes', 'items');

    // Deprecated warning for breadcrumb children
    if (!mergedItems || mergedItems.length === 0) {
      const childList = toArray(children);

      warning.deprecated(
        childList.length === 0,
        'Breadcrumb.Item and Breadcrumb.Separator',
        'items',
      );

      childList.forEach((element: any) => {
        if (element) {
          warning(
            element.type &&
              (element.type.__ANT_BREADCRUMB_ITEM === true ||
                element.type.__ANT_BREADCRUMB_SEPARATOR === true),
            'usage',
            "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
          );
        }
      });
    }
  }

  const mergedItemRender = useItemRender(prefixCls, itemRender);

  if (mergedItems && mergedItems.length > 0) {
    // generated by route
    const paths: string[] = [];

    const itemRenderRoutes = items || legacyRoutes;

    crumbs = mergedItems.map((item, index) => {
      const {
        path,
        key,
        type,
        menu,
        onClick,
        className: itemClassName,
        style,
        separator: itemSeparator,
        dropdownProps,
      } = item;
      const mergedPath = getPath(params, path);

      if (mergedPath !== undefined) {
        paths.push(mergedPath);
      }

      const mergedKey = key ?? index;

      if (type === 'separator') {
        return <BreadcrumbSeparator key={mergedKey}>{itemSeparator}</BreadcrumbSeparator>;
      }

      const itemProps: BreadcrumbItemProps = {};
      const isLastItem = index === mergedItems.length - 1;

      if (menu) {
        itemProps.menu = menu;
      }

      let { href } = item;
      if (paths.length && mergedPath !== undefined) {
        href = `#/${paths.join('/')}`;
      }

      return (
        <InternalBreadcrumbItem
          key={mergedKey}
          {...itemProps}
          {...pickAttrs(item, { data: true, aria: true })}
          className={itemClassName}
          style={style}
          dropdownProps={dropdownProps}
          dropdownIcon={mergedDropdownIcon}
          href={href}
          separator={isLastItem ? '' : mergedSeparator}
          onClick={onClick}
          prefixCls={prefixCls}
        >
          {mergedItemRender(item, params, itemRenderRoutes!, paths, href)}
        </InternalBreadcrumbItem>
      );
    });
  } else if (children) {
    const childrenLength = toArray(children).length;
    crumbs = toArray(children).map((element: any, index) => {
      if (!element) {
        return element;
      }

      const isLastItem = index === childrenLength - 1;
      return cloneElement(element, {
        separator: isLastItem ? '' : mergedSeparator,
        // eslint-disable-next-line react/no-array-index-key
        key: index,
      });
    });
  }

  const breadcrumbClassName = clsx(
    prefixCls,
    contextClassName,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  const memoizedValue = React.useMemo<BreadcrumbContextProps>(
    () => ({ classNames: mergedClassNames, styles: mergedStyles }),
    [mergedClassNames, mergedStyles],
  );

  return (
    <BreadcrumbContext.Provider value={memoizedValue}>
      <nav className={breadcrumbClassName} style={mergedStyle} {...restProps}>
        <ol>{crumbs}</ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Breadcrumb.displayName = 'Breadcrumb';
}

export default Breadcrumb;
