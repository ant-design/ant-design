import React, { useEffect, useRef, useState } from 'react';
import { Button, Tree } from 'antd';
import type { GetRef, TreeDataNode } from 'antd';

const ROOT_KEY = 'root';
const TARGET_KEY = 'root-nested';

const treeData: TreeDataNode[] = [
  {
    key: ROOT_KEY,
    title: 'Root',
    children: Array.from({ length: 20 }, (_, index) => ({
      key: index === 12 ? TARGET_KEY : `${ROOT_KEY}-${index}`,
      title: index === 12 ? 'Nested Node' : `Node ${index}`,
      children: index === 12 ? [{ key: `${TARGET_KEY}-0`, title: 'Nested Node Child' }] : undefined,
    })),
  },
];

const App: React.FC = () => {
  const controlledRef = useRef<GetRef<typeof Tree>>(null);
  const uncontrolledRef = useRef<GetRef<typeof Tree>>(null);
  const pendingScrollRef = useRef(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([ROOT_KEY]);
  const { getPath } = Tree.useTree(treeData, {});

  useEffect(() => {
    if (pendingScrollRef.current) {
      pendingScrollRef.current = false;
      controlledRef.current?.scrollTo({ key: TARGET_KEY, align: 'top' });
    }
  }, [expandedKeys]);

  const scrollTo = () => {
    pendingScrollRef.current = true;
    setExpandedKeys(getPath(TARGET_KEY).map(({ key }) => key));
    uncontrolledRef.current?.scrollTo({ key: TARGET_KEY, align: 'top', autoExpand: true });
  };

  const treeProps = {
    height: 200,
    treeData,
  };

  return (
    <>
      <Button onClick={scrollTo}>scrollTo</Button>
      <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>Controlled</h3>
          <Tree
            {...treeProps}
            ref={controlledRef}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3>Uncontrolled</h3>
          <Tree {...treeProps} ref={uncontrolledRef} defaultExpandedKeys={[ROOT_KEY]} />
        </div>
      </div>
    </>
  );
};

export default App;
