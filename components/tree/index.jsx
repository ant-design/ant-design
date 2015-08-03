import React from 'react';

import Tree from 'rc-tree'
var TreeNode = Tree.TreeNode;

var antDTree = React.createClass({

  render() {
    return <Tree {...this.props} >
      {this.props.children}
    </Tree>
  }
});
antDTree.TreeNode = TreeNode;
module.exports = antDTree;
