import type RcTree from 'rc-tree';
import { TreeNode } from 'rc-tree';
import type { BasicDataNode } from 'rc-tree';
import type { DataNode } from 'rc-tree/lib/interface';

import type { TreeProps } from './Tree';
import TreePure from './Tree';
import DirectoryTree from './DirectoryTree'

export { DataNode }
export { EventDataNode } from 'rc-tree/lib/interface';
export { DirectoryTreeProps, ExpandAction as DirectoryTreeExpandAction } from './DirectoryTree';
export {
  AntdTreeNodeAttribute,
  AntTreeNode,
  AntTreeNodeCheckedEvent,
  AntTreeNodeExpandedEvent,
  AntTreeNodeMouseEvent,
  AntTreeNodeProps,
  AntTreeNodeSelectedEvent,
  TreeProps,
} from './Tree';


type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & { ref?: React.Ref<RcTree> },
) => React.ReactElement) & {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
};

const Tree = TreePure as unknown as CompoundedComponent
Tree.DirectoryTree = DirectoryTree
Tree.TreeNode = TreeNode

export default Tree;