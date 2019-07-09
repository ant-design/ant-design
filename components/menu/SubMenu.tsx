import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';

import { MenuContext, MenuContextProps } from './index';

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

export interface SubMenuProps {
  rootPrefixCls?: string;
  className?: string;
  disabled?: boolean;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
}

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextTypes = {
    antdMenuTheme: PropTypes.string,
  };
  // fix issue:https://github.com/ant-design/ant-design/issues/8666
  static isSubMenu = 1;
  private subMenu: any;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.subMenu.onKeyDown(e);
  };

  saveSubMenu = (subMenu: any) => {
    this.subMenu = subMenu;
  };

  render() {
    const { rootPrefixCls, className } = this.props;
    return (
      <MenuContext.Consumer>
        {({ antdMenuTheme }: MenuContextProps) => (
          <RcSubMenu
            {...this.props}
            ref={this.saveSubMenu}
            popupClassName={classNames(`${rootPrefixCls}-${antdMenuTheme}`, className)}
          />
        )}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;
