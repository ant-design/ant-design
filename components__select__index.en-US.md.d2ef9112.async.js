"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[4882],{615:function(r,u,t){t.r(u);var p=t(2143),v=t(50250),m=t(59378),Z=t(78190),a=t(74775),l=t(5937),h=t(2068),g=t(74399),f=t(46004),_=t(35708),b=t(30138),x=t(56140),d=t(5388),S=t(49545),y=t(92169),w=t(13140),C=t(95127),P=t(74418),A=t(97119),o=t(28257),s=t(67294),e=t(13946);function i(){var c=(0,o.eL)(),n=c.texts;return(0,e.tZ)(o.dY,null,(0,e.tZ)(s.Fragment,null,(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("p",null,n[0].value),(0,e.tZ)("h2",{id:"when-to-use"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,e.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,e.tZ)("ul",null,(0,e.tZ)("li",null,n[1].value,(0,e.tZ)("code",null,n[2].value),n[3].value),(0,e.tZ)("li",null,n[4].value,(0,e.tZ)(o.rU,{to:"/components/radio/"},n[5].value),n[6].value)),(0,e.tZ)("h2",{id:"examples"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,e.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,e.tZ)(d.Z,{items:[{demo:{id:"components-select-demo-basic"},previewerProps:{title:"Basic Usage",filename:"components/select/demo/basic.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <>
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      disabled
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      loading
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      allowClear
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);
export default App;
`,description:"<p>Basic Usage.</p>"}},{demo:{id:"components-select-demo-search"},previewerProps:{title:"Select with search field",filename:"components/select/demo/search.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const onChange = (value) => {
  console.log(\`selected \${value}\`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
const App = () => (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  />
);
export default App;
`,description:"<p>Search the options while expanded.</p>"}},{demo:{id:"components-select-demo-multiple"},previewerProps:{title:"multiple selection",filename:"components/select/demo/multiple.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <>
    <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />
    <br />
    <Select
      mode="multiple"
      disabled
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />
  </>
);
export default App;
`,description:"<p>Multiple selection, selecting from existing items.</p>"}},{demo:{id:"components-select-demo-size"},previewerProps:{title:"Sizes",filename:"components/select/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Select } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(\`Selected: \${value}\`);
};
const App = () => {
  const [size, setSize] = useState('middle');
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Select
        size={size}
        defaultValue="a1"
        onChange={handleChange}
        style={{
          width: 200,
        }}
        options={options}
      />
      <br />
      <Select
        mode="multiple"
        size={size}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{
          width: '100%',
        }}
        options={options}
      />
      <br />
      <Select
        mode="tags"
        size={size}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{
          width: '100%',
        }}
        options={options}
      />
    </>
  );
};
export default App;
`,description:"<p>The height of the input field for the select defaults to 32px. If size is set to large, the height will be 40px, and if set to small, 24px.</p>",style:`.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}

.ant-row-rtl .code-box-demo .ant-select {
  margin: 0 0 10px 8px;
}

#components-select-demo-search-box .code-box-demo .ant-select {
  margin: 0;
}`}},{demo:{id:"components-select-demo-option-label-prop"},previewerProps:{title:"Custom selection render",filename:"components/select/demo/option-label-prop.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select one country"
    defaultValue={['china']}
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="china" label="China">
      <div className="demo-option-label-item">
        <span role="img" aria-label="China">
          \u{1F1E8}\u{1F1F3}
        </span>
        China (\u4E2D\u56FD)
      </div>
    </Option>
    <Option value="usa" label="USA">
      <div className="demo-option-label-item">
        <span role="img" aria-label="USA">
          \u{1F1FA}\u{1F1F8}
        </span>
        USA (\u7F8E\u56FD)
      </div>
    </Option>
    <Option value="japan" label="Japan">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Japan">
          \u{1F1EF}\u{1F1F5}
        </span>
        Japan (\u65E5\u672C)
      </div>
    </Option>
    <Option value="korea" label="Korea">
      <div className="demo-option-label-item">
        <span role="img" aria-label="Korea">
          \u{1F1F0}\u{1F1F7}
        </span>
        Korea (\u97E9\u56FD)
      </div>
    </Option>
  </Select>
);
export default App;
`,description:"<p>Specify the prop name of Option which will be rendered in select box.</p>",style:`.demo-option-label-item > span {
  margin-right: 6px;
}`}},{demo:{id:"components-select-demo-search-sort"},previewerProps:{title:"Search with sort",filename:"components/select/demo/search-sort.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const App = () => (
  <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Not Identified',
      },
      {
        value: '2',
        label: 'Closed',
      },
      {
        value: '3',
        label: 'Communicated',
      },
      {
        value: '4',
        label: 'Identified',
      },
      {
        value: '5',
        label: 'Resolved',
      },
      {
        value: '6',
        label: 'Cancelled',
      },
    ]}
  />
);
export default App;
`,description:"<p>Search the options with sorting.</p>"}},{demo:{id:"components-select-demo-tags"},previewerProps:{title:"Tags",filename:"components/select/demo/tags.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={options}
  />
);
export default App;
`,description:"<p>Select with tags, transform input to tag (scroll the menu).</p>"}},{demo:{id:"components-select-demo-optgroup"},previewerProps:{title:"Option Group",filename:"components/select/demo/optgroup.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <Select
    defaultValue="lucy"
    style={{
      width: 200,
    }}
    onChange={handleChange}
    options={[
      {
        label: 'Manager',
        options: [
          {
            label: 'Jack',
            value: 'jack',
          },
          {
            label: 'Lucy',
            value: 'lucy',
          },
        ],
      },
      {
        label: 'Engineer',
        options: [
          {
            label: 'yiminghe',
            value: 'Yiminghe',
          },
        ],
      },
    ]}
  />
);
export default App;
`,description:"<p>Using <code>OptGroup</code> to group the options.</p>"}},{demo:{id:"components-select-demo-coordinate"},previewerProps:{title:"coordinate",filename:"components/select/demo/coordinate.tsx",jsx:`import React, { useState } from 'react';
import { Select } from 'antd';
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const App = () => {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  return (
    <>
      <Select
        defaultValue={provinceData[0]}
        style={{
          width: 120,
        }}
        onChange={handleProvinceChange}
        options={provinceData.map((province) => ({
          label: province,
          value: province,
        }))}
      />
      <Select
        style={{
          width: 120,
        }}
        value={secondCity}
        onChange={onSecondCityChange}
        options={cities.map((city) => ({
          label: city,
          value: city,
        }))}
      />
    </>
  );
};
export default App;
`,description:`<p>Coordinating the selection of provinces and cities is a common use case and demonstrates how selection can be coordinated.</p>
<p>Using the <a href="/components/cascader">Cascader</a> component is strongly recommended instead as it is more flexible and capable.</p>`}},{demo:{id:"components-select-demo-search-box"},previewerProps:{title:"Search Box",filename:"components/select/demo/search-box.tsx",jsx:`import React, { useState } from 'react';
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
let timeout;
let currentValue;
const fetch = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    const str = qs.stringify({
      code: 'utf-8',
      q: value,
    });
    jsonp(\`https://suggest.taobao.com/sug?\${str}\`)
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          const { result } = d;
          const data = result.map((item) => ({
            value: item[0],
            text: item[0],
          }));
          callback(data);
        }
      });
  };
  timeout = setTimeout(fake, 300);
};
const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};
const App = () => (
  <SearchInput
    placeholder="input search text"
    style={{
      width: 200,
    }}
  />
);
export default App;
`,description:"<p>Search with remote data.</p>"}},{demo:{id:"components-select-demo-label-in-value"},previewerProps:{title:"Get value of selected item",filename:"components/select/demo/label-in-value.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const App = () => (
  <Select
    labelInValue
    defaultValue={{
      value: 'lucy',
      label: 'Lucy (101)',
    }}
    style={{
      width: 120,
    }}
    onChange={handleChange}
    options={[
      {
        value: 'jack',
        label: 'Jack (100)',
      },
      {
        value: 'lucy',
        label: 'Lucy (101)',
      },
    ]}
  />
);
export default App;
`,description:`<p>As a default behavior, the <code>onChange</code> callback can only get the <code>value</code> of the selected item. The <code>labelInValue</code> prop can be used to get the <code>label</code> property of the selected item.</p>
<p>The <code>label</code> of the selected item will be packed as an object for passing to the <code>onChange</code> callback.</p>`}},{demo:{id:"components-select-demo-automatic-tokenization"},previewerProps:{title:"Automatic tokenization",filename:"components/select/demo/automatic-tokenization.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    onChange={handleChange}
    tokenSeparators={[',']}
    options={options}
  />
);
export default App;
`,description:"<p>Try to copy <code>Lucy,Jack</code> and paste to the input. Only available in tags and multiple mode.</p>"}},{demo:{id:"components-select-demo-select-users"},previewerProps:{title:"Search and Select Users",filename:"components/select/demo/select-users.tsx",jsx:`import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect

async function fetchUserList(username) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: \`\${user.name.first} \${user.name.last}\`,
        value: user.login.username,
      })),
    );
}
const App = () => {
  const [value, setValue] = useState([]);
  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Select users"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      style={{
        width: '100%',
      }}
    />
  );
};
export default App;
`,description:"<p>A complete multiple select sample with remote search, debounce fetch, ajax callback order flow, and loading state.</p>"}},{demo:{id:"components-select-demo-suffix"},previewerProps:{debug:!0,title:"Suffix",filename:"components/select/demo/suffix.tsx",jsx:`import React from 'react';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const smileIcon = <SmileOutlined />;
const mehIcon = <MehOutlined />;
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <>
    <Select
      suffixIcon={smileIcon}
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      suffixIcon={mehIcon}
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      disabled
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);
export default App;
`,description:"<p>Basic Usage.</p>"}},{demo:{id:"components-select-demo-custom-dropdown-menu"},previewerProps:{title:"Custom dropdown",filename:"components/select/demo/custom-dropdown-menu.tsx",jsx:`import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
let index = 0;
const App = () => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || \`New item \${index++}\`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      style={{
        width: 300,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};
export default App;
`,description:'<p>Customize the dropdown menu via <code>dropdownRender</code>. If you want to close the dropdown after clicking the custom content, you need to control <code>open</code> prop, here is an <a href="https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js">codesandbox</a>.</p>'}},{demo:{id:"components-select-demo-hide-selected"},previewerProps:{title:"Hide Already Selected",filename:"components/select/demo/hide-selected.tsx",jsx:`import React, { useState } from 'react';
import { Select } from 'antd';
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{
        width: '100%',
      }}
      options={filteredOptions.map((item) => ({
        value: item,
        label: item,
      }))}
    />
  );
};
export default App;
`,description:"<p>Hide already selected options in the dropdown.</p>"}},{demo:{id:"components-select-demo-bordered"},previewerProps:{title:"Bordered-less",filename:"components/select/demo/bordered.tsx",jsx:`import React from 'react';
import { Select } from 'antd';
const App = () => (
  <>
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      bordered={false}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      disabled
      bordered={false}
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);
export default App;
`,description:"<p>Bordered-less style component.</p>"}},{demo:{id:"components-select-demo-custom-tag-render"},previewerProps:{title:"Custom Tag Render",filename:"components/select/demo/custom-tag-render.tsx",jsx:`import React from 'react';
import { Select, Tag } from 'antd';
const options = [
  {
    value: 'gold',
  },
  {
    value: 'lime',
  },
  {
    value: 'green',
  },
  {
    value: 'cyan',
  },
];
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const App = () => (
  <Select
    mode="multiple"
    showArrow
    tagRender={tagRender}
    defaultValue={['gold', 'cyan']}
    style={{
      width: '100%',
    }}
    options={options}
  />
);
export default App;
`,description:"<p>Allows for custom rendering of tags.</p>"}},{demo:{id:"components-select-demo-responsive"},previewerProps:{title:"Responsive maxTagCount",filename:"components/select/demo/responsive.tsx",jsx:`import React, { useState } from 'react';
import { Select, Space } from 'antd';
const options = [];
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: \`Long Label: \${value}\`,
    value,
  });
}
const App = () => {
  const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Select {...selectProps} />
      <Select {...selectProps} disabled />
    </Space>
  );
};
export default App;
`,description:"<p>Auto collapse to tag with responsive case. Not recommend use in large form case since responsive calculation has a perf cost.</p>"}},{demo:{id:"components-select-demo-big-data"},previewerProps:{title:"Big Data",filename:"components/select/demo/big-data.tsx",jsx:`import React from 'react';
import { Divider, Select, Typography } from 'antd';
const { Title } = Typography;
const options = [];
for (let i = 0; i < 100000; i++) {
  const value = \`\${i.toString(36)}\${i}\`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <>
    <Title level={3}>Ant Design 4.0</Title>
    <Title level={4}>{options.length} Items</Title>
    <Select
      mode="multiple"
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    />

    <Divider />

    <Title level={3}>Ant Design 3.0</Title>
    <iframe
      title="Ant Design 3.0 Select demo"
      src="https://codesandbox.io/embed/solitary-voice-m3vme?fontsize=14&hidenavigation=1&theme=dark&view=preview"
      style={{
        width: '100%',
        height: 300,
      }}
    />
  </>
);
export default App;
`,description:'<p>Select use <a href="https://github.com/react-component/virtual-list">virtual scroll</a> which get better performance <a href="https://codesandbox.io/s/beautiful-banzai-m72lv">than 3.0</a>.</p>'}},{demo:{id:"components-select-demo-status"},previewerProps:{title:"Status",filename:"components/select/demo/status.tsx",jsx:`import React from 'react';
import { Select, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Select
      status="error"
      style={{
        width: '100%',
      }}
    />
    <Select
      status="warning"
      style={{
        width: '100%',
      }}
    />
  </Space>
);
export default App;
`,description:"<p>Add status to Select with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>",style:`#components-select-demo-status .ant-select {
  margin: 0;
}`}},{demo:{id:"components-select-demo-placement"},previewerProps:{title:"Placement",filename:"components/select/demo/placement.tsx",jsx:`import React, { useState } from 'react';
import { Radio, Select } from 'antd';
const App = () => {
  const [placement, SetPlacement] = useState('topLeft');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Select
        defaultValue="HangZhou"
        style={{
          width: 120,
        }}
        dropdownMatchSelectWidth={false}
        placement={placement}
        options={[
          {
            value: 'HangZhou',
            label: 'HangZhou #310000',
          },
          {
            value: 'NingBo',
            label: 'NingBo #315000',
          },
          {
            value: 'WenZhou',
            label: 'WenZhou #325000',
          },
        ]}
      />
    </>
  );
};
export default App;
`,description:"<p>You can manually specify the position of the popup via <code>placement</code>.</p>"}},{demo:{id:"components-select-demo-debug"},previewerProps:{debug:!0,title:"4.0 Debug",filename:"components/select/demo/debug.tsx",jsx:`import React from 'react';
import { Button, Input, Select } from 'antd';
const handleChange = (value) => {
  console.log(\`selected \${value}\`);
};
const App = () => (
  <div
    style={{
      width: 500,
      position: 'relative',
      zIndex: 1,
      border: '1px solid red',
      background: '#FFF',
    }}
  >
    <Input
      style={{
        width: 100,
      }}
      value="222"
    />
    <Select
      style={{
        width: 120,
      }}
      onChange={handleChange}
      showSearch
      placeholder="233"
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'long',
          label: 'I am super super long!',
        },
      ]}
    />
    <Select
      mode="multiple"
      style={{
        width: 120,
      }}
      defaultValue={['lucy']}
      onChange={handleChange}
      showSearch
      placeholder="233"
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'long',
          label: 'I am super super long!',
        },
      ]}
    />
    <span className="debug-align">AntDesign</span>
    <Button>222</Button>
  </div>
);
export default App;
`,description:"<p>Basic Usage.</p>",style:`#components-select-demo-debug .debug-align {
  position: relative;
  display: inline-block;
  line-height: 32px;
  height: 32px;
  background: rgba(255, 0, 0, 0.1);
  box-sizing: border-box;
}
#components-select-demo-debug .debug-align:after {
  position: absolute;
  content: '';
  border: 1px solid green;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}`}},{demo:{id:"components-select-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/select/demo/render-panel.tsx",jsx:`import React from 'react';
import { Select, Switch, Space } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalSelect } = Select;
const App = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
      }}
    >
      <Switch checked={open} onChange={() => setOpen(!open)} />
      <InternalSelect
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        open={open}
        options={[
          {
            label: 'Jack',
            value: 'jack',
          },
          {
            label: 'Lucy',
            value: 'lucy',
          },
          {
            label: 'Disabled',
            value: 'disabled',
          },
          {
            label: 'Bamboo',
            value: 'bamboo',
          },
        ]}
      />
    </Space>
  );
};
export default App;
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,e.tZ)("div",{className:"markdown"},(0,e.tZ)("h2",{id:"api"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,e.tZ)("span",{className:"icon icon-link"})),"API"),(0,e.tZ)(a.Z,{lang:"jsx"},n[7].value),(0,e.tZ)("h3",{id:"select-props"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#select-props"},(0,e.tZ)("span",{className:"icon icon-link"})),"Select props"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[8].value),(0,e.tZ)("th",null,n[9].value),(0,e.tZ)("th",null,n[10].value),(0,e.tZ)("th",null,n[11].value),(0,e.tZ)("th",null,n[12].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[13].value),(0,e.tZ)("td",null,n[14].value),(0,e.tZ)("td",null,n[15].value),(0,e.tZ)("td",null,n[16].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[17].value),(0,e.tZ)("td",null,n[18].value,(0,e.tZ)("code",null,n[19].value),n[20].value,(0,e.tZ)("code",null,n[21].value),n[22].value,(0,e.tZ)("code",null,n[23].value)),(0,e.tZ)("td",null,n[24].value),(0,e.tZ)("td",null,n[25].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[26].value),(0,e.tZ)("td",null,n[27].value),(0,e.tZ)("td",null,n[28].value),(0,e.tZ)("td",null,n[29].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[30].value),(0,e.tZ)("td",null,n[31].value),(0,e.tZ)("td",null,n[32].value),(0,e.tZ)("td",null,n[33].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[34].value),(0,e.tZ)("td",null,n[35].value),(0,e.tZ)("td",null,n[36].value),(0,e.tZ)("td",null,n[37].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[38].value),(0,e.tZ)("td",null,n[39].value),(0,e.tZ)("td",null,n[40].value),(0,e.tZ)("td",null,n[41].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[42].value),(0,e.tZ)("td",null,n[43].value),(0,e.tZ)("td",null,n[44].value),(0,e.tZ)("td",null,n[45].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[46].value),(0,e.tZ)("td",null,n[47].value),(0,e.tZ)("td",null,n[48].value,(0,e.tZ)("br",null),n[49].value,(0,e.tZ)("br",null),n[50].value),(0,e.tZ)("td",null,n[51].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[52].value),(0,e.tZ)("td",null,n[53].value),(0,e.tZ)("td",null,n[54].value),(0,e.tZ)("td",null,n[55].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[56].value),(0,e.tZ)("td",null,n[57].value),(0,e.tZ)("td",null,n[58].value),(0,e.tZ)("td",null,n[59].value),(0,e.tZ)("td",null,n[60].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[61].value),(0,e.tZ)("td",null,n[62].value,(0,e.tZ)("code",null,n[63].value),n[64].value,(0,e.tZ)("code",null,n[65].value),n[66].value),(0,e.tZ)("td",null,n[67].value),(0,e.tZ)("td",null,n[68].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[69].value),(0,e.tZ)("td",null,n[70].value),(0,e.tZ)("td",null,n[71].value),(0,e.tZ)("td",null,n[72].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[73].value),(0,e.tZ)("td",null,n[74].value),(0,e.tZ)("td",null,n[75].value),(0,e.tZ)("td",null,n[76].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[77].value),(0,e.tZ)("td",null,n[78].value),(0,e.tZ)("td",null,n[79].value),(0,e.tZ)("td",null,n[80].value,(0,e.tZ)("code",null,n[81].value),n[82].value,(0,e.tZ)("code",null,n[83].value),n[84].value,(0,e.tZ)("code",null,n[85].value),n[86].value),(0,e.tZ)("td",null,n[87].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[88].value),(0,e.tZ)("td",null,n[89].value,(0,e.tZ)("code",null,n[90].value),n[91].value,(0,e.tZ)("code",null,n[92].value),n[93].value,(0,e.tZ)("code",null,n[94].value),n[95].value),(0,e.tZ)("td",null,n[96].value),(0,e.tZ)("td",null,n[97].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[98].value),(0,e.tZ)("td",null,n[99].value,(0,e.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"},n[100].value),n[101].value),(0,e.tZ)("td",null,n[102].value),(0,e.tZ)("td",null,n[103].value),(0,e.tZ)("td",null,n[104].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[105].value),(0,e.tZ)("td",null,n[106].value,(0,e.tZ)("code",null,n[107].value),n[108].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/4j168r7jw0"},n[109].value)),(0,e.tZ)("td",null,n[110].value),(0,e.tZ)("td",null,n[111].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[112].value),(0,e.tZ)("td",null,n[113].value,(0,e.tZ)("code",null,n[114].value),n[115].value),(0,e.tZ)("td",null,n[116].value),(0,e.tZ)("td",null,n[117].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[118].value),(0,e.tZ)("td",null,n[119].value),(0,e.tZ)("td",null,n[120].value),(0,e.tZ)("td",null,n[121].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[122].value),(0,e.tZ)("td",null,n[123].value),(0,e.tZ)("td",null,n[124].value),(0,e.tZ)("td",null,n[125].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[126].value),(0,e.tZ)("td",null,n[127].value,(0,e.tZ)("code",null,n[128].value),n[129].value),(0,e.tZ)("td",null,n[130].value,(0,e.tZ)("code",null,n[131].value)),(0,e.tZ)("td",null,n[132].value),(0,e.tZ)("td",null,n[133].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[134].value),(0,e.tZ)("td",null,n[135].value),(0,e.tZ)("td",null,n[136].value),(0,e.tZ)("td",null,n[137].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[138].value),(0,e.tZ)("td",null,n[139].value),(0,e.tZ)("td",null,n[140].value),(0,e.tZ)("td",null,n[141].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[142].value),(0,e.tZ)("td",null,n[143].value),(0,e.tZ)("td",null,n[144].value),(0,e.tZ)("td",null,n[145].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[146].value),(0,e.tZ)("td",null,n[147].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[148].value),n[149].value,(0,e.tZ)("code",null,n[150].value)),(0,e.tZ)("td",null,n[151].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[152].value),(0,e.tZ)("td",null,n[153].value),(0,e.tZ)("td",null,n[154].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[155].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[156].value),(0,e.tZ)("td",null,n[157].value),(0,e.tZ)("td",null,n[158].value),(0,e.tZ)("td",null,n[159].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[160].value),(0,e.tZ)("td",null,n[161].value,(0,e.tZ)("code",null,n[162].value),n[163].value,(0,e.tZ)("code",null,n[164].value)),(0,e.tZ)("td",null,n[165].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[166].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[167].value),(0,e.tZ)("td",null,n[168].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/antd-reproduction-template-tk678"},n[169].value)),(0,e.tZ)("td",null,n[170].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[171].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[172].value),(0,e.tZ)("td",null,n[173].value),(0,e.tZ)("td",null,n[174].value),(0,e.tZ)("td",null,n[175].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[176].value),(0,e.tZ)("td",null,n[177].value),(0,e.tZ)("td",null,n[178].value),(0,e.tZ)("td",null,n[179].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[180].value),(0,e.tZ)("td",null,n[181].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[182].value),n[183].value,(0,e.tZ)("code",null,n[184].value),n[185].value,(0,e.tZ)("code",null,n[186].value),n[187].value,(0,e.tZ)("code",null,n[188].value)),(0,e.tZ)("td",null,n[189].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[190].value),(0,e.tZ)("td",null,n[191].value),(0,e.tZ)("td",null,n[192].value),(0,e.tZ)("td",null,n[193].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[194].value),(0,e.tZ)("td",null,n[195].value),(0,e.tZ)("td",null,n[196].value),(0,e.tZ)("td",null,n[197].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[198].value),(0,e.tZ)("td",null,n[199].value),(0,e.tZ)("td",null,n[200].value),(0,e.tZ)("td",null,n[201].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[202].value),(0,e.tZ)("td",null,n[203].value),(0,e.tZ)("td",null,n[204].value),(0,e.tZ)("td",null,n[205].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[206].value),(0,e.tZ)("td",null,n[207].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[208].value),n[209].value,(0,e.tZ)("code",null,n[210].value),n[211].value,(0,e.tZ)("code",null,n[212].value)),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[213].value)),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[214].value),(0,e.tZ)("td",null,n[215].value),(0,e.tZ)("td",null,n[216].value),(0,e.tZ)("td",null,n[217].value),(0,e.tZ)("td",null,n[218].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[219].value),(0,e.tZ)("td",null,n[220].value),(0,e.tZ)("td",null,n[221].value),(0,e.tZ)("td",null,n[222].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[223].value),(0,e.tZ)("td",null,n[224].value,(0,e.tZ)("code",null,n[225].value),n[226].value,(0,e.tZ)("code",null,n[227].value),n[228].value,(0,e.tZ)("code",null,n[229].value)),(0,e.tZ)("td",null,n[230].value),(0,e.tZ)("td",null,n[231].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[232].value),(0,e.tZ)("td",null,n[233].value,(0,e.tZ)("code",null,n[234].value)),(0,e.tZ)("td",null,n[235].value),(0,e.tZ)("td",null,n[236].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[237].value),(0,e.tZ)("td",null,n[238].value),(0,e.tZ)("td",null,n[239].value,(0,e.tZ)("br",null),n[240].value,(0,e.tZ)("br",null),n[241].value),(0,e.tZ)("td",null,n[242].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[243].value),(0,e.tZ)("td",null,n[244].value),(0,e.tZ)("td",null,n[245].value),(0,e.tZ)("td",null,n[246].value),(0,e.tZ)("td",null,n[247].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[248].value),(0,e.tZ)("td",null,n[249].value),(0,e.tZ)("td",null,n[250].value),(0,e.tZ)("td",null,n[251].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[252].value),(0,e.tZ)("td",null,n[253].value),(0,e.tZ)("td",null,n[254].value),(0,e.tZ)("td",null,n[255].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[256].value),(0,e.tZ)("td",null,n[257].value),(0,e.tZ)("td",null,n[258].value),(0,e.tZ)("td",null,n[259].value),(0,e.tZ)("td",null,n[260].value)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[261].value),(0,e.tZ)("td",null,n[262].value,(0,e.tZ)("code",null,n[263].value),n[264].value,(0,e.tZ)("code",null,n[265].value),n[266].value),(0,e.tZ)("td",null,n[267].value),(0,e.tZ)("td",null,n[268].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[269].value),(0,e.tZ)("td",null,n[270].value),(0,e.tZ)("td",null,n[271].value),(0,e.tZ)("td",null,n[272].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[273].value),(0,e.tZ)("td",null,n[274].value),(0,e.tZ)("td",null,n[275].value),(0,e.tZ)("td",null,n[276].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[277].value),(0,e.tZ)("td",null,n[278].value),(0,e.tZ)("td",null,n[279].value),(0,e.tZ)("td",null,n[280].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[281].value),(0,e.tZ)("td",null,n[282].value),(0,e.tZ)("td",null,n[283].value),(0,e.tZ)("td",null,n[284].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[285].value),(0,e.tZ)("td",null,n[286].value),(0,e.tZ)("td",null,n[287].value),(0,e.tZ)("td",null,n[288].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[289].value),(0,e.tZ)("td",null,n[290].value),(0,e.tZ)("td",null,n[291].value),(0,e.tZ)("td",null,n[292].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[293].value),(0,e.tZ)("td",null,n[294].value),(0,e.tZ)("td",null,n[295].value),(0,e.tZ)("td",null,n[296].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[297].value),(0,e.tZ)("td",null,n[298].value),(0,e.tZ)("td",null,n[299].value),(0,e.tZ)("td",null,n[300].value),(0,e.tZ)("td",null)))),(0,e.tZ)("blockquote",null,(0,e.tZ)("p",null,n[301].value,(0,e.tZ)("code",null,n[302].value),n[303].value)),(0,e.tZ)("h3",{id:"select-methods"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#select-methods"},(0,e.tZ)("span",{className:"icon icon-link"})),"Select Methods"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[304].value),(0,e.tZ)("th",null,n[305].value),(0,e.tZ)("th",null,n[306].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[307].value),(0,e.tZ)("td",null,n[308].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[309].value),(0,e.tZ)("td",null,n[310].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"option-props"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#option-props"},(0,e.tZ)("span",{className:"icon icon-link"})),"Option props"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[311].value),(0,e.tZ)("th",null,n[312].value),(0,e.tZ)("th",null,n[313].value),(0,e.tZ)("th",null,n[314].value),(0,e.tZ)("th",null,n[315].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[316].value),(0,e.tZ)("td",null,n[317].value),(0,e.tZ)("td",null,n[318].value),(0,e.tZ)("td",null,n[319].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[320].value),(0,e.tZ)("td",null,n[321].value),(0,e.tZ)("td",null,n[322].value),(0,e.tZ)("td",null,n[323].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[324].value),(0,e.tZ)("td",null,(0,e.tZ)("code",null,n[325].value),n[326].value),(0,e.tZ)("td",null,n[327].value),(0,e.tZ)("td",null,n[328].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[329].value),(0,e.tZ)("td",null,n[330].value),(0,e.tZ)("td",null,n[331].value),(0,e.tZ)("td",null,n[332].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h3",{id:"optgroup-props"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#optgroup-props"},(0,e.tZ)("span",{className:"icon icon-link"})),"OptGroup props"),(0,e.tZ)(l.Z,{className:"component-api-table"},(0,e.tZ)("thead",null,(0,e.tZ)("tr",null,(0,e.tZ)("th",null,n[333].value),(0,e.tZ)("th",null,n[334].value),(0,e.tZ)("th",null,n[335].value),(0,e.tZ)("th",null,n[336].value),(0,e.tZ)("th",null,n[337].value))),(0,e.tZ)("tbody",null,(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[338].value),(0,e.tZ)("td",null,n[339].value),(0,e.tZ)("td",null,n[340].value),(0,e.tZ)("td",null,n[341].value),(0,e.tZ)("td",null)),(0,e.tZ)("tr",null,(0,e.tZ)("td",null,n[342].value),(0,e.tZ)("td",null,n[343].value),(0,e.tZ)("td",null,n[344].value),(0,e.tZ)("td",null,n[345].value),(0,e.tZ)("td",null)))),(0,e.tZ)("h2",{id:"faq"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,e.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,e.tZ)("h3",{id:"why-sometime-search-will-show-2-same-option-when-in-tags-mode"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-sometime-search-will-show-2-same-option-when-in-tags-mode"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why sometime search will show 2 same option when in ",(0,e.tZ)("code",null,n[346].value)," mode?"),(0,e.tZ)("p",null,n[347].value,(0,e.tZ)("code",null,n[348].value),n[349].value,(0,e.tZ)("code",null,n[350].value),n[351].value,(0,e.tZ)("code",null,n[352].value),n[353].value),(0,e.tZ)("h3",{id:"when-i-click-elements-in-dropdownrender-the-select-dropdown-will-not-be-closed"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-i-click-elements-in-dropdownrender-the-select-dropdown-will-not-be-closed"},(0,e.tZ)("span",{className:"icon icon-link"})),"When I click elements in dropdownRender, the select dropdown will not be closed?"),(0,e.tZ)("p",null,n[354].value,(0,e.tZ)("code",null,n[355].value),n[356].value,(0,e.tZ)("a",{href:"https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js"},n[357].value),n[358].value),(0,e.tZ)("h3",{id:"i-dont-want-dropdown-close-when-click-inside-dropdownrender"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#i-dont-want-dropdown-close-when-click-inside-dropdownrender"},(0,e.tZ)("span",{className:"icon icon-link"})),"I don't want dropdown close when click inside ",(0,e.tZ)("code",null,n[359].value),"?"),(0,e.tZ)("p",null,n[360].value),(0,e.tZ)(a.Z,{lang:"jsx"},n[361].value),(0,e.tZ)("h3",{id:"why-sometime-customize-option-cause-scroll-break"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-sometime-customize-option-cause-scroll-break"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why sometime customize Option cause scroll break?"),(0,e.tZ)("p",null,n[362].value,(0,e.tZ)("code",null,n[363].value),n[364].value,(0,e.tZ)("code",null,n[365].value),n[366].value,(0,e.tZ)("code",null,n[367].value),n[368].value),(0,e.tZ)(a.Z,{lang:"jsx"},n[369].value),(0,e.tZ)("p",null,n[370].value,(0,e.tZ)("code",null,n[371].value),n[372].value,(0,e.tZ)("code",null,n[373].value),n[374].value),(0,e.tZ)("h3",{id:"why-a11y-test-report-missing-aria--props"},(0,e.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-a11y-test-report-missing-aria--props"},(0,e.tZ)("span",{className:"icon icon-link"})),"Why a11y test report missing ",(0,e.tZ)("code",null,n[375].value)," props?"),(0,e.tZ)("p",null,n[376].value,(0,e.tZ)("code",null,n[377].value),n[378].value,(0,e.tZ)("code",null,n[379].value),n[380].value))))}u.default=i}}]);
