"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[381],{62153:function(c,a,t){t.r(a);var p=t(2143),Z=t(50250),v=t(59378),h=t(78190),d=t(74775),l=t(5937),_=t(2068),m=t(74399),f=t(46004),y=t(35708),x=t(30138),k=t(56140),o=t(5388),g=t(49545),D=t(92169),E=t(13140),O=t(95127),K=t(74418),w=t(97119),u=t(28257),i=t(67294),n=t(13946);function r(){var s=(0,u.eL)(),e=s.texts;return(0,n.tZ)(u.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value,(0,n.tZ)("code",null,e[2].value),e[3].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(o.Z,{items:[{demo:{id:"components-tree-demo-basic"},previewerProps:{title:"\u57FA\u672C",filename:"components/tree/demo/basic.tsx",jsx:`import React from 'react';
import { Tree } from 'antd';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
const App = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};
export default App;
`,description:"<p>\u6700\u7B80\u5355\u7684\u7528\u6CD5\uFF0C\u5C55\u793A\u53EF\u52FE\u9009\uFF0C\u53EF\u9009\u4E2D\uFF0C\u7981\u7528\uFF0C\u9ED8\u8BA4\u5C55\u5F00\u7B49\u529F\u80FD\u3002</p>"}},{demo:{id:"components-tree-demo-basic-controlled"},previewerProps:{title:"\u53D7\u63A7\u64CD\u4F5C\u793A\u4F8B",filename:"components/tree/demo/basic-controlled.tsx",jsx:`import React, { useState } from 'react';
import { Tree } from 'antd';
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0-0',
        key: '0-1-0-0',
      },
      {
        title: '0-1-0-1',
        key: '0-1-0-1',
      },
      {
        title: '0-1-0-2',
        key: '0-1-0-2',
      },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const App = () => {
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};
export default App;
`,description:"<p>\u53D7\u63A7\u64CD\u4F5C\u793A\u4F8B</p>"}},{demo:{id:"components-tree-demo-draggable"},previewerProps:{title:"\u62D6\u52A8\u793A\u4F8B",filename:"components/tree/demo/draggable.tsx",jsx:`import React, { useState } from 'react';
import { Tree } from 'antd';
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = \`\${preKey}-\${i}\`;
    tns.push({
      title: key,
      key,
    });
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
const App = () => {
  const [gData, setGData] = useState(defaultData);
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys \u9700\u8981\u53D7\u63A7\u65F6\u8BBE\u7F6E
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert \u793A\u4F8B\u6DFB\u52A0\u5230\u5934\u90E8\uFF0C\u53EF\u4EE5\u662F\u968F\u610F\u4F4D\u7F6E
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert \u793A\u4F8B\u6DFB\u52A0\u5230\u5934\u90E8\uFF0C\u53EF\u4EE5\u662F\u968F\u610F\u4F4D\u7F6E
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };
  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};
export default App;
`,description:"<p>\u5C06\u8282\u70B9\u62D6\u62FD\u5230\u5176\u4ED6\u8282\u70B9\u5185\u90E8\u6216\u524D\u540E\u3002</p>"}},{demo:{id:"components-tree-demo-dynamic"},previewerProps:{title:"\u5F02\u6B65\u6570\u636E\u52A0\u8F7D",filename:"components/tree/demo/dynamic.tsx",jsx:`import React, { useState } from 'react';
import { Tree } from 'antd';
const initTreeData = [
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
];

// It's just a simple demo. You can use tree map to optimize update perf.
const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
const App = () => {
  const [treeData, setTreeData] = useState(initTreeData);
  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData((origin) =>
          updateTreeData(origin, key, [
            {
              title: 'Child Node',
              key: \`\${key}-0\`,
            },
            {
              title: 'Child Node',
              key: \`\${key}-1\`,
            },
          ]),
        );
        resolve();
      }, 1000);
    });
  return <Tree loadData={onLoadData} treeData={treeData} />;
};
export default App;
`,description:"<p>\u70B9\u51FB\u5C55\u5F00\u8282\u70B9\uFF0C\u52A8\u6001\u52A0\u8F7D\u6570\u636E\u3002</p>"}},{demo:{id:"components-tree-demo-search"},previewerProps:{title:"\u53EF\u641C\u7D22",filename:"components/tree/demo/search.tsx",jsx:`import React, { useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = \`\${preKey}-\${i}\`;
    tns.push({
      title: key,
      key,
    });
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
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({
      key,
      title: key,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const App = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  const treeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
          };
        }
        return {
          title,
          key: item.key,
        };
      });
    return loop(defaultData);
  }, [searchValue]);
  return (
    <div>
      <Search
        style={{
          marginBottom: 8,
        }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u53EF\u641C\u7D22\u7684\u6811\u3002</p>",style:`.site-tree-search-value {
  color: #f50;
}`}},{demo:{id:"components-tree-demo-line"},previewerProps:{title:"\u8FDE\u63A5\u7EBF",filename:"components/tree/demo/line.tsx",jsx:`import React, { useState } from 'react';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];
const App = () => {
  const [showLine, setShowLine] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [showLeafIcon, setShowLeafIcon] = useState(true);
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const handleLeafIconChange = (value) => {
    if (value === 'custom') {
      return setShowLeafIcon(<CheckOutlined />);
    }
    if (value === 'true') {
      return setShowLeafIcon(true);
    }
    return setShowLeafIcon(false);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        showLine: <Switch checked={!!showLine} onChange={setShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon:{' '}
        <Select defaultValue="true" onChange={handleLeafIconChange}>
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="custom">Custom icon</Select.Option>
        </Select>
      </div>
      <Tree
        showLine={
          showLine
            ? {
                showLeafIcon,
              }
            : false
        }
        showIcon={showIcon}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u8282\u70B9\u4E4B\u95F4\u5E26\u8FDE\u63A5\u7EBF\u7684\u6811\uFF0C\u5E38\u7528\u4E8E\u6587\u4EF6\u76EE\u5F55\u7ED3\u6784\u5C55\u793A\u3002\u4F7F\u7528 <code>showLine</code> \u5F00\u542F\uFF0C\u53EF\u4EE5\u7528 <code>switcherIcon</code> \u4FEE\u6539\u9ED8\u8BA4\u56FE\u6807\u3002</p>"}},{demo:{id:"components-tree-demo-customized-icon"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u56FE\u6807",filename:"components/tree/demo/customized-icon.tsx",jsx:`import React from 'react';
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];
const App = () => (
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    switcherIcon={<DownOutlined />}
    treeData={treeData}
  />
);
export default App;
`,description:"<p>\u53EF\u4EE5\u9488\u5BF9\u4E0D\u540C\u7684\u8282\u70B9\u5B9A\u5236\u56FE\u6807\u3002</p>"}},{demo:{id:"components-tree-demo-directory"},previewerProps:{title:"\u76EE\u5F55",filename:"components/tree/demo/directory.tsx",jsx:`import React from 'react';
import { Tree } from 'antd';
const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      {
        title: 'leaf 0-0',
        key: '0-0-0',
        isLeaf: true,
      },
      {
        title: 'leaf 0-1',
        key: '0-0-1',
        isLeaf: true,
      },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      {
        title: 'leaf 1-0',
        key: '0-1-0',
        isLeaf: true,
      },
      {
        title: 'leaf 1-1',
        key: '0-1-1',
        isLeaf: true,
      },
    ],
  },
];
const App = () => {
  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };
  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};
export default App;
`,description:"<p>\u5185\u7F6E\u7684\u76EE\u5F55\u6811\uFF0C<code>multiple</code> \u6A21\u5F0F\u652F\u6301 <code>ctrl(Windows)</code> / <code>command(Mac)</code> \u590D\u9009\u3002</p>"}},{demo:{id:"components-tree-demo-switcher-icon"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5C55\u5F00/\u6298\u53E0\u56FE\u6807",filename:"components/tree/demo/switcher-icon.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];
const App = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u5C55\u5F00/\u6298\u53E0\u56FE\u6807\u3002</p>"}},{demo:{id:"components-tree-demo-virtual-scroll"},previewerProps:{title:"\u865A\u62DF\u6EDA\u52A8",filename:"components/tree/demo/virtual-scroll.tsx",jsx:`import React from 'react';
import { Tree } from 'antd';
const dig = (path = '0', level = 3) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = \`\${path}-\${i}\`;
    const treeNode = {
      title: key,
      key,
    };
    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    }
    list.push(treeNode);
  }
  return list;
};
const treeData = dig();
const App = () => <Tree treeData={treeData} height={233} defaultExpandAll />;
export default App;
`,description:"<p>\u4F7F\u7528 <code>height</code> \u5C5E\u6027\u5219\u5207\u6362\u4E3A\u865A\u62DF\u6EDA\u52A8\u3002</p>"}},{demo:{id:"components-tree-demo-drag-debug"},previewerProps:{debug:!0,title:"Drag Debug",filename:"components/tree/demo/drag-debug.tsx",jsx:`// @ts-nocheck
import React from 'react';
import { Tree, Switch } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
const x = 3;
const y = 2;
const z = 1;
const gData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = \`\${preKey}-\${i}\`;
    tns.push({
      title: key,
      key,
      icon: <CarryOutOutlined />,
    });
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
class App extends React.Component {
  state = {
    gData,
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    showLine: true,
    showIcon: true,
    showLeafIcon: true,
  };
  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys \u9700\u8981\u53D7\u63A7\u65F6\u8BBE\u7F6E
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert \u793A\u4F8B\u6DFB\u52A0\u5230\u5C3E\u90E8\uFF0C\u53EF\u4EE5\u662F\u968F\u610F\u4F4D\u7F6E
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert \u793A\u4F8B\u6DFB\u52A0\u5230\u5934\u90E8\uFF0C\u53EF\u4EE5\u662F\u968F\u610F\u4F4D\u7F6E
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    this.setState({
      gData: data,
    });
  };
  setShowLine = (showLine) => {
    const { showLeafIcon } = this.state;
    if (showLine) {
      if (showLeafIcon) {
        this.setState({
          showLine: {
            showLeafIcon: true,
          },
        });
      } else {
        this.setState({
          showLine: true,
        });
      }
    } else {
      this.setState({
        showLine: false,
      });
    }
  };
  setShowIcon = (showIcon) => {
    this.setState({
      showIcon,
    });
  };
  setShowLeafIcon = (showLeafIcon) => {
    this.setState({
      showLeafIcon,
      showLine: {
        showLeafIcon,
      },
    });
  };
  render() {
    const { showLine, showIcon, showLeafIcon, expandedKeys } = this.state;
    const { setShowLine, setShowIcon, setShowLeafIcon } = this;
    return (
      <>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          showLine: <Switch checked={showLine} onChange={setShowLine} />
          <br />
          <br />
          showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
          <br />
          <br />
          showLeafIcon: <Switch checked={showLeafIcon} onChange={setShowLeafIcon} />
        </div>
        <Tree
          showLine={showLine}
          showIcon={showIcon}
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          draggable
          blockNode
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          treeData={this.state.gData}
        />
      </>
    );
  }
}
export default App;
`}},{demo:{id:"components-tree-demo-big-data"},previewerProps:{debug:!0,title:"\u5927\u6570\u636E",filename:"components/tree/demo/big-data.tsx",jsx:`import React from 'react';
import { Tree } from 'antd';
const treeData = [];
for (let i = 0; i < 100; i += 1) {
  const children = [];
  for (let j = 0; j < 100; j += 1) {
    children.push({
      title: \`child \${i}-\${j}\`,
      key: \`l-\${i}-\${j}\`,
    });
  }
  treeData.push({
    title: \`parent \${i}\`,
    key: \`l-\${i}\`,
    children,
  });
}
const App = () => <Tree defaultExpandAll height={400} treeData={treeData} />;
export default App;
`,description:"<p>\u5927\u6570\u636E\u5C55\u793A\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"tree-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tree-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tree props"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[4].value),(0,n.tZ)("th",null,e[5].value),(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[9].value),(0,n.tZ)("td",null,e[10].value),(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value,(0,n.tZ)("code",null,e[27].value),e[28].value,(0,n.tZ)("code",null,e[29].value),e[30].value,(0,n.tZ)("code",null,e[31].value),e[32].value,(0,n.tZ)("code",null,e[33].value),e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value,(0,n.tZ)("code",null,e[67].value),e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[71].value),e[72].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value,(0,n.tZ)("code",null,e[81].value),e[82].value,(0,n.tZ)("code",null,e[83].value),e[84].value,(0,n.tZ)("code",null,e[85].value),e[86].value),(0,n.tZ)("td",null,e[87].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,e[105].value,(0,n.tZ)("code",null,e[106].value),e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[136].value),(0,n.tZ)("td",null,e[137].value),(0,n.tZ)("td",null,e[138].value),(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null,e[142].value),(0,n.tZ)("td",null,e[143].value),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null,e[159].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[160].value),(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[164].value),(0,n.tZ)("td",null,e[165].value),(0,n.tZ)("td",null,e[166].value),(0,n.tZ)("td",null,e[167].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[168].value),(0,n.tZ)("td",null,e[169].value),(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,e[171].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[172].value),(0,n.tZ)("td",null,e[173].value),(0,n.tZ)("td",null,e[174].value),(0,n.tZ)("td",null,e[175].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value),(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[192].value),(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[200].value),(0,n.tZ)("td",null,e[201].value),(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"treenode-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#treenode-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"TreeNode props"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[204].value),(0,n.tZ)("th",null,e[205].value),(0,n.tZ)("th",null,e[206].value),(0,n.tZ)("th",null,e[207].value),(0,n.tZ)("th",null))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[208].value),(0,n.tZ)("td",null,e[209].value),(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[212].value),(0,n.tZ)("td",null,e[213].value),(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[216].value),(0,n.tZ)("td",null,e[217].value),(0,n.tZ)("td",null,e[218].value),(0,n.tZ)("td",null,e[219].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[220].value),(0,n.tZ)("td",null,e[221].value),(0,n.tZ)("td",null,e[222].value),(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[224].value),(0,n.tZ)("td",null,e[225].value,(0,n.tZ)("code",null,e[226].value),e[227].value,(0,n.tZ)("code",null,e[228].value),e[229].value),(0,n.tZ)("td",null,e[230].value),(0,n.tZ)("td",null,e[231].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,e[241].value),(0,n.tZ)("td",null,e[242].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[243].value)),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"directorytree-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#directorytree-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"DirectoryTree props"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[244].value),(0,n.tZ)("th",null,e[245].value),(0,n.tZ)("th",null,e[246].value),(0,n.tZ)("th",null,e[247].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value,(0,n.tZ)("code",null,e[250].value),e[251].value,(0,n.tZ)("code",null,e[252].value)),(0,n.tZ)("td",null,e[253].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[254].value))))),(0,n.tZ)("h2",{id:"\u6CE8\u610F"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6CE8\u610F"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u6CE8\u610F"),(0,n.tZ)("p",null,e[255].value,(0,n.tZ)("code",null,e[256].value),e[257].value,(0,n.tZ)("code",null,e[258].value),e[259].value,(0,n.tZ)("code",null,e[260].value),e[261].value),(0,n.tZ)(d.Z,{lang:"jsx"},e[262].value),(0,n.tZ)("h3",{id:"tree-\u65B9\u6CD5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#tree-\u65B9\u6CD5"},(0,n.tZ)("span",{className:"icon icon-link"})),"Tree \u65B9\u6CD5"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[263].value),(0,n.tZ)("th",null,e[264].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[265].value),(0,n.tZ)("td",null,e[266].value)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u5728-showline-\u65F6\u5982\u4F55\u9690\u85CF\u5B50\u8282\u70B9\u56FE\u6807"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5728-showline-\u65F6\u5982\u4F55\u9690\u85CF\u5B50\u8282\u70B9\u56FE\u6807"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5728 showLine \u65F6\uFF0C\u5982\u4F55\u9690\u85CF\u5B50\u8282\u70B9\u56FE\u6807\uFF1F"),(0,n.tZ)("p",null,e[267].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/883vo47xp8"},e[268].value)),(0,n.tZ)("h3",{id:"defaultexpandall-\u5728\u5F02\u6B65\u52A0\u8F7D\u6570\u636E\u65F6\u4E3A\u4F55\u4E0D\u751F\u6548"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#defaultexpandall-\u5728\u5F02\u6B65\u52A0\u8F7D\u6570\u636E\u65F6\u4E3A\u4F55\u4E0D\u751F\u6548"},(0,n.tZ)("span",{className:"icon icon-link"})),"defaultExpandAll \u5728\u5F02\u6B65\u52A0\u8F7D\u6570\u636E\u65F6\u4E3A\u4F55\u4E0D\u751F\u6548\uFF1F"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,e[269].value),e[270].value,(0,n.tZ)("code",null,e[271].value),e[272].value,(0,n.tZ)("code",null,e[273].value),e[274].value),(0,n.tZ)("h3",{id:"\u865A\u62DF\u6EDA\u52A8\u7684\u9650\u5236"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u865A\u62DF\u6EDA\u52A8\u7684\u9650\u5236"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u865A\u62DF\u6EDA\u52A8\u7684\u9650\u5236"),(0,n.tZ)("p",null,e[275].value,(0,n.tZ)("code",null,e[276].value),e[277].value),(0,n.tZ)("h3",{id:"disabled-\u8282\u70B9\u5728\u6811\u4E2D\u7684\u5173\u7CFB\u662F\u4EC0\u4E48"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#disabled-\u8282\u70B9\u5728\u6811\u4E2D\u7684\u5173\u7CFB\u662F\u4EC0\u4E48"},(0,n.tZ)("span",{className:"icon icon-link"})),(0,n.tZ)("code",null,e[278].value)," \u8282\u70B9\u5728\u6811\u4E2D\u7684\u5173\u7CFB\u662F\u4EC0\u4E48\uFF1F"),(0,n.tZ)("p",null,e[279].value,(0,n.tZ)("code",null,e[280].value),e[281].value,(0,n.tZ)("code",null,e[282].value),e[283].value,(0,n.tZ)("code",null,e[284].value),e[285].value,(0,n.tZ)("code",null,e[286].value),e[287].value),(0,n.tZ)("p",null,e[288].value,(0,n.tZ)("code",null,e[289].value),e[290].value,(0,n.tZ)("code",null,e[291].value),e[292].value,(0,n.tZ)("code",null,e[293].value),e[294].value))))}a.default=r}}]);
