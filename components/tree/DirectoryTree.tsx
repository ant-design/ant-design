import FileOutlined from '@ant-design/icons/FileOutlined';
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import classNames from 'classnames';
import type RcTree from 'rc-tree';
import type { BasicDataNode } from 'rc-tree';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { conductExpandParent } from 'rc-tree/lib/util';
import { convertDataToEntities, convertTreeToData } from 'rc-tree/lib/utils/treeUtil';
import * as React from 'react';
import { ConfigContext } from '../config-provider';

import type { AntdTreeNodeAttribute, TreeProps } from './Tree';
import Tree from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps<T extends BasicDataNode = DataNode> extends TreeProps<T> {
  expandAction?: ExpandAction;
}

type DirectoryTreeCompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<DirectoryTreeProps<T>> & { ref?: React.Ref<RcTree> },
) => React.ReactElement) & {
  displayName?: string;
};

export interface DirectoryTreeState {
  expandedKeys?: Key[];
  selectedKeys?: Key[];
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

const DirectoryTree: React.ForwardRefRenderFunction<RcTree, DirectoryTreeProps> = (
  { defaultExpandAll, defaultExpandParent, defaultExpandedKeys, ...props },
  ref,
) => {
  // Shift click usage
  const lastSelectedKey = React.useRef<Key>();

  const cachedSelectedKeys = React.useRef<Key[]>();

  const getInitExpandedKeys = () => {
    const { keyEntities } = convertDataToEntities(getTreeData(props));

    let initExpandedKeys: Key[];

    // Expanded keys
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(
        props.expandedKeys || defaultExpandedKeys || [],
        keyEntities,
      );
    } else {
      initExpandedKeys = (props.expandedKeys || defaultExpandedKeys)!;
    }
    return initExpandedKeys;
  };

  const [selectedKeys, setSelectedKeys] = React.useState(
    props.selectedKeys || props.defaultSelectedKeys || [],
  );
  const [expandedKeys, setExpandedKeys] = React.useState(() => getInitExpandedKeys());

  React.useEffect(() => {
    if ('selectedKeys' in props) {
      setSelectedKeys(props.selectedKeys!);
    }
  }, [props.selectedKeys]);

  React.useEffect(() => {
    if ('expandedKeys' in props) {
      setExpandedKeys(props.expandedKeys!);
    }
  }, [props.expandedKeys]);

  const onExpand = (
    keys: Key[],
    info: {
      node: EventDataNode<any>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    },
  ) => {
    if (!('expandedKeys' in props)) {
      setExpandedKeys(keys);
    }
    // Call origin function
    return props.onExpand?.(keys, info);
  };

  const onSelect = (
    keys: Key[],
    event: {
      event: 'select';
      selected: boolean;
      node: any;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    },
  ) => {
    const { multiple } = props;
    const { node, nativeEvent } = event;
    const { key = '' } = node;

    const treeData = getTreeData(props);
    // const newState: DirectoryTreeState = {};

    // We need wrap this event since some value is not same
    const newEvent: any = {
      ...event,
      selected: true, // Directory selected always true
    };

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent?.ctrlKey || nativeEvent?.metaKey;
    const shiftPick: boolean = nativeEvent?.shiftKey;

    // Generate new selected keys
    let newSelectedKeys: Key[];
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(
        new Set([
          ...(cachedSelectedKeys.current || []),
          ...calcRangeKeys({
            treeData,
            expandedKeys,
            startKey: key,
            endKey: lastSelectedKey.current,
          }),
        ]),
      );
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else {
      // Single click
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    }

    props.onSelect?.(newSelectedKeys, newEvent);
    if (!('selectedKeys' in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = true,
    expandAction = 'click',
    ...otherProps
  } = props;

  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  const connectClassName = classNames(
    `${prefixCls}-directory`,
    {
      [`${prefixCls}-directory-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <Tree
      icon={getIcon}
      ref={ref}
      blockNode
      {...otherProps}
      showIcon={showIcon}
      expandAction={expandAction}
      prefixCls={prefixCls}
      className={connectClassName}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onExpand={onExpand}
    />
  );
};

const ForwardDirectoryTree = React.forwardRef(
  DirectoryTree,
) as unknown as DirectoryTreeCompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  ForwardDirectoryTree.displayName = 'DirectoryTree';
}

export default ForwardDirectoryTree;
