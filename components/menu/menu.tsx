import * as React from 'react';
import { forwardRef } from 'react';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import type { MenuProps as RcMenuProps, MenuRef as RcMenuRef } from '@rc-component/menu';
import RcMenu from '@rc-component/menu';
import { omit, useEvent } from '@rc-component/util';
import { clsx } from 'clsx';

import type { SemanticType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { SiderContextProps } from '../layout/Sider';
import type { ItemType } from './interface';
import type { MenuContextProps, MenuTheme } from './MenuContext';
import MenuContext from './MenuContext';
import Divider from './MenuDivider';
import MenuItem from './MenuItem';
import OverrideContext from './OverrideContext';
import useStyle from './style';
import SubMenu from './SubMenu';

function isEmptyIcon(icon?: React.ReactNode) {
  return icon === null || icon === false;
}

const MENU_COMPONENTS: GetProp<RcMenuProps, '_internalComponents'> = {
  item: MenuItem,
  submenu: SubMenu,
  divider: Divider,
};

export type MenuSemanticType = {
  classNames?: {
    root?: string;
    itemTitle?: string;
    list?: string;
    item?: string;
    itemIcon?: string;
    itemContent?: string;
    popup?: {
      root?: string;
    };
    subMenu?: {
      item?: string;
      itemTitle?: string;
      list?: string;
      itemContent?: string;
      itemIcon?: string;
    };
  };
  styles?: {
    root?: React.CSSProperties;
    itemTitle?: React.CSSProperties;
    list?: React.CSSProperties;
    item?: React.CSSProperties;
    itemIcon?: React.CSSProperties;
    itemContent?: React.CSSProperties;
    popup?: {
      root?: React.CSSProperties;
    };
    subMenu?: {
      item?: React.CSSProperties;
      itemTitle?: React.CSSProperties;
      list?: React.CSSProperties;
      itemContent?: React.CSSProperties;
      itemIcon?: React.CSSProperties;
    };
  };
};

export type MenuClassNamesType = SemanticType<MenuProps, MenuSemanticType['classNames']>;

export type MenuStylesType = SemanticType<MenuProps, MenuSemanticType['styles']>;

export interface MenuProps extends Omit<
  RcMenuProps,
  'items' | '_internalComponents' | 'classNames' | 'styles' | 'activeKey' | 'defaultActiveFirst'
> {
  theme?: MenuTheme;
  inlineIndent?: number;

  // >>>>> Private
  /**
   * @private Internal Usage. Not promise crash if used in production. Connect with chenshuai2144
   *   for removing.
   */
  _internalDisableMenuItemTitleTooltip?: boolean;

  items?: ItemType[];
  classNames?: MenuClassNamesType;
  styles?: MenuStylesType;
}

type InternalMenuProps = MenuProps &
  SiderContextProps & {
    collapsedWidth?: string | number;
  };

const InternalMenu = forwardRef<RcMenuRef, InternalMenuProps>((props, ref) => {
  const override = React.useContext(OverrideContext);
  const overrideObj = override || {};

  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    theme = 'light',
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    inlineCollapsed,
    siderCollapsed,
    rootClassName,
    mode,
    selectable,
    onClick,
    overflowedIndicatorPopupClassName,
    classNames,
    styles,
    ...restProps
  } = props;

  const { menu } = React.useContext(ConfigContext);

  const {
    getPrefixCls,
    getPopupContainer,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('menu');

  const rootPrefixCls = getPrefixCls();

  const passedProps = omit(restProps, ['collapsedWidth']);

  // ======================== Warning ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Menu');

    warning(
      !('inlineCollapsed' in props && mode !== 'inline'),
      'usage',
      '`inlineCollapsed` should only be used when `mode` is inline.',
    );
    warning.deprecated('items' in props && !props.children, 'children', 'items');
  }

  overrideObj.validator?.({ mode });

  // ========================== Click ==========================
  // Tell dropdown that item clicked
  const onItemClick = useEvent<Required<MenuProps>['onClick']>((...args) => {
    onClick?.(...args);
    overrideObj.onClick?.();
  });

  // ========================== Mode ===========================
  const mergedMode = overrideObj.mode || mode;

  // ======================= Selectable ========================
  const mergedSelectable = selectable ?? overrideObj.selectable;

  // ======================== Collapsed ========================
  // Inline Collapsed
  const mergedInlineCollapsed = inlineCollapsed ?? siderCollapsed;
  // ================ Merged Props for Semantic ================
  const mergedProps: MenuProps = {
    ...props,
    mode: mergedMode,
    inlineCollapsed: mergedInlineCollapsed,
    selectable: mergedSelectable,
    theme,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
    {
      popup: {
        _default: 'root',
      },
      subMenu: {
        _default: 'item',
      },
    },
  );

  const defaultMotions: MenuProps['defaultMotions'] = {
    horizontal: { motionName: `${rootPrefixCls}-slide-up` },
    inline: initCollapseMotion(rootPrefixCls),
    other: { motionName: `${rootPrefixCls}-zoom-big` },
  };

  const prefixCls = getPrefixCls('menu', customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls, !override);
  const menuClassName = clsx(`${prefixCls}-${theme}`, contextClassName, className);

  // ====================== ExpandIcon ========================
  const mergedExpandIcon = React.useMemo<MenuProps['expandIcon']>(() => {
    if (typeof expandIcon === 'function' || isEmptyIcon(expandIcon)) {
      return expandIcon || null;
    }
    if (typeof overrideObj.expandIcon === 'function' || isEmptyIcon(overrideObj.expandIcon)) {
      return overrideObj.expandIcon || null;
    }
    if (typeof menu?.expandIcon === 'function' || isEmptyIcon(menu?.expandIcon)) {
      return menu?.expandIcon || null;
    }
    const mergedIcon = expandIcon ?? overrideObj?.expandIcon ?? menu?.expandIcon;
    return cloneElement(mergedIcon, {
      className: clsx(
        `${prefixCls}-submenu-expand-icon`,
        React.isValidElement<{ className?: string }>(mergedIcon)
          ? mergedIcon.props?.className
          : undefined,
      ),
    });
  }, [expandIcon, overrideObj?.expandIcon, menu?.expandIcon, prefixCls]);

  // ======================== Context ==========================
  const contextValue = React.useMemo<MenuContextProps>(
    () => ({
      prefixCls,
      inlineCollapsed: mergedInlineCollapsed || false,
      direction,
      firstLevel: true,
      theme,
      mode: mergedMode,
      disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip,
      classNames: mergedClassNames as MenuContextProps['classNames'],
      styles: mergedStyles as MenuContextProps['styles'],
    }),
    [
      prefixCls,
      mergedInlineCollapsed,
      direction,
      _internalDisableMenuItemTitleTooltip,
      theme,
      mergedMode,
      mergedClassNames,
      mergedStyles,
    ],
  );

  // ========================= Render ==========================
  return (
    <OverrideContext.Provider value={null}>
      <MenuContext.Provider value={contextValue}>
        <RcMenu
          getPopupContainer={getPopupContainer}
          overflowedIndicator={<EllipsisOutlined />}
          overflowedIndicatorPopupClassName={clsx(
            prefixCls,
            `${prefixCls}-${theme}`,
            overflowedIndicatorPopupClassName,
          )}
          classNames={{
            list: mergedClassNames.list,
            listTitle: mergedClassNames.itemTitle,
          }}
          styles={{
            list: mergedStyles.list,
            listTitle: mergedStyles.itemTitle,
          }}
          mode={mergedMode}
          selectable={mergedSelectable}
          onClick={onItemClick}
          {...passedProps}
          inlineCollapsed={mergedInlineCollapsed}
          style={{ ...mergedStyles.root, ...contextStyle, ...style }}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={mergedExpandIcon}
          ref={ref}
          rootClassName={clsx(
            rootClassName,
            hashId,
            overrideObj.rootClassName,
            cssVarCls,
            rootCls,
            mergedClassNames.root,
          )}
          _internalComponents={MENU_COMPONENTS}
        />
      </MenuContext.Provider>
    </OverrideContext.Provider>
  );
});

export default InternalMenu;
