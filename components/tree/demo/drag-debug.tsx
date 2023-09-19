/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { CarryOutOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd';
import { Switch, Tree } from 'antd';
import type { DataNode } from 'rc-tree/lib/interface';

const x = 3;
const y = 2;
const z = 1;
const data: DataNode[] = [];

const generateData = (_level: number, preKey = '0', tns = data): DataNode[] | void => {
  const children: string[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, icon: <CarryOutOutlined /> });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);

const App: React.FC = () => {
  const [gData, setGData] = React.useState<DataNode[]>(data);
  const [showLine, setShowLine] = React.useState<any>(true);
  const [showIcon, setShowIcon] = React.useState<boolean>(true);
  const [showLeafIcon, setShowLeafIcon] = React.useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>(['0-0', '0-0-0', '0-0-0-0']);

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    setExpandedKeys(info.expandedKeys);
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key as number;
    const dragKey = info.dragNode.key as number;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: number,
      callback: (item: DataNode, index: number, err: DataNode[]) => void,
    ): void => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the end of the array in this example, but can be anywhere
        item.children.push(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: DataNode[];
      let i: number;
      loop(data, dropKey, (_, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar!.splice(i!, 0, dragObj!);
      } else {
        ar!.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  const innerSetShowLine = (showLine: boolean) => {
    if (showLine) {
      if (showLeafIcon) {
        setShowLine({ showLeafIcon: true });
      } else {
        setShowLine(true);
      }
    } else {
      setShowLine(false);
    }
  };

  const innerSetShowLeafIcon = (showLeafIcon: boolean) => {
    setShowLeafIcon(showLeafIcon);
    setShowLine({ showLeafIcon });
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        showLine: <Switch checked={showLine} onChange={innerSetShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={() => setShowIcon(showIcon)} />
        <br />
        <br />
        showLeafIcon: <Switch checked={showLeafIcon} onChange={innerSetShowLeafIcon} />
      </div>
      <Tree
        showLine={showLine}
        showIcon={showIcon}
        className="draggable-tree"
        defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
      />
    </>
  );
};

export default App;
