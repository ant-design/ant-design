import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import classNames from 'classnames';
import DirectoryTree from './DirectoryTree';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import collapseMotion from '../_util/motion';

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
  selectedNodes?: AntTreeNode[];
}

export interface AntTreeNodeExpandedEvent extends AntTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface AntTreeNodeMouseEvent {
  node: AntTreeNode;
  event: React.MouseEvent<HTMLElement>;
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

export interface TreeProps {
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
  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: string[], info: AntTreeNodeExpandedEvent) => void | PromiseLike<void>;
  /** 点击复选框触发 */
  onCheck?: (
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] },
    e: AntTreeNodeCheckedEvent,
  ) => void;
  /** 点击树节点触发 */
  onSelect?: (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => void;
  /** 单击树节点触发 */
  onClick?: (e: React.MouseEvent<HTMLElement>, node: AntTreeNode) => void;
  /** 双击树节点触发 */
  onDoubleClick?: (e: React.MouseEvent<HTMLElement>, node: AntTreeNode) => void;
  /** filter some AntTreeNodes as you need. it should return true */
  filterAntTreeNode?: (node: AntTreeNode) => boolean;
  /** 异步加载数据 */
  loadData?: (node: AntTreeNode) => PromiseLike<void>;
  loadedKeys?: string[];
  onLoad?: (loadedKeys: string[], info: { event: 'load'; node: AntTreeNode }) => void;
  /** 响应右键点击 */
  onRightClick?: (options: AntTreeNodeMouseEvent) => void;
  /** 设置节点可拖拽（IE>8） */
  draggable?: boolean;
  onDragStart?: (options: AntTreeNodeMouseEvent) => void;
  onDragEnter?: (options: AntTreeNodeDragEnterEvent) => void;
  onDragOver?: (options: AntTreeNodeMouseEvent) => void;
  onDragLeave?: (options: AntTreeNodeMouseEvent) => void;
  onDragEnd?: (options: AntTreeNodeMouseEvent) => void;
  onMouseEnter?: (options: AntTreeNodeMouseEvent) => void;
  onMouseLeave?: (options: AntTreeNodeMouseEvent) => void;
  onDrop?: (options: AntTreeNodeDropEvent) => void;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: AntdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  switcherIcon?: React.ReactElement<any>;
  prefixCls?: string;
  filterTreeNode?: (node: AntTreeNode) => boolean;
  children?: React.ReactNode;
  blockNode?: boolean;
  treeData?: Array<TreeNodeNormal>;
}

export default class Tree extends React.Component<TreeProps, any> {
  static TreeNode: React.ComponentClass<AntTreeNodeProps> = TreeNode;

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

  renderSwitcherIcon = (
    prefixCls: string,
    switcherIcon: React.ReactElement<any> | undefined,
    { isLeaf, expanded, loading }: AntTreeNodeProps,
  ) => {
    const { showLine } = this.props;
    if (loading) {
      return <Icon type="loading" className={`${prefixCls}-switcher-loading-icon`} />;
    }
    if (isLeaf) {
      if (showLine) {
        return <Icon type="file" className={`${prefixCls}-switcher-line-icon`} />;
      }
      return null;
    }
    const switcherCls = `${prefixCls}-switcher-icon`;
    if (switcherIcon) {
      const switcherOriginCls = switcherIcon.props.className || '';
      return React.cloneElement(switcherIcon, {
        className: classNames(switcherOriginCls, switcherCls),
      });
    }
    if (showLine) {
      return (
        <Icon
          type={expanded ? 'minus-square' : 'plus-square'}
          className={`${prefixCls}-switcher-line-icon`}
          theme="outlined"
        />
      );
    }
    return <Icon type="caret-down" className={switcherCls} theme="filled" />;
  };

  setTreeRef = (node: any) => {
    this.tree = node;
  };

  renderTree = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      showIcon,
      switcherIcon,
      blockNode,
      children,
    } = props;
    const { checkable } = props;
    const prefixCls = getPrefixCls('tree', customizePrefixCls);
    return (
      <RcTree
        ref={this.setTreeRef}
        {...props}
        prefixCls={prefixCls}
        className={classNames(className, {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode,
        })}
        checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
        switcherIcon={(nodeProps: AntTreeNodeProps) =>
          this.renderSwitcherIcon(prefixCls, switcherIcon, nodeProps)
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
