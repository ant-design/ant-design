import React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';

export default class TreeSelect extends React.Component {
  static TreeNode = TreeNode;
  static SHOW_ALL = SHOW_ALL;
  static SHOW_PARENT = SHOW_PARENT;
  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
  }

  render() {
    const props = this.props;
    let {
      size, className, combobox, notFoundContent, prefixCls
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
    });

    if (combobox) {
      notFoundContent = null;
    }

    let checkable = props.treeCheckable;
    if (checkable) {
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`}></span>;
    }

    return (
      <RcTreeSelect {...this.props}
        treeCheckable={checkable}
        className={cls}
        notFoundContent={notFoundContent} />
    );
  }
}
