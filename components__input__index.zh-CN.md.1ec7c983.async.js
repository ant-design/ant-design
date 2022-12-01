"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[3850],{36766:function(s,a,e){e.r(a);var c=e(2143),m=e(50250),h=e(59378),v=e(78190),o=e(74775),l=e(5937),Z=e(2068),f=e(74399),x=e(46004),_=e(35708),g=e(30138),I=e(56140),i=e(5388),b=e(49545),w=e(92169),A=e(13140),O=e(95127),S=e(74418),C=e(97119),u=e(28257),r=e(67294),n=e(13946);function p(){var d=(0,u.eL)(),t=d.texts;return(0,n.tZ)(u.dY,null,(0,n.tZ)(r.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[1].value),(0,n.tZ)("li",null,t[2].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(i.Z,{items:[{demo:{id:"components-input-demo-basic"},previewerProps:{title:"\u57FA\u672C\u4F7F\u7528",filename:"components/input/demo/basic.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const App = () => <Input placeholder="Basic usage" />;
export default App;
`,description:"<p>\u57FA\u672C\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-input-demo-size"},previewerProps:{title:"\u4E09\u79CD\u5927\u5C0F",filename:"components/input/demo/size.tsx",jsx:`import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const App = () => (
  <>
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </>
);
export default App;
`,description:"<p>\u6211\u4EEC\u4E3A <code>&#x3C;Input /></code> \u8F93\u5165\u6846\u5B9A\u4E49\u4E86\u4E09\u79CD\u5C3A\u5BF8\uFF08\u5927\u3001\u9ED8\u8BA4\u3001\u5C0F\uFF09\uFF0C\u9AD8\u5EA6\u5206\u522B\u4E3A <code>40px</code>\u3001<code>32px</code> \u548C <code>24px</code>\u3002</p>"}},{demo:{id:"components-input-demo-addon"},previewerProps:{title:"\u524D\u7F6E/\u540E\u7F6E\u6807\u7B7E",filename:"components/input/demo/addon.tsx",jsx:`import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';
const { Option } = Select;
const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);
const App = () => (
  <Space direction="vertical">
    <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
    <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
    <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
    <Input
      addonBefore={
        <Cascader
          placeholder="cascader"
          style={{
            width: 150,
          }}
        />
      }
      defaultValue="mysite"
    />
  </Space>
);
export default App;
`,description:"<p>\u7528\u4E8E\u914D\u7F6E\u4E00\u4E9B\u56FA\u5B9A\u7EC4\u5408\u3002</p>",style:`.select-before {
  width: 90px;
}

.select-after {
  width: 80px;
}

