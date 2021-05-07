import * as React from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import MenuContext, { MenuContextProps } from './MenuContext';
import { isValidElement } from '../_util/reactNode';

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
}

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextType = MenuContext;

  context: MenuContextProps;

  renderTitle(inlineCollapsed: boolean) {
    const { icon, title, level } = this.props;
    const { prefixCls } = this.context;

    if (!icon) {
      return inlineCollapsed && level === 1 && title && typeof title === 'string' ? (
        <div className={`${prefixCls}-inline-collapsed-noicon`}>{title.charAt(0)}</div>
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
        {titleIsSpan ? title : <span className={`${prefixCls}-title-content`}>{title}</span>}
      </>
    );
  }

  render() {
    const { popupClassName } = this.props;
    const { prefixCls, inlineCollapsed, antdMenuTheme } = this.context;
    return (
      <MenuContext.Provider
        value={{
          ...this.context,
          firstLevel: false,
        }}
      >
        <RcSubMenu
          {...omit(this.props, ['icon'])}
          title={this.renderTitle(inlineCollapsed)}
          popupClassName={classNames(prefixCls, `${prefixCls}-${antdMenuTheme}`, popupClassName)}
        />
      </MenuContext.Provider>
    );
  }
}

export default SubMenu;
