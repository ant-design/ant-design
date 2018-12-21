import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';

class SubMenu extends React.Component<any, any> {
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

  getCollapsedMode = () => {
    const { mode, showTextCollapsed } = this.props;
    return mode === 'vertical' && showTextCollapsed === true;
  };

  render() {
    const { rootPrefixCls, className } = this.props;
    const theme = this.context.antdMenuTheme;
    const subMenuClassName = classNames(className, {
      [`${rootPrefixCls}-submenu-collapse`]: this.getCollapsedMode(),
    });
    return (
      <RcSubMenu
        {...this.props}
        className={subMenuClassName}
        ref={this.saveSubMenu}
        popupClassName={classNames(`${rootPrefixCls}-${theme}`, className)}
      />
    );
  }
}

export default SubMenu;
