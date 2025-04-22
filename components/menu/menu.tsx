import * as React from 'react';
import { forwardRef } from 'react';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import type { MenuProps as RcMenuProps, MenuRef as RcMenuRef } from '@rc-component/menu';
import RcMenu from '@rc-component/menu';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import omit from '@rc-component/util/lib/omit';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
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

type SemanticName = 'root' | 'item' | 'itemIcon' | 'itemContent';
type PopupName = 'root' | 'listItem' | 'listTitle' | 'list' | 'listItemContent' | 'listItemIcon';

export interface MenuProps extends Omit<RcMenuProps, 'items' | '_internalComponents'> {
  theme?: MenuTheme;
  inlineIndent?: number;

  // >>>>> Private
  /**
   * @private Internal Usage. Not promise crash if used in production. Connect with chenshuai2144
   *   for removing.
   */
  _internalDisableMenuItemTitleTooltip?: boolean;

  items?: ItemType[];
  classNames?: Partial<
    Record<SemanticName, string> & {
      popup?: Partial<Record<PopupName, string>>;
    }
  >;
  styles?: Partial<
    Record<SemanticName, React.CSSProperties> & {
      popup?: Partial<Record<PopupName, React.CSSProperties>>;
    }
  >;
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

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      popup: {
        _default: 'root',
      },
    },
  );

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

  const defaultMotions: MenuProps['defaultMotions'] = {
    horizontal: { motionName: `${rootPrefixCls}-slide-up` },
    inline: initCollapseMotion(rootPrefixCls),
    other: { motionName: `${rootPrefixCls}-zoom-big` },
  };

  const prefixCls = getPrefixCls('menu', customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls, !override);
  const menuClassName = cls(`${prefixCls}-${theme}`, contextClassName, className);

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
      className: cls(
        `${prefixCls}-submenu-expand-icon`,
        React.isValidElement<any>(mergedIcon)
          ? (
              mergedIcon as React.ReactElement<{
                className?: string;
              }>
            ).props?.className
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
      classNames: mergedClassNames,
      styles: mergedStyles,
    }),
    [
      prefixCls,
      mergedInlineCollapsed,
      direction,
      _internalDisableMenuItemTitleTooltip,
      theme,
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
          overflowedIndicatorPopupClassName={cls(
            prefixCls,
            `${prefixCls}-${theme}`,
            overflowedIndicatorPopupClassName,
          )}
          mode={mergedMode}
          selectable={mergedSelectable}
          onClick={onItemClick}
          {...passedProps}
          inlineCollapsed={mergedInlineCollapsed}
          style={{ ...mergedStyles?.root, ...contextStyle, ...style }}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={mergedExpandIcon}
          ref={ref}
          rootClassName={cls(
            rootClassName,
            hashId,
            overrideObj.rootClassName,
            cssVarCls,
            rootCls,
            classNames?.root,
          )}
          _internalComponents={MENU_COMPONENTS}
        />
      </MenuContext.Provider>
    </OverrideContext.Provider>
  );
});

export default InternalMenu;
