"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[6552],{43951:function(r,o,l){l.r(o);var p=l(2143),v=l(50250),Z=l(59378),m=l(78190),u=l(74775),t=l(5937),h=l(2068),_=l(74399),g=l(46004),f=l(35708),b=l(30138),x=l(56140),d=l(5388),S=l(49545),C=l(92169),y=l(13140),A=l(95127),E=l(74418),D=l(97119),a=l(28257),s=l(67294),n=l(13946);function i(){var c=(0,a.eL)(),e=c.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[1].value),(0,n.tZ)("li",null,e[2].value,(0,n.tZ)(a.rU,{to:"/components/radio/"},e[3].value),e[4].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(d.Z,{items:[{demo:{id:"components-select-demo-basic"},previewerProps:{title:"\u57FA\u672C\u4F7F\u7528",filename:"components/select/demo/basic.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u57FA\u672C\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-select-demo-search"},previewerProps:{title:"\u5E26\u641C\u7D22\u6846",filename:"components/select/demo/search.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5C55\u5F00\u540E\u53EF\u5BF9\u9009\u9879\u8FDB\u884C\u641C\u7D22\u3002</p>"}},{demo:{id:"components-select-demo-multiple"},previewerProps:{title:"\u591A\u9009",filename:"components/select/demo/multiple.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u591A\u9009\uFF0C\u4ECE\u5DF2\u6709\u6761\u76EE\u4E2D\u9009\u62E9\u3002</p>"}},{demo:{id:"components-select-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/select/demo/size.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u4E09\u79CD\u5927\u5C0F\u7684\u9009\u62E9\u6846\uFF0C\u5F53 size \u5206\u522B\u4E3A <code>large</code> \u548C <code>small</code> \u65F6\uFF0C\u8F93\u5165\u6846\u9AD8\u5EA6\u4E3A <code>40px</code> \u548C <code>24px</code> \uFF0C\u9ED8\u8BA4\u9AD8\u5EA6\u4E3A <code>32px</code>\u3002</p>",style:`.code-box-demo .ant-select {
  margin: 0 8px 10px 0;
}

.ant-row-rtl .code-box-demo .ant-select {
  margin: 0 0 10px 8px;
}

