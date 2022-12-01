"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[4147],{60977:function(p,l,e){e.r(l);var c=e(2143),m=e(50250),_=e(59378),v=e(78190),o=e(74775),a=e(5937),Z=e(2068),h=e(74399),x=e(46004),f=e(35708),g=e(30138),A=e(56140),s=e(5388),C=e(49545),I=e(92169),S=e(13140),P=e(95127),y=e(74418),O=e(97119),u=e(28257),r=e(67294),t=e(13946);function d(){var i=(0,u.eL)(),n=i.texts;return(0,t.tZ)(u.dY,null,(0,t.tZ)(r.Fragment,null,(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("p",null,n[0].value),(0,t.tZ)("h2",{id:"when-to-use"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,t.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[1].value),(0,t.tZ)("li",null,n[2].value)),(0,t.tZ)("p",null,n[3].value),(0,t.tZ)("ul",null,(0,t.tZ)("li",null,n[4].value,(0,t.tZ)("strong",null,n[5].value),n[6].value),(0,t.tZ)("li",null,n[7].value,(0,t.tZ)("strong",null,n[8].value),n[9].value)),(0,t.tZ)("h2",{id:"examples"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,t.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,t.tZ)(s.Z,{items:[{demo:{id:"components-auto-complete-demo-basic"},previewerProps:{title:"Basic Usage",filename:"components/auto-complete/demo/basic.tsx",jsx:`import React, { useState } from 'react';
import { AutoComplete } from 'antd';
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
const App = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
  };
  const onChange = (data) => {
    setValue(data);
  };
  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
      <br />
      <br />
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
      />
    </>
  );
};
export default App;
`,description:"<p>Basic Usage, set data source of autocomplete with <code>options</code> property.</p>"}},{demo:{id:"components-auto-complete-demo-options"},previewerProps:{title:"Customized",filename:"components/auto-complete/demo/options.tsx",jsx:`import React, { useState } from 'react';
import { AutoComplete } from 'antd';
const App = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    let res = [];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        value,
        label: \`\${value}@\${domain}\`,
      }));
    }
    setOptions(res);
  };
  return (
    <AutoComplete
      style={{
        width: 200,
      }}
      onSearch={handleSearch}
      placeholder="input here"
      options={options}
    />
  );
};
export default App;
`,description:"<p>You could set custom <code>Option</code> label</p>"}},{demo:{id:"components-auto-complete-demo-custom"},previewerProps:{title:"Customize Input Component",filename:"components/auto-complete/demo/custom.tsx",jsx:`import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
const { TextArea } = Input;
const App = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : [
            {
              value,
            },
            {
              value: value + value,
            },
            {
              value: value + value + value,
            },
          ],
    );
  };
  const handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  return (
    <AutoComplete
      options={options}
      style={{
        width: 200,
      }}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <TextArea
        placeholder="input here"
        className="custom"
        style={{
          height: 50,
        }}
        onKeyPress={handleKeyPress}
      />
    </AutoComplete>
  );
};
export default App;
`,description:"<p>Customize Input Component</p>"}},{demo:{id:"components-auto-complete-demo-non-case-sensitive"},previewerProps:{title:"Non-case-sensitive AutoComplete",filename:"components/auto-complete/demo/non-case-sensitive.tsx",jsx:`import React from 'react';
import { AutoComplete } from 'antd';
const options = [
  {
    value: 'Burns Bay Road',
  },
  {
    value: 'Downing Street',
  },
  {
    value: 'Wall Street',
  },
];
const App = () => (
  <AutoComplete
    style={{
      width: 200,
    }}
    options={options}
    placeholder="try to type \`b\`"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);
export default App;
`,description:"<p>A non-case-sensitive AutoComplete</p>"}},{demo:{id:"components-auto-complete-demo-certain-category"},previewerProps:{title:"Lookup-Patterns - Certain Category",filename:"components/auto-complete/demo/certain-category.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: 'right',
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);
const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});
const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];
const App = () => (
  <AutoComplete
    popupClassName="certain-category-search-dropdown"
    dropdownMatchSelectWidth={500}
    style={{
      width: 250,
    }}
    options={options}
  >
    <Input.Search size="large" placeholder="input here" />
  </AutoComplete>
);
export default App;
`,description:'<p>Demonstration of <a href="https://ant.design/docs/spec/reaction#Lookup-Patterns">Lookup Patterns: Certain Category</a>. Basic Usage, set options of autocomplete with <code>options</code> property.</p>',style:`.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}`}},{demo:{id:"components-auto-complete-demo-uncertain-category"},previewerProps:{title:"Lookup-Patterns - Uncertain Category",filename:"components/auto-complete/demo/uncertain-category.tsx",jsx:`import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const searchResult = (query) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = \`\${query}\${idx}\`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={\`https://s.taobao.com/search?q=\${query}\`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
const App = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
  );
};
export default App;
`,description:'<p>Demonstration of <a href="https://ant.design/docs/spec/reaction#Lookup-Patterns">Lookup Patterns: Uncertain Category</a>.</p>'}},{demo:{id:"components-auto-complete-demo-status"},previewerProps:{title:"Status",filename:"components/auto-complete/demo/status.tsx",jsx:`import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
const App = () => {
  const [options, setOptions] = useState([]);
  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <AutoComplete
        options={options}
        onSearch={onSearch}
        status="error"
        style={{
          width: 200,
        }}
      />
      <AutoComplete
        options={options}
        onSearch={onSearch}
        status="warning"
        style={{
          width: 200,
        }}
      />
    </Space>
  );
};
export default App;
`,description:"<p>Add status to AutoComplete with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>"}},{demo:{id:"components-auto-complete-demo-form-debug"},previewerProps:{debug:!0,title:"Debug in Form",filename:"components/auto-complete/demo/form-debug.tsx",jsx:`import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Form, Input, TreeSelect } from 'antd';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const App = () => (
  <Form
    style={{
      margin: '0 auto',
    }}
    {...formItemLayout}
  >
    <Form.Item label="\u5355\u72EC AutoComplete">
      <AutoComplete />
    </Form.Item>
    <Form.Item label="\u5355\u72EC TreeSelect">
      <TreeSelect />
    </Form.Item>
    <Form.Item label="\u6DFB\u52A0 Input.Group \u6B63\u5E38">
      <Input.Group compact>
        <TreeSelect
          style={{
            width: '30%',
          }}
        />
        <AutoComplete />
      </Input.Group>
    </Form.Item>
    <Form.Item label="\u5305\u542B search \u56FE\u6807\u6B63\u5E38">
      <AutoComplete>
        <Input suffix={<SearchOutlined />} />
      </AutoComplete>
    </Form.Item>
    <Form.Item label="\u540C\u65F6\u6709 Input.Group \u548C\u56FE\u6807\u53D1\u751F\u79FB\u4F4D">
      <Input.Group compact>
        <TreeSelect
          style={{
            width: '30%',
          }}
        />
        <AutoComplete>
          <Input suffix={<SearchOutlined />} />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="\u540C\u65F6\u6709 Input.Group \u548C Search \u7EC4\u4EF6\u53D1\u751F\u79FB\u4F4D">
      <Input.Group compact>
        <TreeSelect
          style={{
            width: '30%',
          }}
        />
        <AutoComplete>
          <Input.Search />
        </AutoComplete>
      </Input.Group>
    </Form.Item>
    <Form.Item label="Input Group \u548C Button \u7ED3\u5408">
      <Input.Group compact>
        <TreeSelect
          style={{
            width: '20%',
          }}
        />
        <AutoComplete>
          <Input.Search />
        </AutoComplete>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Input.Group>
    </Form.Item>
  </Form>
);
export default App;
`}},{demo:{id:"components-auto-complete-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/auto-complete/demo/render-panel.tsx",jsx:`import React from 'react';
import { AutoComplete, Switch, Space } from 'antd';
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalAutoComplete } = AutoComplete;
const App = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
      }}
    >
      <Switch checked={open} onChange={() => setOpen(!open)} />
      <InternalAutoComplete
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
`,description:"<p>Debug usage. Do not use in your production.</p>"}}]}),(0,t.tZ)("div",{className:"markdown"},(0,t.tZ)("h2",{id:"api"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,t.tZ)("span",{className:"icon icon-link"})),"API"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[10].value),(0,t.tZ)("th",null,n[11].value),(0,t.tZ)("th",null,n[12].value),(0,t.tZ)("th",null,n[13].value),(0,t.tZ)("th",null,n[14].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[15].value),(0,t.tZ)("td",null,n[16].value),(0,t.tZ)("td",null,n[17].value),(0,t.tZ)("td",null,n[18].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[19].value),(0,t.tZ)("td",null,n[20].value),(0,t.tZ)("td",null,n[21].value),(0,t.tZ)("td",null,n[22].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[23].value),(0,t.tZ)("td",null,n[24].value),(0,t.tZ)("td",null,n[25].value),(0,t.tZ)("td",null,n[26].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[27].value),(0,t.tZ)("td",null,n[28].value),(0,t.tZ)("td",null,n[29].value),(0,t.tZ)("td",null,n[30].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[31].value),(0,t.tZ)("td",null,n[32].value),(0,t.tZ)("td",null,n[33].value),(0,t.tZ)("td",null,n[34].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[35].value),(0,t.tZ)("td",null,n[36].value),(0,t.tZ)("td",null,n[37].value),(0,t.tZ)("td",null,n[38].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[39].value),(0,t.tZ)("td",null,n[40].value),(0,t.tZ)("td",null,n[41].value),(0,t.tZ)("td",null,n[42].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[43].value),(0,t.tZ)("td",null,n[44].value),(0,t.tZ)("td",null,n[45].value),(0,t.tZ)("td",null,n[46].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[47].value),(0,t.tZ)("td",null,n[48].value),(0,t.tZ)("td",null,n[49].value),(0,t.tZ)("td",null,n[50].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[51].value),(0,t.tZ)("td",null,n[52].value),(0,t.tZ)("td",null,n[53].value),(0,t.tZ)("td",null,n[54].value),(0,t.tZ)("td",null,n[55].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[56].value),(0,t.tZ)("td",null,n[57].value,(0,t.tZ)("code",null,n[58].value),n[59].value,(0,t.tZ)("code",null,n[60].value),n[61].value),(0,t.tZ)("td",null,n[62].value),(0,t.tZ)("td",null,n[63].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[64].value),(0,t.tZ)("td",null,n[65].value,(0,t.tZ)("code",null,n[66].value),n[67].value,(0,t.tZ)("code",null,n[68].value),n[69].value),(0,t.tZ)("td",null,n[70].value),(0,t.tZ)("td",null,n[71].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[72].value),(0,t.tZ)("td",null,n[73].value),(0,t.tZ)("td",null,n[74].value),(0,t.tZ)("td",null,(0,t.tZ)("code",null,n[75].value)),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[76].value),(0,t.tZ)("td",null,n[77].value),(0,t.tZ)("td",null,n[78].value),(0,t.tZ)("td",null,n[79].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[80].value),(0,t.tZ)("td",null,n[81].value),(0,t.tZ)("td",null,n[82].value),(0,t.tZ)("td",null,n[83].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[84].value),(0,t.tZ)("td",null,n[85].value),(0,t.tZ)("td",null,n[86].value),(0,t.tZ)("td",null,n[87].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[88].value),(0,t.tZ)("td",null,n[89].value),(0,t.tZ)("td",null,n[90].value),(0,t.tZ)("td",null,n[91].value),(0,t.tZ)("td",null,n[92].value)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[93].value),(0,t.tZ)("td",null,n[94].value),(0,t.tZ)("td",null,n[95].value),(0,t.tZ)("td",null,n[96].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[97].value),(0,t.tZ)("td",null,n[98].value),(0,t.tZ)("td",null,n[99].value),(0,t.tZ)("td",null,n[100].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[101].value),(0,t.tZ)("td",null,n[102].value),(0,t.tZ)("td",null,n[103].value),(0,t.tZ)("td",null,n[104].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[105].value),(0,t.tZ)("td",null,n[106].value),(0,t.tZ)("td",null,n[107].value),(0,t.tZ)("td",null,n[108].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[109].value),(0,t.tZ)("td",null,n[110].value),(0,t.tZ)("td",null,n[111].value),(0,t.tZ)("td",null,n[112].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[113].value),(0,t.tZ)("td",null,n[114].value),(0,t.tZ)("td",null,n[115].value),(0,t.tZ)("td",null,n[116].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[117].value),(0,t.tZ)("td",null,n[118].value),(0,t.tZ)("td",null,n[119].value),(0,t.tZ)("td",null,n[120].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[121].value),(0,t.tZ)("td",null,n[122].value),(0,t.tZ)("td",null,n[123].value),(0,t.tZ)("td",null,n[124].value),(0,t.tZ)("td",null,n[125].value)))),(0,t.tZ)("h2",{id:"methods"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#methods"},(0,t.tZ)("span",{className:"icon icon-link"})),"Methods"),(0,t.tZ)(a.Z,{className:"component-api-table"},(0,t.tZ)("thead",null,(0,t.tZ)("tr",null,(0,t.tZ)("th",null,n[126].value),(0,t.tZ)("th",null,n[127].value),(0,t.tZ)("th",null,n[128].value))),(0,t.tZ)("tbody",null,(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[129].value),(0,t.tZ)("td",null,n[130].value),(0,t.tZ)("td",null)),(0,t.tZ)("tr",null,(0,t.tZ)("td",null,n[131].value),(0,t.tZ)("td",null,n[132].value),(0,t.tZ)("td",null)))),(0,t.tZ)("h2",{id:"faq"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,t.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,t.tZ)("h3",{id:"why-doesnt-the-text-composition-system-work-well-with-onsearch-in-controlled-mode"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-doesnt-the-text-composition-system-work-well-with-onsearch-in-controlled-mode"},(0,t.tZ)("span",{className:"icon icon-link"})),"Why doesn't the text composition system work well with onSearch in controlled mode?"),(0,t.tZ)("p",null,n[133].value,(0,t.tZ)("code",null,n[134].value),n[135].value,(0,t.tZ)("code",null,n[136].value),n[137].value,(0,t.tZ)("code",null,n[138].value),n[139].value,(0,t.tZ)("code",null,n[140].value),n[141].value),(0,t.tZ)("p",null,n[142].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/18230"},n[143].value),n[144].value,(0,t.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/17916"},n[145].value)),(0,t.tZ)("h3",{id:"part-of-the-api-in-v3-are-not-available-in-v4"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#part-of-the-api-in-v3-are-not-available-in-v4"},(0,t.tZ)("span",{className:"icon icon-link"})),"Part of the api in v3 are not available in v4?"),(0,t.tZ)("p",null,n[146].value,(0,t.tZ)("code",null,n[147].value),n[148].value,(0,t.tZ)("code",null,n[149].value),n[150].value,(0,t.tZ)("code",null,n[151].value),n[152].value,(0,t.tZ)("code",null,n[153].value),n[154].value),(0,t.tZ)("p",null,n[155].value,(0,t.tZ)("code",null,n[156].value),n[157].value,(0,t.tZ)("code",null,n[158].value),n[159].value),(0,t.tZ)("h4",{id:"v3"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#v3"},(0,t.tZ)("span",{className:"icon icon-link"})),"v3"),(0,t.tZ)(o.Z,{lang:"tsx"},n[160].value),(0,t.tZ)("h4",{id:"v4"},(0,t.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#v4"},(0,t.tZ)("span",{className:"icon icon-link"})),"v4"),(0,t.tZ)(o.Z,{lang:"tsx"},n[161].value))))}l.default=d}}]);
