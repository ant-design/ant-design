import React from 'react';
import Tree from 'rc-tree';

var AntTree = React.createClass({
  render() {
    return <Tree {...this.props} >
      {this.props.children}
    </Tree>;
  }
});

AntTree.TreeNode = Tree.TreeNode;
export default AntTree;
