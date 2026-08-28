import type RcTree from '@rc-component/tree';
import type {
  BasicDataNode,
  DataNode,
  EventDataNode,
  TreeInstance,
  UseTreeConfig,
} from '@rc-component/tree';
import { TreeNode, useTree } from '@rc-component/tree';

import DirectoryTree from './DirectoryTree';
import type { TreeProps } from './Tree';
import TreePure from './Tree';

export type {
  ExpandAction as DirectoryTreeExpandAction,
  DirectoryTreeProps,
} from './DirectoryTree';

export type {
  AntdTreeNodeAttribute,
  AntTreeNode,
  AntTreeNodeCheckedEvent,
  AntTreeNodeExpandedEvent,
  AntTreeNodeMouseEvent,
  AntTreeNodeProps,
  AntTreeNodeSelectedEvent,
  TreeProps,
} from './Tree';

export type { BasicDataNode, DataNode, EventDataNode, TreeInstance, UseTreeConfig };

type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & React.RefAttributes<RcTree>,
) => React.ReactElement) & {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
  useTree: typeof useTree;
};

const Tree = TreePure as unknown as CompoundedComponent;
Tree.DirectoryTree = DirectoryTree;
Tree.TreeNode = TreeNode;
Tree.useTree = useTree;

export default Tree;
