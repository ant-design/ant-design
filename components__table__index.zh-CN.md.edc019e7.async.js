"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2639],{60696:function(c,d,t){t.r(d);var m=t(2143),p=t(50250),v=t(59378),Z=t(78190),o=t(74775),l=t(5937),h=t(2068),g=t(74399),x=t(46004),b=t(35708),k=t(30138),f=t(56140),r=t(5388),y=t(49545),w=t(92169),S=t(13140),C=t(95127),I=t(74418),_=t(97119),a=t(28257),u=t(67294),n=t(13946);function s(){var i=(0,a.eL)(),e=i.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(u.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value)),(0,n.tZ)("h2",{id:"\u5982\u4F55\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u4F7F\u7528"),(0,n.tZ)("p",null,e[3].value,(0,n.tZ)("code",null,e[4].value),e[5].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[6].value),(0,n.tZ)("h2",{id:"\u76F8\u5173\u63A8\u8350"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u76F8\u5173\u63A8\u8350"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u76F8\u5173\u63A8\u8350"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://kitchen.alipay.com/"},e[7].value),e[8].value),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://procomponents.ant.design/components/table"},e[9].value),e[10].value,(0,n.tZ)("code",null,e[11].value),e[12].value),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://s2.antv.vision/zh"},e[13].value),e[14].value,(0,n.tZ)("a",{href:"https://zhuanlan.zhihu.com/p/494995642"},e[15].value))),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-table-demo-basic"},previewerProps:{title:"\u57FA\u672C\u7528\u6CD5",filename:"components/table/demo/basic.tsx",jsx:`import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;
`,description:"<p>\u7B80\u5355\u7684\u8868\u683C\uFF0C\u6700\u540E\u4E00\u5217\u662F\u5404\u79CD\u64CD\u4F5C\u3002</p>"}},{demo:{id:"components-table-demo-jsx"},previewerProps:{title:"JSX \u98CE\u683C\u7684 API",filename:"components/table/demo/jsx.tsx",jsx:`import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const App = () => (
  <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);
