import * as React from "react";
import PropTypes from "prop-types";
import { SubMenu as RcSubMenu } from "rc-menu";
import classNames from "classnames";

import Context, { IMenuContext } from "./context";

class SubMenu extends React.Component<any, any> {
  static contextTypes = {
    antdMenuTheme: PropTypes.string
  };
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
      <Context.Consumer>
        {(value: IMenuContext) => (
          <RcSubMenu
            {...this.props}
            ref={this.saveSubMenu}
            popupClassName={classNames(
              `${rootPrefixCls}-${value.antdMenuTheme}`,
              className
            )}
          />
        )}
      </Context.Consumer>
    );
  }
}

export default SubMenu;
