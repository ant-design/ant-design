import React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import { TreeSelectProps, TreeSelectContext } from './interface';

export { TreeSelectProps };

export default class TreeSelect extends React.Component<TreeSelectProps, any> {
  static TreeNode = TreeNode;
  static SHOW_ALL = SHOW_ALL;
  static SHOW_PARENT = SHOW_PARENT;
  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
    dropdownClassName: 'ant-select-tree-dropdown',
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TreeSelectContext;

  render() {
    const props = this.props;
    let {
      size, className = '', notFoundContent, prefixCls, dropdownStyle,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    const { antLocale } = this.context;
    if (antLocale && antLocale.Select) {
      notFoundContent = notFoundContent || antLocale.Select.notFoundContent;
    }

    let checkable = props.treeCheckable;
    if (checkable) {
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`} />;
    }

    return (
      <RcTreeSelect
        {...this.props}
        dropdownStyle={{ maxHeight: '100%', overflow: 'auto', ...dropdownStyle }}
        treeCheckable={checkable}
        className={cls}
        notFoundContent={notFoundContent}
      />
    );
  }
}
