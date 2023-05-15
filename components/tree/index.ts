import { TreeNode } from 'rc-tree';
import type { DataNode } from 'rc-tree/lib/interface';

import TreePure from './Tree';
import DirectoryTree from './DirectoryTree';

export type { DataNode };
export type { EventDataNode } from 'rc-tree/lib/interface';
export type {
  DirectoryTreeProps,
  ExpandAction as DirectoryTreeExpandAction,
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

const Tree = Object.assign(TreePure, {
  DirectoryTree,
  TreeNode,
});

export default Tree;
