import * as React from 'react';
import classNames from 'classnames';
import RcTree from 'rc-tree';
import debounce from 'lodash/debounce';
import { conductExpandParent } from 'rc-tree/lib/util';
import { EventDataNode, DataNode, Key } from 'rc-tree/lib/interface';
import { convertDataToEntities, convertTreeToData } from 'rc-tree/lib/utils/treeUtil';
import FileOutlined from '@ant-design/icons/FileOutlined';
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import { ConfigContext } from '../config-provider';

import Tree, { TreeProps, AntdTreeNodeAttribute, AntTreeNodeMouseEventParams } from './Tree';
import { calcRangeKeys, convertDirectoryKeysToNodes } from './utils/dictUtil';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps extends TreeProps {
  expandAction?: ExpandAction;
}

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

  const treeRef = React.createRef<RcTree>();

  React.useImperativeHandle(ref, () => treeRef.current!);

  const getInitExpandedKeys = () => {
    const { keyEntities } = convertDataToEntities(getTreeData(props));

    let initExpandedKeys: any;

    // Expanded keys
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(
        props.expandedKeys || defaultExpandedKeys,
        keyEntities,
      );
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys;
    }
    return initExpandedKeys;
  };

  const [selectedKeys, setSelectedKeys] = React.useState(
    props.selectedKeys || props.defaultSelectedKeys || [],
  );
  const [expandedKeys, setExpandedKeys] = React.useState(getInitExpandedKeys());

  React.useEffect(() => {
    if ('selectedKeys' in props) {
      setSelectedKeys(props.selectedKeys!);
    }
  }, [props.selectedKeys]);

  React.useEffect(() => {
    if ('expandedKeys' in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);

  const expandFolderNode = (event: React.MouseEvent<HTMLElement>, node: any) => {
    const { isLeaf } = node;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    // Call internal rc-tree expand function
    // https://github.com/ant-design/ant-design/issues/12567
    treeRef.current!.onNodeExpand(event as any, node);
  };

  const onDebounceExpand = debounce(expandFolderNode, 200, {
    leading: true,
  });
  const onExpand = (
    keys: Key[],
    info: {
      node: EventDataNode;
      expanded: boolean;
      nativeEvent: MouseEvent;
    },
  ) => {
    if (!('expandedKeys' in props)) {
      setExpandedKeys(keys);
    }
    // Call origin function
    if (props.onExpand) {
      return props.onExpand(keys, info);
    }

    return undefined;
  };

  const onClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
    const { expandAction } = props;

    // Expand the tree
    if (expandAction === 'click') {
      onDebounceExpand(event, node);
    }

    if (props.onClick) {
      props.onClick(event, node);
    }
  };

  const onMouseEnter = (info: AntTreeNodeMouseEventParams<HTMLSpanElement>) => {
    if (props.onMouseEnter) {
      props.onMouseEnter(info);
    }
  };

  const onMouseLeave = (info: AntTreeNodeMouseEventParams<HTMLSpanElement>) => {
    if (props.onMouseLeave) {
      props.onMouseLeave(info);
    }
  };

  const onDoubleClick = (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => {
    const { expandAction } = props;

    // Expand the tree
    if (expandAction === 'doubleClick') {
      onDebounceExpand(event, node);
    }

    if (props.onDoubleClick) {
      props.onDoubleClick(event, node);
    }
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
    const ctrlPick: boolean = nativeEvent.ctrlKey || nativeEvent.metaKey;
    const shiftPick: boolean = nativeEvent.shiftKey;

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

    if (props.onSelect) {
      props.onSelect(newSelectedKeys, newEvent);
    }
    if (!('selectedKeys' in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, className, ...otherProps } = props;

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
      ref={treeRef}
      blockNode
      {...otherProps}
      prefixCls={prefixCls}
      className={connectClassName}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onExpand={onExpand}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

const ForwardDirectoryTree = React.forwardRef(DirectoryTree);
ForwardDirectoryTree.displayName = 'DirectoryTree';

ForwardDirectoryTree.defaultProps = {
  showIcon: true,
  expandAction: 'click' as DirectoryTreeProps['expandAction'],
};

export default ForwardDirectoryTree;