#components-select-demo-search-box .code-box-demo .ant-select {
  margin: 0;
}`}},{demo:{id:"components-select-demo-option-label-prop"},previewerProps:{title:"\u5B9A\u5236\u56DE\u586B\u5185\u5BB9",filename:"components/select/demo/option-label-prop.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4F7F\u7528 <code>optionLabelProp</code> \u6307\u5B9A\u56DE\u586B\u5230\u9009\u62E9\u6846\u7684 <code>Option</code> \u5C5E\u6027\u3002</p>",style:`.demo-option-label-item > span {
  margin-right: 6px;
}`}},{demo:{id:"components-select-demo-search-sort"},previewerProps:{title:"\u5E26\u6392\u5E8F\u7684\u641C\u7D22",filename:"components/select/demo/search-sort.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5728\u641C\u7D22\u6A21\u5F0F\u4E0B\u5BF9\u8FC7\u6EE4\u7ED3\u679C\u9879\u8FDB\u884C\u6392\u5E8F\u3002</p>"}},{demo:{id:"components-select-demo-tags"},previewerProps:{title:"\u6807\u7B7E",filename:"components/select/demo/tags.tsx",jsx:`import React from 'react';
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
`,description:"<p>tags select\uFF0C\u968F\u610F\u8F93\u5165\u7684\u5185\u5BB9\uFF08scroll the menu\uFF09\u3002</p>"}},{demo:{id:"components-select-demo-optgroup"},previewerProps:{title:"\u5206\u7EC4",filename:"components/select/demo/optgroup.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u7528 <code>OptGroup</code> \u8FDB\u884C\u9009\u9879\u5206\u7EC4\u3002</p>"}},{demo:{id:"components-select-demo-coordinate"},previewerProps:{title:"\u8054\u52A8",filename:"components/select/demo/coordinate.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p>\u7701\u5E02\u8054\u52A8\u662F\u5178\u578B\u7684\u4F8B\u5B50\u3002</p>
<p>\u63A8\u8350\u4F7F\u7528 <a href="/components/cascader/">Cascader</a> \u7EC4\u4EF6\u3002</p>`}},{demo:{id:"components-select-demo-search-box"},previewerProps:{title:"\u641C\u7D22\u6846",filename:"components/select/demo/search-box.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u641C\u7D22\u548C\u8FDC\u7A0B\u6570\u636E\u7ED3\u5408\u3002</p>"}},{demo:{id:"components-select-demo-label-in-value"},previewerProps:{title:"\u83B7\u5F97\u9009\u9879\u7684\u6587\u672C",filename:"components/select/demo/label-in-value.tsx",jsx:`import React from 'react';
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
`,description:`<p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B <code>onChange</code> \u91CC\u53EA\u80FD\u62FF\u5230 <code>value</code>\uFF0C\u5982\u679C\u9700\u8981\u62FF\u5230\u9009\u4E2D\u7684\u8282\u70B9\u6587\u672C <code>label</code>\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>labelInValue</code> \u5C5E\u6027\u3002</p>
<p>\u9009\u4E2D\u9879\u7684 <code>label</code> \u4F1A\u88AB\u5305\u88C5\u5230 <code>value</code> \u4E2D\u4F20\u9012\u7ED9 <code>onChange</code> \u7B49\u51FD\u6570\uFF0C\u6B64\u65F6 <code>value</code> \u662F\u4E00\u4E2A\u5BF9\u8C61\u3002</p>`}},{demo:{id:"components-select-demo-automatic-tokenization"},previewerProps:{title:"\u81EA\u52A8\u5206\u8BCD",filename:"components/select/demo/automatic-tokenization.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u8BD5\u4E0B\u590D\u5236 <code>\u9732\u897F,\u6770\u514B</code> \u5E76\u7C98\u8D34\u5230\u8F93\u5165\u6846\u91CC\u3002\u53EA\u5728 tags \u548C multiple \u6A21\u5F0F\u4E0B\u53EF\u7528\u3002</p>"}},{demo:{id:"components-select-demo-select-users"},previewerProps:{title:"\u641C\u7D22\u7528\u6237",filename:"components/select/demo/select-users.tsx",jsx:`import React, { useMemo, useRef, useState } from 'react';
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
`,description:"<p>\u4E00\u4E2A\u5E26\u6709\u8FDC\u7A0B\u641C\u7D22\uFF0C\u9632\u6296\u63A7\u5236\uFF0C\u8BF7\u6C42\u65F6\u5E8F\u63A7\u5236\uFF0C\u52A0\u8F7D\u72B6\u6001\u7684\u591A\u9009\u793A\u4F8B\u3002</p>"}},{demo:{id:"components-select-demo-suffix"},previewerProps:{debug:!0,title:"\u540E\u7F00\u56FE\u6807",filename:"components/select/demo/suffix.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u57FA\u672C\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-select-demo-custom-dropdown-menu"},previewerProps:{title:"\u6269\u5C55\u83DC\u5355",filename:"components/select/demo/custom-dropdown-menu.tsx",jsx:`import React, { useState, useRef } from 'react';
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
`,description:'<p>\u4F7F\u7528 <code>open</code> \u5BF9\u4E0B\u62C9\u83DC\u5355\u8FDB\u884C\u81EA\u7531\u6269\u5C55\u3002\u5982\u679C\u5E0C\u671B\u70B9\u51FB\u81EA\u5B9A\u4E49\u5185\u5BB9\u540E\u5173\u95ED\u6D6E\u5C42\uFF0C\u4F60\u9700\u8981\u4F7F\u7528\u53D7\u63A7\u6A21\u5F0F\u81EA\u884C\u63A7\u5236\uFF08<a href="https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js">codesandbox</a>\uFF09\u3002</p>'}},{demo:{id:"components-select-demo-hide-selected"},previewerProps:{title:"\u9690\u85CF\u5DF2\u9009\u62E9\u9009\u9879",filename:"components/select/demo/hide-selected.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u9690\u85CF\u4E0B\u62C9\u5217\u8868\u4E2D\u5DF2\u9009\u62E9\u7684\u9009\u9879\u3002</p>"}},{demo:{id:"components-select-demo-bordered"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/select/demo/bordered.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u65E0\u8FB9\u6846\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-select-demo-custom-tag-render"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u9009\u62E9\u6807\u7B7E",filename:"components/select/demo/custom-tag-render.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u5141\u8BB8\u81EA\u5B9A\u4E49\u9009\u62E9\u6807\u7B7E\u7684\u6837\u5F0F\u3002</p>"}},{demo:{id:"components-select-demo-responsive"},previewerProps:{title:"\u54CD\u5E94\u5F0F maxTagCount",filename:"components/select/demo/responsive.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u591A\u9009\u4E0B\u901A\u8FC7\u54CD\u5E94\u5F0F\u5E03\u5C40\u8BA9\u9009\u9879\u81EA\u52A8\u6536\u7F29\u3002\u8BE5\u529F\u80FD\u5BF9\u6027\u80FD\u6709\u6240\u6D88\u8017\uFF0C\u4E0D\u63A8\u8350\u5728\u5927\u8868\u5355\u573A\u666F\u4E0B\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-select-demo-big-data"},previewerProps:{title:"\u5927\u6570\u636E",filename:"components/select/demo/big-data.tsx",jsx:`import React from 'react';
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
`,description:'<p>Select \u4F7F\u7528\u4E86<a href="https://github.com/react-component/virtual-list">\u865A\u62DF\u6EDA\u52A8</a>\u6280\u672F\uFF0C\u56E0\u800C\u83B7\u5F97\u4E86\u6BD4 <a href="https://codesandbox.io/s/beautiful-banzai-m72lv">3.0 \u66F4\u597D\u7684\u6027\u80FD</a>\u3002</p>'}},{demo:{id:"components-select-demo-status"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u72B6\u6001",filename:"components/select/demo/status.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u4F7F\u7528 <code>status</code> \u4E3A Select \u6DFB\u52A0\u72B6\u6001\uFF0C\u53EF\u9009 <code>error</code> \u6216\u8005 <code>warning</code>\u3002</p>",style:`#components-select-demo-status .ant-select {
  margin: 0;
}`}},{demo:{id:"components-select-demo-placement"},previewerProps:{title:"\u5F39\u51FA\u4F4D\u7F6E",filename:"components/select/demo/placement.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>\u53EF\u4EE5\u901A\u8FC7 <code>placement</code> \u624B\u52A8\u6307\u5B9A\u5F39\u51FA\u7684\u4F4D\u7F6E\u3002</p>"}},{demo:{id:"components-select-demo-debug"},previewerProps:{debug:!0,title:"4.0 Debug",filename:"components/select/demo/debug.tsx",jsx:`import React from 'react';
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
`,description:"<p>\u57FA\u672C\u4F7F\u7528\u3002</p>",style:`#components-select-demo-debug .debug-align {
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
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(u.Z,{lang:"jsx"},e[5].value),(0,n.tZ)("h3",{id:"select-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#select-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Select props"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[6].value),(0,n.tZ)("th",null,e[7].value),(0,n.tZ)("th",null,e[8].value),(0,n.tZ)("th",null,e[9].value),(0,n.tZ)("th",null,e[10].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[11].value),(0,n.tZ)("td",null,e[12].value),(0,n.tZ)("td",null,e[13].value),(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[15].value),(0,n.tZ)("td",null,e[16].value,(0,n.tZ)("code",null,e[17].value),e[18].value,(0,n.tZ)("code",null,e[19].value),e[20].value,(0,n.tZ)("code",null,e[21].value),e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value,(0,n.tZ)("br",null),e[48].value,(0,n.tZ)("br",null),e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null,e[61].value,(0,n.tZ)("code",null,e[62].value),e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value),(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null,e[77].value,(0,n.tZ)("code",null,e[78].value),e[79].value,(0,n.tZ)("code",null,e[80].value),e[81].value,(0,n.tZ)("code",null,e[82].value),e[83].value),(0,n.tZ)("td",null,e[84].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[85].value),(0,n.tZ)("td",null,e[86].value,(0,n.tZ)("code",null,e[87].value),e[88].value,(0,n.tZ)("code",null,e[89].value),e[90].value,(0,n.tZ)("code",null,e[91].value),e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"},e[97].value),e[98].value),(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null,e[103].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/4j168r7jw0"},e[104].value)),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value,(0,n.tZ)("code",null,e[109].value),e[110].value),(0,n.tZ)("td",null,e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[113].value),(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value),(0,n.tZ)("td",null,e[116].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[121].value),(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value,(0,n.tZ)("code",null,e[124].value)),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[127].value),(0,n.tZ)("td",null,e[128].value),(0,n.tZ)("td",null,e[129].value),(0,n.tZ)("td",null,e[130].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[135].value),(0,n.tZ)("td",null,e[136].value),(0,n.tZ)("td",null,e[137].value),(0,n.tZ)("td",null,e[138].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[141].value),e[142].value,(0,n.tZ)("code",null,e[143].value)),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[145].value),(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[148].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null,e[150].value),(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null,e[154].value,(0,n.tZ)("code",null,e[155].value),e[156].value,(0,n.tZ)("code",null,e[157].value),e[158].value,(0,n.tZ)("code",null,e[159].value),e[160].value,(0,n.tZ)("code",null,e[161].value),e[162].value),(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[164].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[165].value),(0,n.tZ)("td",null,e[166].value,(0,n.tZ)("code",null,e[167].value),e[168].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/antd-reproduction-template-tk678"},e[169].value)),(0,n.tZ)("td",null,e[170].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[171].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[172].value),(0,n.tZ)("td",null,e[173].value),(0,n.tZ)("td",null,e[174].value),(0,n.tZ)("td",null,e[175].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[176].value),(0,n.tZ)("td",null,e[177].value),(0,n.tZ)("td",null,e[178].value),(0,n.tZ)("td",null,e[179].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[180].value),(0,n.tZ)("td",null,e[181].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[182].value),e[183].value,(0,n.tZ)("code",null,e[184].value),e[185].value,(0,n.tZ)("code",null,e[186].value),e[187].value,(0,n.tZ)("code",null,e[188].value)),(0,n.tZ)("td",null,e[189].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[190].value),(0,n.tZ)("td",null,e[191].value),(0,n.tZ)("td",null,e[192].value),(0,n.tZ)("td",null,e[193].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[194].value),(0,n.tZ)("td",null,e[195].value),(0,n.tZ)("td",null,e[196].value),(0,n.tZ)("td",null,e[197].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[198].value),(0,n.tZ)("td",null,e[199].value),(0,n.tZ)("td",null,e[200].value),(0,n.tZ)("td",null,e[201].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[202].value),(0,n.tZ)("td",null,e[203].value),(0,n.tZ)("td",null,e[204].value),(0,n.tZ)("td",null,e[205].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[206].value),(0,n.tZ)("td",null,e[207].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[208].value),e[209].value,(0,n.tZ)("code",null,e[210].value),e[211].value,(0,n.tZ)("code",null,e[212].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[213].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[214].value),(0,n.tZ)("td",null,e[215].value),(0,n.tZ)("td",null,e[216].value),(0,n.tZ)("td",null,e[217].value),(0,n.tZ)("td",null,e[218].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[219].value),(0,n.tZ)("td",null,e[220].value),(0,n.tZ)("td",null,e[221].value),(0,n.tZ)("td",null,e[222].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[223].value),(0,n.tZ)("td",null,e[224].value,(0,n.tZ)("code",null,e[225].value),e[226].value,(0,n.tZ)("code",null,e[227].value),e[228].value,(0,n.tZ)("code",null,e[229].value),e[230].value),(0,n.tZ)("td",null,e[231].value),(0,n.tZ)("td",null,e[232].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[233].value),(0,n.tZ)("td",null,e[234].value,(0,n.tZ)("code",null,e[235].value),e[236].value),(0,n.tZ)("td",null,e[237].value),(0,n.tZ)("td",null,e[238].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[239].value),(0,n.tZ)("td",null,e[240].value),(0,n.tZ)("td",null,e[241].value,(0,n.tZ)("br",null),e[242].value,(0,n.tZ)("br",null),e[243].value),(0,n.tZ)("td",null,e[244].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[245].value),(0,n.tZ)("td",null,e[246].value),(0,n.tZ)("td",null,e[247].value),(0,n.tZ)("td",null,e[248].value),(0,n.tZ)("td",null,e[249].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[250].value),(0,n.tZ)("td",null,e[251].value),(0,n.tZ)("td",null,e[252].value),(0,n.tZ)("td",null,e[253].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[254].value),(0,n.tZ)("td",null,e[255].value),(0,n.tZ)("td",null,e[256].value),(0,n.tZ)("td",null,e[257].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[258].value),(0,n.tZ)("td",null,e[259].value),(0,n.tZ)("td",null,e[260].value),(0,n.tZ)("td",null,e[261].value),(0,n.tZ)("td",null,e[262].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[263].value),(0,n.tZ)("td",null,e[264].value,(0,n.tZ)("code",null,e[265].value),e[266].value,(0,n.tZ)("code",null,e[267].value),e[268].value),(0,n.tZ)("td",null,e[269].value),(0,n.tZ)("td",null,e[270].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[271].value),(0,n.tZ)("td",null,e[272].value),(0,n.tZ)("td",null,e[273].value),(0,n.tZ)("td",null,e[274].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[275].value),(0,n.tZ)("td",null,e[276].value),(0,n.tZ)("td",null,e[277].value),(0,n.tZ)("td",null,e[278].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[279].value),(0,n.tZ)("td",null,e[280].value),(0,n.tZ)("td",null,e[281].value),(0,n.tZ)("td",null,e[282].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[283].value),(0,n.tZ)("td",null,e[284].value),(0,n.tZ)("td",null,e[285].value),(0,n.tZ)("td",null,e[286].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[287].value),(0,n.tZ)("td",null,e[288].value),(0,n.tZ)("td",null,e[289].value),(0,n.tZ)("td",null,e[290].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[291].value),(0,n.tZ)("td",null,e[292].value),(0,n.tZ)("td",null,e[293].value),(0,n.tZ)("td",null,e[294].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[295].value),(0,n.tZ)("td",null,e[296].value),(0,n.tZ)("td",null,e[297].value),(0,n.tZ)("td",null,e[298].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[299].value),(0,n.tZ)("td",null,e[300].value),(0,n.tZ)("td",null,e[301].value),(0,n.tZ)("td",null,e[302].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,e[303].value,(0,n.tZ)("code",null,e[304].value),e[305].value)),(0,n.tZ)("h3",{id:"select-methods"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#select-methods"},(0,n.tZ)("span",{className:"icon icon-link"})),"Select Methods"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[306].value),(0,n.tZ)("th",null,e[307].value),(0,n.tZ)("th",null,e[308].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[309].value),(0,n.tZ)("td",null,e[310].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[311].value),(0,n.tZ)("td",null,e[312].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"option-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#option-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"Option props"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[313].value),(0,n.tZ)("th",null,e[314].value),(0,n.tZ)("th",null,e[315].value),(0,n.tZ)("th",null,e[316].value),(0,n.tZ)("th",null,e[317].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[318].value),(0,n.tZ)("td",null,e[319].value),(0,n.tZ)("td",null,e[320].value),(0,n.tZ)("td",null,e[321].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[322].value),(0,n.tZ)("td",null,e[323].value),(0,n.tZ)("td",null,e[324].value),(0,n.tZ)("td",null,e[325].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[326].value),(0,n.tZ)("td",null,e[327].value),(0,n.tZ)("td",null,e[328].value),(0,n.tZ)("td",null,e[329].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[330].value),(0,n.tZ)("td",null,e[331].value),(0,n.tZ)("td",null,e[332].value),(0,n.tZ)("td",null,e[333].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h3",{id:"optgroup-props"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#optgroup-props"},(0,n.tZ)("span",{className:"icon icon-link"})),"OptGroup props"),(0,n.tZ)(t.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[334].value),(0,n.tZ)("th",null,e[335].value),(0,n.tZ)("th",null,e[336].value),(0,n.tZ)("th",null,e[337].value),(0,n.tZ)("th",null,e[338].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[339].value),(0,n.tZ)("td",null,e[340].value),(0,n.tZ)("td",null,e[341].value),(0,n.tZ)("td",null,e[342].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[343].value),(0,n.tZ)("td",null,e[344].value),(0,n.tZ)("td",null,e[345].value),(0,n.tZ)("td",null,e[346].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"modetags-\u6A21\u5F0F\u4E0B\u4E3A\u4F55\u641C\u7D22\u6709\u65F6\u4F1A\u51FA\u73B0\u4E24\u4E2A\u76F8\u540C\u9009\u9879"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#modetags-\u6A21\u5F0F\u4E0B\u4E3A\u4F55\u641C\u7D22\u6709\u65F6\u4F1A\u51FA\u73B0\u4E24\u4E2A\u76F8\u540C\u9009\u9879"},(0,n.tZ)("span",{className:"icon icon-link"})),(0,n.tZ)("code",null,e[347].value)," \u6A21\u5F0F\u4E0B\u4E3A\u4F55\u641C\u7D22\u6709\u65F6\u4F1A\u51FA\u73B0\u4E24\u4E2A\u76F8\u540C\u9009\u9879\uFF1F"),(0,n.tZ)("p",null,e[348].value,(0,n.tZ)("code",null,e[349].value),e[350].value,(0,n.tZ)("code",null,e[351].value),e[352].value,(0,n.tZ)("code",null,e[353].value),e[354].value,(0,n.tZ)("code",null,e[355].value),e[356].value),(0,n.tZ)("h3",{id:"\u70B9\u51FB-dropdownrender-\u91CC\u7684\u5143\u7D20\u4E0B\u62C9\u83DC\u5355\u4E0D\u4F1A\u81EA\u52A8\u6D88\u5931"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u70B9\u51FB-dropdownrender-\u91CC\u7684\u5143\u7D20\u4E0B\u62C9\u83DC\u5355\u4E0D\u4F1A\u81EA\u52A8\u6D88\u5931"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u70B9\u51FB ",(0,n.tZ)("code",null,e[357].value)," \u91CC\u7684\u5143\u7D20\uFF0C\u4E0B\u62C9\u83DC\u5355\u4E0D\u4F1A\u81EA\u52A8\u6D88\u5931\uFF1F"),(0,n.tZ)("p",null,e[358].value,(0,n.tZ)("code",null,e[359].value),e[360].value,(0,n.tZ)("a",{href:"https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js"},e[361].value),e[362].value),(0,n.tZ)("h3",{id:"\u53CD\u8FC7\u6765\u5E0C\u671B\u70B9\u51FB-dropdownrender-\u91CC\u5143\u7D20\u4E0D\u6D88\u5931\u8BE5\u600E\u4E48\u529E"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u53CD\u8FC7\u6765\u5E0C\u671B\u70B9\u51FB-dropdownrender-\u91CC\u5143\u7D20\u4E0D\u6D88\u5931\u8BE5\u600E\u4E48\u529E"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u53CD\u8FC7\u6765\u5E0C\u671B\u70B9\u51FB ",(0,n.tZ)("code",null,e[363].value)," \u91CC\u5143\u7D20\u4E0D\u6D88\u5931\u8BE5\u600E\u4E48\u529E\uFF1F"),(0,n.tZ)("p",null,e[364].value),(0,n.tZ)(u.Z,{lang:"jsx"},e[365].value),(0,n.tZ)("h3",{id:"\u81EA\u5B9A\u4E49-option-\u6837\u5F0F\u5BFC\u81F4\u6EDA\u52A8\u5F02\u5E38\u600E\u4E48\u529E"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u81EA\u5B9A\u4E49-option-\u6837\u5F0F\u5BFC\u81F4\u6EDA\u52A8\u5F02\u5E38\u600E\u4E48\u529E"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u81EA\u5B9A\u4E49 Option \u6837\u5F0F\u5BFC\u81F4\u6EDA\u52A8\u5F02\u5E38\u600E\u4E48\u529E\uFF1F"),(0,n.tZ)("p",null,e[366].value,(0,n.tZ)("code",null,e[367].value),e[368].value,(0,n.tZ)("code",null,e[369].value),e[370].value,(0,n.tZ)("code",null,e[371].value),e[372].value),(0,n.tZ)(u.Z,{lang:"tsx"},e[373].value),(0,n.tZ)("p",null,e[374].value,(0,n.tZ)("code",null,e[375].value),e[376].value,(0,n.tZ)("code",null,e[377].value),e[378].value),(0,n.tZ)("h3",{id:"\u4E3A\u4F55\u65E0\u969C\u788D\u6D4B\u8BD5\u4F1A\u62A5\u7F3A\u5931-aria--\u5C5E\u6027"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55\u65E0\u969C\u788D\u6D4B\u8BD5\u4F1A\u62A5\u7F3A\u5931-aria--\u5C5E\u6027"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55\u65E0\u969C\u788D\u6D4B\u8BD5\u4F1A\u62A5\u7F3A\u5931 ",(0,n.tZ)("code",null,e[379].value)," \u5C5E\u6027\uFF1F"),(0,n.tZ)("p",null,e[380].value,(0,n.tZ)("code",null,e[381].value),e[382].value,(0,n.tZ)("code",null,e[383].value),e[384].value))))}o.default=i}}]);
