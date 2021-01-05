import * as React from 'react';
import RcTree, { TreeNode, TreeProps as RcTreeProps } from 'rc-tree';
import classNames from 'classnames';
import { DataNode, Key } from 'rc-tree/lib/interface';

import DirectoryTree from './DirectoryTree';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import renderSwitcherIcon from './utils/iconUtil';
import dropIndicatorRender from './utils/dropIndicator';

export interface AntdTreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}

export interface AntTreeNodeProps {
  className?: string;
  checkable?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: Key;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  [customProp: string]: any;
}

export interface AntTreeNode extends React.Component<AntTreeNodeProps, {}> {}

export interface AntTreeNodeBaseEvent {
  node: AntTreeNode;
  nativeEvent: MouseEvent;
}

export interface AntTreeNodeCheckedEvent extends AntTreeNodeBaseEvent {
  event: 'check';
  checked?: boolean;
  checkedNodes?: AntTreeNode[];
}

export interface AntTreeNodeSelectedEvent extends AntTreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: DataNode[];
}

export interface AntTreeNodeExpandedEvent extends AntTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface AntTreeNodeMouseEvent {
  node: AntTreeNode;
  event: React.DragEvent<HTMLElement>;
}

export interface AntTreeNodeDragEnterEvent extends AntTreeNodeMouseEvent {
  expandedKeys: Key[];
}

export interface AntTreeNodeDropEvent {
  node: AntTreeNode;
  dragNode: AntTreeNode;
  dragNodesKeys: Key[];
  dropPosition: number;
  dropToGap?: boolean;
  event: React.MouseEvent<HTMLElement>;
}

// [Legacy] Compatible for v3
export type TreeNodeNormal = DataNode;

export interface TreeProps extends Omit<RcTreeProps, 'prefixCls' | 'showLine' | 'direction'> {
  showLine?: boolean | { showLeafIcon: boolean };
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** Checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 是否禁用树 */
  disabled?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开对应树节点 */
  defaultExpandParent?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Key[];
  /** （受控）展开指定的树节点 */
  expandedKeys?: Key[];
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Key[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: Key[];
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Key[];
  selectable?: boolean;
  /** 点击树节点触发 */
  filterAntTreeNode?: (node: AntTreeNode) => boolean;
  loadedKeys?: Key[];
  /** 设置节点可拖拽（IE>8） */
  draggable?: ((node: DataNode) => boolean) | boolean;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  switcherIcon?: React.ReactElement<any>;
  prefixCls?: string;
  children?: React.ReactNode;
  blockNode?: boolean;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<RcTree>> {
  TreeNode: typeof TreeNode;
  DirectoryTree: typeof DirectoryTree;
}

const Tree = React.forwardRef<RcTree, TreeProps>((props, ref) => {
  const { getPrefixCls, direction, virtual } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon,
    showLine,
    switcherIcon,
    blockNode,
    children,
    checkable,
    selectable,
  } = props;
  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  const newProps = {
    ...props,
    showLine: Boolean(showLine),
    dropIndicatorRender,
  };
  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual}
      {...newProps}
      prefixCls={prefixCls}
      className={classNames(
        {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
          [`${prefixCls}-unselectable`]: !selectable,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      )}
      direction={direction}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      selectable={selectable}
      switcherIcon={(nodeProps: AntTreeNodeProps) =>
        renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
      }
    >
      {children}
    </RcTree>
  );
}) as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.DirectoryTree = DirectoryTree;

Tree.defaultProps = {
  checkable: false,
  selectable: true,
  showIcon: false,
  motion: {
    ...collapseMotion,
    motionAppear: false,
  },
  blockNode: false,
};

export default Tree;
