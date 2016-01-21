import React from 'react';
import TreeSelect, { TreeNode } from 'rc-tree-select';
import classNames from 'classnames';
// import animation from '../common/openAnimation';

const AntTreeSelect = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tree-select',
      transitionName: 'slide-up',
      optionLabelProp: 'value',
      choiceTransitionName: 'zoom',
      showSearch: false,
      size: 'default',
      // openAnimation: animation,
    };
  },
  render() {
    const props = this.props;
    let {
      size, className, combobox, notFoundContent
    } = this.props;

    const cls = classNames({
      'ant-tree-select-lg': size === 'large',
      'ant-tree-select-sm': size === 'small',
      [className]: !!className,
    });

    if (combobox) {
      notFoundContent = null;
    }

    let checkable = props.treeCheckable;
    if (checkable) {
      checkable = <span className={`${props.prefixCls}-tree-checkbox-inner`}></span>;
    }

    return (
      <TreeSelect {...this.props}
        treeCheckable={checkable}
        className={cls}
        notFoundContent={notFoundContent} />
    );
  }
});

AntTreeSelect.TreeNode = TreeNode;
export default AntTreeSelect;