[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}`}},{demo:{id:"components-input-demo-group"},previewerProps:{title:"\u8F93\u5165\u6846\u7EC4\u5408",filename:"components/input/demo/group.tsx",jsx:`import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from 'antd';
const { Option } = Select;
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const App = () => (
  <div className="site-input-group-wrapper">
    <Input.Group size="large">
      <Row gutter={8}>
        <Col span={5}>
          <Input defaultValue="0571" />
        </Col>
        <Col span={8}>
          <Input defaultValue="26888888" />
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{
          width: '20%',
        }}
        defaultValue="0571"
      />
      <Input
        style={{
          width: '30%',
        }}
        defaultValue="26888888"
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="https://ant.design"
      />
      <Button type="primary">Submit</Button>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="Zhejiang">
        <Option value="Zhejiang">Zhejiang</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
      <Input
        style={{
          width: '50%',
        }}
        defaultValue="Xihu District, Hangzhou"
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input.Search
        allowClear
        style={{
          width: '40%',
        }}
        defaultValue="0571"
      />
      <Input.Search
        allowClear
        style={{
          width: '40%',
        }}
        defaultValue="26888888"
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="Option1">
        <Option value="Option1">Option1</Option>
        <Option value="Option2">Option2</Option>
      </Select>
      <Input
        style={{
          width: '50%',
        }}
        defaultValue="input content"
      />
      <InputNumber />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{
          width: '50%',
        }}
        defaultValue="input content"
      />
      <DatePicker
        style={{
          width: '50%',
        }}
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{
          width: '30%',
        }}
        defaultValue="input content"
      />
      <DatePicker.RangePicker
        style={{
          width: '70%',
        }}
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="Option1-1">
        <Option value="Option1-1">Option1-1</Option>
        <Option value="Option1-2">Option1-2</Option>
      </Select>
      <Select defaultValue="Option2-2">
        <Option value="Option2-1">Option2-1</Option>
        <Option value="Option2-2">Option2-2</Option>
      </Select>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="1">
        <Option value="1">Between</Option>
        <Option value="2">Except</Option>
      </Select>
      <Input
        style={{
          width: 100,
          textAlign: 'center',
        }}
        placeholder="Minimum"
      />
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Input
        className="site-input-right"
        style={{
          width: 100,
          textAlign: 'center',
        }}
        placeholder="Maximum"
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select
        defaultValue="Sign Up"
        style={{
          width: '30%',
        }}
      >
        <Option value="Sign Up">Sign Up</Option>
        <Option value="Sign In">Sign In</Option>
      </Select>
      <AutoComplete
        style={{
          width: '70%',
        }}
        placeholder="Email"
        options={[
          {
            value: 'text 1',
          },
          {
            value: 'text 2',
          },
        ]}
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select
        style={{
          width: '30%',
        }}
        defaultValue="Home"
      >
        <Option value="Home">Home</Option>
        <Option value="Company">Company</Option>
      </Select>
      <Cascader
        style={{
          width: '70%',
        }}
        options={options}
        placeholder="Select Address"
      />
    </Input.Group>
  </div>
);
export default App;
`,description:`<p>\u8F93\u5165\u6846\u7684\u7EC4\u5408\u5C55\u73B0\u3002</p>
<p>\u6CE8\u610F\uFF1A\u4F7F\u7528 <code>compact</code> \u6A21\u5F0F\u65F6\uFF0C\u4E0D\u9700\u8981\u901A\u8FC7 <code>Col</code> \u6765\u63A7\u5236\u5BBD\u5EA6\u3002</p>`,style:`.site-input-group-wrapper .site-input-split {
  background-color: #fff !important;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}`}},{demo:{id:"components-input-demo-search-input"},previewerProps:{title:"\u641C\u7D22\u6846",filename:"components/input/demo/search-input.tsx",jsx:`import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = (value) => console.log(value);
const App = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    <Search
      addonBefore="https://"
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 304,
      }}
    />
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
  </Space>
);
export default App;
`,description:"<p>\u5E26\u6709\u641C\u7D22\u6309\u94AE\u7684\u8F93\u5165\u6846\u3002</p>"}},{demo:{id:"components-input-demo-search-input-loading"},previewerProps:{title:"\u641C\u7D22\u6846 loading",filename:"components/input/demo/search-input-loading.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const App = () => (
  <>
    <Search placeholder="input search loading default" loading />
    <br />
    <br />
    <Search placeholder="input search loading with enterButton" loading enterButton />
    <br />
    <br />
    <Search placeholder="input search text" enterButton="Search" size="large" loading />
  </>
);
export default App;
`,description:"<p>\u7528\u4E8E <code>onSearch</code> \u7684\u65F6\u5019\u5C55\u793A <code>loading</code>\u3002</p>"}},{demo:{id:"components-input-demo-textarea"},previewerProps:{title:"\u6587\u672C\u57DF",filename:"components/input/demo/textarea.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const App = () => (
  <>
    <TextArea rows={4} />
    <br />
    <br />
    <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
  </>
);
export default App;
`,description:"<p>\u7528\u4E8E\u591A\u884C\u8F93\u5165\u3002</p>"}},{demo:{id:"components-input-demo-autosize-textarea"},previewerProps:{title:"\u9002\u5E94\u6587\u672C\u9AD8\u5EA6\u7684\u6587\u672C\u57DF",filename:"components/input/demo/autosize-textarea.tsx",jsx:`import React, { useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const App = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <TextArea placeholder="Autosize height based on content lines" autoSize />
      <div
        style={{
          margin: '24px 0',
        }}
      />
      <TextArea
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
      />
      <div
        style={{
          margin: '24px 0',
        }}
      />
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
    </>
  );
};
export default App;
`,description:"<p><code>autoSize</code> \u5C5E\u6027\u9002\u7528\u4E8E <code>textarea</code> \u8282\u70B9\uFF0C\u5E76\u4E14\u53EA\u6709\u9AD8\u5EA6\u4F1A\u81EA\u52A8\u53D8\u5316\u3002\u53E6\u5916 <code>autoSize</code> \u53EF\u4EE5\u8BBE\u5B9A\u4E3A\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u6307\u5B9A\u6700\u5C0F\u884C\u6570\u548C\u6700\u5927\u884C\u6570\u3002</p>"}},{demo:{id:"components-input-demo-tooltip"},previewerProps:{title:"\u8F93\u5165\u65F6\u683C\u5F0F\u5316\u5C55\u793A",filename:"components/input/demo/tooltip.tsx",jsx:`import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\\d*(\\.\\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\\d+)/, '$1'));
  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input a number'
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
      />
    </Tooltip>
  );
};
const App = () => {
  const [value, setValue] = useState('');
  return (
    <NumericInput
      style={{
        width: 120,
      }}
      value={value}
      onChange={setValue}
    />
  );
};
export default App;
`,description:'<p>\u7ED3\u5408 <a href="/components/tooltip">Tooltip</a> \u7EC4\u4EF6\uFF0C\u5B9E\u73B0\u4E00\u4E2A\u6570\u503C\u8F93\u5165\u6846\uFF0C\u65B9\u4FBF\u5185\u5BB9\u8D85\u957F\u65F6\u7684\u5168\u91CF\u5C55\u73B0\u3002</p>',style:`/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}`}},{demo:{id:"components-input-demo-presuffix"},previewerProps:{title:"\u524D\u7F00\u548C\u540E\u7F00",filename:"components/input/demo/presuffix.tsx",jsx:`import React from 'react';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
const App = () => (
  <>
    <Input
      placeholder="Enter your username"
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined
            style={{
              color: 'rgba(0,0,0,.45)',
            }}
          />
        </Tooltip>
      }
    />
    <br />
    <br />
    <Input prefix="\uFFE5" suffix="RMB" />
    <br />
    <br />
    <Input prefix="\uFFE5" suffix="RMB" disabled />
  </>
);
export default App;
`,description:"<p>\u5728\u8F93\u5165\u6846\u4E0A\u6DFB\u52A0\u524D\u7F00\u6216\u540E\u7F00\u56FE\u6807\u3002</p>"}},{demo:{id:"components-input-demo-password-input"},previewerProps:{title:"\u5BC6\u7801\u6846",filename:"components/input/demo/password-input.tsx",jsx:`import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
const App = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Space direction="vertical">
      <Input.Password placeholder="input password" />
      <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Space direction="horizontal">
        <Input.Password
          placeholder="input password"
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
        <Button
          style={{
            width: 80,
          }}
          onClick={() => setPasswordVisible((prevState) => !prevState)}
        >
          {passwordVisible ? 'Hide' : 'Show'}
        </Button>
      </Space>
    </Space>
  );
};
export default App;
`,description:"<p>\u5BC6\u7801\u6846\u3002</p>"}},{demo:{id:"components-input-demo-allowclear"},previewerProps:{title:"\u5E26\u79FB\u9664\u56FE\u6807",filename:"components/input/demo/allowClear.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
  console.log(e);
};
const App = () => (
  <>
    <Input placeholder="input with clear icon" allowClear onChange={onChange} />
    <br />
    <br />
    <TextArea placeholder="textarea with clear icon" allowClear onChange={onChange} />
  </>
);
export default App;
`,description:"<p>\u5E26\u79FB\u9664\u56FE\u6807\u7684\u8F93\u5165\u6846\uFF0C\u70B9\u51FB\u56FE\u6807\u5220\u9664\u6240\u6709\u5185\u5BB9\u3002</p>"}},{demo:{id:"components-input-demo-show-count"},previewerProps:{title:"\u5E26\u5B57\u6570\u63D0\u793A",filename:"components/input/demo/show-count.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
  console.log('Change:', e.target.value);
};
const App = () => (
  <>
    <Input showCount maxLength={20} onChange={onChange} />
    <br />
    <br />
    <TextArea showCount maxLength={100} onChange={onChange} />
  </>
);
export default App;
`,description:"<p>\u5C55\u793A\u5B57\u6570\u63D0\u793A\u3002</p>"}},{demo:{id:"components-input-demo-textarea-show-count"},previewerProps:{title:"\u5E26\u5B57\u6570\u63D0\u793A\u7684\u6587\u672C\u57DF",filename:"components/input/demo/textarea-show-count.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const onChange = (e) => {
  console.log('Change:', e.target.value);
};
const App = () => (
  <>
    <TextArea
      showCount
      maxLength={100}
      style={{
        height: 120,
        marginBottom: 24,
      }}
      onChange={onChange}
      placeholder="can resize"
    />
    <TextArea
      showCount
      maxLength={100}
      style={{
        height: 120,
        resize: 'none',
      }}
      onChange={onChange}
      placeholder="disable resize"
    />
  </>
);
export default App;
`,description:"<p>\u5C55\u793A\u5B57\u6570\u63D0\u793A\u3002</p>"}},{demo:{id:"components-input-demo-status"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u72B6\u6001",filename:"components/input/demo/status.tsx",jsx:`import React from 'react';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { Input, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Input status="error" placeholder="Error" />
    <Input status="warning" placeholder="Warning" />
    <Input status="error" prefix={<ClockCircleOutlined />} placeholder="Error with prefix" />
    <Input status="warning" prefix={<ClockCircleOutlined />} placeholder="Warning with prefix" />
  </Space>
);
export default App;
`,description:"<p>\u4F7F\u7528 <code>status</code> \u4E3A Input \u6DFB\u52A0\u72B6\u6001\uFF0C\u53EF\u9009 <code>error</code> \u6216\u8005 <code>warning</code>\u3002</p>"}},{demo:{id:"components-input-demo-borderless"},previewerProps:{title:"\u65E0\u8FB9\u6846",filename:"components/input/demo/borderless.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const App = () => <Input placeholder="Borderless" bordered={false} />;
export default App;
`,description:"<p>\u6CA1\u6709\u8FB9\u6846\u3002</p>"}},{demo:{id:"components-input-demo-focus"},previewerProps:{title:"\u805A\u7126",filename:"components/input/demo/focus.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, Input, Space, Switch } from 'antd';
const App = () => {
  const inputRef = useRef(null);
  const [input, setInput] = useState(true);
  const sharedProps = {
    style: {
      width: '100%',
    },
    defaultValue: 'Ant Design love you!',
    ref: inputRef,
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      <Space wrap>
        <Button
          onClick={() => {
            inputRef.current.focus({
              cursor: 'start',
            });
          }}
        >
          Focus at first
        </Button>
        <Button
          onClick={() => {
            inputRef.current.focus({
              cursor: 'end',
            });
          }}
        >
          Focus at last
        </Button>
        <Button
          onClick={() => {
            inputRef.current.focus({
              cursor: 'all',
            });
          }}
        >
          Focus to select all
        </Button>
        <Button
          onClick={() => {
            inputRef.current.focus({
              preventScroll: true,
            });
          }}
        >
          Focus prevent scroll
        </Button>
        <Switch
          checked={input}
          checkedChildren="Input"
          unCheckedChildren="TextArea"
          onChange={() => {
            setInput(!input);
          }}
        />
      </Space>
      <br />
      {input ? <Input {...sharedProps} /> : <Input.TextArea {...sharedProps} />}
    </Space>
  );
};
export default App;
`,description:"<p>\u805A\u7126\u989D\u5916\u914D\u7F6E\u5C5E\u6027\u3002</p>"}},{demo:{id:"components-input-demo-borderless-debug"},previewerProps:{debug:!0,title:"Style Debug",filename:"components/input/demo/borderless-debug.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const App = () => (
  <div
    style={{
      backgroundColor: 'rgba(0, 0, 128, .2)',
    }}
  >
    <Input placeholder="Unbordered" bordered={false} />
    <Input placeholder="Unbordered" bordered={false} size="large" />
    <TextArea placeholder="Unbordered" bordered={false} />
    <TextArea placeholder="Unbordered" bordered={false} allowClear />
    <Input placeholder="Unbordered" bordered={false} allowClear />
    <Input prefix="\uFFE5" suffix="RMB" bordered={false} />
    <Input prefix="\uFFE5" suffix="RMB" disabled bordered={false} />
    <TextArea
      allowClear
      style={{
        border: '2px solid #000',
      }}
    />
  </div>
);
export default App;
`,description:"<p>Buggy! \u6D4B\u8BD5\u4E00\u4E9B\u8E29\u8FC7\u7684\u6837\u5F0F\u5751\u3002</p>"}},{demo:{id:"components-input-demo-align"},previewerProps:{debug:!0,title:"\u6587\u672C\u5BF9\u9F50",filename:"components/input/demo/align.tsx",jsx:`import React from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Select,
  TimePicker,
  TreeSelect,
  Typography,
} from 'antd';
const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const narrowStyle = {
  width: 50,
};
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const App = () => (
  <>
    <Mentions
      style={{
        width: 100,
      }}
      rows={1}
    />
    <Input.TextArea
      rows={1}
      style={{
        width: 100,
      }}
    />
    <Button type="primary">Button</Button>
    <Input
      style={{
        width: 100,
      }}
    />
    <Text copyable>Ant Design</Text>
    <Input
      prefix="1"
      suffix="2"
      style={{
        width: 100,
      }}
    />
    <Input
      addonBefore="1"
      addonAfter="2"
      style={{
        width: 100,
      }}
    />
    <InputNumber
      style={{
        width: 100,
      }}
    />
    <DatePicker
      style={{
        width: 100,
      }}
    />
    <TimePicker
      style={{
        width: 100,
      }}
    />
    <Select
      style={{
        width: 100,
      }}
      defaultValue="jack"
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <TreeSelect
      style={{
        width: 100,
      }}
    />
    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} />
    <RangePicker />
    <DatePicker picker="month" />
    <Radio.Group defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
    </Radio.Group>
    <AutoComplete
      style={{
        width: 100,
      }}
      placeholder="input here"
    />
    <br />
    <Input prefix="$" addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    <Input style={narrowStyle} suffix="Y" />
    <Input style={narrowStyle} />
    <Input style={narrowStyle} defaultValue="1" suffix="Y" />
  </>
);
export default App;
`}},{demo:{id:"components-input-demo-textarea-resize"},previewerProps:{debug:!0,title:"\u6587\u672C\u57DF",filename:"components/input/demo/textarea-resize.tsx",jsx:`import React, { useState } from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;
const defaultValue =
  'The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows. The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows.';
const App = () => {
  const [autoResize, setAutoResize] = useState(false);
  return (
    <>
      <Button
        onClick={() => setAutoResize(!autoResize)}
        style={{
          marginBottom: 16,
        }}
      >
        Auto Resize: {String(autoResize)}
      </Button>
      <TextArea rows={4} autoSize={autoResize} defaultValue={defaultValue} />
      <TextArea
        allowClear
        style={{
          width: 93,
        }}
      />
    </>
  );
};
export default App;
`,description:"<p>\u7528\u4E8E\u591A\u884C\u8F93\u5165\u3002</p>"}},{demo:{id:"components-input-demo-debug-addon"},previewerProps:{debug:!0,title:"debug \u524D\u7F6E/\u540E\u7F6E\u6807\u7B7E",filename:"components/input/demo/debug-addon.tsx",jsx:`import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
const App = () => (
  <Space direction="vertical">
    Input addon Button:
    <Input addonAfter={<Button type="primary">Submit</Button>} defaultValue="mysite" />
    <Input addonAfter={<Button>Submit</Button>} defaultValue="mysite" />
    <br />
    <br />
    Input addon Button icon:
    <Input
      addonAfter={
        <Button>
          <SettingOutlined />
        </Button>
      }
      defaultValue="mysite"
    />
  </Space>
);
export default App;
`,description:"<p>\u4E00\u4E9B\u7279\u6B8A\u7684\u524D\u7F6E\u540E\u7F6E\u6807\u7B7E\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"input"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#input"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[3].value),(0,n.tZ)("th",null,t[4].value),(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value),(0,n.tZ)("th",null,t[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[8].value),(0,n.tZ)("td",null,t[9].value),(0,n.tZ)("td",null,t[10].value),(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value),(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[33].value),(0,n.tZ)("td",null,t[34].value),(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[51].value),(0,n.tZ)("td",null,t[52].value),(0,n.tZ)("td",null,t[53].value),(0,n.tZ)("td",null,t[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,t[56].value,(0,n.tZ)("code",null,t[57].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[58].value),t[59].value,(0,n.tZ)("code",null,t[60].value),t[61].value,(0,n.tZ)("code",null,t[62].value)),(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null,t[69].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%E5%B1%9E%E6%80%A7"},t[70].value),t[71].value,(0,n.tZ)("code",null,t[72].value),t[73].value,(0,n.tZ)("code",null,t[74].value),t[75].value),(0,n.tZ)("td",null,t[76].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[77].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[78].value),(0,n.tZ)("td",null,t[79].value),(0,n.tZ)("td",null,t[80].value),(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[86].value),(0,n.tZ)("td",null,t[87].value),(0,n.tZ)("td",null,t[88].value),(0,n.tZ)("td",null,t[89].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[90].value,(0,n.tZ)("code",null,t[91].value),t[92].value,(0,n.tZ)("code",null,t[93].value),t[94].value,(0,n.tZ)("code",null,t[95].value),t[96].value,(0,n.tZ)("code",null,t[97].value),t[98].value,(0,n.tZ)("code",null,t[99].value),t[100].value,(0,n.tZ)("code",null,t[101].value),t[102].value,(0,n.tZ)("code",null,t[103].value),t[104].value,(0,n.tZ)("code",null,t[105].value),t[106].value)),(0,n.tZ)("p",null,t[107].value,(0,n.tZ)("a",{href:"https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes"},t[108].value),t[109].value),(0,n.tZ)("h3",{id:"inputtextarea"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputtextarea"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.TextArea"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[110].value),(0,n.tZ)("th",null,t[111].value),(0,n.tZ)("th",null,t[112].value),(0,n.tZ)("th",null,t[113].value),(0,n.tZ)("th",null,t[114].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[115].value),(0,n.tZ)("td",null,t[116].value),(0,n.tZ)("td",null,t[117].value),(0,n.tZ)("td",null,t[118].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[119].value),(0,n.tZ)("td",null,t[120].value),(0,n.tZ)("td",null,t[121].value),(0,n.tZ)("td",null,t[122].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[123].value),(0,n.tZ)("td",null,t[124].value),(0,n.tZ)("td",null,t[125].value),(0,n.tZ)("td",null,t[126].value),(0,n.tZ)("td",null,t[127].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[128].value),(0,n.tZ)("td",null,t[129].value),(0,n.tZ)("td",null,t[130].value),(0,n.tZ)("td",null,t[131].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[132].value),(0,n.tZ)("td",null,t[133].value),(0,n.tZ)("td",null,t[134].value),(0,n.tZ)("td",null,t[135].value),(0,n.tZ)("td",null,t[136].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[137].value),(0,n.tZ)("td",null,t[138].value),(0,n.tZ)("td",null,t[139].value),(0,n.tZ)("td",null,t[140].value),(0,n.tZ)("td",null,t[141].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[142].value),(0,n.tZ)("td",null,t[143].value),(0,n.tZ)("td",null,t[144].value),(0,n.tZ)("td",null,t[145].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[146].value),(0,n.tZ)("td",null,t[147].value),(0,n.tZ)("td",null,t[148].value),(0,n.tZ)("td",null,t[149].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[150].value),(0,n.tZ)("td",null,t[151].value),(0,n.tZ)("td",null,t[152].value),(0,n.tZ)("td",null,t[153].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,(0,n.tZ)("code",null,t[154].value),t[155].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"},t[156].value),t[157].value),(0,n.tZ)("h4",{id:"inputsearch"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputsearch"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Search"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[158].value),(0,n.tZ)("th",null,t[159].value),(0,n.tZ)("th",null,t[160].value),(0,n.tZ)("th",null,t[161].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[162].value),(0,n.tZ)("td",null,t[163].value,(0,n.tZ)("code",null,t[164].value),t[165].value),(0,n.tZ)("td",null,t[166].value),(0,n.tZ)("td",null,t[167].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[168].value),(0,n.tZ)("td",null,t[169].value),(0,n.tZ)("td",null,t[170].value),(0,n.tZ)("td",null,t[171].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[172].value),(0,n.tZ)("td",null,t[173].value),(0,n.tZ)("td",null,t[174].value),(0,n.tZ)("td",null,t[175].value)))),(0,n.tZ)("p",null,t[176].value),(0,n.tZ)("h4",{id:"inputgroup"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputgroup"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Group"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[177].value),(0,n.tZ)("th",null,t[178].value),(0,n.tZ)("th",null,t[179].value),(0,n.tZ)("th",null,t[180].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[181].value),(0,n.tZ)("td",null,t[182].value),(0,n.tZ)("td",null,t[183].value),(0,n.tZ)("td",null,t[184].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[185].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[186].value),t[187].value,(0,n.tZ)("code",null,t[188].value),t[189].value,(0,n.tZ)("code",null,t[190].value),t[191].value,(0,n.tZ)("code",null,t[192].value),t[193].value,(0,n.tZ)("code",null,t[194].value)),(0,n.tZ)("td",null,t[195].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[196].value))))),(0,n.tZ)(o.Z,{lang:"jsx"},t[197].value),(0,n.tZ)("h4",{id:"inputpassword"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputpassword"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Password"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[198].value),(0,n.tZ)("th",null,t[199].value),(0,n.tZ)("th",null,t[200].value),(0,n.tZ)("th",null,t[201].value),(0,n.tZ)("th",null,t[202].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[203].value),(0,n.tZ)("td",null,t[204].value),(0,n.tZ)("td",null,t[205].value),(0,n.tZ)("td",null,t[206].value),(0,n.tZ)("td",null,t[207].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[208].value),(0,n.tZ)("td",null,t[209].value),(0,n.tZ)("td",null,t[210].value,(0,n.tZ)(u.rU,{to:"#VisibilityToggle"},t[211].value)),(0,n.tZ)("td",null,t[212].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"visibilitytoggle"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#visibilitytoggle"},(0,n.tZ)("span",{className:"icon icon-link"})),"VisibilityToggle"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[213].value),(0,n.tZ)("th",null,t[214].value),(0,n.tZ)("th",null,t[215].value),(0,n.tZ)("th",null,t[216].value),(0,n.tZ)("th",null,t[217].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[218].value),(0,n.tZ)("td",null,t[219].value),(0,n.tZ)("td",null,t[220].value),(0,n.tZ)("td",null,t[221].value),(0,n.tZ)("td",null,t[222].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[223].value),(0,n.tZ)("td",null,t[224].value),(0,n.tZ)("td",null,t[225].value),(0,n.tZ)("td",null,t[226].value),(0,n.tZ)("td",null,t[227].value)))),(0,n.tZ)("h4",{id:"input-methods"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#input-methods"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input Methods"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[228].value),(0,n.tZ)("th",null,t[229].value),(0,n.tZ)("th",null,t[230].value),(0,n.tZ)("th",null,t[231].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[232].value),(0,n.tZ)("td",null,t[233].value),(0,n.tZ)("td",null,t[234].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[235].value),(0,n.tZ)("td",null,t[236].value),(0,n.tZ)("td",null,t[237].value),(0,n.tZ)("td",null,t[238].value)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"\u4E3A\u4EC0\u4E48\u6211\u52A8\u6001\u6539\u53D8-prefixsuffixshowcount-\u65F6input-\u4F1A\u5931\u53BB\u7126\u70B9"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u6211\u52A8\u6001\u6539\u53D8-prefixsuffixshowcount-\u65F6input-\u4F1A\u5931\u53BB\u7126\u70B9"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u6211\u52A8\u6001\u6539\u53D8 ",(0,n.tZ)("code",null,t[239].value)," \u65F6\uFF0CInput \u4F1A\u5931\u53BB\u7126\u70B9\uFF1F"),(0,n.tZ)("p",null,t[240].value,(0,n.tZ)("code",null,t[241].value),t[242].value,(0,n.tZ)("code",null,t[243].value),t[244].value),(0,n.tZ)(o.Z,{lang:"jsx"},t[245].value),(0,n.tZ)("h3",{id:"\u4E3A\u4F55-textarea-\u53D7\u63A7\u65F6value-\u53EF\u4EE5\u8D85\u8FC7-maxlength"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4F55-textarea-\u53D7\u63A7\u65F6value-\u53EF\u4EE5\u8D85\u8FC7-maxlength"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4F55 TextArea \u53D7\u63A7\u65F6\uFF0C",(0,n.tZ)("code",null,t[246].value)," \u53EF\u4EE5\u8D85\u8FC7 ",(0,n.tZ)("code",null,t[247].value),"\uFF1F"),(0,n.tZ)("p",null,t[248].value))))}a.default=p}}]);
