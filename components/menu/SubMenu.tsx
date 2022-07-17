import * as React from 'react';
import { SubMenu as RcSubMenu, useFullPath } from 'rc-menu';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import MenuContext from './MenuContext';
import { isValidElement, cloneElement } from '../_util/reactNode';

interface TitleEventEntity {
  key: string;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export interface SubMenuProps {
  className?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
  popupClassName?: string;
  children?: React.ReactNode;
}

function SubMenu(props: SubMenuProps) {
  const { popupClassName, icon, title } = props;
  const context = React.useContext(MenuContext);
  const { prefixCls, inlineCollapsed, antdMenuTheme } = context;

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
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
            `${prefixCls}-item-icon`,
          ),
        })}
        {titleIsSpan ? title : <span className={`${prefixCls}-title-content`}>{title}</span>}
      </>
    );
  }

  return (
    <MenuContext.Provider
      value={{
        ...context,
        firstLevel: false,
      }}
    >
      <RcSubMenu
        {...omit(props, ['icon'])}
        title={titleNode}
        popupClassName={classNames(prefixCls, `${prefixCls}-${antdMenuTheme}`, popupClassName)}
      />
    </MenuContext.Provider>
  );
}

export default SubMenu;
