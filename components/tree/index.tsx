import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';

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
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: string;
  isLeaf?: boolean;
  icon?: (treeNode: AntdTreeNodeAttribute) => React.ReactNode | React.ReactNode;
  children?: React.ReactNode;
}

export interface AntTreeNode extends React.Component<AntTreeNodeProps, {}> {}

export interface AntTreeNodeEvent {
  event: 'check' | 'select';
  node: AntTreeNode;
  checked?: boolean;
  checkedNodes?: AntTreeNode[];
  selected?: boolean;
  selectedNodes?: AntTreeNode[];
}

export interface AntTreeNodeMouseEvent {
  node: AntTreeNode;
  event: React.MouseEventHandler<any>;
}

export interface TreeProps {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
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
  /** 展开/收起节点时触发 */
  onExpand?: (
    expandedKeys: string[],
    info: { node: AntTreeNode; expanded: boolean; },
  ) => void | PromiseLike<any>;
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: string[], e: AntTreeNodeEvent) => void;
  /** 点击树节点触发 */
  onSelect?: (selectedKeys: string[], e: AntTreeNodeEvent) => void;
  /** filter some AntTreeNodes as you need. it should return true */
  filterAntTreeNode?: (node: AntTreeNode) => boolean;
  /** 异步加载数据 */
  loadData?: (node: AntTreeNode) => PromiseLike<any>;
  /** 响应右键点击 */
  onRightClick?: (options: AntTreeNodeMouseEvent) => void;
  /** 设置节点可拖拽（IE>8）*/
  draggable?: boolean;
  /** 开始拖拽时调用 */
  onDragStart?: (options: AntTreeNodeMouseEvent) => void;
  /** dragenter 触发时调用 */
  onDragEnter?: (options: AntTreeNodeMouseEvent) => void;
  /** dragover 触发时调用 */
  onDragOver?: (options: AntTreeNodeMouseEvent) => void;
  /** dragleave 触发时调用 */
  onDragLeave?: (options: AntTreeNodeMouseEvent) => void;
  /** drop 触发时调用 */
  onDrop?: (options: AntTreeNodeMouseEvent) => void;
  style?: React.CSSProperties;
  showIcon?: boolean;
  prefixCls?: string;
  filterTreeNode?: (node: AntTreeNode) => boolean;
}

export default class Tree extends React.Component<TreeProps, any> {
  static TreeNode = TreeNode;

  static defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
  };

  render() {
    const props = this.props;
    const { prefixCls, className } = props;
    let checkable = props.checkable;
    return (
      <RcTree
        {...props}
        className={className}
        checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      >
        {this.props.children}
      </RcTree>
    );
  }
}
