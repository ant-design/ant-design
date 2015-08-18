import React from 'react';
import Tree from 'rc-tree';

const AntTree = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tree'
    };
  },
  render() {
    return <Tree {...this.props} showIcon={false}>
      {this.props.children}
    </Tree>;
  }
});

AntTree.TreeNode = Tree.TreeNode;
export default AntTree;
