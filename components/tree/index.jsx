import React from 'react';
import Tree from 'rc-tree';
var TreeNode = Tree.TreeNode;

var antDTree = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tree'
    };
  },

  render() {
    return <Tree {...this.props} showIcon={false} showLine={false}>
      {this.props.children}
    </Tree>;
  }
});
antDTree.TreeNode = TreeNode;
module.exports = antDTree;
