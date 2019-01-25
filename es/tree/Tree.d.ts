import * as React from 'react';
import DirectoryTree from './DirectoryTree';
import { ConfigConsumerProps } from '../config-provider';
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
export interface AntTreeNode extends React.Component<AntTreeNodeProps, {}> {
}
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
    event: React.MouseEventHandler<any>;
}
export interface AntTreeNodeDropEvent {
    node: AntTreeNode;
    dragNode: AntTreeNode;
    dragNodesKeys: string[];
    dropPosition: number;
    dropToGap?: boolean;
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
    checkedKeys?: string[] | {
        checked: string[];
        halfChecked: string[];
    };
    /** 默认选中复选框的树节点 */
    defaultCheckedKeys?: string[];
    /** （受控）设置选中的树节点 */
    selectedKeys?: string[];
    /** 默认选中的树节点 */
    defaultSelectedKeys?: string[];
    selectable?: boolean;
    /** 展开/收起节点时触发 */
    onExpand?: (expandedKeys: string[], info: AntTreeNodeExpandedEvent) => void | PromiseLike<any>;
    /** 点击复选框触发 */
    onCheck?: (checkedKeys: string[] | {
        checked: string[];
        halfChecked: string[];
    }, e: AntTreeNodeCheckedEvent) => void;
    /** 点击树节点触发 */
    onSelect?: (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => void;
    /** 单击树节点触发 */
    onClick?: (e: React.MouseEvent<HTMLElement>, node: AntTreeNode) => void;
    /** 双击树节点触发 */
    onDoubleClick?: (e: React.MouseEvent<HTMLElement>, node: AntTreeNode) => void;
    /** filter some AntTreeNodes as you need. it should return true */
    filterAntTreeNode?: (node: AntTreeNode) => boolean;
    /** 异步加载数据 */
    loadData?: (node: AntTreeNode) => PromiseLike<any>;
    loadedKeys?: string[];
    onLoaded?: (loadedKeys: string[], info: {
        event: 'load';
        node: AntTreeNode;
    }) => void;
    /** 响应右键点击 */
    onRightClick?: (options: AntTreeNodeMouseEvent) => void;
    /** 设置节点可拖拽（IE>8）*/
    draggable?: boolean;
    onDragStart?: (options: AntTreeNodeMouseEvent) => void;
    onDragEnter?: (options: AntTreeNodeMouseEvent) => void;
    onDragOver?: (options: AntTreeNodeMouseEvent) => void;
    onDragLeave?: (options: AntTreeNodeMouseEvent) => void;
    onDragEnd?: (options: AntTreeNodeMouseEvent) => void;
    onDrop?: (options: AntTreeNodeDropEvent) => void;
    style?: React.CSSProperties;
    showIcon?: boolean;
    icon?: (nodeProps: AntdTreeNodeAttribute) => React.ReactNode | React.ReactNode;
    switcherIcon?: React.ReactElement<any>;
    prefixCls?: string;
    filterTreeNode?: (node: AntTreeNode) => boolean;
    children?: React.ReactNode | React.ReactNode[];
}
export default class Tree extends React.Component<TreeProps, any> {
    static TreeNode: React.ComponentClass<AntTreeNodeProps>;
    static DirectoryTree: typeof DirectoryTree;
    static defaultProps: {
        checkable: boolean;
        showIcon: boolean;
        openAnimation: {
            appear: null;
            enter(node: HTMLElement, done: () => void): any;
            leave(node: HTMLElement, done: () => void): any;
        };
    };
    tree: any;
    renderSwitcherIcon: (prefixCls: string, switcherIcon: React.ReactElement<any> | undefined, { isLeaf, expanded, loading }: AntTreeNodeProps) => React.ReactElement<any> | null;
    setTreeRef: (node: any) => void;
    renderTree: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
