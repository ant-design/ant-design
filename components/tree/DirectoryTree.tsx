import * as React from 'react';
import classNames from 'classnames';
import Tree, { TreeProps, AntdTreeNodeAttribute, AntTreeNodeEvent } from './Tree';
import Icon from '../icon';

function getIcon(props: AntdTreeNodeAttribute): React.ReactNode {
  const { isLeaf, expanded } = props;
  if (isLeaf) {
    return <Icon type="file" />;
  }
  return <Icon type={expanded ? 'folder-open' : 'folder'} />;
}

export interface DirectoryTreeProps extends TreeProps {
  contextMenu?: (props: AntdTreeNodeAttribute) => React.ReactNode;
}

export default class DirectoryTree extends React.Component<DirectoryTreeProps, any> {
  static defaultProps = {
    prefixCls: 'ant-tree',
    showIcon: true,
  };

  tree: Tree | null = null;

  onNodeSelect = (selectedKeys: string[], event: AntTreeNodeEvent) => {
    const { onSelect } = this.props;
    // const { node } = event;
    // const { isLeaf, eventKey, expanded } = node.props;

    // console.log('~>', isLeaf, eventKey, expanded);

    if (onSelect) {
      onSelect(selectedKeys, event);
    }

    // const tree = this.tree as React.ReactNode;
    // if (tree) {
    //   tree.onNodeExpand(null, );
    // }
    // if (onExpand) {
    //   onExpand(expandedKeys, { node: treeNode, expanded: targetExpanded });
    // }
  }

  saveTreeRef = (node: Tree) => {
    this.tree = node;
  }

  render() {
    const { prefixCls, className, ...props } = this.props;

    const connectClassName = classNames(`${prefixCls}-directory`, className);

    return (
      <Tree
        ref={this.saveTreeRef}
        prefixCls={prefixCls}
        className={connectClassName}
        icon={getIcon}
        {...props}

        onSelect={this.onNodeSelect}
      />
    );
  }
}