export default App;
`,description:`<p>\u4F7F\u7528 JSX \u98CE\u683C\u7684 API\uFF082.5.0 \u4EE5\u540E\u5F15\u5165\uFF09</p>
<blockquote>
<p>\u8FD9\u4E2A\u53EA\u662F\u4E00\u4E2A\u63CF\u8FF0 <code>columns</code> \u7684\u8BED\u6CD5\u7CD6\uFF0C\u6240\u4EE5\u4F60\u4E0D\u80FD\u7528\u5176\u4ED6\u7EC4\u4EF6\u53BB\u5305\u88F9 <code>Column</code> \u548C <code>ColumnGroup</code>\u3002</p>
</blockquote>`}},{demo:{id:"components-table-demo-row-selection"},previewerProps:{title:"\u53EF\u9009\u62E9",filename:"components/table/demo/row-selection.tsx",jsx:`import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(\`selectedRowKeys: \${selectedRowKeys}\`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const App = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default App;
`,description:`<p>\u7B2C\u4E00\u5217\u662F\u8054\u52A8\u7684\u9009\u62E9\u6846\u3002\u53EF\u4EE5\u901A\u8FC7 <code>rowSelection.type</code> \u5C5E\u6027\u6307\u5B9A\u9009\u62E9\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A <code>checkbox</code>\u3002</p>
<blockquote>
<p>\u9ED8\u8BA4\u70B9\u51FB checkbox \u89E6\u53D1\u9009\u62E9\u884C\u4E3A\uFF0C\u9700\u8981\u70B9\u51FB\u884C\u89E6\u53D1\u53EF\u4EE5\u53C2\u8003\u4F8B\u5B50\uFF1A<a href="https://codesandbox.io/s/000vqw38rl">https://codesandbox.io/s/000vqw38rl</a></p>
</blockquote>`}},{demo:{id:"components-table-demo-row-selection-and-operation"},previewerProps:{title:"\u9009\u62E9\u548C\u64CD\u4F5C",filename:"components/table/demo/row-selection-and-operation.tsx",jsx:`import React, { useState } from 'react';
import { Button, Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: \`Edward King \${i}\`,
    age: 32,
    address: \`London, Park Lane no. \${i}\`,
  });
}
const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? \`Selected \${selectedRowKeys.length} items\` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default App;
`,description:"<p>\u9009\u62E9\u540E\u8FDB\u884C\u64CD\u4F5C\uFF0C\u5B8C\u6210\u540E\u6E05\u7A7A\u9009\u62E9\uFF0C\u901A\u8FC7 <code>rowSelection.selectedRowKeys</code> \u6765\u63A7\u5236\u9009\u4E2D\u9879\u3002</p>"}},{demo:{id:"components-table-demo-row-selection-custom"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9009\u62E9\u9879",filename:"components/table/demo/row-selection-custom.tsx",jsx:`import React, { useState } from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: \`Edward King \${i}\`,
    age: 32,
    address: \`London, Park Lane no. \${i}\`,
  });
}
const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};
export default App;
`,description:"<p>\u901A\u8FC7 <code>rowSelection.selections</code> \u81EA\u5B9A\u4E49\u9009\u62E9\u9879\uFF0C\u9ED8\u8BA4\u4E0D\u663E\u793A\u4E0B\u62C9\u9009\u9879\uFF0C\u8BBE\u4E3A <code>true</code> \u65F6\u663E\u793A\u9ED8\u8BA4\u9009\u62E9\u9879\u3002</p>"}},{demo:{id:"components-table-demo-head"},previewerProps:{title:"\u7B5B\u9009\u548C\u6392\u5E8F",filename:"components/table/demo/head.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with \`value\`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => <Table columns={columns} dataSource={data} onChange={onChange} />;
export default App;
`,description:`<p>\u5BF9\u67D0\u4E00\u5217\u6570\u636E\u8FDB\u884C\u7B5B\u9009\uFF0C\u4F7F\u7528\u5217\u7684 <code>filters</code> \u5C5E\u6027\u6765\u6307\u5B9A\u9700\u8981\u7B5B\u9009\u83DC\u5355\u7684\u5217\uFF0C<code>onFilter</code> \u7528\u4E8E\u7B5B\u9009\u5F53\u524D\u6570\u636E\uFF0C<code>filterMultiple</code> \u7528\u4E8E\u6307\u5B9A\u591A\u9009\u548C\u5355\u9009\u3002</p>
<p>\u5BF9\u67D0\u4E00\u5217\u6570\u636E\u8FDB\u884C\u6392\u5E8F\uFF0C\u901A\u8FC7\u6307\u5B9A\u5217\u7684 <code>sorter</code> \u51FD\u6570\u5373\u53EF\u542F\u52A8\u6392\u5E8F\u6309\u94AE\u3002<code>sorter: function(rowA, rowB) { ... }</code>\uFF0C rowA\u3001rowB \u4E3A\u6BD4\u8F83\u7684\u4E24\u4E2A\u884C\u6570\u636E\u3002</p>
<p><code>sortDirections: ['ascend' | 'descend']</code>\u6539\u53D8\u6BCF\u5217\u53EF\u7528\u7684\u6392\u5E8F\u65B9\u5F0F\uFF0C\u5207\u6362\u6392\u5E8F\u65F6\u6309\u6570\u7EC4\u5185\u5BB9\u4F9D\u6B21\u5207\u6362\uFF0C\u8BBE\u7F6E\u5728 table props \u4E0A\u65F6\u5BF9\u6240\u6709\u5217\u751F\u6548\u3002\u4F60\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E <code>['ascend', 'descend', 'ascend']</code> \u7981\u6B62\u6392\u5E8F\u6062\u590D\u5230\u9ED8\u8BA4\u72B6\u6001\u3002</p>
<p>\u4F7F\u7528 <code>defaultSortOrder</code> \u5C5E\u6027\uFF0C\u8BBE\u7F6E\u5217\u7684\u9ED8\u8BA4\u6392\u5E8F\u987A\u5E8F\u3002</p>`}},{demo:{id:"components-table-demo-filter-in-tree"},previewerProps:{title:"\u6811\u578B\u7B5B\u9009\u83DC\u5355",filename:"components/table/demo/filter-in-tree.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => <Table columns={columns} dataSource={data} onChange={onChange} />;
export default App;
`,description:"<p>\u53EF\u4EE5\u4F7F\u7528 <code>filterMode</code> \u6765\u4FEE\u6539\u7B5B\u9009\u83DC\u5355\u7684 UI\uFF0C\u53EF\u9009\u503C\u6709 <code>menu</code>\uFF08\u9ED8\u8BA4\uFF09\u548C <code>tree</code>\u3002</p>"}},{demo:{id:"components-table-demo-filter-search"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u7B5B\u9009\u7684\u641C\u7D22",filename:"components/table/demo/filter-search.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => <Table columns={columns} dataSource={data} onChange={onChange} />;
export default App;
`,description:"<p><code>filterSearch</code> \u7528\u4E8E\u5F00\u542F\u7B5B\u9009\u9879\u7684\u641C\u7D22\uFF0C\u901A\u8FC7 <code>filterSearch:(input, record) => boolean</code> \u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7B5B\u9009\u65B9\u6CD5</p>"}},{demo:{id:"components-table-demo-multiple-sorter"},previewerProps:{title:"\u591A\u5217\u6392\u5E8F",filename:"components/table/demo/multiple-sorter.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const App = () => <Table columns={columns} dataSource={data} onChange={onChange} />;
export default App;
`,description:"<p><code>column.sorter</code> \u652F\u6301 <code>multiple</code> \u5B57\u6BB5\u4EE5\u914D\u7F6E\u591A\u5217\u6392\u5E8F\u4F18\u5148\u7EA7\u3002\u901A\u8FC7 <code>sorter.compare</code> \u914D\u7F6E\u6392\u5E8F\u903B\u8F91\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u4E0D\u8BBE\u7F6E\u8BE5\u51FD\u6570\u53EA\u542F\u52A8\u591A\u5217\u6392\u5E8F\u7684\u4EA4\u4E92\u5F62\u5F0F\u3002</p>"}},{demo:{id:"components-table-demo-reset-filter"},previewerProps:{title:"\u53EF\u63A7\u7684\u7B5B\u9009\u548C\u6392\u5E8F",filename:"components/table/demo/reset-filter.tsx",jsx:`import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const App = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default App;
`,description:`<p>\u4F7F\u7528\u53D7\u63A7\u5C5E\u6027\u5BF9\u7B5B\u9009\u548C\u6392\u5E8F\u72B6\u6001\u8FDB\u884C\u63A7\u5236\u3002</p>
<blockquote>
<ol>
<li>columns \u4E2D\u5B9A\u4E49\u4E86 filteredValue \u548C sortOrder \u5C5E\u6027\u5373\u89C6\u4E3A\u53D7\u63A7\u6A21\u5F0F\u3002</li>
<li>\u53EA\u652F\u6301\u540C\u65F6\u5BF9\u4E00\u5217\u8FDB\u884C\u6392\u5E8F\uFF0C\u8BF7\u4FDD\u8BC1\u53EA\u6709\u4E00\u5217\u7684 sortOrder \u5C5E\u6027\u662F\u751F\u6548\u7684\u3002</li>
<li>\u52A1\u5FC5\u6307\u5B9A <code>column.key</code>\u3002</li>
</ol>
</blockquote>`}},{demo:{id:"components-table-demo-custom-filter-panel"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u7B5B\u9009\u83DC\u5355",filename:"components/table/demo/custom-filter-panel.tsx",jsx:`import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={\`Search \${dataIndex}\`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default App;
`,description:`<p>\u901A\u8FC7 <code>filterDropdown</code> \u81EA\u5B9A\u4E49\u7684\u5217\u7B5B\u9009\u529F\u80FD\uFF0C\u5E76\u5B9E\u73B0\u4E00\u4E2A\u641C\u7D22\u5217\u7684\u793A\u4F8B\u3002</p>
<p>\u7ED9\u51FD\u6570 <code>clearFilters</code> \u6DFB\u52A0 <code>boolean</code> \u7C7B\u578B\u53C2\u6570 <code>closeDropdown</code>\uFF0C\u662F\u5426\u5173\u95ED\u7B5B\u9009\u83DC\u5355\uFF0C\u9ED8\u8BA4\u4E3A <code>true</code>\u3002\u6DFB\u52A0 <code>boolean</code> \u7C7B\u578B\u53C2\u6570 <code>confirm</code>\uFF0C\u6E05\u9664\u7B5B\u9009\u65F6\u662F\u5426\u63D0\u4EA4\u5DF2\u9009\u9879\uFF0C\u9ED8\u8BA4 <code>true</code>\u3002</p>`}},{demo:{id:"components-table-demo-ajax"},previewerProps:{title:"\u8FDC\u7A0B\u52A0\u8F7D\u6570\u636E",filename:"components/table/demo/ajax.tsx",jsx:`import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import qs from 'qs';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => \`\${name.first} \${name.last}\`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(\`https://randomuser.me/api?\${qs.stringify(getRandomuserParams(tableParams))}\`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default App;
`,description:`<p>\u8FD9\u4E2A\u4F8B\u5B50\u901A\u8FC7\u7B80\u5355\u7684 ajax \u8BFB\u53D6\u65B9\u5F0F\uFF0C\u6F14\u793A\u4E86\u5982\u4F55\u4ECE\u670D\u52A1\u7AEF\u8BFB\u53D6\u5E76\u5C55\u73B0\u6570\u636E\uFF0C\u5177\u6709\u7B5B\u9009\u3001\u6392\u5E8F\u7B49\u529F\u80FD\u4EE5\u53CA\u9875\u9762 loading \u6548\u679C\u3002\u5F00\u53D1\u8005\u53EF\u4EE5\u81EA\u884C\u63A5\u5165\u5176\u4ED6\u6570\u636E\u5904\u7406\u65B9\u5F0F\u3002</p>
<p>\u53E6\u5916\uFF0C\u672C\u4F8B\u4E5F\u5C55\u793A\u4E86\u7B5B\u9009\u6392\u5E8F\u529F\u80FD\u5982\u4F55\u4EA4\u7ED9\u670D\u52A1\u7AEF\u5B9E\u73B0\uFF0C\u5217\u4E0D\u9700\u8981\u6307\u5B9A\u5177\u4F53\u7684 <code>onFilter</code> \u548C <code>sorter</code> \u51FD\u6570\uFF0C\u800C\u662F\u5728\u628A\u7B5B\u9009\u548C\u6392\u5E8F\u7684\u53C2\u6570\u53D1\u5230\u670D\u52A1\u7AEF\u6765\u5904\u7406\u3002</p>
<p>\u5F53\u4F7F\u7528 <code>rowSelection</code> \u65F6\uFF0C\u8BF7\u8BBE\u7F6E <code>rowSelection.preserveSelectedRowKeys</code> \u5C5E\u6027\u4EE5\u4FDD\u7559 <code>key</code>\u3002</p>
<p><strong>\u6CE8\u610F\uFF0C\u6B64\u793A\u4F8B\u4F7F\u7528 <a href="https://randomuser.me">\u6A21\u62DF\u63A5\u53E3</a>\uFF0C\u5C55\u793A\u6570\u636E\u53EF\u80FD\u4E0D\u51C6\u786E\uFF0C\u8BF7\u6253\u5F00\u7F51\u7EDC\u9762\u677F\u67E5\u770B\u8BF7\u6C42\u3002</strong></p>
<blockquote>
<p>\u{1F6CE}\uFE0F \u60F3\u8981 3 \u5206\u949F\u5B9E\u73B0\uFF1F\u8BD5\u8BD5 <a href="https://procomponents.ant.design/components/table">ProTable</a>\uFF01</p>
</blockquote>`}},{demo:{id:"components-table-demo-size"},previewerProps:{title:"\u7D27\u51D1\u578B",filename:"components/table/demo/size.tsx",jsx:`import React from 'react';
import { Table, Divider } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const App = () => (
  <>
    <Divider>Middle size table</Divider>
    <Table columns={columns} dataSource={data} size="middle" />
    <Divider>Small size table</Divider>
    <Table columns={columns} dataSource={data} size="small" />
  </>
);
export default App;
`,description:"<p>\u4E24\u79CD\u7D27\u51D1\u578B\u7684\u5217\u8868\uFF0C\u5C0F\u578B\u5217\u8868\u53EA\u7528\u4E8E\u5BF9\u8BDD\u6846\u5185\u3002</p>"}},{demo:{id:"components-table-demo-narrow"},previewerProps:{debug:!0,title:"\u7D27\u51D1\u578B",filename:"components/table/demo/narrow.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 200; i += 1) {
  data.push({
    key: i,
    name: 'Sample Name',
    age: 30 + (i % 5),
    address: \`Sample Address \${i}\`,
  });
}
const App = () => (
  <div
    style={{
      width: 300,
    }}
  >
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={{
        defaultCurrent: 13,
      }}
    />
  </div>
);
export default App;
`,description:"<p>\u4E24\u79CD\u7D27\u51D1\u578B\u7684\u5217\u8868\uFF0C\u5C0F\u578B\u5217\u8868\u53EA\u7528\u4E8E\u5BF9\u8BDD\u6846\u5185\u3002</p>"}},{demo:{id:"components-table-demo-bordered"},previewerProps:{title:"\u5E26\u8FB9\u6846",filename:"components/table/demo/bordered.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
    align: 'right',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '\uFFE5300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '\uFFE51,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '\uFFE5120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
const App = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    title={() => 'Header'}
    footer={() => 'Footer'}
  />
);
export default App;
`,description:"<p>\u6DFB\u52A0\u8868\u683C\u8FB9\u6846\u7EBF\uFF0C\u9875\u5934\u548C\u9875\u811A\u3002</p>"}},{demo:{id:"components-table-demo-expand"},previewerProps:{title:"\u53EF\u5C55\u5F00",filename:"components/table/demo/expand.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
const App = () => (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
);
export default App;
`,description:"<p>\u5F53\u8868\u683C\u5185\u5BB9\u8F83\u591A\u4E0D\u80FD\u4E00\u6B21\u6027\u5B8C\u5168\u5C55\u793A\u65F6\u3002</p>"}},{demo:{id:"components-table-demo-order-column"},previewerProps:{title:"\u7279\u6B8A\u5217\u6392\u5E8F",filename:"components/table/demo/order-column.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  Table.EXPAND_COLUMN,
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  Table.SELECTION_COLUMN,
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
const App = () => (
  <Table
    columns={columns}
    rowSelection={{}}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
    }}
    dataSource={data}
  />
);
export default App;
`,description:"<p>\u4F60\u53EF\u4EE5\u901A\u8FC7 <code>Table.EXPAND_COLUMN</code> \u548C <code>Table.SELECT_COLUMN</code> \u6765\u63A7\u5236\u9009\u62E9\u548C\u5C55\u5F00\u5217\u7684\u987A\u5E8F\u3002</p>"}},{demo:{id:"components-table-demo-colspan-rowspan"},previewerProps:{title:"\u8868\u683C\u884C/\u5217\u5408\u5E76",filename:"components/table/demo/colspan-rowspan.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const sharedOnCell = (_, index) => {
  if (index === 4) {
    return {
      colSpan: 0,
    };
  }
  return {};
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    onCell: (_, index) => ({
      colSpan: index < 4 ? 1 : 5,
    }),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    onCell: sharedOnCell,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    onCell: (_, index) => {
      if (index === 2) {
        return {
          rowSpan: 2,
        };
      }
      // These two are merged into above cell
      if (index === 3) {
        return {
          rowSpan: 0,
        };
      }
      if (index === 4) {
        return {
          colSpan: 0,
        };
      }
      return {};
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    onCell: sharedOnCell,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    onCell: sharedOnCell,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];
const App = () => <Table columns={columns} dataSource={data} bordered />;
export default App;
`,description:`<p>\u8868\u5934\u53EA\u652F\u6301\u5217\u5408\u5E76\uFF0C\u4F7F\u7528 column \u91CC\u7684 colSpan \u8FDB\u884C\u8BBE\u7F6E\u3002</p>
<p>\u8868\u683C\u652F\u6301\u884C/\u5217\u5408\u5E76\uFF0C\u4F7F\u7528 render \u91CC\u7684\u5355\u5143\u683C\u5C5E\u6027 colSpan \u6216\u8005 rowSpan \u8BBE\u503C\u4E3A 0 \u65F6\uFF0C\u8BBE\u7F6E\u7684\u8868\u683C\u4E0D\u4F1A\u6E32\u67D3\u3002</p>`}},{demo:{id:"components-table-demo-tree-data"},previewerProps:{title:"\u6811\u5F62\u6570\u636E\u5C55\u793A",filename:"components/table/demo/tree-data.tsx",jsx:`import React, { useState } from 'react';
import { Space, Switch, Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(\`selectedRowKeys: \${selectedRowKeys}\`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const App = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <>
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection,
          checkStrictly,
        }}
        dataSource={data}
      />
    </>
  );
};
export default App;
`,description:`<p>\u8868\u683C\u652F\u6301\u6811\u5F62\u6570\u636E\u7684\u5C55\u793A\uFF0C\u5F53\u6570\u636E\u4E2D\u6709 <code>children</code> \u5B57\u6BB5\u65F6\u4F1A\u81EA\u52A8\u5C55\u793A\u4E3A\u6811\u5F62\u8868\u683C\uFF0C\u5982\u679C\u4E0D\u9700\u8981\u6216\u914D\u7F6E\u4E3A\u5176\u4ED6\u5B57\u6BB5\u53EF\u4EE5\u7528 <code>childrenColumnName</code> \u8FDB\u884C\u914D\u7F6E\u3002</p>
<p>\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E <code>indentSize</code> \u4EE5\u63A7\u5236\u6BCF\u4E00\u5C42\u7684\u7F29\u8FDB\u5BBD\u5EA6\u3002</p>`}},{demo:{id:"components-table-demo-tree-table-ellipsis"},previewerProps:{debug:!0,title:"\u6811\u5F62\u6570\u636E\u7701\u7565\u60C5\u51B5\u6D4B\u8BD5",filename:"components/table/demo/tree-table-ellipsis.tsx",jsx:`import React, { useState } from 'react';
import { Space, Switch, Table } from 'antd';
const data = [
  {
    key: 1,
    name: 'John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr.',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr. John Brown sr.',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr. Jim Green sr. Jim Green sr. Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green. Jim Green. Jim Green. Jim Green. Jim Green. Jim Green.',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr. Jim Green jr. Jim Green jr. Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr. Jimmy Green sr. Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const App = () => {
  const [fixed, setFixed] = useState(true);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ellipsis: true,
      fixed,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        Fixed first column: <Switch checked={fixed} onChange={setFixed} />
      </Space>
      <Table
        columns={columns}
        rowSelection={{
          columnWidth: 100,
        }}
        expandable={{
          defaultExpandAllRows: true,
        }}
        dataSource={data}
      />
    </>
  );
};
export default App;
`,description:'<p><a href="https://github.com/ant-design/ant-design/issues/36583">https://github.com/ant-design/ant-design/issues/36583</a></p>'}},{demo:{id:"components-table-demo-fixed-header"},previewerProps:{title:"\u56FA\u5B9A\u8868\u5934",filename:"components/table/demo/fixed-header.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: \`Edward King \${i}\`,
    age: 32,
    address: \`London, Park Lane no. \${i}\`,
  });
}
const App = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 50,
    }}
    scroll={{
      y: 240,
    }}
  />
);
export default App;
`,description:`<p>\u65B9\u4FBF\u4E00\u9875\u5185\u5C55\u793A\u5927\u91CF\u6570\u636E\u3002</p>
<p>\u9700\u8981\u6307\u5B9A column \u7684 <code>width</code> \u5C5E\u6027\uFF0C\u5426\u5219\u5217\u5934\u548C\u5185\u5BB9\u53EF\u80FD\u4E0D\u5BF9\u9F50\u3002\u5982\u679C\u6307\u5B9A <code>width</code> \u4E0D\u751F\u6548\u6216\u51FA\u73B0\u767D\u8272\u5782\u76F4\u7A7A\u9699\uFF0C\u8BF7\u5C1D\u8BD5\u5EFA\u8BAE\u7559\u4E00\u5217\u4E0D\u8BBE\u5BBD\u5EA6\u4EE5\u9002\u5E94\u5F39\u6027\u5E03\u5C40\uFF0C\u6216\u8005\u68C0\u67E5\u662F\u5426\u6709<a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">\u8D85\u957F\u8FDE\u7EED\u5B57\u6BB5\u7834\u574F\u5E03\u5C40</a>\u3002</p>`}},{demo:{id:"components-table-demo-fixed-columns"},previewerProps:{title:"\u56FA\u5B9A\u5217",filename:"components/table/demo/fixed-columns.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];
const App = () => (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 1300,
    }}
  />
);
export default App;
`,description:`<p>\u5BF9\u4E8E\u5217\u6570\u5F88\u591A\u7684\u6570\u636E\uFF0C\u53EF\u4EE5\u56FA\u5B9A\u524D\u540E\u7684\u5217\uFF0C\u6A2A\u5411\u6EDA\u52A8\u67E5\u770B\u5176\u5B83\u6570\u636E\uFF0C\u9700\u8981\u548C <code>scroll.x</code> \u914D\u5408\u4F7F\u7528\u3002</p>
<blockquote>
<p>\u82E5\u5217\u5934\u4E0E\u5185\u5BB9\u4E0D\u5BF9\u9F50\u6216\u51FA\u73B0\u5217\u91CD\u590D\uFF0C\u8BF7\u6307\u5B9A<strong>\u56FA\u5B9A\u5217</strong>\u7684\u5BBD\u5EA6 <code>width</code>\u3002\u5982\u679C\u6307\u5B9A <code>width</code> \u4E0D\u751F\u6548\u6216\u51FA\u73B0\u767D\u8272\u5782\u76F4\u7A7A\u9699\uFF0C\u8BF7\u5C1D\u8BD5\u5EFA\u8BAE\u7559\u4E00\u5217\u4E0D\u8BBE\u5BBD\u5EA6\u4EE5\u9002\u5E94\u5F39\u6027\u5E03\u5C40\uFF0C\u6216\u8005\u68C0\u67E5\u662F\u5426\u6709<a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">\u8D85\u957F\u8FDE\u7EED\u5B57\u6BB5\u7834\u574F\u5E03\u5C40</a>\u3002</p>
<p>\u5EFA\u8BAE\u6307\u5B9A <code>scroll.x</code> \u4E3A\u5927\u4E8E\u8868\u683C\u5BBD\u5EA6\u7684\u56FA\u5B9A\u503C\u6216\u767E\u5206\u6BD4\u3002\u6CE8\u610F\uFF0C\u4E14\u975E\u56FA\u5B9A\u5217\u5BBD\u5EA6\u4E4B\u548C\u4E0D\u8981\u8D85\u8FC7 <code>scroll.x</code>\u3002</p>
</blockquote>
<p><strong>\u6CE8\u610F\uFF1Av4 \u7248\u672C\u56FA\u5B9A\u5217\u901A\u8FC7 sticky \u5B9E\u73B0\uFF0CIE 11 \u4F1A\u964D\u7EA7\u6210\u6A2A\u5411\u6EDA\u52A8\u3002</strong></p>`}},{demo:{id:"components-table-demo-fixed-columns-header"},previewerProps:{title:"\u56FA\u5B9A\u5934\u548C\u5217",filename:"components/table/demo/fixed-columns-header.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: \`Edrward \${i}\`,
    age: 32,
    address: \`London Park no. \${i}\`,
  });
}
const App = () => (
  <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 1500,
      y: 300,
    }}
  />
);
export default App;
`,description:`<p>\u9002\u5408\u540C\u65F6\u5C55\u793A\u6709\u5927\u91CF\u6570\u636E\u548C\u6570\u636E\u5217\u3002</p>
<blockquote>
<p>\u82E5\u5217\u5934\u4E0E\u5185\u5BB9\u4E0D\u5BF9\u9F50\u6216\u51FA\u73B0\u5217\u91CD\u590D\uFF0C\u8BF7\u6307\u5B9A<strong>\u56FA\u5B9A\u5217</strong>\u7684\u5BBD\u5EA6 <code>width</code>\u3002\u5982\u679C\u6307\u5B9A <code>width</code> \u4E0D\u751F\u6548\u6216\u51FA\u73B0\u767D\u8272\u5782\u76F4\u7A7A\u9699\uFF0C\u8BF7\u5C1D\u8BD5\u5EFA\u8BAE\u7559\u4E00\u5217\u4E0D\u8BBE\u5BBD\u5EA6\u4EE5\u9002\u5E94\u5F39\u6027\u5E03\u5C40\uFF0C\u6216\u8005\u68C0\u67E5\u662F\u5426\u6709<a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">\u8D85\u957F\u8FDE\u7EED\u5B57\u6BB5\u7834\u574F\u5E03\u5C40</a>\u3002</p>
<p>\u5EFA\u8BAE\u6307\u5B9A <code>scroll.x</code> \u4E3A\u5927\u4E8E\u8868\u683C\u5BBD\u5EA6\u7684\u56FA\u5B9A\u503C\u6216\u767E\u5206\u6BD4\u3002\u6CE8\u610F\uFF0C\u4E14\u975E\u56FA\u5B9A\u5217\u5BBD\u5EA6\u4E4B\u548C\u4E0D\u8981\u8D85\u8FC7 <code>scroll.x</code>\u3002</p>
</blockquote>`}},{demo:{id:"components-table-demo-grouping-columns"},previewerProps:{title:"\u8868\u5934\u5206\u7EC4",filename:"components/table/demo/grouping-columns.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}
const App = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    scroll={{
      x: 'calc(700px + 50%)',
      y: 240,
    }}
  />
);
export default App;
`,description:"<p><code>columns[n]</code> \u53EF\u4EE5\u5185\u5D4C <code>children</code>\uFF0C\u4EE5\u6E32\u67D3\u5206\u7EC4\u8868\u5934\u3002</p>"}},{demo:{id:"components-table-demo-edit-cell"},previewerProps:{title:"\u53EF\u7F16\u8F91\u5355\u5143\u683C",filename:"components/table/demo/edit-cell.tsx",jsx:`import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: \`\${title} is required.\`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: \`Edward King \${count}\`,
      age: '32',
      address: \`London, Park Lane no. \${count}\`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default App;
`,description:'<p>\u5E26\u5355\u5143\u683C\u7F16\u8F91\u529F\u80FD\u7684\u8868\u683C\u3002\u5F53\u914D\u5408 <code>shouldCellUpdate</code> \u4F7F\u7528\u65F6\u8BF7\u6CE8\u610F<a href="https://github.com/ant-design/ant-design/issues/29243">\u95ED\u5305\u95EE\u9898</a>\u3002</p>',style:`.editable-cell {
  position: relative;
}

.editable-cell-value-wrap {
  padding: 5px 12px;
  cursor: pointer;
}

.editable-row:hover .editable-cell-value-wrap {
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}

[data-theme='dark'] .editable-row:hover .editable-cell-value-wrap {
  border: 1px solid #434343;
}`}},{demo:{id:"components-table-demo-edit-row"},previewerProps:{title:"\u53EF\u7F16\u8F91\u884C",filename:"components/table/demo/edit-row.tsx",jsx:`import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: \`Edrward \${i}\`,
    age: 32,
    address: \`London Park no. \${i}\`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: \`Please Input \${title}!\`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default App;
`,description:`<p>\u5E26\u884C\u7F16\u8F91\u529F\u80FD\u7684\u8868\u683C\u3002</p>
<blockquote>
<p>\u{1F6CE}\uFE0F \u60F3\u8981 3 \u5206\u949F\u5B9E\u73B0\uFF1F\u8BD5\u8BD5 <a href="https://procomponents.ant.design/components/editable-table">ProTable \u7684\u53EF\u7F16\u8F91\u8868\u683C</a>\uFF01</p>
</blockquote>`,style:`.editable-row .ant-form-item-explain {
  position: absolute;
  top: 100%;
  font-size: 12px;
}`}},{demo:{id:"components-table-demo-nested-table"},previewerProps:{title:"\u5D4C\u5957\u5B50\u8868\u683C",filename:"components/table/demo/nested-table.tsx",jsx:`import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
const App = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        title: 'Upgrade Status',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Upgraded',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => <a>Publish</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
        size="middle"
      />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
        size="small"
      />
    </>
  );
};
export default App;
`,description:"<p>\u5C55\u793A\u6BCF\u884C\u6570\u636E\u66F4\u8BE6\u7EC6\u7684\u4FE1\u606F\u3002</p>"}},{demo:{id:"components-table-demo-drag-sorting"},previewerProps:{title:"\u62D6\u62FD\u6392\u5E8F",filename:"components/table/demo/drag-sorting.tsx",jsx:`import React, { useCallback, useRef, useState } from 'react';
import { Table } from 'antd';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const type = 'DraggableBodyRow';
const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={\`\${className}\${isOver ? dropClassName : ''}\`}
      style={{
        cursor: 'move',
        ...style,
      }}
      {...restProps}
    />
  );
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const App = () => {
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ]);
  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data],
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr;
        }}
      />
    </DndProvider>
  );
};
export default App;
`,description:'<p>\u4F7F\u7528\u81EA\u5B9A\u4E49\u5143\u7D20\uFF0C\u6211\u4EEC\u53EF\u4EE5\u96C6\u6210 <a href="https://github.com/react-dnd/react-dnd">react-dnd</a> \u6765\u5B9E\u73B0\u62D6\u62FD\u6392\u5E8F\u3002</p>',style:`#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}

#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}`}},{demo:{id:"components-table-demo-resizable-column"},previewerProps:{debug:!0,title:"\u53EF\u4F38\u7F29\u5217",filename:"components/table/demo/resizable-column.tsx",jsx:`import React, { useState } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
const App = () => {
  const [columns, setColumns] = useState([
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a>Delete</a>,
    },
  ]);
  const data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
    },
  ];
  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
    };
  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));
  return (
    <Table
      bordered
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={data}
    />
  );
};
export default App;
`,description:'<p>\u96C6\u6210 <a href="https://github.com/STRML/react-resizable">react-resizable</a> \u6765\u5B9E\u73B0\u53EF\u4F38\u7F29\u5217\u3002\u5982\u679C\u6709\u6392\u5E8F\u9700\u8981\uFF0C\u53EF\u4EE5\u901A\u8FC7<a href="https://codesandbox.io/s/zrj8xvyzxx">\u989D\u5916\u6807\u8BB0</a>\u963B\u6B62\u89E6\u53D1\u6392\u5E8F\u3002</p>',style:`#components-table-demo-resizable-column .react-resizable {
  position: relative;
  background-clip: padding-box;
}

#components-table-demo-resizable-column .react-resizable-handle {
  position: absolute;
  right: -5px;
  bottom: 0;
  z-index: 1;
  width: 10px;
  height: 100%;
  cursor: col-resize;
}`}},{demo:{id:"components-table-demo-ellipsis"},previewerProps:{title:"\u5355\u5143\u683C\u81EA\u52A8\u7701\u7565",filename:"components/table/demo/ellipsis.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;
`,description:`<p>\u8BBE\u7F6E <code>column.ellipsis</code> \u53EF\u4EE5\u8BA9\u5355\u5143\u683C\u5185\u5BB9\u6839\u636E\u5BBD\u5EA6\u81EA\u52A8\u7701\u7565\u3002</p>
<blockquote>
<p>\u5217\u5934\u7F29\u7565\u6682\u4E0D\u652F\u6301\u548C\u6392\u5E8F\u7B5B\u9009\u4E00\u8D77\u4F7F\u7528\u3002</p>
</blockquote>`}},{demo:{id:"components-table-demo-ellipsis-custom-tooltip"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5355\u5143\u683C\u7701\u7565\u63D0\u793A",filename:"components/table/demo/ellipsis-custom-tooltip.tsx",jsx:`import React from 'react';
import { Table, Tooltip } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: {
      showTitle: false,
    },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;
`,description:"<p>\u8BBE\u7F6E <code>column.ellipsis.showTitle</code> \u5173\u95ED\u5355\u5143\u683C\u5185\u5BB9\u81EA\u52A8\u7701\u7565\u540E\u9ED8\u8BA4\u7684 <code>title</code> \u63D0\u793A, \u4F7F\u7528 <code>Tooltip</code> \u66FF\u4EE3\u3002</p>"}},{demo:{id:"components-table-demo-summary"},previewerProps:{title:"\u603B\u7ED3\u680F",filename:"components/table/demo/summary.tsx",jsx:`import React from 'react';
import { Table, Typography } from 'antd';
const { Text } = Typography;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Borrow',
    dataIndex: 'borrow',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: 'Jim Green',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: 'Jim Red',
    borrow: 75,
    repayment: 45,
  },
];
const fixedColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];
const fixedData = [];
for (let i = 0; i < 20; i += 1) {
  fixedData.push({
    key: i,
    name: ['Light', 'Bamboo', 'Little'][i % 3],
    description: 'Everything that has a beginning, has an end.',
  });
}
const App = () => (
  <>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      summary={(pageData) => {
        let totalBorrow = 0;
        let totalRepayment = 0;
        pageData.forEach(({ borrow, repayment }) => {
          totalBorrow += borrow;
          totalRepayment += repayment;
        });
        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text type="danger">{totalBorrow}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text>{totalRepayment}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={2}>
                <Text type="danger">{totalBorrow - totalRepayment}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />

    <br />

    <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{
        x: 2000,
        y: 500,
      }}
      bordered
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  </>
);
export default App;
`,description:"<p>\u901A\u8FC7 <code>summary</code> \u8BBE\u7F6E\u603B\u7ED3\u680F\u3002\u4F7F\u7528 <code>Table.Summary.Cell</code> \u540C\u6B65 Column \u7684\u56FA\u5B9A\u72B6\u6001\u3002\u4F60\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E <code>Table.Summary</code> \u7684 <code>fixed</code> \u5C5E\u6027\u4F7F\u5176\u56FA\u5B9A(<code>4.16.0</code> \u652F\u6301)\u3002</p>",style:`  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme="dark"] #components-table-demo-summary tfoot th,
  [data-theme="dark"] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
  }`}},{demo:{id:"components-table-demo-virtual-list"},previewerProps:{title:"\u865A\u62DF\u5217\u8868",filename:"components/table/demo/virtual-list.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { VariableSizeGrid as Grid } from 'react-window';
const VirtualTable = (props) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });
  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });
  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };
  useEffect(() => resetVirtualGrid, [tableWidth]);
  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

// Usage
const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
  },
  {
    title: 'B',
    dataIndex: 'key',
  },
  {
    title: 'C',
    dataIndex: 'key',
  },
  {
    title: 'D',
    dataIndex: 'key',
  },
  {
    title: 'E',
    dataIndex: 'key',
    width: 200,
  },
  {
    title: 'F',
    dataIndex: 'key',
    width: 100,
  },
];
const data = Array.from(
  {
    length: 100000,
  },
  (_, key) => ({
    key,
  }),
);
const App = () => (
  <VirtualTable
    columns={columns}
    dataSource={data}
    scroll={{
      y: 300,
      x: '100vw',
    }}
  />
);
export default App;
`,description:"<p>\u901A\u8FC7 <code>react-window</code> \u5F15\u5165\u865A\u62DF\u6EDA\u52A8\u65B9\u6848\uFF0C\u5B9E\u73B0 100000 \u6761\u6570\u636E\u7684\u9AD8\u6027\u80FD\u8868\u683C\u3002</p>",style:`  .virtual-table .ant-table-container:before,
  .virtual-table .ant-table-container:after {
    display: none;
  }
  .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
    background: #FFF;
  }
 [data-theme="dark"]  .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid #303030;
    background: #141414;
  }
`}},{demo:{id:"components-table-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F",filename:"components/table/demo/responsive.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name (all screens)',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age (medium screen or bigger)',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: 'Address (large screen or bigger)',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];
const App = () => <Table columns={columns} dataSource={data} />;
export default App;
`,description:"<p>\u54CD\u5E94\u5F0F\u914D\u7F6E\u5217\u7684\u5C55\u793A\u3002</p>"}},{demo:{id:"components-table-demo-nest-table-border-debug"},previewerProps:{debug:!0,title:"\u5D4C\u5957\u5E26\u8FB9\u6846\u7684\u8868\u683C Debug",filename:"components/table/demo/nest-table-border-debug.tsx",jsx:`import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Form, Space, Switch, Table } from 'antd';
const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
const App = () => {
  const createExpandedRowRender = (bordered) => () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        title: 'Upgrade Status',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} bordered={bordered} />;
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Upgraded',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => <a>Publish</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  const [rootTableBordered, setRootTableBordered] = useState(true);
  const [childTableBordered, setChildTableBordered] = useState(true);
  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
        <Form.Item label="Root Table Bordered">
          <Switch checked={rootTableBordered} onChange={(v) => setRootTableBordered(v)} />
        </Form.Item>
        <Form.Item label="Child Table Bordered">
          <Switch checked={childTableBordered} onChange={(v) => setChildTableBordered(v)} />
        </Form.Item>
      </Form>
      <Table
        title={() => 'cool'}
        footer={() => 'cool'}
        columns={columns}
        expandable={{
          expandedRowRender: createExpandedRowRender(childTableBordered),
        }}
        dataSource={data}
        bordered={rootTableBordered}
      />
    </>
  );
};
export default App;
`,description:"<p>\u770B\u770B\u8FB9\u6846\u7684\u6837\u5F0F\u662F\u4E0D\u662F\u5F71\u54CD\u5230\u522B\u7684\u8868\u683C\u3002</p>"}},{demo:{id:"components-table-demo-pagination"},previewerProps:{title:"\u5206\u9875\u8BBE\u7F6E",filename:"components/table/demo/pagination.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
const topOptions = [
  {
    label: 'topLeft',
    value: 'topLeft',
  },
  {
    label: 'topCenter',
    value: 'topCenter',
  },
  {
    label: 'topRight',
    value: 'topRight',
  },
  {
    label: 'none',
    value: 'none',
  },
];
const bottomOptions = [
  {
    label: 'bottomLeft',
    value: 'bottomLeft',
  },
  {
    label: 'bottomCenter',
    value: 'bottomCenter',
  },
  {
    label: 'bottomRight',
    value: 'bottomRight',
  },
  {
    label: 'none',
    value: 'none',
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const App = () => {
  const [top, setTop] = useState('topLeft');
  const [bottom, setBottom] = useState('bottomRight');
  return (
    <div>
      <div>
        <Radio.Group
          style={{
            marginBottom: 10,
          }}
          options={topOptions}
          value={top}
          onChange={(e) => {
            setTop(e.target.value);
          }}
        />
      </div>
      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        options={bottomOptions}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      <Table
        columns={columns}
        pagination={{
          position: [top, bottom],
        }}
        dataSource={data}
      />
    </div>
  );
};
export default App;
`,description:"<p>\u8868\u683C\u7684\u5206\u9875\u8BBE\u7F6E\u3002</p>"}},{demo:{id:"components-table-demo-row-selection-custom-debug"},previewerProps:{debug:!0,title:"\u81EA\u5B9A\u4E49\u9009\u62E9\u9879\u7EC4",filename:"components/table/demo/row-selection-custom-debug.tsx",jsx:`import React from 'react';
import { Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: i % 2 === 0 ? \`Edward King \${i}\` : 'Another Row',
  });
}
const App = () => {
  const rowSelection = {
    renderCell: (checked, _record, index, node) => ({
      props: {
        rowSpan: index % 2 === 0 ? 2 : 0,
      },
      children: (
        <>
          {String(checked)}: {node}
        </>
      ),
    }),
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u9009\u9879\u5206\u7EC4\u3002</p>"}},{demo:{id:"components-table-demo-sticky"},previewerProps:{title:"\u968F\u9875\u9762\u6EDA\u52A8\u7684\u56FA\u5B9A\u8868\u5934\u548C\u6EDA\u52A8\u6761",filename:"components/table/demo/sticky.tsx",jsx:`import React, { useState } from 'react';
import { Switch, Table } from 'antd';
const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: \`Edrward \${i}\`,
    age: 32,
    address: \`London Park no. \${i}\`,
  });
}
const App = () => {
  const [fixedTop, setFixedTop] = useState(false);
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
      }}
      summary={() => (
        <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={8}>
              Scroll Context
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      sticky
    />
  );
};
export default App;
`,description:"<p>\u5BF9\u4E8E\u957F\u8868\u683C\uFF0C\u9700\u8981\u6EDA\u52A8\u624D\u80FD\u67E5\u770B\u8868\u5934\u548C\u6EDA\u52A8\u6761\uFF0C\u90A3\u4E48\u73B0\u5728\u53EF\u4EE5\u8BBE\u7F6E\u8DDF\u968F\u9875\u9762\u56FA\u5B9A\u8868\u5934\u548C\u6EDA\u52A8\u6761\u3002</p>"}},{demo:{id:"components-table-demo-dynamic-settings"},previewerProps:{title:"\u52A8\u6001\u63A7\u5236\u8868\u683C\u5C5E\u6027",filename:"components/table/demo/dynamic-settings.tsx",jsx:`import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Switch, Table } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];
const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: Number(\`\${i}2\`),
    address: \`New York No. \${i} Lake Park\`,
    description: \`My name is John Brown, I am \${i}2 years old, living in New York No. \${i} Lake Park.\`,
  });
}
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';
const App = () => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('large');
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(undefined);
  const handleBorderChange = (enable) => {
    setBordered(enable);
  };
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };
  return (
    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
        <Form.Item label="Bordered">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item>
        <Form.Item label="loading">
          <Switch checked={loading} onChange={handleLoadingChange} />
        </Form.Item>
        <Form.Item label="Title">
          <Switch checked={showTitle} onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Column Header">
          <Switch checked={showHeader} onChange={handleHeaderChange} />
        </Form.Item>
        <Form.Item label="Footer">
          <Switch checked={showfooter} onChange={handleFooterChange} />
        </Form.Item>
        <Form.Item label="Expandable">
          <Switch checked={!!expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="Checkbox">
          <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="Has Data">
          <Switch checked={!!hasData} onChange={handleDataChange} />
        </Form.Item>
        <Form.Item label="Ellipsis">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item>
        <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Layout">
          <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
            <Radio.Button value={undefined}>Unset</Radio.Button>
            <Radio.Button value="fixed">Fixed</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Top">
          <Radio.Group
            value={top}
            onChange={(e) => {
              setTop(e.target.value);
            }}
          >
            <Radio.Button value="topLeft">TopLeft</Radio.Button>
            <Radio.Button value="topCenter">TopCenter</Radio.Button>
            <Radio.Button value="topRight">TopRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Bottom">
          <Radio.Group
            value={bottom}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
          >
            <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
            <Radio.Button value="bottomRight">BottomRight</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
  );
};
export default App;
`,description:"<p>\u9009\u62E9\u4E0D\u540C\u914D\u7F6E\u7EC4\u5408\u67E5\u770B\u6548\u679C\u3002</p>",style:`.components-table-demo-control-bar .ant-form-item {
  margin-right: 16px !important;
  margin-bottom: 8px !important;
}`}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"table"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#table"},(0,n.tZ)("span",{className:"icon icon-link"})),"Table"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[16].value),(0,n.tZ)("th",null,e[17].value),(0,n.tZ)("th",null,e[18].value),(0,n.tZ)("th",null,e[19].value),(0,n.tZ)("th",null,e[20].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#Column"},e[27].value),e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/react-component/table/blob/75ee0064e54a4b3215694505870c9d6c817e9e4a/src/interface.ts#L129"},e[32].value)),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#expandable"},e[40].value)),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value,(0,n.tZ)(a.rU,{to:"/components/spin/#API"},e[53].value)),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/6dae4a7e18ad1ba193aedd5ab6867e1d823e2aa4/components/locale/zh_CN.tsx#L20-L37"},e[58].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value,(0,n.tZ)(a.rU,{to:"#pagination"},e[61].value),e[62].value,(0,n.tZ)(a.rU,{to:"/components/pagination/"},e[63].value),e[64].value),(0,n.tZ)("td",null,e[65].value,(0,n.tZ)("code",null,e[66].value)),(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[75].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value,(0,n.tZ)(a.rU,{to:"#rowSelection"},e[78].value)),(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value,(0,n.tZ)(a.rU,{to:"#scroll"},e[83].value)),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value,(0,n.tZ)(a.rU,{to:"/components/tooltip/"},e[93].value)),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[97].value),e[98].value,(0,n.tZ)("code",null,e[99].value),e[100].value,(0,n.tZ)("code",null,e[101].value)),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value,(0,n.tZ)("code",null,e[105].value),e[106].value,(0,n.tZ)("code",null,e[107].value)),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,e[109].value,(0,n.tZ)("code",null,e[110].value),e[111].value,(0,n.tZ)("code",null,e[112].value),e[113].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value,(0,n.tZ)("code",null,e[117].value)),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout"},e[126].value),e[127].value,(0,n.tZ)("code",null,e[128].value),e[129].value),(0,n.tZ)("td",null,e[130].value,(0,n.tZ)("code",null,e[131].value),e[132].value,(0,n.tZ)("code",null,e[133].value)),(0,n.tZ)("td",null,e[134].value,(0,n.tZ)("hr",null),e[135].value,(0,n.tZ)("code",null,e[136].value),e[137].value,(0,n.tZ)("code",null,e[138].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null,e[142].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[143].value),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value,(0,n.tZ)("code",null,e[146].value),e[147].value,(0,n.tZ)("code",null,e[148].value),e[149].value,(0,n.tZ)("code",null,e[150].value),e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null,e[159].value),(0,n.tZ)("td",null,e[160].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"onrow-\u7528\u6CD5"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#onrow-\u7528\u6CD5"},(0,n.tZ)("span",{className:"icon icon-link"})),"onRow \u7528\u6CD5"),(0,n.tZ)("p",null,e[161].value,(0,n.tZ)("code",null,e[162].value),e[163].value,(0,n.tZ)("code",null,e[164].value),e[165].value,(0,n.tZ)("code",null,e[166].value),e[167].value,(0,n.tZ)("code",null,e[168].value),e[169].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[170].value),(0,n.tZ)("h3",{id:"column"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#column"},(0,n.tZ)("span",{className:"icon icon-link"})),"Column"),(0,n.tZ)("p",null,e[171].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[172].value),(0,n.tZ)("th",null,e[173].value),(0,n.tZ)("th",null,e[174].value),(0,n.tZ)("th",null,e[175].value),(0,n.tZ)("th",null,e[176].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[177].value),(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[179].value),e[180].value,(0,n.tZ)("code",null,e[181].value),e[182].value,(0,n.tZ)("code",null,e[183].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[184].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[201].value),(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[205].value),(0,n.tZ)("td",null,e[206].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[207].value),e[208].value,(0,n.tZ)("code",null,e[209].value)),(0,n.tZ)("td",null,e[210].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[211].value),(0,n.tZ)("td",null,e[212].value,(0,n.tZ)("br",null),e[213].value,(0,n.tZ)("code",null,e[214].value),e[215].value,(0,n.tZ)("code",null,e[216].value),e[217].value,(0,n.tZ)("code",null,e[218].value),e[219].value),(0,n.tZ)("td",null,e[220].value),(0,n.tZ)("td",null,e[221].value),(0,n.tZ)("td",null,e[222].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null,e[224].value),(0,n.tZ)("td",null,e[225].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/ecc54dda839619e921c0ace530408871f0281c2a/components/table/interface.tsx#L79"},e[226].value),e[227].value),(0,n.tZ)("td",null,e[228].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[229].value),(0,n.tZ)("td",null,e[230].value),(0,n.tZ)("td",null,e[231].value),(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[241].value),(0,n.tZ)("td",null,e[242].value),(0,n.tZ)("td",null,e[243].value),(0,n.tZ)("td",null,e[244].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[245].value),(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[249].value),(0,n.tZ)("td",null,e[250].value),(0,n.tZ)("td",null,e[251].value),(0,n.tZ)("td",null,e[252].value),(0,n.tZ)("td",null,e[253].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[254].value),(0,n.tZ)("td",null,e[255].value),(0,n.tZ)("td",null,e[256].value),(0,n.tZ)("td",null,e[257].value),(0,n.tZ)("td",null,e[258].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[259].value),(0,n.tZ)("td",null,e[260].value),(0,n.tZ)("td",null,e[261].value),(0,n.tZ)("td",null,e[262].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[263].value),(0,n.tZ)("td",null,e[264].value,(0,n.tZ)("code",null,e[265].value),e[266].value,(0,n.tZ)("code",null,e[267].value)),(0,n.tZ)("td",null,e[268].value),(0,n.tZ)("td",null,e[269].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[270].value),(0,n.tZ)("td",null,e[271].value,(0,n.tZ)("code",null,e[272].value),e[273].value),(0,n.tZ)("td",null,e[274].value),(0,n.tZ)("td",null,e[275].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[276].value),(0,n.tZ)("td",null,e[277].value),(0,n.tZ)("td",null,e[278].value),(0,n.tZ)("td",null,e[279].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[280].value),(0,n.tZ)("td",null,e[281].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1"},e[282].value),e[283].value),(0,n.tZ)("td",null,e[284].value),(0,n.tZ)("td",null,e[285].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[286].value),(0,n.tZ)("td",null,e[287].value),(0,n.tZ)("td",null,e[288].value),(0,n.tZ)("td",null,e[289].value),(0,n.tZ)("td",null,e[290].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[291].value),(0,n.tZ)("td",null,e[292].value,(0,n.tZ)("code",null,e[293].value)),(0,n.tZ)("td",null,e[294].value,(0,n.tZ)(a.rU,{to:"/components/tooltip/#API"},e[295].value)),(0,n.tZ)("td",null,e[296].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[297].value),(0,n.tZ)("td",null,e[298].value,(0,n.tZ)("code",null,e[299].value),e[300].value,(0,n.tZ)("code",null,e[301].value),e[302].value,(0,n.tZ)("code",null,e[303].value),e[304].value,(0,n.tZ)("code",null,e[305].value)),(0,n.tZ)("td",null,e[306].value),(0,n.tZ)("td",null,e[307].value,(0,n.tZ)("code",null,e[308].value),e[309].value,(0,n.tZ)("code",null,e[310].value),e[311].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[312].value),(0,n.tZ)("td",null,e[313].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"},e[314].value),e[315].value),(0,n.tZ)("td",null,e[316].value),(0,n.tZ)("td",null,e[317].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[318].value),(0,n.tZ)("td",null,e[319].value,(0,n.tZ)("code",null,e[320].value),e[321].value,(0,n.tZ)("code",null,e[322].value),e[323].value,(0,n.tZ)("code",null,e[324].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[325].value),e[326].value,(0,n.tZ)("code",null,e[327].value),e[328].value),(0,n.tZ)("td",null,e[329].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[330].value),(0,n.tZ)("td",null,e[331].value,(0,n.tZ)("code",null,e[332].value),e[333].value),(0,n.tZ)("td",null,e[334].value),(0,n.tZ)("td",null,e[335].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[336].value),(0,n.tZ)("td",null,e[337].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241"},e[338].value),e[339].value),(0,n.tZ)("td",null,e[340].value),(0,n.tZ)("td",null,e[341].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[342].value),(0,n.tZ)("td",null,e[343].value),(0,n.tZ)("td",null,e[344].value),(0,n.tZ)("td",null,e[345].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[346].value),(0,n.tZ)("td",null,e[347].value),(0,n.tZ)("td",null,e[348].value),(0,n.tZ)("td",null,e[349].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[350].value),(0,n.tZ)("td",null,e[351].value),(0,n.tZ)("td",null,e[352].value),(0,n.tZ)("td",null,e[353].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[354].value),(0,n.tZ)("td",null,e[355].value),(0,n.tZ)("td",null,e[356].value),(0,n.tZ)("td",null,e[357].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"columngroup"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#columngroup"},(0,n.tZ)("span",{className:"icon icon-link"})),"ColumnGroup"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[358].value),(0,n.tZ)("th",null,e[359].value),(0,n.tZ)("th",null,e[360].value),(0,n.tZ)("th",null,e[361].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[362].value),(0,n.tZ)("td",null,e[363].value),(0,n.tZ)("td",null,e[364].value),(0,n.tZ)("td",null,e[365].value)))),(0,n.tZ)("h3",{id:"pagination"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#pagination"},(0,n.tZ)("span",{className:"icon icon-link"})),"pagination"),(0,n.tZ)("p",null,e[366].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[367].value),(0,n.tZ)("th",null,e[368].value),(0,n.tZ)("th",null,e[369].value),(0,n.tZ)("th",null,e[370].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[371].value),(0,n.tZ)("td",null,e[372].value,(0,n.tZ)("code",null,e[373].value),e[374].value,(0,n.tZ)("code",null,e[375].value),e[376].value,(0,n.tZ)("code",null,e[377].value),e[378].value,(0,n.tZ)("code",null,e[379].value),e[380].value,(0,n.tZ)("code",null,e[381].value),e[382].value,(0,n.tZ)("code",null,e[383].value)),(0,n.tZ)("td",null,e[384].value),(0,n.tZ)("td",null,e[385].value,(0,n.tZ)("code",null,e[386].value),e[387].value)))),(0,n.tZ)("p",null,e[388].value,(0,n.tZ)(a.rU,{to:"/components/pagination/"},(0,n.tZ)("code",null,e[389].value)),e[390].value),(0,n.tZ)("h3",{id:"expandable"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#expandable"},(0,n.tZ)("span",{className:"icon icon-link"})),"expandable"),(0,n.tZ)("p",null,e[391].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[392].value),(0,n.tZ)("th",null,e[393].value),(0,n.tZ)("th",null,e[394].value),(0,n.tZ)("th",null,e[395].value),(0,n.tZ)("th",null,e[396].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[397].value),(0,n.tZ)("td",null,e[398].value),(0,n.tZ)("td",null,e[399].value),(0,n.tZ)("td",null,e[400].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[401].value),(0,n.tZ)("td",null,e[402].value),(0,n.tZ)("td",null,e[403].value),(0,n.tZ)("td",null,e[404].value),(0,n.tZ)("td",null,e[405].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[406].value),(0,n.tZ)("td",null,e[407].value),(0,n.tZ)("td",null,e[408].value),(0,n.tZ)("td",null,e[409].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[410].value),(0,n.tZ)("td",null,e[411].value),(0,n.tZ)("td",null,e[412].value),(0,n.tZ)("td",null,e[413].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[414].value),(0,n.tZ)("td",null,e[415].value),(0,n.tZ)("td",null,e[416].value),(0,n.tZ)("td",null,e[417].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[418].value),(0,n.tZ)("td",null,e[419].value),(0,n.tZ)("td",null,e[420].value),(0,n.tZ)("td",null,e[421].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[422].value),(0,n.tZ)("td",null,e[423].value),(0,n.tZ)("td",null,e[424].value),(0,n.tZ)("td",null,e[425].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[426].value),(0,n.tZ)("td",null,e[427].value),(0,n.tZ)("td",null,e[428].value),(0,n.tZ)("td",null,e[429].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[430].value),(0,n.tZ)("td",null,e[431].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/fervent-bird-nuzpr"},e[432].value)),(0,n.tZ)("td",null,e[433].value),(0,n.tZ)("td",null,e[434].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[435].value),(0,n.tZ)("td",null,e[436].value),(0,n.tZ)("td",null,e[437].value),(0,n.tZ)("td",null,e[438].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[439].value),(0,n.tZ)("td",null,e[440].value,(0,n.tZ)("code",null,e[441].value),e[442].value,(0,n.tZ)("code",null,e[443].value)),(0,n.tZ)("td",null,e[444].value),(0,n.tZ)("td",null,e[445].value),(0,n.tZ)("td",null,e[446].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[447].value),(0,n.tZ)("td",null,e[448].value),(0,n.tZ)("td",null,e[449].value),(0,n.tZ)("td",null,e[450].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[451].value),(0,n.tZ)("td",null,e[452].value),(0,n.tZ)("td",null,e[453].value),(0,n.tZ)("td",null,e[454].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[455].value),(0,n.tZ)("td",null,e[456].value),(0,n.tZ)("td",null,e[457].value),(0,n.tZ)("td",null,e[458].value),(0,n.tZ)("td",null,e[459].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[460].value),(0,n.tZ)("td",null,e[461].value),(0,n.tZ)("td",null,e[462].value),(0,n.tZ)("td",null,e[463].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[464].value),(0,n.tZ)("td",null,e[465].value),(0,n.tZ)("td",null,e[466].value),(0,n.tZ)("td",null,e[467].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"rowselection"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rowselection"},(0,n.tZ)("span",{className:"icon icon-link"})),"rowSelection"),(0,n.tZ)("p",null,e[468].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[469].value),(0,n.tZ)("th",null,e[470].value),(0,n.tZ)("th",null,e[471].value),(0,n.tZ)("th",null,e[472].value),(0,n.tZ)("th",null,e[473].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[474].value),(0,n.tZ)("td",null,e[475].value),(0,n.tZ)("td",null,e[476].value),(0,n.tZ)("td",null,e[477].value),(0,n.tZ)("td",null,e[478].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[479].value),(0,n.tZ)("td",null,e[480].value),(0,n.tZ)("td",null,e[481].value),(0,n.tZ)("td",null,e[482].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[483].value),(0,n.tZ)("td",null,e[484].value),(0,n.tZ)("td",null,e[485].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[486].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[487].value),(0,n.tZ)("td",null,e[488].value),(0,n.tZ)("td",null,e[489].value),(0,n.tZ)("td",null,e[490].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[491].value),(0,n.tZ)("td",null,e[492].value),(0,n.tZ)("td",null,e[493].value),(0,n.tZ)("td",null,e[494].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[495].value),(0,n.tZ)("td",null,e[496].value),(0,n.tZ)("td",null,e[497].value),(0,n.tZ)("td",null,e[498].value),(0,n.tZ)("td",null,e[499].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[500].value),(0,n.tZ)("td",null,e[501].value,(0,n.tZ)("code",null,e[502].value)),(0,n.tZ)("td",null,e[503].value),(0,n.tZ)("td",null,e[504].value),(0,n.tZ)("td",null,e[505].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[506].value),(0,n.tZ)("td",null,e[507].value,(0,n.tZ)("code",null,e[508].value),e[509].value),(0,n.tZ)("td",null,e[510].value),(0,n.tZ)("td",null,e[511].value),(0,n.tZ)("td",null,e[512].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[513].value),(0,n.tZ)("td",null,e[514].value),(0,n.tZ)("td",null,e[515].value),(0,n.tZ)("td",null,e[516].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[517].value),(0,n.tZ)("td",null,e[518].value),(0,n.tZ)("td",null,e[519].value),(0,n.tZ)("td",null,e[520].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[521].value),(0,n.tZ)("td",null,e[522].value,(0,n.tZ)(a.rU,{to:"#selection"},e[523].value),e[524].value,(0,n.tZ)("code",null,e[525].value),e[526].value),(0,n.tZ)("td",null,e[527].value),(0,n.tZ)("td",null,e[528].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[529].value),(0,n.tZ)("td",null,e[530].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[531].value),e[532].value,(0,n.tZ)("code",null,e[533].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[534].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[535].value),(0,n.tZ)("td",null,e[536].value),(0,n.tZ)("td",null,e[537].value),(0,n.tZ)("td",null,e[538].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[539].value),e[540].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[541].value),(0,n.tZ)("td",null,e[542].value),(0,n.tZ)("td",null,e[543].value),(0,n.tZ)("td",null,e[544].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[545].value),(0,n.tZ)("td",null,e[546].value),(0,n.tZ)("td",null,e[547].value),(0,n.tZ)("td",null,e[548].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[549].value),(0,n.tZ)("td",null,e[550].value),(0,n.tZ)("td",null,e[551].value),(0,n.tZ)("td",null,e[552].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[553].value),(0,n.tZ)("td",null,e[554].value),(0,n.tZ)("td",null,e[555].value),(0,n.tZ)("td",null,e[556].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[557].value),(0,n.tZ)("td",null,e[558].value),(0,n.tZ)("td",null,e[559].value),(0,n.tZ)("td",null,e[560].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"scroll"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#scroll"},(0,n.tZ)("span",{className:"icon icon-link"})),"scroll"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[561].value),(0,n.tZ)("th",null,e[562].value),(0,n.tZ)("th",null,e[563].value),(0,n.tZ)("th",null,e[564].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[565].value),(0,n.tZ)("td",null,e[566].value),(0,n.tZ)("td",null,e[567].value),(0,n.tZ)("td",null,e[568].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[569].value),(0,n.tZ)("td",null,e[570].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/width#max-content"},e[571].value)),(0,n.tZ)("td",null,e[572].value),(0,n.tZ)("td",null,e[573].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[574].value),(0,n.tZ)("td",null,e[575].value),(0,n.tZ)("td",null,e[576].value),(0,n.tZ)("td",null,e[577].value)))),(0,n.tZ)("h3",{id:"selection"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#selection"},(0,n.tZ)("span",{className:"icon icon-link"})),"selection"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[578].value),(0,n.tZ)("th",null,e[579].value),(0,n.tZ)("th",null,e[580].value),(0,n.tZ)("th",null,e[581].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[582].value),(0,n.tZ)("td",null,e[583].value),(0,n.tZ)("td",null,e[584].value),(0,n.tZ)("td",null,e[585].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[586].value),(0,n.tZ)("td",null,e[587].value),(0,n.tZ)("td",null,e[588].value),(0,n.tZ)("td",null,e[589].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[590].value),(0,n.tZ)("td",null,e[591].value),(0,n.tZ)("td",null,e[592].value),(0,n.tZ)("td",null,e[593].value)))),(0,n.tZ)("h2",{id:"\u5728-typescript-\u4E2D\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5728-typescript-\u4E2D\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5728 TypeScript \u4E2D\u4F7F\u7528"),(0,n.tZ)(o.Z,{lang:"tsx"},e[594].value),(0,n.tZ)("p",null,e[595].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/serene-platform-0jo5t"},e[596].value),e[597].value),(0,n.tZ)("h2",{id:"\u6CE8\u610F"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u6CE8\u610F"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u6CE8\u610F"),(0,n.tZ)("p",null,e[598].value,(0,n.tZ)("a",{href:"https://zh-hans.reactjs.org/docs/lists-and-keys.html#keys"},e[599].value),e[600].value,(0,n.tZ)("code",null,e[601].value),e[602].value,(0,n.tZ)("code",null,e[603].value),e[604].value,(0,n.tZ)("code",null,e[605].value),e[606].value,(0,n.tZ)("code",null,e[607].value),e[608].value,(0,n.tZ)("code",null,e[609].value),e[610].value,(0,n.tZ)("code",null,e[611].value),e[612].value),(0,n.tZ)("p",null,(0,n.tZ)("img",{src:"https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png",alt:"\u63A7\u5236\u53F0\u8B66\u544A"})),(0,n.tZ)("p",null,e[613].value,(0,n.tZ)("code",null,e[614].value),e[615].value,(0,n.tZ)("code",null,e[616].value),e[617].value,(0,n.tZ)("code",null,e[618].value),e[619].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[620].value),(0,n.tZ)("h2",{id:"\u4ECE-v3-\u5347\u7EA7\u5230-v4"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4ECE-v3-\u5347\u7EA7\u5230-v4"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4ECE v3 \u5347\u7EA7\u5230 v4"),(0,n.tZ)("p",null,e[621].value,(0,n.tZ)("code",null,e[622].value),e[623].value,(0,n.tZ)("code",null,e[624].value),e[625].value,(0,n.tZ)("code",null,e[626].value),e[627].value,(0,n.tZ)("code",null,e[628].value),e[629].value),(0,n.tZ)("p",null,e[630].value,(0,n.tZ)("code",null,e[631].value),e[632].value,(0,n.tZ)("code",null,e[633].value),e[634].value,(0,n.tZ)("code",null,e[635].value),e[636].value,(0,n.tZ)("code",null,e[637].value),e[638].value),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u5982\u4F55\u5728\u6CA1\u6709\u6570\u636E\u6216\u53EA\u6709\u4E00\u9875\u6570\u636E\u65F6\u9690\u85CF\u5206\u9875\u680F"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u5728\u6CA1\u6709\u6570\u636E\u6216\u53EA\u6709\u4E00\u9875\u6570\u636E\u65F6\u9690\u85CF\u5206\u9875\u680F"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u5728\u6CA1\u6709\u6570\u636E\u6216\u53EA\u6709\u4E00\u9875\u6570\u636E\u65F6\u9690\u85CF\u5206\u9875\u680F"),(0,n.tZ)("p",null,e[639].value,(0,n.tZ)("code",null,e[640].value),e[641].value,(0,n.tZ)("code",null,e[642].value),e[643].value,(0,n.tZ)("code",null,e[644].value),e[645].value),(0,n.tZ)("h3",{id:"\u8868\u683C\u8FC7\u6EE4\u65F6\u4F1A\u56DE\u5230\u7B2C\u4E00\u9875"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u8868\u683C\u8FC7\u6EE4\u65F6\u4F1A\u56DE\u5230\u7B2C\u4E00\u9875"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u8868\u683C\u8FC7\u6EE4\u65F6\u4F1A\u56DE\u5230\u7B2C\u4E00\u9875\uFF1F"),(0,n.tZ)("p",null,e[646].value),(0,n.tZ)("p",null,e[647].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/yuanchengjiazaishuju-ant-design-demo-7y2uf"},e[648].value),e[649].value),(0,n.tZ)("h3",{id:"\u8868\u683C\u5206\u9875\u4E3A\u4F55\u4F1A\u51FA\u73B0-size-\u5207\u6362\u5668"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u8868\u683C\u5206\u9875\u4E3A\u4F55\u4F1A\u51FA\u73B0-size-\u5207\u6362\u5668"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u8868\u683C\u5206\u9875\u4E3A\u4F55\u4F1A\u51FA\u73B0 size \u5207\u6362\u5668\uFF1F"),(0,n.tZ)("p",null,e[650].value,(0,n.tZ)("code",null,e[651].value),e[652].value,(0,n.tZ)("code",null,e[653].value),e[654].value,(0,n.tZ)("code",null,e[655].value),e[656].value,(0,n.tZ)("code",null,e[657].value),e[658].value),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48-\u66F4\u65B0-state-\u4F1A\u5BFC\u81F4\u5168\u8868\u6E32\u67D3"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-\u66F4\u65B0-state-\u4F1A\u5BFC\u81F4\u5168\u8868\u6E32\u67D3"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 \u66F4\u65B0 state \u4F1A\u5BFC\u81F4\u5168\u8868\u6E32\u67D3\uFF1F"),(0,n.tZ)("p",null,e[659].value,(0,n.tZ)("code",null,e[660].value),e[661].value,(0,n.tZ)("code",null,e[662].value),e[663].value,(0,n.tZ)("code",null,e[664].value),e[665].value),(0,n.tZ)("h3",{id:"\u56FA\u5B9A\u5217\u7A7F\u900F\u5230\u6700\u4E0A\u5C42\u8BE5\u600E\u4E48\u529E"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u56FA\u5B9A\u5217\u7A7F\u900F\u5230\u6700\u4E0A\u5C42\u8BE5\u600E\u4E48\u529E"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u56FA\u5B9A\u5217\u7A7F\u900F\u5230\u6700\u4E0A\u5C42\u8BE5\u600E\u4E48\u529E\uFF1F"),(0,n.tZ)("p",null,e[666].value,(0,n.tZ)("code",null,e[667].value),e[668].value,(0,n.tZ)("code",null,e[669].value),e[670].value),(0,n.tZ)("h3",{id:"\u5982\u4F55\u81EA\u5B9A\u4E49\u6E32\u67D3\u53EF\u9009\u5217\u7684\u52FE\u9009\u6846\u6BD4\u5982\u589E\u52A0-tooltip"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u81EA\u5B9A\u4E49\u6E32\u67D3\u53EF\u9009\u5217\u7684\u52FE\u9009\u6846\u6BD4\u5982\u589E\u52A0-tooltip"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u81EA\u5B9A\u4E49\u6E32\u67D3\u53EF\u9009\u5217\u7684\u52FE\u9009\u6846\uFF08\u6BD4\u5982\u589E\u52A0 Tooltip\uFF09\uFF1F"),(0,n.tZ)("p",null,e[671].value,(0,n.tZ)("code",null,e[672].value),e[673].value,(0,n.tZ)("a",{href:"https://ant.design/components/table-cn/#rowSelection"},e[674].value),e[675].value,(0,n.tZ)("code",null,e[676].value),e[677].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/table-row-tooltip-v79j2v"},e[678].value),e[679].value))))}d.default=s}}]);
