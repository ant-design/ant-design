import type RcTree from '@rc-component/tree';
import type { BasicDataNode } from '@rc-component/tree';
import { TreeNode } from '@rc-component/tree';
import type { DataNode } from '@rc-component/tree/lib/interface';

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
  TreeSemanticType,
} from './Tree';

export type { EventDataNode } from '@rc-component/tree/lib/interface';

export type { BasicDataNode, DataNode };

type CompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<TreeProps<T>> & React.RefAttributes<RcTree>,
) => React.ReactElement) & {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
};

const Tree = TreePure as unknown as CompoundedComponent;
Tree.DirectoryTree = DirectoryTree;
Tree.TreeNode = TreeNode;

export default Tree;
