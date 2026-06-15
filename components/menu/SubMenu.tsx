import * as React from 'react';
import { SubMenu as RcSubMenu, useFullPath } from '@rc-component/menu';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import { useZIndex } from '../_util/hooks';
import { cloneElement } from '../_util/reactNode';
import type { SubMenuType } from './interface';
import type { MenuContextProps } from './MenuContext';
import MenuContext from './MenuContext';

export interface SubMenuProps
  extends Omit<SubMenuType, 'ref' | 'key' | 'children' | 'label' | 'title'> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

type InternalSubMenuProps = SubMenuProps & {
  itemTitle?: string | false;
};

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { popupClassName, icon, title, itemTitle, theme: customTheme } =
    props as InternalSubMenuProps;
  const context = React.useContext(MenuContext);
  const { prefixCls, inlineCollapsed, theme: contextTheme, classNames, styles } = context;

  const parentPath = useFullPath();
  let titleAttr: string | undefined;
  if (typeof itemTitle === 'string') {
    titleAttr = itemTitle;
  } else if (itemTitle !== false && typeof title === 'string') {
    titleAttr = title;
  }
  const isTopLevelInlineCollapsed = inlineCollapsed && !parentPath.length;
  const collapsedTitle = isTopLevelInlineCollapsed ? titleAttr : undefined;
  const collapsedLabel = typeof title === 'string' ? title : titleAttr;

  let titleNode: React.ReactNode;

  if (!icon) {
    titleNode =
      isTopLevelInlineCollapsed &&
      collapsedLabel !== undefined &&
      (!React.isValidElement(title) || titleAttr !== undefined) ? (
        <div className={`${prefixCls}-inline-collapsed-noicon`} title={titleAttr}>
          {collapsedLabel.charAt(0)}
        </div>
      ) : (
        <span className={`${prefixCls}-title-content`} title={titleAttr}>
          {title}
        </span>
      );
  } else {
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    const titleIsSpan = React.isValidElement(title) && title.type === 'span';
    const titleContent = titleIsSpan
      ? cloneElement<{ title?: string }>(title, (oriProps) => ({
          title: titleAttr ?? oriProps.title,
        }))
      : title;

    titleNode = (
      <>
        {cloneElement(icon, (oriProps) => ({
          className: clsx(oriProps.className, `${prefixCls}-item-icon`, classNames?.itemIcon),
          style: { ...oriProps.style, ...styles?.itemIcon },
          title: collapsedTitle ?? oriProps.title,
        }))}
        {titleIsSpan ? (
          titleContent
        ) : (
          <span className={`${prefixCls}-title-content`} title={titleAttr}>
            {title}
          </span>
        )}
      </>
    );
  }

  const contextValue = React.useMemo<MenuContextProps>(
    () => ({ ...context, firstLevel: false }),
    [context],
  );

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('Menu');

  return (
    <MenuContext.Provider value={contextValue}>
      <RcSubMenu
        {...omit(props as InternalSubMenuProps, ['icon', 'itemTitle'])}
        title={titleNode}
        classNames={{ list: classNames?.subMenu?.list, listTitle: classNames?.subMenu?.itemTitle }}
        styles={{ list: styles?.subMenu?.list, listTitle: styles?.subMenu?.itemTitle }}
        popupClassName={clsx(
          prefixCls,
          popupClassName,
          classNames?.popup?.root,
          `${prefixCls}-${customTheme || contextTheme}`,
        )}
        popupStyle={{
          zIndex,
          // fix: https://github.com/ant-design/ant-design/issues/47826#issuecomment-2360737237
          ...props.popupStyle,
          ...styles?.popup?.root,
        }}
      />
    </MenuContext.Provider>
  );
};

export default SubMenu;
