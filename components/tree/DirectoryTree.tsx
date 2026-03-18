import * as React from 'react';
import FileOutlined from '@ant-design/icons/FileOutlined';
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import type RcTree from '@rc-component/tree';
import type { BasicDataNode } from '@rc-component/tree';
import type { DataNode, EventDataNode, Key } from '@rc-component/tree/lib/interface';
import { conductExpandParent } from '@rc-component/tree/lib/util';
import { convertDataToEntities, convertTreeToData } from '@rc-component/tree/lib/utils/treeUtil';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import type { AntdTreeNodeAttribute, TreeProps } from './Tree';
import Tree from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps<T extends BasicDataNode = DataNode> extends TreeProps<T> {
  expandAction?: ExpandAction;
}

type DirectoryTreeCompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<DirectoryTreeProps<T>> & React.RefAttributes<RcTree>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;

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

const DirectoryTree = React.forwardRef<RcTree, DirectoryTreeProps>((oriProps, ref) => {
  const { defaultExpandAll, defaultExpandParent, defaultExpandedKeys, ...props } = oriProps;

  // Shift click usage
  const lastSelectedKeyRef = React.useRef<Key>(null);

  const cachedSelectedKeysRef = React.useRef<Key[]>(null);

  const getInitExpandedKeys = () => {
    const { keyEntities } = convertDataToEntities(getTreeData(props), {
      fieldNames: props.fieldNames,
    });

    let initExpandedKeys: Key[];
    const mergedExpandedKeys = props.expandedKeys || defaultExpandedKeys || [];

    // Expanded keys
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(mergedExpandedKeys, keyEntities);
    } else {
      initExpandedKeys = mergedExpandedKeys;
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
    const { multiple, fieldNames } = props;
    const { node, nativeEvent } = event;
    const { key = '' } = node;

    const treeData = getTreeData(props);

    // We need wrap this event since some value is not same
    const newEvent = {
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
      lastSelectedKeyRef.current = key;
      cachedSelectedKeysRef.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(
        new Set([
          ...(cachedSelectedKeysRef.current || []),
          ...calcRangeKeys({
            treeData,
            expandedKeys,
            startKey: key,
            endKey: lastSelectedKeyRef.current!,
            fieldNames,
          }),
        ]),
      );
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else {
      // Single click
      newSelectedKeys = [key];
      lastSelectedKeyRef.current = key;
      cachedSelectedKeysRef.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
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
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('tree', customizePrefixCls);

  const connectClassName = clsx(
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
      {...restProps}
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
}) as DirectoryTreeCompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  DirectoryTree.displayName = 'DirectoryTree';
}

export default DirectoryTree;
