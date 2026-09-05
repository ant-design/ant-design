import * as React from 'react';
import FileOutlined from '@ant-design/icons/FileOutlined';
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import { conductExpandParent, convertDataToEntities, convertTreeToData } from '@rc-component/tree';
import type RcTree from '@rc-component/tree';
import type { BasicDataNode, DataNode, EventDataNode } from '@rc-component/tree';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import { isHTMLElement } from '../_util/is';
import { ConfigContext } from '../config-provider';
import type { AntdTreeNodeAttribute, TreeProps } from './Tree';
import Tree from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeFileDropInfo<T extends BasicDataNode = DataNode> {
  event: React.DragEvent<HTMLDivElement>;
  node: T;
  files: FileList;
}

export interface DirectoryTreeProps<T extends BasicDataNode = DataNode> extends TreeProps<T> {
  allowFileDrop?: boolean;
  expandAction?: ExpandAction;
  onFileDrop?: (info: DirectoryTreeFileDropInfo<T>) => void;
}

type DirectoryTreeCompoundedComponent = (<T extends BasicDataNode | DataNode = DataNode>(
  props: React.PropsWithChildren<DirectoryTreeProps<T>> & React.RefAttributes<RcTree>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;

export interface DirectoryTreeState {
  expandedKeys?: React.Key[];
  selectedKeys?: React.Key[];
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
  const { defaultExpandAll, defaultExpandParent = true, defaultExpandedKeys, ...props } = oriProps;

  // Shift click usage
  const lastSelectedKeyRef = React.useRef<React.Key>(null);

  const cachedSelectedKeysRef = React.useRef<React.Key[]>(null);

  const getInitExpandedKeys = () => {
    const { keyEntities } = convertDataToEntities(getTreeData(props), {
      fieldNames: props.fieldNames,
    });

    let initExpandedKeys: React.Key[];
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

  const [selectedKeys, setSelectedKeys] = useControlledState<React.Key[]>(
    props.defaultSelectedKeys || [],
    props.selectedKeys,
  );

  const [expandedKeys, setExpandedKeys] = useControlledState<React.Key[]>(
    getInitExpandedKeys,
    props.expandedKeys,
  );

  const rootRef = React.useRef<HTMLDivElement>(null);
  const fileDropNodesRef = React.useRef(new WeakMap<HTMLElement, DataNode>());
  const [fileDropNode, setFileDropNode] = React.useState<DataNode | null>(null);

  const onExpand = (
    keys: React.Key[],
    info: {
      node: EventDataNode<any>;
      expanded: boolean;
      nativeEvent: MouseEvent;
    },
  ) => {
    setExpandedKeys(keys);
    // Call origin function
    return props.onExpand?.(keys, info);
  };

  const onSelect = (
    keys: React.Key[],
    event: {
      event: 'select';
      selected: boolean;
      node: EventDataNode<DataNode>;
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
    let newSelectedKeys: React.Key[];
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
    setSelectedKeys(newSelectedKeys);
  };
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const {
    allowFileDrop = false,
    prefixCls: customizePrefixCls,
    className,
    showIcon = true,
    expandAction = 'click',
    onFileDrop: onFileDropCallback,
    titleRender,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  const titleField = props.fieldNames?.title ?? 'title';

  const connectClassName = clsx(
    `${prefixCls}-directory`,
    {
      [`${prefixCls}-directory-rtl`]: direction === 'rtl',
    },
    className,
  );

  const getFileDropNode = (target: EventTarget | null) => {
    let element = isHTMLElement(target) ? target : null;

    while (element && element !== rootRef.current) {
      const node = fileDropNodesRef.current.get(element);
      if (node) {
        return node;
      }
      element = element.parentElement;
    }

    return null;
  };

  const isFileDrag = (event: React.DragEvent<HTMLDivElement>) =>
    Array.from(event.dataTransfer.types).includes('Files') || event.dataTransfer.files.length > 0;

  const onFileDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    setFileDropNode(getFileDropNode(event.target));
  };

  const onFileDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setFileDropNode(null);
    }
  };

  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const node = getFileDropNode(event.target);
    setFileDropNode(null);

    if (node && event.dataTransfer.files.length > 0) {
      onFileDropCallback?.({ event, node, files: event.dataTransfer.files });
    }
  };

  const renderFileDropTitle = (node: DataNode) => (
    <span
      className={clsx(`${prefixCls}-file-drop-target`, {
        [`${prefixCls}-file-drop-target-active`]: fileDropNode === node,
      })}
      ref={(element) => {
        if (element) {
          fileDropNodesRef.current.set(element, node);
        }
      }}
    >
      {titleRender ? titleRender(node) : (Reflect.get(node, titleField) as React.ReactNode)}
    </span>
  );

  const treeNode = (
    <Tree
      icon={getIcon}
      ref={ref}
      blockNode
      {...restProps}
      draggable={allowFileDrop ? false : restProps.draggable}
      showIcon={showIcon}
      expandAction={expandAction}
      prefixCls={prefixCls}
      className={connectClassName}
      defaultExpandParent={defaultExpandParent}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onExpand={onExpand}
      titleRender={allowFileDrop ? renderFileDropTitle : titleRender}
    />
  );

  if (allowFileDrop) {
    return (
      <div
        ref={rootRef}
        className={`${prefixCls}-directory-file-drop`}
        onDragOver={onFileDragOver}
        onDragLeave={onFileDragLeave}
        onDrop={onFileDrop}
      >
        {treeNode}
      </div>
    );
  }

  return treeNode;
}) as DirectoryTreeCompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  DirectoryTree.displayName = 'DirectoryTree';
}

export default DirectoryTree;
