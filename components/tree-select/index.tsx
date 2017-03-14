import React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import { TreeSelectProps } from './interface';
import injectLocale from '../locale-provider/injectLocale';

export { TreeSelectProps };

abstract class TreeSelect extends React.Component<TreeSelectProps, any> {
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

  abstract getLocale()

  render() {
    const locale = this.getLocale();
    const { props } = this;
    const {
      prefixCls,
      className,
      size,
      notFoundContent = locale.notFoundContent,
      dropdownStyle,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    let checkable = props.treeCheckable;
    if (checkable) {
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`} />;
    }

    return (
      <RcTreeSelect
        {...props}
        dropdownStyle={{ maxHeight: '100vh', overflow: 'auto', ...dropdownStyle }}
        treeCheckable={checkable}
        className={cls}
        notFoundContent={notFoundContent}
      />
    );
  }
}

// Use Select's locale
const injectSelectLocale = injectLocale('Select', {});
export default injectSelectLocale<TreeSelectProps>(TreeSelect as any);
