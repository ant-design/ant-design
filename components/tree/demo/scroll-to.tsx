import React, { useRef, useState } from 'react';
import { Button, Flex, Tree } from 'antd';
import type { GetRef, TreeDataNode } from 'antd';

const TARGET_KEY = '0-1-1-1-1';

const createTree = (key = '0', level = 1): TreeDataNode => ({
  key,
  title: key,
  children: level < 5 ? [0, 1].map((index) => createTree(`${key}-${index}`, level + 1)) : undefined,
});

const treeData = [createTree()];

const App: React.FC = () => {
  const treeRef = useRef<GetRef<typeof Tree>>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const { getPath } = Tree.useTree(treeData, {});

  const scrollTo = () => {
    setExpandedKeys(getPath(TARGET_KEY).map(({ key }) => key));
    treeRef.current?.scrollTo({ key: TARGET_KEY, align: 'top' });
  };

  return (
    <Flex vertical gap="small">
      <Button onClick={scrollTo}>scrollTo: {TARGET_KEY}</Button>
      <Tree
        ref={treeRef}
        height={200}
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={setExpandedKeys}
      />
    </Flex>
  );
};

export default App;
