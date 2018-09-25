import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { conductExpandParent, convertTreeToEntities } from 'rc-tree/lib/util';

import Tree, {
  TreeProps, AntdTreeNodeAttribute,
  AntTreeNodeExpandedEvent, AntTreeNodeSelectedEvent, AntTreeNode,
} from './Tree';
import { calcRangeKeys, getFullKeyList } from './util';
import Icon from '../icon';

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
    return <Icon type="file" />;
  }
  return <Icon type={expanded ? 'folder-open' : 'folder'} />;
}

export default class DirectoryTree extends React.Component<DirectoryTreeProps, DirectoryTreeState> {
  static defaultProps = {
    prefixCls: 'ant-tree',
    showIcon: true,
    expandAction: 'click',
  };

  state: DirectoryTreeState;
  onDebounceExpand: (event: React.MouseEvent<HTMLElement>, node: AntTreeNode) => void;

  // Shift click usage
  lastSelectedKey?: string;
  cachedSelectedKeys?: string[];

  constructor(props: DirectoryTreeProps) {
    super(props);

    const { defaultExpandAll, defaultExpandParent, expandedKeys, defaultExpandedKeys, children } = props;
    const { keyEntities } = convertTreeToEntities(children);

    // Selected keys
    this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || [],
    };

    // Expanded keys
    if (defaultExpandAll) {
      this.state.expandedKeys = getFullKeyList(props.children);
    } else if (defaultExpandParent) {
      this.state.expandedKeys = conductExpandParent(expandedKeys || defaultExpandedKeys, keyEntities);
    } else {
      this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    this.onDebounceExpand = debounce(this.expandFolderNode, 200, {
      leading: true,
    });
  }

  componentWillReceiveProps(nextProps: DirectoryTreeProps) {
    if ('expandedKeys' in nextProps) {
      this.setState({ expandedKeys: nextProps.expandedKeys });
    }
    if ('selectedKeys' in nextProps) {
      this.setState({ selectedKeys: nextProps.selectedKeys });
    }
  }

  onExpand = (expandedKeys: string[], info: AntTreeNodeExpandedEvent) => {
    const { onExpand } = this.props;

    this.setUncontrolledState({ expandedKeys });

    // Call origin function
    if (onExpand) {
      return onExpand(expandedKeys, info);
    }

    return undefined;
  }

  onClick = (event: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { onClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'click') {
      this.onDebounceExpand(event, node);
    }

    if (onClick) {
      onClick(event, node);
    }
  }

  onDoubleClick = (event: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { onDoubleClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'doubleClick') {
      this.onDebounceExpand(event, node);
    }

    if (onDoubleClick) {
      onDoubleClick(event, node);
    }
  }

  onSelect = (keys: string[], event: AntTreeNodeSelectedEvent) => {
    const { onSelect, multiple, children } = this.props;
    const { expandedKeys = [], selectedKeys = [] } = this.state;
    const { node, nativeEvent } = event;
    const { eventKey = '' } = node.props;

    const newState: DirectoryTreeState = {};

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent.ctrlKey || nativeEvent.metaKey;
    const shiftPick: boolean = nativeEvent.shiftKey;

    // Generate new selected keys
    let newSelectedKeys = selectedKeys.slice();
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(new Set([
        ...this.cachedSelectedKeys || [],
        ...calcRangeKeys(children, expandedKeys, eventKey, this.lastSelectedKey),
      ]));
    } else {
      // Single click
      newSelectedKeys = [eventKey];
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    }
    newState.selectedKeys = newSelectedKeys;

    if (onSelect) {
      onSelect(newSelectedKeys, event);
    }

    this.setUncontrolledState(newState);
  }

  expandFolderNode = (event: React.MouseEvent<HTMLElement>, node: AntTreeNode) => {
    const { expandedKeys = [] } = this.state;
    const { onExpand } = this.props;
    const { eventKey = '', expanded, isLeaf } = node.props;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    let newExpandedKeys: string[] = expandedKeys.slice();
    const index = newExpandedKeys.indexOf(eventKey);

    if (expanded && index >= 0) {
      newExpandedKeys.splice(index, 1);
    } else if (!expanded && index === -1) {
      newExpandedKeys.push(eventKey);
    }

    this.setUncontrolledState({
      expandedKeys: newExpandedKeys,
    });

    if (onExpand) {
      onExpand(newExpandedKeys, {
        expanded: !expanded,
        node,
        nativeEvent: event.nativeEvent,
      });
    }
  }

  setUncontrolledState = (state: DirectoryTreeState) => {
    const newState = omit(state, Object.keys(this.props));
    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  }

  render() {
    const { prefixCls, className, ...props } = this.props;
    const { expandedKeys, selectedKeys } = this.state;

    const connectClassName = classNames(`${prefixCls}-directory`, className);

    return (
      <Tree
        icon={getIcon}
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
  }
}
