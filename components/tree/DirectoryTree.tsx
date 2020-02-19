import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { conductExpandParent } from 'rc-tree/lib/util';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { convertDataToEntities, convertTreeToData } from 'rc-tree/lib/utils/treeUtil';
import { FileOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

import Tree, { TreeProps, AntdTreeNodeAttribute } from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps extends TreeProps {
  expandAction?: ExpandAction;
}

export interface DirectoryTreeState {
  expandedKeys?: string[];
  selectedKeys?: string[];
}

function getIcon(props: AntdTreeNodeAttribute): React.ReactNode {
  const { isLeaf, expanded } = props;
  if (isLeaf) {
    return <FileOutlined />;
  }
  return expanded ? <FolderOpenOutlined /> : <FolderOutlined />;
}

function getTreeData({ treeData, children }: DirectoryTreeProps) {
  return treeData || convertTreeToData(children);
}

class DirectoryTree extends React.Component<DirectoryTreeProps, DirectoryTreeState> {
  static defaultProps = {
    showIcon: true,
    expandAction: 'click',
  };

  static getDerivedStateFromProps(nextProps: DirectoryTreeProps) {
    const newState: DirectoryTreeState = {};
    if ('expandedKeys' in nextProps) {
      newState.expandedKeys = nextProps.expandedKeys;
    }
    if ('selectedKeys' in nextProps) {
      newState.selectedKeys = nextProps.selectedKeys;
    }
    return newState;
  }

  state: DirectoryTreeState;

  tree: Tree;

  onDebounceExpand: (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => void;

  // Shift click usage
  lastSelectedKey?: string;

  cachedSelectedKeys?: string[];

  constructor(props: DirectoryTreeProps) {
    super(props);

    const { defaultExpandAll, defaultExpandParent, expandedKeys, defaultExpandedKeys } = props;
    const { keyEntities } = convertDataToEntities(getTreeData(props));

    // Selected keys
    this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || [],
    };

    // Expanded keys
    if (defaultExpandAll) {
      this.state.expandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      this.state.expandedKeys = conductExpandParent(
        expandedKeys || defaultExpandedKeys,
        keyEntities,
      );
    } else {
      this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    this.onDebounceExpand = debounce(this.expandFolderNode, 200, {
      leading: true,
    });
  }

  onExpand = (
    expandedKeys: string[],
    info: {
      node: EventDataNode;
      expanded: boolean;
      nativeEvent: MouseEvent;
    },
  ) => {
    const { onExpand } = this.props;

    this.setUncontrolledState({ expandedKeys });

    // Call origin function
    if (onExpand) {
      return onExpand(expandedKeys, info);
    }

    return undefined;
  };

  onClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
    const { onClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'click') {
      this.onDebounceExpand(event, node);
    }

    if (onClick) {
      onClick(event, node);
    }
  };

  onDoubleClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
    const { onDoubleClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'doubleClick') {
      this.onDebounceExpand(event, node);
    }

    if (onDoubleClick) {
      onDoubleClick(event, node);
    }
  };

  onSelect = (
    keys: string[],
    event: {
      event: 'select';
      selected: boolean;
      node: any;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    },
  ) => {
    const { onSelect, multiple } = this.props;
    const { expandedKeys = [] } = this.state;
    const { node, nativeEvent } = event;
    const { eventKey = '' } = node.props;

    const treeData = getTreeData(this.props);
    const newState: DirectoryTreeState = {};

    // We need wrap this event since some value is not same
    const newEvent: any = {
      ...event,
      selected: true, // Directory selected always true
    };

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent.ctrlKey || nativeEvent.metaKey;
    const shiftPick: boolean = nativeEvent.shiftKey;

    // Generate new selected keys
    let newSelectedKeys: string[];
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(
        new Set([
          ...(this.cachedSelectedKeys || []),
          ...calcRangeKeys(treeData, expandedKeys, eventKey, this.lastSelectedKey),
        ]),
      );
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else {
      // Single click
      newSelectedKeys = [eventKey];
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
      newEvent.selectedNodes = [event.node.props.data];
    }
    newState.selectedKeys = newSelectedKeys;

    if (onSelect) {
      onSelect(newSelectedKeys, newEvent);
    }

    this.setUncontrolledState(newState);
  };

  setTreeRef = (node: Tree) => {
    this.tree = node;
  };

  expandFolderNode = (event: React.MouseEvent<HTMLElement>, node: any) => {
    const { isLeaf } = node;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    // Get internal rc-tree
    const internalTree = this.tree.tree;

    // Call internal rc-tree expand function
    // https://github.com/ant-design/ant-design/issues/12567
    internalTree.onNodeExpand(event, node);
  };

  setUncontrolledState = (state: DirectoryTreeState) => {
    const newState = omit(state, Object.keys(this.props));
    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  };

  renderDirectoryTree = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, ...props } = this.props;
    const { expandedKeys, selectedKeys } = this.state;

    const prefixCls = getPrefixCls('tree', customizePrefixCls);
    const connectClassName = classNames(`${prefixCls}-directory`, className, {
      [`${prefixCls}-directory-rtl`]: direction === 'rtl',
    });

    return (
      <Tree
        icon={getIcon}
        ref={this.setTreeRef}
        blockNode
        {...props}
        prefixCls={prefixCls}
        className={connectClassName}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onExpand={this.onExpand}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderDirectoryTree}</ConfigConsumer>;
  }
}

export default DirectoryTree;
