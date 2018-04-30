import * as React from "react";
import { Item } from "rc-menu";
import Tooltip from "../tooltip";
import Context, { IMenuContext } from "./context";

class MenuItem extends React.Component<any, any> {
  static isMenuItem = 1;
  private menuItem: any;
  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  };
  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  };
  renderItem(inlineCollapsed: boolean) {
    const props = this.props;
    const item = <Item {...props} ref={this.saveMenuItem} />;
    if (inlineCollapsed && props.level === 1) {
      return (
        <Tooltip
          title={props.children}
          placement="right"
          overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
        >
          {item}
        </Tooltip>
      );
    }
    return item;
  }
  render() {
    return (
      <Context.Consumer>
        {(value: IMenuContext) => this.renderItem(value.inlineCollapsed)}
      </Context.Consumer>
    );
  }
}

export default MenuItem;
