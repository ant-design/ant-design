import React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
import classNames from 'classnames';

export interface AntTreeNodeProps {
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: string;
  isLeaf?: boolean;
}

export class AntTreeNode extends React.Component<AntTreeNodeProps, {}> {
  render() {
    return <AntTreeNode {...this.props} />;
  }
}

export interface AntTreeNodeEvent {
  event: 'check' | 'select';
  node: AntTreeNode;
  checked?: boolean;
  checkedNodes?: Array<AntTreeNode>;
  selected?: boolean;
  selectedNodes?: Array<AntTreeNode>;
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
  defaultExpandedKeys?: Array<string>;
  /** （受控）展开指定的树节点 */
  expandedKeys?: Array<string>;
  /** （受控）选中复选框的树节点 */
  checkedKeys?: Array<string> | { checked: Array<string>, halfChecked: Array<string> };
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: Array<string>;
  /** （受控）设置选中的树节点 */
  selectedKeys?: Array<string>;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Array<string>;
  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: Array<string>, info: { node: AntTreeNode, expanded: boolean }) => void | PromiseLike<any>;
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: Array<string>, e: AntTreeNodeEvent) => void;
  /** 点击树节点触发 */
  onSelect?: (selectedKeys: Array<string>, e: AntTreeNodeEvent) => void;
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
    const { prefixCls, className, showLine } = props;
    let checkable = props.checkable;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    return (
      <RcTree
        {...props}
        className={classString}
        checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      >
        {this.props.children}
      </RcTree>
    );
  }
}
