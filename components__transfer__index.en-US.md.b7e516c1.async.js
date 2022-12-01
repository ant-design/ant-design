"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[474],{27398:function(c,l,n){n.r(l);var m=n(2143),p=n(50250),h=n(59378),_=n(78190),a=n(74775),s=n(5937),g=n(2068),Z=n(74399),f=n(46004),v=n(35708),y=n(30138),K=n(56140),r=n(5388),T=n(49545),k=n(92169),S=n(13140),x=n(95127),b=n(74418),C=n(97119),o=n(28257),d=n(67294),e=n(13946);function i(){var u=(0,o.eL)(),t=u.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(d.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,t[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,t[1].value),(0,e.tZ)("li",null,t[2].value)),(0,e.tZ)("p",null,t[3].value),(0,e.tZ)("p",null,t[4].value,(0,e.tZ)("code",null,t[5].value),t[6].value,(0,e.tZ)("code",null,t[7].value),t[8].value,(0,e.tZ)("code",null,t[9].value),t[10].value),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(r.Z,{items:[{demo:{id:"components-transfer-demo-basic"},previewerProps:{title:"Basic",filename:"components/transfer/demo/basic.tsx",jsx:`import React, { useState } from 'react';
import { Transfer } from 'antd';
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: \`content\${i + 1}\`,
  description: \`description of content\${i + 1}\`,
}));
const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);
const App = () => {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  return (
    <Transfer
      dataSource={mockData}
      titles={['Source', 'Target']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.title}
    />
  );
};
export default App;
`,description:"<p>The most basic usage of <code>Transfer</code> involves providing the source data and target keys arrays, plus the rendering and some callback functions.</p>"}},{demo:{id:"components-transfer-demo-oneway"},previewerProps:{title:"One Way",filename:"components/transfer/demo/oneWay.tsx",jsx:`import React, { useState } from 'react';
import { Switch, Transfer } from 'antd';
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: \`content\${i + 1}\`,
  description: \`description of content\${i + 1}\`,
  disabled: i % 3 < 1,
}));
const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);
const App = () => {
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    console.log('targetKeys: ', newTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  const handleDisable = (checked) => {
    setDisabled(checked);
  };
  return (
    <>
      <Transfer
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onScroll={handleScroll}
        render={(item) => item.title}
        disabled={disabled}
        oneWay
        style={{
          marginBottom: 16,
        }}
      />
      <Switch
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        checked={disabled}
        onChange={handleDisable}
      />
    </>
  );
};
export default App;
`,description:"<p>Use <code>oneWay</code> to makes Transfer to one way style.</p>"}},{demo:{id:"components-transfer-demo-search"},previewerProps:{title:"Search",filename:"components/transfer/demo/search.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
const App = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: \`content\${i + 1}\`,
        description: \`description of content\${i + 1}\`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };
  useEffect(() => {
    getMock();
  }, []);
  const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  return (
    <Transfer
      dataSource={mockData}
      showSearch
      filterOption={filterOption}
      targetKeys={targetKeys}
      onChange={handleChange}
      onSearch={handleSearch}
      render={(item) => item.title}
    />
  );
};
export default App;
`,description:"<p>Transfer with a search box.</p>"}},{demo:{id:"components-transfer-demo-advanced"},previewerProps:{title:"Advanced",filename:"components/transfer/demo/advanced.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Button, Transfer } from 'antd';
const App = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: \`content\${i + 1}\`,
        description: \`description of content\${i + 1}\`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };
  useEffect(() => {
    getMock();
  }, []);
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const renderFooter = (_, { direction }) => {
    if (direction === 'left') {
      return (
        <Button
          size="small"
          style={{
            float: 'left',
            margin: 5,
          }}
          onClick={getMock}
        >
          Left button reload
        </Button>
      );
    }
    return (
      <Button
        size="small"
        style={{
          float: 'right',
          margin: 5,
        }}
        onClick={getMock}
      >
        Right button reload
      </Button>
    );
  };
  return (
    <Transfer
      dataSource={mockData}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
      operations={['to right', 'to left']}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => \`\${item.title}-\${item.description}\`}
      footer={renderFooter}
    />
  );
};
export default App;
`,description:`<p>Advanced Usage of Transfer.</p>
<p>You can customize the labels of the transfer buttons, the width and height of the columns, and what should be displayed in the footer.</p>`}},{demo:{id:"components-transfer-demo-custom-item"},previewerProps:{title:"Custom datasource",filename:"components/transfer/demo/custom-item.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Transfer } from 'antd';
const App = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: \`content\${i + 1}\`,
        description: \`description of content\${i + 1}\`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };
  useEffect(() => {
    getMock();
  }, []);
  const handleChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };
  const renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    );
    return {
      label: customLabel,
      // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  return (
    <Transfer
      dataSource={mockData}
      listStyle={{
        width: 300,
        height: 300,
      }}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={renderItem}
    />
  );
};
export default App;
`,description:"<p>Custom each Transfer Item, and in this way you can render a complex datasource.</p>"}},{demo:{id:"components-transfer-demo-large-data"},previewerProps:{title:"Pagination",filename:"components/transfer/demo/large-data.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Switch, Transfer } from 'antd';
const App = () => {
  const [oneWay, setOneWay] = useState(false);
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  useEffect(() => {
    const newTargetKeys = [];
    const newMockData = [];
    for (let i = 0; i < 2000; i++) {
      const data = {
        key: i.toString(),
        title: \`content\${i + 1}\`,
        description: \`description of content\${i + 1}\`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        newTargetKeys.push(data.key);
      }
      newMockData.push(data);
    }
    setTargetKeys(newTargetKeys);
    setMockData(newMockData);
  }, []);
  const onChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };
  return (
    <>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        render={(item) => item.title}
        oneWay={oneWay}
        pagination
      />
      <br />
      <Switch
        unCheckedChildren="one way"
        checkedChildren="one way"
        checked={oneWay}
        onChange={setOneWay}
      />
    </>
  );
};
export default App;
`,description:"<p>large count of items with pagination.</p>"}},{demo:{id:"components-transfer-demo-table-transfer"},previewerProps:{title:"Table Transfer",filename:"components/transfer/demo/table-transfer.tsx",jsx:`import React, { useState } from 'react';
import { Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);
const mockTags = ['cat', 'dog', 'bird'];
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: \`content\${i + 1}\`,
  description: \`description of content\${i + 1}\`,
  disabled: i % 4 === 0,
  tag: mockTags[i % 3],
}));
const originTargetKeys = mockData
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);
const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: (tag) => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];
const App = () => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };
  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };
  return (
    <>
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
      <Switch
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        checked={disabled}
        onChange={triggerDisable}
        style={{
          marginTop: 16,
        }}
      />
      <Switch
        unCheckedChildren="showSearch"
        checkedChildren="showSearch"
        checked={showSearch}
        onChange={triggerShowSearch}
        style={{
          marginTop: 16,
        }}
      />
    </>
  );
};
export default App;
`,description:"<p>Customize render list with Table component.</p>",style:`#components-transfer-demo-table-transfer .ant-table td {
  background: transparent;
}`}},{demo:{id:"components-transfer-demo-tree-transfer"},previewerProps:{title:"Tree Transfer",filename:"components/transfer/demo/tree-transfer.tsx",jsx:`import React, { useState } from 'react';
import { Transfer, Tree } from 'antd';
// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);
const generateTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));
const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);
  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
              onSelect={(_, { node: { key } }) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
            />
          );
        }
      }}
    </Transfer>
  );
};
const treeData = [
  {
    key: '0-0',
    title: '0-0',
  },
  {
    key: '0-1',
    title: '0-1',
    children: [
      {
        key: '0-1-0',
        title: '0-1-0',
      },
      {
        key: '0-1-1',
        title: '0-1-1',
      },
    ],
  },
  {
    key: '0-2',
    title: '0-3',
  },
];
const App = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const onChange = (keys) => {
    setTargetKeys(keys);
  };
  return <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />;
};
export default App;
`,description:"<p>Customize render list with Tree component.</p>",style:`.tree-transfer .ant-transfer-list:first-child {
  flex: none;
  width: 50%;
}`}},{demo:{id:"components-transfer-demo-status"},previewerProps:{title:"Status",filename:"components/transfer/demo/status.tsx",jsx:`import React from 'react';
import { Space, Transfer } from 'antd';
const App = () => (
  <Space direction="vertical">
    <Transfer status="error" />
    <Transfer status="warning" showSearch />
  </Space>
);
export default App;
`,description:"<p>Add status to Transfer with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>"}},{demo:{id:"components-transfer-demo-custom-select-all-labels"},previewerProps:{debug:!0,title:"Custom Select All Labels",filename:"components/transfer/demo/custom-select-all-labels.tsx",jsx:`import React, { useState } from 'react';
import { Transfer } from 'antd';
const mockData = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i.toString(),
  title: \`content\${i + 1}\`,
  description: \`description of content\${i + 1}\`,
}));
const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);
const selectAllLabels = [
  'Select All',
  ({ selectedCount, totalCount }) => \`\${selectedCount}/\${totalCount}\`,
];
const App = () => {
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => item.title}
      selectAllLabels={selectAllLabels}
    />
  );
};
export default App;
`,description:"<p>Custom the labels for select all checkboxs.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(s.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[11].value),(0,e.tZ)("th",null,t[12].value),(0,e.tZ)("th",null,t[13].value),(0,e.tZ)("th",null,t[14].value),(0,e.tZ)("th",null,t[15].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[16].value),(0,e.tZ)("td",null,t[17].value,(0,e.tZ)("code",null,t[18].value),t[19].value),(0,e.tZ)("td",null,(0,e.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/1bf0bab2a7bc0a774119f501806e3e0e3a6ba283/components/transfer/index.tsx#L12"},t[20].value),t[21].value),(0,e.tZ)("td",null,t[22].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[23].value),(0,e.tZ)("td",null,t[24].value),(0,e.tZ)("td",null,t[25].value),(0,e.tZ)("td",null,t[26].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[27].value),(0,e.tZ)("td",null,t[28].value),(0,e.tZ)("td",null,t[29].value),(0,e.tZ)("td",null,t[30].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[31].value),(0,e.tZ)("td",null,t[32].value),(0,e.tZ)("td",null,t[33].value),(0,e.tZ)("td",null,t[34].value),(0,e.tZ)("td",null,t[35].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[36].value),(0,e.tZ)("td",null,t[37].value),(0,e.tZ)("td",null,t[38].value,(0,e.tZ)("code",null,t[39].value),t[40].value,(0,e.tZ)("code",null,t[41].value),t[42].value),(0,e.tZ)("td",null,t[43].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[44].value),(0,e.tZ)("td",null,t[45].value),(0,e.tZ)("td",null,t[46].value),(0,e.tZ)("td",null,t[47].value,(0,e.tZ)("code",null,t[48].value),t[49].value,(0,e.tZ)("code",null,t[50].value),t[51].value,(0,e.tZ)("code",null,t[52].value),t[53].value,(0,e.tZ)("code",null,t[54].value),t[55].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[56].value),(0,e.tZ)("td",null,t[57].value),(0,e.tZ)("td",null,t[58].value),(0,e.tZ)("td",null,t[59].value),(0,e.tZ)("td",null,t[60].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[61].value),(0,e.tZ)("td",null,t[62].value),(0,e.tZ)("td",null,t[63].value),(0,e.tZ)("td",null,t[64].value,(0,e.tZ)("code",null,t[65].value),t[66].value,(0,e.tZ)("code",null,t[67].value),t[68].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[69].value),(0,e.tZ)("td",null,t[70].value),(0,e.tZ)("td",null,t[71].value),(0,e.tZ)("td",null,t[72].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[73].value),(0,e.tZ)("td",null,t[74].value),(0,e.tZ)("td",null,t[75].value),(0,e.tZ)("td",null,t[76].value),(0,e.tZ)("td",null,t[77].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[78].value),(0,e.tZ)("td",null,t[79].value,(0,e.tZ)("code",null,t[80].value),t[81].value,(0,e.tZ)("code",null,t[82].value),t[83].value,(0,e.tZ)("code",null,t[84].value),t[85].value,(0,e.tZ)("code",null,t[86].value),t[87].value),(0,e.tZ)("td",null,t[88].value),(0,e.tZ)("td",null,t[89].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[90].value),(0,e.tZ)("td",null,t[91].value),(0,e.tZ)("td",null,t[92].value),(0,e.tZ)("td",null,t[93].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[94].value),(0,e.tZ)("td",null,t[95].value),(0,e.tZ)("td",null,t[96].value),(0,e.tZ)("td",null,t[97].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[98].value),(0,e.tZ)("td",null,t[99].value),(0,e.tZ)("td",null,t[100].value),(0,e.tZ)("td",null,t[101].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[102].value),(0,e.tZ)("td",null,t[103].value),(0,e.tZ)("td",null,t[104].value),(0,e.tZ)("td",null,t[105].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[106].value),(0,e.tZ)("td",null,t[107].value),(0,e.tZ)("td",null,t[108].value),(0,e.tZ)("td",null,t[109].value),(0,e.tZ)("td",null,t[110].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[111].value),(0,e.tZ)("td",null,t[112].value),(0,e.tZ)("td",null,t[113].value),(0,e.tZ)("td",null,t[114].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[115].value),(0,e.tZ)("td",null,t[116].value),(0,e.tZ)("td",null,t[117].value),(0,e.tZ)("td",null,t[118].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[119].value),(0,e.tZ)("td",null,t[120].value),(0,e.tZ)("td",null,t[121].value),(0,e.tZ)("td",null,t[122].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[123].value),(0,e.tZ)("td",null,t[124].value),(0,e.tZ)("td",null,t[125].value),(0,e.tZ)("td",null,t[126].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[127].value),(0,e.tZ)("td",null,t[128].value),(0,e.tZ)("td",null,t[129].value,(0,e.tZ)("code",null,t[130].value),t[131].value,(0,e.tZ)("code",null,t[132].value),t[133].value),(0,e.tZ)("td",null,t[134].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[135].value),(0,e.tZ)("td",null,t[136].value),(0,e.tZ)("td",null,t[137].value),(0,e.tZ)("td",null,t[138].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"render-props"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#render-props"},(0,e.tZ)("span",{className:"icon icon-link"})),"Render Props"),(0,e.tZ)("p",null,t[139].value,(0,e.tZ)("code",null,t[140].value),t[141].value),(0,e.tZ)(s.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,t[142].value),(0,e.tZ)("th",null,t[143].value),(0,e.tZ)("th",null,t[144].value),(0,e.tZ)("th",null,t[145].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[146].value),(0,e.tZ)("td",null,t[147].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,t[148].value),t[149].value,(0,e.tZ)("code",null,t[150].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[151].value),(0,e.tZ)("td",null,t[152].value),(0,e.tZ)("td",null,t[153].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[154].value),(0,e.tZ)("td",null,t[155].value),(0,e.tZ)("td",null,t[156].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[157].value),(0,e.tZ)("td",null,t[158].value),(0,e.tZ)("td",null,t[159].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[160].value),(0,e.tZ)("td",null,t[161].value),(0,e.tZ)("td",null,t[162].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,t[163].value),(0,e.tZ)("td",null,t[164].value),(0,e.tZ)("td",null,t[165].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h4",{id:"example"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#example"},(0,e.tZ)("span",{className:"icon icon-link"})),"example"),(0,e.tZ)(a.Z,{lang:"jsx"},t[166].value),(0,e.tZ)("h2",{id:"warning"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#warning"},(0,e.tZ)("span",{className:"icon icon-link"})),"Warning"),(0,e.tZ)("p",null,t[167].value,(0,e.tZ)("a",{href:"http://facebook.github.io/react/docs/lists-and-keys.html#keys"},t[168].value),t[169].value,(0,e.tZ)("code",null,t[170].value),t[171].value,(0,e.tZ)("code",null,t[172].value),t[173].value),(0,e.tZ)("p",null,t[174].value,(0,e.tZ)("code",null,t[175].value),t[176].value,(0,e.tZ)("code",null,t[177].value),t[178].value),(0,e.tZ)(a.Z,{lang:"jsx"},t[179].value),(0,e.tZ)("h2",{id:"faq"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,e.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,e.tZ)("h3",{id:"how-to-support-fetch-and-present-data-from-a-remote-server-in-transfer-column"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-support-fetch-and-present-data-from-a-remote-server-in-transfer-column"},(0,e.tZ)("span",{className:"icon icon-link"})),"How to support fetch and present data from a remote server in Transfer column."),(0,e.tZ)("p",null,t[180].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/objective-wing-6iqbx"},t[181].value)))))}l.default=i}}]);
