import * as React from 'react';
import RcTree from 'rc-tree';
import animation from '../_util/openAnimation';

export interface TreeNodeProps {
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: string;
  isLeaf?: boolean;
}

export class TreeNode extends React.Component<TreeNodeProps, {}> {
}

export interface TreeNodeEvent {
  event: 'check' | 'select';
  node: TreeNode;
  checked?: boolean;
  checkedNodes?: Array<TreeNode>;
  selected?: boolean;
  selectedNodes?: Array<TreeNode>;
}

export interface TreeNodeMouseEvent {
  node: TreeNode;
  event: React.MouseEventHandler;
}

export interface TreeProps {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /**是否自动展开父节点 */
  autoExpandParent?: boolean;
  /**checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Array<string>;
  /** （受控）展开指定的树节点 */
  expandedKeys?: Array<string>;
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Array<string>;
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Array<string>;
  /** （受控）设置选中的树节点 */
  selectedKeys?: Array<string>;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Array<string>;
  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: Array<string>, info: { node: TreeNode, expanded: boolean }) => void | PromiseLike<any>;
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: Array<string>, e: TreeNodeEvent) => void;
  /** 点击树节点触发 */
  onSelect?: (selectedKeys: Array<string>, e: TreeNodeEvent) => void;
  /** filter some treeNodes as you need. it should return true */
  filterTreeNode?: (node: TreeNode) => boolean;
  /** 异步加载数据 */
  loadData?: (node: TreeNode) => PromiseLike<any>;
  /** 响应右键点击 */
  onRightClick?: (options: TreeNodeMouseEvent) => void;
  /** 设置节点可拖拽（IE>8）*/
  draggable?: boolean;
  /** 开始拖拽时调用 */
  onDragStart?: (options: TreeNodeMouseEvent) => void;
  /** dragenter 触发时调用 */
  onDragEnter?: (options: TreeNodeMouseEvent) => void;
  /** dragover 触发时调用 */
  onDragOver?: (options: TreeNodeMouseEvent) => void;
  /** dragleave 触发时调用 */
  onDragLeave?: (options: TreeNodeMouseEvent) => void;
  /** drop 触发时调用 */
  onDrop?: (options: TreeNodeMouseEvent) => void;
  style?: React.CSSProperties;
  prefixCls?: string;
}

export default class Tree extends React.Component<TreeProps, any> {
  static TreeNode = RcTree.TreeNode;

  static defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
  };

  render() {
    const props = this.props;
    let checkable = props.checkable;
    return (
      <RcTree {...props}
        checkable={checkable ? (<span className={`${props.prefixCls}-checkbox-inner`}></span>) : checkable }>
        {this.props.children}
      </RcTree>
    );
  }
}
