import * as React from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
import omit from 'omit.js';
import MenuContext, { MenuContextProps } from './MenuContext';
import { isValidElement } from '../_util/reactNode';

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

export interface SubMenuProps {
  rootPrefixCls?: string;
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
}

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextType = MenuContext;

  // fix issue:https://github.com/ant-design/ant-design/issues/8666
  static isSubMenu = 1;

  private subMenu: any;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.subMenu.onKeyDown(e);
  };

  saveSubMenu = (subMenu: any) => {
    this.subMenu = subMenu;
  };

  renderTitle(inlineCollapsed: boolean) {
    const { icon, title, level, rootPrefixCls } = this.props;
    if (!icon) {
      return inlineCollapsed && level === 1 && title && typeof title === 'string' ? (
        <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>{title.charAt(0)}</div>
      ) : (
        title
      );
    }
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    return (
      <>
        {icon}
        {titleIsSpan ? title : <span>{title}</span>}
      </>
    );
  }

  render() {
    const { rootPrefixCls, popupClassName } = this.props;
    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, antdMenuTheme }: MenuContextProps) => (
          <RcSubMenu
            {...omit(this.props, ['icon'])}
            title={this.renderTitle(inlineCollapsed)}
            ref={this.saveSubMenu}
            popupClassName={classNames(
              rootPrefixCls,
              `${rootPrefixCls}-${antdMenuTheme}`,
              popupClassName,
            )}
          />
        )}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;
