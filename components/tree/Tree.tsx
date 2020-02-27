import * as React from 'react';
import RcTree, { TreeNode, TreeProps as RcTreeProps } from 'rc-tree';
import classNames from 'classnames';
import { DataNode } from 'rc-tree/lib/interface';

import DirectoryTree from './DirectoryTree';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import collapseMotion from '../_util/motion';
import renderSwitcherIcon from './utils/iconUtil';

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
  key?: string;
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
  expandedKeys: string[];
}

export interface AntTreeNodeDropEvent {
  node: AntTreeNode;
  dragNode: AntTreeNode;
  dragNodesKeys: string[];
  dropPosition: number;
  dropToGap?: boolean;
  event: React.MouseEvent<HTMLElement>;
}

export interface TreeNodeNormal {
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

export interface TreeProps extends Omit<RcTreeProps, 'prefixCls'> {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** checkable状态下节点选择完全受控（父子节点选中状态不再关联） */
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
  defaultExpandedKeys?: string[];
  /** （受控）展开指定的树节点 */
  expandedKeys?: string[];
  /** （受控）选中复选框的树节点 */
  checkedKeys?: string[] | { checked: string[]; halfChecked: string[] };
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: string[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: string[];
  /** 默认选中的树节点 */
  defaultSelectedKeys?: string[];
  selectable?: boolean;
  /** 点击树节点触发 */
  filterAntTreeNode?: (node: AntTreeNode) => boolean;
  loadedKeys?: string[];
  /** 设置节点可拖拽（IE>8） */
  draggable?: boolean;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  switcherIcon?: React.ReactElement<any>;
  prefixCls?: string;
  children?: React.ReactNode;
  blockNode?: boolean;
  treeData?: Array<TreeNodeNormal>;
}

export default class Tree extends React.Component<TreeProps, any> {
  static TreeNode = TreeNode;

  static DirectoryTree = DirectoryTree;

  static defaultProps = {
    checkable: false,
    showIcon: false,
    motion: {
      ...collapseMotion,
      motionAppear: false,
    },
    blockNode: false,
  };

  tree: any;

  setTreeRef = (node: any) => {
    this.tree = node;
  };

  renderTree = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      showIcon,
      showLine,
      switcherIcon,
      blockNode,
      children,
    } = props;
    const { checkable } = props;
    const prefixCls = getPrefixCls('tree', customizePrefixCls);
    return (
      <RcTree
        itemHeight={20}
        ref={this.setTreeRef}
        {...props}
        prefixCls={prefixCls}
        className={classNames(className, {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        })}
        checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
        switcherIcon={(nodeProps: AntTreeNodeProps) =>
          renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
        }
      >
        {children}
      </RcTree>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTree}</ConfigConsumer>;
  }
}
