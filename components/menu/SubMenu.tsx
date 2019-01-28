import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';

interface TitleClickEntity {
  key: string;
  domEvent: Event;
}

export interface SubMenuProps {
  rootPrefixCls?: string;
  className?: string;
  disabled?: boolean;
  title?: React.ReactNode;
  onTitleClick?: (clickEntity: TitleClickEntity) => void;
}

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextTypes = {
    antdMenuTheme: PropTypes.string,
  };
  // fix issue:https://github.com/ant-design/ant-design/issues/8666
  static isSubMenu = 1;
  context: any;
  private subMenu: any;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.subMenu.onKeyDown(e);
  };
  saveSubMenu = (subMenu: any) => {
    this.subMenu = subMenu;
  };
  render() {
    const { rootPrefixCls, className } = this.props;
    const theme = this.context.antdMenuTheme;
    return (
      <RcSubMenu
        {...this.props}
        ref={this.saveSubMenu}
        popupClassName={classNames(`${rootPrefixCls}-${theme}`, className)}
      />
    );
  }
}

export default SubMenu;
