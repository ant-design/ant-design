import * as React from 'react';
import { SubMenu as RcSubMenu, useFullPath } from '@rc-component/menu';
import omit from '@rc-component/util/lib/omit';
import cls from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import { cloneElement } from '../_util/reactNode';
import type { SubMenuType } from './interface';
import type { MenuContextProps } from './MenuContext';
import MenuContext from './MenuContext';

export interface SubMenuProps extends Omit<SubMenuType, 'ref' | 'key' | 'children' | 'label'> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { popupClassName, icon, title, theme: customTheme } = props;
  const context = React.useContext(MenuContext);
  const { prefixCls, inlineCollapsed, theme: contextTheme, classNames, styles } = context;

  const parentPath = useFullPath();

  let titleNode: React.ReactNode;

  if (!icon) {
    titleNode =
      inlineCollapsed && !parentPath.length && title && typeof title === 'string' ? (
        <div className={`${prefixCls}-inline-collapsed-noicon`}>{title.charAt(0)}</div>
      ) : (
        <span className={`${prefixCls}-title-content`}>{title}</span>
      );
  } else {
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    const titleIsSpan = React.isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {cloneElement(icon, (oriProps) => ({
          className: cls(oriProps.className, `${prefixCls}-item-icon`, classNames.itemIcon),
          style: { ...oriProps.style, ...styles.itemIcon },
        }))}
        {titleIsSpan ? title : <span className={`${prefixCls}-title-content`}>{title}</span>}
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
        {...omit(props, ['icon'])}
        title={titleNode}
        classNames={{
          list: classNames.subMenu.list,
          listTitle: classNames.subMenu.itemTitle,
        }}
        styles={{
          list: styles.subMenu.list,
          listTitle: styles.subMenu.itemTitle,
        }}
        popupClassName={cls(
          prefixCls,
          popupClassName,
          classNames.popup.root,
          `${prefixCls}-${customTheme || contextTheme}`,
        )}
        popupStyle={{
          zIndex,
          // fix: https://github.com/ant-design/ant-design/issues/47826#issuecomment-2360737237
          ...props.popupStyle,
          ...styles.popup.root,
        }}
      />
    </MenuContext.Provider>
  );
};

export default SubMenu;
