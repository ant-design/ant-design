import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import Tree, { TreeProps, AntdTreeNodeAttribute, AntTreeNodeEvent, AntTreeNode } from './Tree';
import Icon from '../icon';

function getIcon(props: AntdTreeNodeAttribute): React.ReactNode {
  const { isLeaf, expanded } = props;
  if (isLeaf) {
    return <Icon type="file" />;
  }
  return <Icon type={expanded ? 'folder-open' : 'folder'} />;
}

export interface DirectoryTreeProps extends TreeProps {
  contextMenu?: (props: AntdTreeNodeAttribute) => React.ReactNode;
}

export interface DirectoryTreeState {
  expandedKeys?: string[];
  selectedKeys?: string[];
}

export default class DirectoryTree extends React.Component<DirectoryTreeProps, DirectoryTreeState> {
  static defaultProps = {
    prefixCls: 'ant-tree',
    showIcon: true,
  };

  state: DirectoryTreeState;

  constructor(props: DirectoryTreeProps) {
    super(props);

    this.state = {
      expandedKeys: props.expandedKeys || props.defaultExpandedKeys || [],
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || [],
    };
  }

  componentWillReceiveProps(nextProps: DirectoryTreeProps) {
    if ('expandedKeys' in nextProps) {
      this.setState({ expandedKeys: nextProps.expandedKeys });
    }
    if ('selectedKeys' in nextProps) {
      this.setState({ selectedKeys: nextProps.selectedKeys });
    }
  }

  onExpand = (expandedKeys: string[], info: { node: AntTreeNode; expanded: boolean; }) => {
    const { onExpand } = this.props;

    this.setUncontrolledState({ expandedKeys });

    // Call origin function
    if (onExpand) {
      return onExpand(expandedKeys, info);
    }
    return undefined;
  }

  onSelect = (keys: string[], event: AntTreeNodeEvent) => {
    const { onSelect, multiple } = this.props;
    const { expandedKeys = [], selectedKeys = [] } = this.state;
    const { node, nativeEvent = { ctrlKey: false, metaKey: false } } = event;
    const { isLeaf, eventKey = '', expanded } = node.props;

    const newState: DirectoryTreeState = {};

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent.ctrlKey || nativeEvent.metaKey;

    // Generate new selected keys
    let newSelectedKeys = selectedKeys.slice();
    if (multiple && ctrlPick) {
      newSelectedKeys = keys;
    } else {
      newSelectedKeys = [eventKey];
    }
    newState.selectedKeys = newSelectedKeys;

    if (onSelect) {
      onSelect(newSelectedKeys, event);
    }

    // Trigger `onExpand`
    if (!isLeaf) {
      let newExpandedKeys: string[] = expandedKeys.slice();
      const index = newExpandedKeys.indexOf(eventKey);
      if (expanded && index >= 0) {
        newExpandedKeys.splice(index, 1);
      } else if (!expanded && index === -1) {
        newExpandedKeys.push(eventKey);
      }
      newState.expandedKeys = newExpandedKeys;
    }

    this.setUncontrolledState(newState);
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
        onExpand={this.onExpand}
      />
    );
  }
}
