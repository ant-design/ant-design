"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7812],{92562:function(c,d,t){t.r(d);var m=t(2143),p=t(50250),h=t(59378),v=t(78190),o=t(74775),l=t(5937),g=t(2068),Z=t(74399),b=t(46004),x=t(35708),f=t(30138),k=t(56140),r=t(5388),y=t(49545),w=t(92169),S=t(13140),I=t(95127),C=t(74418),T=t(97119),a=t(28257),s=t(67294),n=t(13946);function i(){var u=(0,a.eL)(),e=u.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value)),(0,n.tZ)("h2",{id:"how-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"How To Use"),(0,n.tZ)("p",null,e[3].value,(0,n.tZ)("code",null,e[4].value),e[5].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[6].value),(0,n.tZ)("h2",{id:"promotion"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#promotion"},(0,n.tZ)("span",{className:"icon icon-link"})),"Promotion"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://kitchen.alipay.com"},e[7].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://procomponents.ant.design/en-US/components/table"},e[8].value)),(0,n.tZ)("li",null,(0,n.tZ)("a",{href:"https://github.com/antvis/s2/"},e[9].value))),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-table-demo-basic"},previewerProps:{title:"Basic Usage",filename:"components/table/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>Simple table with actions.</p>"}},{demo:{id:"components-table-demo-jsx"},previewerProps:{title:"JSX style API",filename:"components/table/demo/jsx.tsx",jsx:`import React from 'react';
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
`,description:`<p>Using JSX style API (introduced in 2.5.0)</p>
<blockquote>
<p>Since this is just a syntax sugar for the prop <code>columns</code>, you can't compose <code>Column</code> and <code>ColumnGroup</code> with other Components.</p>
</blockquote>`}},{demo:{id:"components-table-demo-row-selection"},previewerProps:{title:"selection",filename:"components/table/demo/row-selection.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p>Rows can be selectable by making first column as a selectable column. You can use <code>rowSelection.type</code> to set selection type. Default is <code>checkbox</code>.</p>
<blockquote>
<p>selection happens when clicking checkbox by default. You can see <a href="https://codesandbox.io/s/000vqw38rl">https://codesandbox.io/s/000vqw38rl</a> if you need row-click selection behavior.</p>
</blockquote>`}},{demo:{id:"components-table-demo-row-selection-and-operation"},previewerProps:{title:"Selection and operation",filename:"components/table/demo/row-selection-and-operation.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>To perform operations and clear selections after selecting some rows, use <code>rowSelection.selectedRowKeys</code> to control selected rows.</p>"}},{demo:{id:"components-table-demo-row-selection-custom"},previewerProps:{title:"Custom selection",filename:"components/table/demo/row-selection-custom.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Use <code>rowSelection.selections</code> custom selections, default no select dropdown, show default selections via setting to <code>true</code>.</p>"}},{demo:{id:"components-table-demo-head"},previewerProps:{title:"Filter and sorter",filename:"components/table/demo/head.tsx",jsx:`import React from 'react';
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
`,description:`<p>Use <code>filters</code> to generate filter menu in columns, <code>onFilter</code> to determine filtered result, and <code>filterMultiple</code> to indicate whether it's multiple or single selection.</p>
<p>Uses <code>defaultFilteredValue</code> to make a column filtered by default.</p>
<p>Use <code>sorter</code> to make a column sortable. <code>sorter</code> can be a function of the type <code>function(a, b) { ... }</code> for sorting data locally.</p>
<p><code>sortDirections: ['ascend' | 'descend']</code> defines available sort methods for each columns, effective for all columns when set on table props. You can set as <code>['ascend', 'descend', 'ascend']</code> to prevent sorter back to default status.</p>
<p>Uses <code>defaultSortOrder</code> to make a column sorted by default.</p>
<p>If a <code>sortOrder</code> or <code>defaultSortOrder</code> is specified with the value <code>ascend</code> or <code>descend</code>, you can access this value from within the function passed to the <code>sorter</code> as explained above. Such a function can take the form: <code>function(a, b, sortOrder) { ... }</code>.</p>`}},{demo:{id:"components-table-demo-filter-in-tree"},previewerProps:{title:"Filter in Tree",filename:"components/table/demo/filter-in-tree.tsx",jsx:`import React from 'react';
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
`,description:`<p>You can use <code>filterMode</code> to change default filter interface, options: <code>menu</code>(default) and <code>tree</code>.</p>
<blockquote>
<p><code>filterSearch</code> is used for making filter dropdown items searchable.</p>
</blockquote>`}},{demo:{id:"components-table-demo-filter-search"},previewerProps:{title:"Filter search",filename:"components/table/demo/filter-search.tsx",jsx:`import React from 'react';
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
`,description:"<p><code>filterSearch</code> is used to enable search of filter items, and you can set a custom filter method through <code>filterSearch:(input, record) => boolean</code>.</p>"}},{demo:{id:"components-table-demo-multiple-sorter"},previewerProps:{title:"Multiple sorter",filename:"components/table/demo/multiple-sorter.tsx",jsx:`import React from 'react';
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
`,description:"<p><code>column.sorter</code> support <code>multiple</code> to config the priority of sort columns. Though <code>sorter.compare</code> to customize compare function. You can also leave it empty to use the interactive only.</p>"}},{demo:{id:"components-table-demo-reset-filter"},previewerProps:{title:"Reset filters and sorters",filename:"components/table/demo/reset-filter.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p>Control filters and sorters by <code>filteredValue</code> and <code>sortOrder</code>.</p>
<blockquote>
<ol>
<li>Defining <code>filteredValue</code> or <code>sortOrder</code> means that it is in the controlled mode.</li>
<li>Make sure <code>sortOrder</code> is assigned for only one column.</li>
<li><code>column.key</code> is required.</li>
</ol>
</blockquote>`}},{demo:{id:"components-table-demo-custom-filter-panel"},previewerProps:{title:"Customized filter panel",filename:"components/table/demo/custom-filter-panel.tsx",jsx:`import React, { useRef, useState } from 'react';
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
`,description:`<p>Implement a customized column search example via <code>filterDropdown</code>.</p>
<p>Add the <code>boolean</code> type parameter <code>closeDropdown</code> to the function <code>clearFilters</code>. Whether to close the filter menu is <code>true</code> by default. Add the <code>boolean</code> type parameter <code>confirm</code> to clear whether to submit the option during filtering. The default is <code>true</code>.</p>`}},{demo:{id:"components-table-demo-ajax"},previewerProps:{title:"Ajax",filename:"components/table/demo/ajax.tsx",jsx:`import React, { useEffect, useState } from 'react';
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
`,description:`<p>This example shows how to fetch and present data from a remote server, and how to implement filtering and sorting in server side by sending related parameters to server.</p>
<p>Setting <code>rowSelection.preserveSelectedRowKeys</code> to keep the <code>key</code> when enable selection.</p>
<p><strong>Note, this example use <a href="https://randomuser.me">Mock API</a> that you can look up in Network Console.</strong></p>`}},{demo:{id:"components-table-demo-size"},previewerProps:{title:"size",filename:"components/table/demo/size.tsx",jsx:`import React from 'react';
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
`,description:"<p>There are two compacted table sizes: <code>middle</code> and <code>small</code>. The <code>small</code> size is used in Modals only.</p>"}},{demo:{id:"components-table-demo-narrow"},previewerProps:{debug:!0,title:"size",filename:"components/table/demo/narrow.tsx",jsx:`import React from 'react';
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
`,description:"<p>There are two compacted table sizes: <code>middle</code> and <code>small</code>. The <code>small</code> size is used in Modals only.</p>"}},{demo:{id:"components-table-demo-bordered"},previewerProps:{title:"border, title and footer",filename:"components/table/demo/bordered.tsx",jsx:`import React from 'react';
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
`,description:"<p>Add border, title and footer for table.</p>"}},{demo:{id:"components-table-demo-expand"},previewerProps:{title:"Expandable Row",filename:"components/table/demo/expand.tsx",jsx:`import React from 'react';
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
`,description:"<p>When there's too much information to show and the table can't display all at once.</p>"}},{demo:{id:"components-table-demo-order-column"},previewerProps:{title:"Order Specific Column",filename:"components/table/demo/order-column.tsx",jsx:`import React from 'react';
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
`,description:"<p>You can control the order of the expand and select columns by using <code>Table.EXPAND_COLUMN</code> and <code>Table.SELECT_COLUMN</code>.</p>"}},{demo:{id:"components-table-demo-colspan-rowspan"},previewerProps:{title:"colSpan and rowSpan",filename:"components/table/demo/colspan-rowspan.tsx",jsx:`import React from 'react';
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
`,description:`<p>Table column title supports <code>colSpan</code> that set in <code>column</code>.</p>
<p>Table cell supports <code>colSpan</code> and <code>rowSpan</code> that set in render return object. When each of them is set to <code>0</code>, the cell will not be rendered.</p>`}},{demo:{id:"components-table-demo-tree-data"},previewerProps:{title:"Tree data",filename:"components/table/demo/tree-data.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p>Display tree structure data in Table when there is field key <code>children</code> in dataSource, try to customize <code>childrenColumnName</code> property to avoid tree table structure.</p>
<p>You can control the indent width by setting <code>indentSize</code>.</p>`}},{demo:{id:"components-table-demo-tree-table-ellipsis"},previewerProps:{debug:!0,title:"Tree data ellipsis debug demo",filename:"components/table/demo/tree-table-ellipsis.tsx",jsx:`import React, { useState } from 'react';
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
`,description:'<p><a href="https://github.com/ant-design/ant-design/issues/36583">https://github.com/ant-design/ant-design/issues/36583</a></p>'}},{demo:{id:"components-table-demo-fixed-header"},previewerProps:{title:"Fixed Header",filename:"components/table/demo/fixed-header.tsx",jsx:`import React from 'react';
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
`,description:`<p>Display large amounts of data in scrollable view.</p>
<blockquote>
<p>Specify width of columns if header and cell do not align properly. If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no <a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">long word to break table layout</a>.</p>
</blockquote>`}},{demo:{id:"components-table-demo-fixed-columns"},previewerProps:{title:"Fixed Columns",filename:"components/table/demo/fixed-columns.tsx",jsx:`import React from 'react';
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
`,description:`<p>To fix some columns and scroll inside other columns, and you must set <code>scroll.x</code> meanwhile.</p>
<blockquote>
<p>Specify the width of columns if header and cell do not align properly. If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no <a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">long word to break table layout</a>.</p>
<p>A fixed value which is greater than table width for <code>scroll.x</code> is recommended. The sum of unfixed columns should not greater than <code>scroll.x</code>.</p>
</blockquote>
<p><strong>Note: v4 using sticky to implement fixed effect. IE 11 will downgrade to horizontal scroll.</strong></p>`}},{demo:{id:"components-table-demo-fixed-columns-header"},previewerProps:{title:"Fixed Columns and Header",filename:"components/table/demo/fixed-columns-header.tsx",jsx:`import React from 'react';
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
`,description:`<p>A Solution for displaying large amounts of data with long columns.</p>
<blockquote>
<p>Specify the width of columns if header and cell do not align properly. If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no <a href="https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241">long word to break table layout</a>.</p>
<p>A fixed value which is greater than table width for <code>scroll.x</code> is recommended. The sum of unfixed columns should not greater than <code>scroll.x</code>.</p>
</blockquote>`}},{demo:{id:"components-table-demo-grouping-columns"},previewerProps:{title:"Grouping table head",filename:"components/table/demo/grouping-columns.tsx",jsx:`import React from 'react';
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
`,description:"<p>Group table head with <code>columns[n].children</code>.</p>"}},{demo:{id:"components-table-demo-edit-cell"},previewerProps:{title:"Editable Cells",filename:"components/table/demo/edit-cell.tsx",jsx:`import React, { useContext, useEffect, useRef, useState } from 'react';
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
`,description:'<p>Table with editable cells. When work with <code>shouldCellUpdate</code>, please take care of <a href="https://github.com/ant-design/ant-design/issues/29243">closure</a>.</p>',style:`.editable-cell {
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
}`}},{demo:{id:"components-table-demo-edit-row"},previewerProps:{title:"Editable Rows",filename:"components/table/demo/edit-row.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Table with editable rows.</p>",style:`.editable-row .ant-form-item-explain {
  position: absolute;
  top: 100%;
  font-size: 12px;
}`}},{demo:{id:"components-table-demo-nested-table"},previewerProps:{title:"Nested tables",filename:"components/table/demo/nested-table.tsx",jsx:`import React from 'react';
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
`,description:"<p>Showing more detailed info of every row.</p>"}},{demo:{id:"components-table-demo-drag-sorting"},previewerProps:{title:"Drag sorting",filename:"components/table/demo/drag-sorting.tsx",jsx:`import React, { useCallback, useRef, useState } from 'react';
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
`,description:'<p>By using <code>components</code>, we can integrate table with <a href="https://github.com/react-dnd/react-dnd">react-dnd</a> to implement drag sorting function.</p>',style:`#components-table-demo-drag-sorting tr.drop-over-downward td {
  border-bottom: 2px dashed #1890ff;
}

#components-table-demo-drag-sorting tr.drop-over-upward td {
  border-top: 2px dashed #1890ff;
}`}},{demo:{id:"components-table-demo-resizable-column"},previewerProps:{debug:!0,title:"Resizable column",filename:"components/table/demo/resizable-column.tsx",jsx:`import React, { useState } from 'react';
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
`,description:'<p>Implement resizable column by integrate with <a href="https://github.com/STRML/react-resizable">react-resizable</a>. When sort needed, you can use <a href="https://codesandbox.io/s/zrj8xvyzxx">additional mark</a> to prevent resize trigger sort.</p>',style:`#components-table-demo-resizable-column .react-resizable {
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
}`}},{demo:{id:"components-table-demo-ellipsis"},previewerProps:{title:"ellipsis column",filename:"components/table/demo/ellipsis.tsx",jsx:`import React from 'react';
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
`,description:`<p>Ellipsis cell content via setting <code>column.ellipsis</code>.</p>
<blockquote>
<p>Cannot ellipsis table header with sorters and filters for now.</p>
</blockquote>`}},{demo:{id:"components-table-demo-ellipsis-custom-tooltip"},previewerProps:{title:"ellipsis column custom tooltip",filename:"components/table/demo/ellipsis-custom-tooltip.tsx",jsx:`import React from 'react';
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
`,description:"<p>Ellipsis cell content via setting <code>column.ellipsis.showTitle</code>, use <code>Tooltip</code> instead of the html title attribute.</p>"}},{demo:{id:"components-table-demo-summary"},previewerProps:{title:"Summary",filename:"components/table/demo/summary.tsx",jsx:`import React from 'react';
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
`,description:"<p>Set summary content by <code>summary</code> prop. Sync column fixed status with <code>Table.Summary.Cell</code>. You can fixed it by set <code>Table.Summary</code> <code>fixed</code> prop(since <code>4.16.0</code>).</p>",style:`  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme="dark"] #components-table-demo-summary tfoot th,
  [data-theme="dark"] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
  }`}},{demo:{id:"components-table-demo-virtual-list"},previewerProps:{title:"Virtual list",filename:"components/table/demo/virtual-list.tsx",jsx:`import React, { useEffect, useRef, useState } from 'react';
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
`,description:"<p>Integrate virtual scroll with <code>react-window</code> to achieve a high performance table of 100,000 data.</p>",style:`  .virtual-table .ant-table-container:before,
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
`}},{demo:{id:"components-table-demo-responsive"},previewerProps:{title:"Responsive",filename:"components/table/demo/responsive.tsx",jsx:`import React from 'react';
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
`,description:"<p>Responsive columns.</p>"}},{demo:{id:"components-table-demo-nest-table-border-debug"},previewerProps:{debug:!0,title:"Nested Bordered Table Debug",filename:"components/table/demo/nest-table-border-debug.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>To see if bordered style applied to other tables.</p>"}},{demo:{id:"components-table-demo-pagination"},previewerProps:{title:"Pagination Settings",filename:"components/table/demo/pagination.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Table pagination settings.</p>"}},{demo:{id:"components-table-demo-row-selection-custom-debug"},previewerProps:{debug:!0,title:"Custom selection group",filename:"components/table/demo/row-selection-custom-debug.tsx",jsx:`import React from 'react';
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
`,description:"<p>Customize selection group.</p>"}},{demo:{id:"components-table-demo-sticky"},previewerProps:{title:"Fixed header and scroll bar with the page",filename:"components/table/demo/sticky.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>For long table\uFF0Cneed to scroll to view the header and scroll bar\uFF0Cthen you can now set the fixed header and scroll bar to follow the page.</p>"}},{demo:{id:"components-table-demo-dynamic-settings"},previewerProps:{title:"Dynamic Settings",filename:"components/table/demo/dynamic-settings.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Select different settings to see the result.</p>",style:`.components-table-demo-control-bar .ant-form-item {
  margin-right: 16px !important;
  margin-bottom: 8px !important;
}`}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"table"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#table"},(0,n.tZ)("span",{className:"icon icon-link"})),"Table"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[10].value),(0,n.tZ)("th",null,e[11].value),(0,n.tZ)("th",null,e[12].value),(0,n.tZ)("th",null,e[13].value),(0,n.tZ)("th",null,e[14].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value),(0,n.tZ)("td",null,e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#Column"},e[21].value),e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/react-component/table/blob/75ee0064e54a4b3215694505870c9d6c817e9e4a/src/interface.ts#L129"},e[26].value)),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#expandable"},e[34].value)),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value,(0,n.tZ)(a.rU,{to:"/components/spin/#API"},e[47].value)),(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/6dae4a7e18ad1ba193aedd5ab6867e1d823e2aa4/components/locale/en_US.tsx#L19-L37"},e[52].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value,(0,n.tZ)(a.rU,{to:"#pagination"},e[55].value),e[56].value,(0,n.tZ)(a.rU,{to:"/components/pagination/"},(0,n.tZ)("code",null,e[57].value)),e[58].value,(0,n.tZ)("code",null,e[59].value)),(0,n.tZ)("td",null,e[60].value,(0,n.tZ)("code",null,e[61].value)),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[70].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value,(0,n.tZ)(a.rU,{to:"#rowSelection"},e[73].value)),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value,(0,n.tZ)(a.rU,{to:"#scroll"},e[78].value)),(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value),(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value),(0,n.tZ)("td",null,e[87].value,(0,n.tZ)(a.rU,{to:"/components/tooltip/#API"},e[88].value)),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[92].value),e[93].value,(0,n.tZ)("code",null,e[94].value),e[95].value,(0,n.tZ)("code",null,e[96].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[97].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value,(0,n.tZ)("code",null,e[100].value),e[101].value,(0,n.tZ)("code",null,e[102].value)),(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value,(0,n.tZ)("code",null,e[105].value),e[106].value,(0,n.tZ)("code",null,e[107].value),e[108].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[109].value),(0,n.tZ)("td",null,e[110].value),(0,n.tZ)("td",null,e[111].value,(0,n.tZ)("code",null,e[112].value)),(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout"},e[121].value),e[122].value),(0,n.tZ)("td",null,e[123].value,(0,n.tZ)("code",null,e[124].value),e[125].value,(0,n.tZ)("code",null,e[126].value)),(0,n.tZ)("td",null,e[127].value,(0,n.tZ)("hr",null),(0,n.tZ)("code",null,e[128].value),e[129].value,(0,n.tZ)("code",null,e[130].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,e[136].value),(0,n.tZ)("td",null,e[137].value,(0,n.tZ)("code",null,e[138].value),e[139].value,(0,n.tZ)("code",null,e[140].value),e[141].value,(0,n.tZ)("code",null,e[142].value),e[143].value),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[145].value),(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value),(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"onrow-usage"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#onrow-usage"},(0,n.tZ)("span",{className:"icon icon-link"})),"onRow usage"),(0,n.tZ)("p",null,e[153].value,(0,n.tZ)("code",null,e[154].value),e[155].value,(0,n.tZ)("code",null,e[156].value),e[157].value,(0,n.tZ)("code",null,e[158].value),e[159].value,(0,n.tZ)("code",null,e[160].value)),(0,n.tZ)(o.Z,{lang:"jsx"},e[161].value),(0,n.tZ)("h3",{id:"column"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#column"},(0,n.tZ)("span",{className:"icon icon-link"})),"Column"),(0,n.tZ)("p",null,e[162].value,(0,n.tZ)("code",null,e[163].value),e[164].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[165].value),(0,n.tZ)("th",null,e[166].value),(0,n.tZ)("th",null,e[167].value),(0,n.tZ)("th",null,e[168].value),(0,n.tZ)("th",null,e[169].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,e[171].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[172].value),e[173].value,(0,n.tZ)("code",null,e[174].value),e[175].value,(0,n.tZ)("code",null,e[176].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[177].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value),(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[182].value),(0,n.tZ)("td",null,e[183].value),(0,n.tZ)("td",null,e[184].value),(0,n.tZ)("td",null,e[185].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[186].value),(0,n.tZ)("td",null,e[187].value),(0,n.tZ)("td",null,e[188].value),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value),(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[200].value),e[201].value,(0,n.tZ)("code",null,e[202].value)),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value,(0,n.tZ)("br",null),e[206].value,(0,n.tZ)("code",null,e[207].value),e[208].value,(0,n.tZ)("code",null,e[209].value),e[210].value,(0,n.tZ)("code",null,e[211].value),e[212].value,(0,n.tZ)("code",null,e[213].value)),(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value),(0,n.tZ)("td",null,e[216].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[217].value),(0,n.tZ)("td",null,e[218].value),(0,n.tZ)("td",null,e[219].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/ecc54dda839619e921c0ace530408871f0281c2a/components/table/interface.tsx#L79"},e[220].value),e[221].value),(0,n.tZ)("td",null,e[222].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null,e[224].value,(0,n.tZ)("code",null,e[225].value),e[226].value),(0,n.tZ)("td",null,e[227].value),(0,n.tZ)("td",null,e[228].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[229].value),(0,n.tZ)("td",null,e[230].value,(0,n.tZ)("code",null,e[231].value),e[232].value),(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null,e[234].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[235].value),(0,n.tZ)("td",null,e[236].value),(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,e[241].value),(0,n.tZ)("td",null,e[242].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[243].value),(0,n.tZ)("td",null,e[244].value),(0,n.tZ)("td",null,e[245].value),(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value),(0,n.tZ)("td",null,e[250].value),(0,n.tZ)("td",null,e[251].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[252].value),(0,n.tZ)("td",null,e[253].value),(0,n.tZ)("td",null,e[254].value),(0,n.tZ)("td",null,e[255].value),(0,n.tZ)("td",null,e[256].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[257].value),(0,n.tZ)("td",null,e[258].value),(0,n.tZ)("td",null,e[259].value),(0,n.tZ)("td",null,e[260].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[261].value),(0,n.tZ)("td",null,e[262].value,(0,n.tZ)("code",null,e[263].value),e[264].value,(0,n.tZ)("code",null,e[265].value),e[266].value,(0,n.tZ)("code",null,e[267].value)),(0,n.tZ)("td",null,e[268].value),(0,n.tZ)("td",null,e[269].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[270].value),(0,n.tZ)("td",null,e[271].value,(0,n.tZ)("code",null,e[272].value)),(0,n.tZ)("td",null,e[273].value),(0,n.tZ)("td",null,e[274].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[275].value),(0,n.tZ)("td",null,e[276].value),(0,n.tZ)("td",null,e[277].value),(0,n.tZ)("td",null,e[278].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[279].value),(0,n.tZ)("td",null,e[280].value),(0,n.tZ)("td",null,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1"},e[281].value),e[282].value),(0,n.tZ)("td",null,e[283].value),(0,n.tZ)("td",null,e[284].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[285].value),(0,n.tZ)("td",null,e[286].value),(0,n.tZ)("td",null,e[287].value),(0,n.tZ)("td",null,e[288].value),(0,n.tZ)("td",null,e[289].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[290].value),(0,n.tZ)("td",null,e[291].value,(0,n.tZ)("code",null,e[292].value),e[293].value),(0,n.tZ)("td",null,e[294].value,(0,n.tZ)(a.rU,{to:"/components/tooltip/"},e[295].value)),(0,n.tZ)("td",null,e[296].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[297].value),(0,n.tZ)("td",null,e[298].value,(0,n.tZ)("code",null,e[299].value),e[300].value,(0,n.tZ)("code",null,e[301].value),e[302].value,(0,n.tZ)("code",null,e[303].value),e[304].value,(0,n.tZ)("code",null,e[305].value)),(0,n.tZ)("td",null,e[306].value),(0,n.tZ)("td",null,e[307].value,(0,n.tZ)("code",null,e[308].value),e[309].value,(0,n.tZ)("code",null,e[310].value),e[311].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[312].value),(0,n.tZ)("td",null,e[313].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"},e[314].value),e[315].value,(0,n.tZ)("code",null,e[316].value)),(0,n.tZ)("td",null,e[317].value),(0,n.tZ)("td",null,e[318].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[319].value),(0,n.tZ)("td",null,e[320].value,(0,n.tZ)("code",null,e[321].value),e[322].value,(0,n.tZ)("code",null,e[323].value),e[324].value,(0,n.tZ)("code",null,e[325].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[326].value),e[327].value,(0,n.tZ)("code",null,e[328].value),e[329].value),(0,n.tZ)("td",null,e[330].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[331].value),(0,n.tZ)("td",null,e[332].value),(0,n.tZ)("td",null,e[333].value),(0,n.tZ)("td",null,e[334].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[335].value),(0,n.tZ)("td",null,e[336].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241"},e[337].value),e[338].value),(0,n.tZ)("td",null,e[339].value),(0,n.tZ)("td",null,e[340].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[341].value),(0,n.tZ)("td",null,e[342].value),(0,n.tZ)("td",null,e[343].value),(0,n.tZ)("td",null,e[344].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[345].value),(0,n.tZ)("td",null,e[346].value),(0,n.tZ)("td",null,e[347].value),(0,n.tZ)("td",null,e[348].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[349].value),(0,n.tZ)("td",null,e[350].value,(0,n.tZ)("code",null,e[351].value),e[352].value),(0,n.tZ)("td",null,e[353].value),(0,n.tZ)("td",null,e[354].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[355].value),(0,n.tZ)("td",null,e[356].value),(0,n.tZ)("td",null,e[357].value),(0,n.tZ)("td",null,e[358].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"columngroup"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#columngroup"},(0,n.tZ)("span",{className:"icon icon-link"})),"ColumnGroup"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[359].value),(0,n.tZ)("th",null,e[360].value),(0,n.tZ)("th",null,e[361].value),(0,n.tZ)("th",null,e[362].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[363].value),(0,n.tZ)("td",null,e[364].value),(0,n.tZ)("td",null,e[365].value),(0,n.tZ)("td",null,e[366].value)))),(0,n.tZ)("h3",{id:"pagination"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#pagination"},(0,n.tZ)("span",{className:"icon icon-link"})),"pagination"),(0,n.tZ)("p",null,e[367].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[368].value),(0,n.tZ)("th",null,e[369].value),(0,n.tZ)("th",null,e[370].value),(0,n.tZ)("th",null,e[371].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[372].value),(0,n.tZ)("td",null,e[373].value,(0,n.tZ)("code",null,e[374].value),e[375].value,(0,n.tZ)("code",null,e[376].value),e[377].value,(0,n.tZ)("code",null,e[378].value),e[379].value,(0,n.tZ)("code",null,e[380].value),e[381].value,(0,n.tZ)("code",null,e[382].value),e[383].value,(0,n.tZ)("code",null,e[384].value),e[385].value,(0,n.tZ)("code",null,e[386].value)),(0,n.tZ)("td",null,e[387].value),(0,n.tZ)("td",null,e[388].value,(0,n.tZ)("code",null,e[389].value),e[390].value)))),(0,n.tZ)("p",null,e[391].value,(0,n.tZ)(a.rU,{to:"/components/pagination/"},(0,n.tZ)("code",null,e[392].value)),e[393].value),(0,n.tZ)("h3",{id:"expandable"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#expandable"},(0,n.tZ)("span",{className:"icon icon-link"})),"expandable"),(0,n.tZ)("p",null,e[394].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[395].value),(0,n.tZ)("th",null,e[396].value),(0,n.tZ)("th",null,e[397].value),(0,n.tZ)("th",null,e[398].value),(0,n.tZ)("th",null,e[399].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[400].value),(0,n.tZ)("td",null,e[401].value),(0,n.tZ)("td",null,e[402].value),(0,n.tZ)("td",null,e[403].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[404].value),(0,n.tZ)("td",null,e[405].value),(0,n.tZ)("td",null,e[406].value),(0,n.tZ)("td",null,e[407].value),(0,n.tZ)("td",null,e[408].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[409].value),(0,n.tZ)("td",null,e[410].value),(0,n.tZ)("td",null,e[411].value),(0,n.tZ)("td",null,e[412].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[413].value),(0,n.tZ)("td",null,e[414].value),(0,n.tZ)("td",null,e[415].value),(0,n.tZ)("td",null,e[416].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[417].value),(0,n.tZ)("td",null,e[418].value),(0,n.tZ)("td",null,e[419].value),(0,n.tZ)("td",null,e[420].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[421].value),(0,n.tZ)("td",null,e[422].value),(0,n.tZ)("td",null,e[423].value),(0,n.tZ)("td",null,e[424].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[425].value),(0,n.tZ)("td",null,e[426].value),(0,n.tZ)("td",null,e[427].value),(0,n.tZ)("td",null,e[428].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[429].value),(0,n.tZ)("td",null,e[430].value),(0,n.tZ)("td",null,e[431].value),(0,n.tZ)("td",null,e[432].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[433].value),(0,n.tZ)("td",null,e[434].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/fervent-bird-nuzpr"},e[435].value)),(0,n.tZ)("td",null,e[436].value),(0,n.tZ)("td",null,e[437].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[438].value),(0,n.tZ)("td",null,e[439].value),(0,n.tZ)("td",null,e[440].value),(0,n.tZ)("td",null,e[441].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[442].value),(0,n.tZ)("td",null,e[443].value,(0,n.tZ)("code",null,e[444].value),e[445].value,(0,n.tZ)("code",null,e[446].value)),(0,n.tZ)("td",null,e[447].value),(0,n.tZ)("td",null,e[448].value),(0,n.tZ)("td",null,e[449].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[450].value),(0,n.tZ)("td",null,e[451].value),(0,n.tZ)("td",null,e[452].value),(0,n.tZ)("td",null,e[453].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[454].value),(0,n.tZ)("td",null,e[455].value),(0,n.tZ)("td",null,e[456].value),(0,n.tZ)("td",null,e[457].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[458].value),(0,n.tZ)("td",null,e[459].value),(0,n.tZ)("td",null,e[460].value),(0,n.tZ)("td",null,e[461].value),(0,n.tZ)("td",null,e[462].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[463].value),(0,n.tZ)("td",null,e[464].value),(0,n.tZ)("td",null,e[465].value),(0,n.tZ)("td",null,e[466].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[467].value),(0,n.tZ)("td",null,e[468].value),(0,n.tZ)("td",null,e[469].value),(0,n.tZ)("td",null,e[470].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"rowselection"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#rowselection"},(0,n.tZ)("span",{className:"icon icon-link"})),"rowSelection"),(0,n.tZ)("p",null,e[471].value),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[472].value),(0,n.tZ)("th",null,e[473].value),(0,n.tZ)("th",null,e[474].value),(0,n.tZ)("th",null,e[475].value),(0,n.tZ)("th",null,e[476].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[477].value),(0,n.tZ)("td",null,e[478].value),(0,n.tZ)("td",null,e[479].value),(0,n.tZ)("td",null,e[480].value),(0,n.tZ)("td",null,e[481].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[482].value),(0,n.tZ)("td",null,e[483].value),(0,n.tZ)("td",null,e[484].value),(0,n.tZ)("td",null,e[485].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[486].value),(0,n.tZ)("td",null,e[487].value),(0,n.tZ)("td",null,e[488].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[489].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[490].value),(0,n.tZ)("td",null,e[491].value),(0,n.tZ)("td",null,e[492].value),(0,n.tZ)("td",null,e[493].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[494].value),(0,n.tZ)("td",null,e[495].value),(0,n.tZ)("td",null,e[496].value),(0,n.tZ)("td",null,e[497].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[498].value),(0,n.tZ)("td",null,e[499].value),(0,n.tZ)("td",null,e[500].value),(0,n.tZ)("td",null,e[501].value),(0,n.tZ)("td",null,e[502].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[503].value),(0,n.tZ)("td",null,e[504].value,(0,n.tZ)("code",null,e[505].value),e[506].value,(0,n.tZ)("code",null,e[507].value)),(0,n.tZ)("td",null,e[508].value),(0,n.tZ)("td",null,e[509].value),(0,n.tZ)("td",null,e[510].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[511].value),(0,n.tZ)("td",null,e[512].value,(0,n.tZ)("code",null,e[513].value),e[514].value),(0,n.tZ)("td",null,e[515].value),(0,n.tZ)("td",null,e[516].value),(0,n.tZ)("td",null,e[517].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[518].value),(0,n.tZ)("td",null,e[519].value),(0,n.tZ)("td",null,e[520].value),(0,n.tZ)("td",null,e[521].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[522].value),(0,n.tZ)("td",null,e[523].value,(0,n.tZ)(a.rU,{to:"#selection"},e[524].value),e[525].value,(0,n.tZ)("code",null,e[526].value)),(0,n.tZ)("td",null,e[527].value),(0,n.tZ)("td",null,e[528].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[529].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[530].value),e[531].value,(0,n.tZ)("code",null,e[532].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[533].value),e[534].value,(0,n.tZ)("code",null,e[535].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[536].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[537].value),(0,n.tZ)("td",null,e[538].value),(0,n.tZ)("td",null,e[539].value),(0,n.tZ)("td",null,e[540].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[541].value),e[542].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[543].value),(0,n.tZ)("td",null,e[544].value),(0,n.tZ)("td",null,e[545].value),(0,n.tZ)("td",null,e[546].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[547].value),(0,n.tZ)("td",null,e[548].value),(0,n.tZ)("td",null,e[549].value),(0,n.tZ)("td",null,e[550].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[551].value),(0,n.tZ)("td",null,e[552].value),(0,n.tZ)("td",null,e[553].value),(0,n.tZ)("td",null,e[554].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[555].value),(0,n.tZ)("td",null,e[556].value),(0,n.tZ)("td",null,e[557].value),(0,n.tZ)("td",null,e[558].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[559].value),(0,n.tZ)("td",null,e[560].value),(0,n.tZ)("td",null,e[561].value),(0,n.tZ)("td",null,e[562].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"scroll"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#scroll"},(0,n.tZ)("span",{className:"icon icon-link"})),"scroll"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[563].value),(0,n.tZ)("th",null,e[564].value),(0,n.tZ)("th",null,e[565].value),(0,n.tZ)("th",null,e[566].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[567].value),(0,n.tZ)("td",null,e[568].value),(0,n.tZ)("td",null,e[569].value),(0,n.tZ)("td",null,e[570].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[571].value),(0,n.tZ)("td",null,e[572].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/width#max-content"},e[573].value)),(0,n.tZ)("td",null,e[574].value),(0,n.tZ)("td",null,e[575].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[576].value),(0,n.tZ)("td",null,e[577].value),(0,n.tZ)("td",null,e[578].value),(0,n.tZ)("td",null,e[579].value)))),(0,n.tZ)("h3",{id:"selection"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#selection"},(0,n.tZ)("span",{className:"icon icon-link"})),"selection"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[580].value),(0,n.tZ)("th",null,e[581].value),(0,n.tZ)("th",null,e[582].value),(0,n.tZ)("th",null,e[583].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[584].value),(0,n.tZ)("td",null,e[585].value),(0,n.tZ)("td",null,e[586].value),(0,n.tZ)("td",null,e[587].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[588].value),(0,n.tZ)("td",null,e[589].value),(0,n.tZ)("td",null,e[590].value),(0,n.tZ)("td",null,e[591].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[592].value),(0,n.tZ)("td",null,e[593].value),(0,n.tZ)("td",null,e[594].value),(0,n.tZ)("td",null,e[595].value)))),(0,n.tZ)("h2",{id:"using-in-typescript"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#using-in-typescript"},(0,n.tZ)("span",{className:"icon icon-link"})),"Using in TypeScript"),(0,n.tZ)(o.Z,{lang:"tsx"},e[596].value),(0,n.tZ)("p",null,e[597].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/serene-platform-0jo5t"},e[598].value),e[599].value),(0,n.tZ)("h2",{id:"note"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#note"},(0,n.tZ)("span",{className:"icon icon-link"})),"Note"),(0,n.tZ)("p",null,e[600].value,(0,n.tZ)("a",{href:"https://facebook.github.io/react/docs/lists-and-keys.html#keys"},e[601].value),e[602].value,(0,n.tZ)("code",null,e[603].value),e[604].value,(0,n.tZ)("code",null,e[605].value),e[606].value,(0,n.tZ)("code",null,e[607].value),e[608].value,(0,n.tZ)("code",null,e[609].value),e[610].value),(0,n.tZ)("p",null,(0,n.tZ)("img",{src:"https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png",alt:"console warning"})),(0,n.tZ)("p",null,e[611].value,(0,n.tZ)("code",null,e[612].value),e[613].value,(0,n.tZ)("code",null,e[614].value),e[615].value),(0,n.tZ)(o.Z,{lang:"jsx"},e[616].value),(0,n.tZ)("h2",{id:"migrate-to-v4"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#migrate-to-v4"},(0,n.tZ)("span",{className:"icon icon-link"})),"Migrate to v4"),(0,n.tZ)("p",null,e[617].value,(0,n.tZ)("code",null,e[618].value),e[619].value,(0,n.tZ)("code",null,e[620].value),e[621].value,(0,n.tZ)("code",null,e[622].value),e[623].value,(0,n.tZ)("code",null,e[624].value),e[625].value),(0,n.tZ)("p",null,e[626].value,(0,n.tZ)("code",null,e[627].value),e[628].value,(0,n.tZ)("code",null,e[629].value),e[630].value,(0,n.tZ)("code",null,e[631].value),e[632].value,(0,n.tZ)("code",null,e[633].value),e[634].value),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"how-to-hide-pagination-when-single-page-or-no-data"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-hide-pagination-when-single-page-or-no-data"},(0,n.tZ)("span",{className:"icon icon-link"})),"How to hide pagination when single page or no data?"),(0,n.tZ)("p",null,e[635].value,(0,n.tZ)("code",null,e[636].value),e[637].value,(0,n.tZ)("code",null,e[638].value),e[639].value),(0,n.tZ)("h3",{id:"table-will-return-to-first-page-when-filter-data"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#table-will-return-to-first-page-when-filter-data"},(0,n.tZ)("span",{className:"icon icon-link"})),"Table will return to first page when filter data."),(0,n.tZ)("p",null,e[640].value),(0,n.tZ)("p",null,e[641].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/yuanchengjiazaishuju-ant-design-demo-7y2uf"},e[642].value),e[643].value),(0,n.tZ)("p",null,e[644].value),(0,n.tZ)("h3",{id:"why-table-pagination-show-size-changer"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-table-pagination-show-size-changer"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why Table pagination show size changer?"),(0,n.tZ)("p",null,e[645].value,(0,n.tZ)("code",null,e[646].value),e[647].value,(0,n.tZ)("code",null,e[648].value),e[649].value,(0,n.tZ)("code",null,e[650].value),e[651].value),(0,n.tZ)("h3",{id:"why-table-fully-render-when-state-change"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-table-fully-render-when-state-change"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why Table fully render when state change?"),(0,n.tZ)("p",null,e[652].value,(0,n.tZ)("code",null,e[653].value),e[654].value,(0,n.tZ)("code",null,e[655].value),e[656].value),(0,n.tZ)("h3",{id:"how-to-handle-fixed-column-display-over-the-mask-layout"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-handle-fixed-column-display-over-the-mask-layout"},(0,n.tZ)("span",{className:"icon icon-link"})),"How to handle fixed column display over the mask layout?"),(0,n.tZ)("p",null,e[657].value,(0,n.tZ)("code",null,e[658].value),e[659].value,(0,n.tZ)("code",null,e[660].value),e[661].value),(0,n.tZ)("h3",{id:"how-to-custom-render-table-checkboxfor-example-adding-tooltip"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#how-to-custom-render-table-checkboxfor-example-adding-tooltip"},(0,n.tZ)("span",{className:"icon icon-link"})),"How to custom render Table Checkbox\uFF08For example, adding Tooltip\uFF09?"),(0,n.tZ)("p",null,e[662].value,(0,n.tZ)("code",null,e[663].value),e[664].value,(0,n.tZ)("a",{href:"https://ant.design/components/table/#rowSelection"},(0,n.tZ)("code",null,e[665].value)),e[666].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/table-row-tooltip-v79j2v"},e[667].value),e[668].value))))}d.default=i}}]);
