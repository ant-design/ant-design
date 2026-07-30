import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Tree } from 'antd';
import type { GetRef, TreeDataNode } from 'antd';

const ROOT_KEY = 'root';
const TARGET_KEY = 'root-nested';

const treeData: TreeDataNode[] = [
  {
    key: ROOT_KEY,
    title: 'Root',
    children: Array.from({ length: 20 }, (_, index) =>
      index === 12
        ? {
            key: TARGET_KEY,
            title: 'Nested Node',
            children: [
              {
                key: `${TARGET_KEY}-0`,
                title: 'Nested Node 0',
                children: [{ key: `${TARGET_KEY}-0-0`, title: 'Nested Node 0-0' }],
              },
              { key: `${TARGET_KEY}-1`, title: 'Nested Node 1' },
            ],
          }
        : {
            key: `${ROOT_KEY}-${index}`,
            title: `Node ${index}`,
          },
    ),
  },
];

interface TreeGroupProps {
  resetAll: () => void;
}

const TreeGroup: React.FC<TreeGroupProps> = ({ resetAll }) => {
  const controlledRef = useRef<GetRef<typeof Tree>>(null);
  const uncontrolledRef = useRef<GetRef<typeof Tree>>(null);
  const pendingScrollRef = useRef(false);
  const [virtual, setVirtual] = useState(true);
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
    setExpandedKeys((currentKeys) => [
      ...new Set([...currentKeys, ...getPath(TARGET_KEY).map((entity) => entity.key)]),
    ]);
    uncontrolledRef.current?.scrollTo({ key: TARGET_KEY, align: 'top', autoExpand: true });
  };

  const treeProps = {
    height: 200,
    treeData,
    virtual,
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <Checkbox checked={virtual} onChange={(event) => setVirtual(event.target.checked)}>
          Virtual
        </Checkbox>
        <Button onClick={resetAll}>resetAll</Button>
        <Button onClick={scrollTo}>scrollTo</Button>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
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

const App: React.FC = () => {
  const [id, setId] = useState(0);

  return (
    <div key={id}>
      <TreeGroup resetAll={() => setId((current) => current + 1)} />
    </div>
  );
};

export default App;
