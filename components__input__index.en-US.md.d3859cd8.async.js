"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[158],{7278:function(s,u,e){e.r(u);var c=e(2143),m=e(50250),h=e(59378),v=e(78190),o=e(74775),l=e(5937),Z=e(2068),f=e(74399),x=e(46004),_=e(35708),g=e(30138),I=e(56140),i=e(5388),b=e(49545),w=e(92169),S=e(13140),y=e(95127),O=e(74418),A=e(97119),a=e(28257),r=e(67294),n=e(13946);function p(){var d=(0,a.eL)(),t=d.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(r.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[1].value),(0,n.tZ)("li",null,t[2].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(i.Z,{items:[{demo:{id:"components-input-demo-basic"},previewerProps:{title:"Basic usage",filename:"components/input/demo/basic.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const App = () => <Input placeholder="Basic usage" />;
export default App;
`,description:"<p>Basic usage example.</p>"}},{demo:{id:"components-input-demo-size"},previewerProps:{title:"Three sizes of Input",filename:"components/input/demo/size.tsx",jsx:`import React from 'react';
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
`,description:"<p>There are three sizes of an Input box: <code>large</code> (40px), <code>default</code> (32px) and <code>small</code> (24px).</p>"}},{demo:{id:"components-input-demo-addon"},previewerProps:{title:"Pre / Post tab",filename:"components/input/demo/addon.tsx",jsx:`import React from 'react';
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
`,description:"<p>Using pre &#x26; post tabs example.</p>",style:`.select-before {
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
}`}},{demo:{id:"components-input-demo-group"},previewerProps:{title:"Input Group",filename:"components/input/demo/group.tsx",jsx:`import React from 'react';
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
`,description:`<p>Input.Group example.</p>
<p>Note: You don't need <code>Col</code> to control the width in the <code>compact</code> mode.</p>`,style:`.site-input-group-wrapper .site-input-split {
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
}`}},{demo:{id:"components-input-demo-search-input"},previewerProps:{title:"Search box",filename:"components/input/demo/search-input.tsx",jsx:`import React from 'react';
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
`,description:"<p>Example of creating a search box by grouping a standard input with a search button.</p>"}},{demo:{id:"components-input-demo-search-input-loading"},previewerProps:{title:"Search box with loading",filename:"components/input/demo/search-input-loading.tsx",jsx:`import React from 'react';
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
`,description:"<p>Search loading when onSearch.</p>"}},{demo:{id:"components-input-demo-textarea"},previewerProps:{title:"TextArea",filename:"components/input/demo/textarea.tsx",jsx:`import React from 'react';
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
`,description:"<p>For multi-line input.</p>"}},{demo:{id:"components-input-demo-autosize-textarea"},previewerProps:{title:"Autosizing the height to fit the content",filename:"components/input/demo/autosize-textarea.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p><code>autoSize</code> prop for a <code>textarea</code> type of <code>Input</code> makes the height to automatically adjust based on the content. An option object can be provided to <code>autoSize</code> to specify the minimum and maximum number of lines the textarea will automatically adjust.</p>"}},{demo:{id:"components-input-demo-tooltip"},previewerProps:{title:"Format Tooltip Input",filename:"components/input/demo/tooltip.tsx",jsx:`import React, { useState } from 'react';
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
`,description:'<p>You can use the Input in conjunction with <a href="/components/tooltip">Tooltip</a> component to create a Numeric Input, which can provide a good experience for extra-long content display.</p>',style:`/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}`}},{demo:{id:"components-input-demo-presuffix"},previewerProps:{title:"prefix and suffix",filename:"components/input/demo/presuffix.tsx",jsx:`import React from 'react';
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
`,description:"<p>Add a prefix or suffix icons inside input.</p>"}},{demo:{id:"components-input-demo-password-input"},previewerProps:{title:"Password box",filename:"components/input/demo/password-input.tsx",jsx:`import React from 'react';
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
`,description:"<p>Input type of password.</p>"}},{demo:{id:"components-input-demo-allowclear"},previewerProps:{title:"With clear icon",filename:"components/input/demo/allowClear.tsx",jsx:`import React from 'react';
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
`,description:"<p>Input box with the remove icon, click the icon to delete everything.</p>"}},{demo:{id:"components-input-demo-show-count"},previewerProps:{title:"With character counting",filename:"components/input/demo/show-count.tsx",jsx:`import React from 'react';
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
`,description:"<p>Show character counting.</p>"}},{demo:{id:"components-input-demo-textarea-show-count"},previewerProps:{title:"Textarea with character counting",filename:"components/input/demo/textarea-show-count.tsx",jsx:`import React from 'react';
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
`,description:"<p>Show character counting.</p>"}},{demo:{id:"components-input-demo-status"},previewerProps:{title:"Status",filename:"components/input/demo/status.tsx",jsx:`import React from 'react';
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
`,description:"<p>Add status to Input with <code>status</code>, which could be <code>error</code> or <code>warning</code>.</p>"}},{demo:{id:"components-input-demo-borderless"},previewerProps:{title:"Borderless",filename:"components/input/demo/borderless.tsx",jsx:`import React from 'react';
import { Input } from 'antd';
const App = () => <Input placeholder="Borderless" bordered={false} />;
export default App;
`,description:"<p>No border.</p>"}},{demo:{id:"components-input-demo-focus"},previewerProps:{title:"Focus",filename:"components/input/demo/focus.tsx",jsx:`import React, { useRef, useState } from 'react';
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
`,description:"<p>Focus with additional option.</p>"}},{demo:{id:"components-input-demo-borderless-debug"},previewerProps:{debug:!0,title:"Style Debug",filename:"components/input/demo/borderless-debug.tsx",jsx:`import React from 'react';
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
`,description:"<p>Buggy!</p>"}},{demo:{id:"components-input-demo-align"},previewerProps:{debug:!0,title:"Text Align",filename:"components/input/demo/align.tsx",jsx:`import React from 'react';
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
`}},{demo:{id:"components-input-demo-textarea-resize"},previewerProps:{debug:!0,title:"TextArea",filename:"components/input/demo/textarea-resize.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>For multi-line input.</p>"}},{demo:{id:"components-input-demo-debug-addon"},previewerProps:{debug:!0,title:"debug Pre / Post tab",filename:"components/input/demo/debug-addon.tsx",jsx:`import React from 'react';
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
`,description:"<p>Some special pre &#x26; post tabs example.</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"input"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#input"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[3].value),(0,n.tZ)("th",null,t[4].value),(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value),(0,n.tZ)("th",null,t[7].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[8].value),(0,n.tZ)("td",null,t[9].value),(0,n.tZ)("td",null,t[10].value),(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,t[14].value),(0,n.tZ)("td",null,t[15].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[16].value),(0,n.tZ)("td",null,t[17].value),(0,n.tZ)("td",null,t[18].value),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[20].value),(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[25].value),(0,n.tZ)("td",null,t[26].value),(0,n.tZ)("td",null,t[27].value),(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null,t[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[33].value),(0,n.tZ)("td",null,t[34].value),(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[41].value),(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value),(0,n.tZ)("td",null,t[49].value),(0,n.tZ)("td",null,t[50].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[51].value),(0,n.tZ)("td",null,t[52].value),(0,n.tZ)("td",null,t[53].value),(0,n.tZ)("td",null,t[54].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[55].value),(0,n.tZ)("td",null,t[56].value,(0,n.tZ)("code",null,t[57].value),t[58].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[59].value),t[60].value,(0,n.tZ)("code",null,t[61].value),t[62].value,(0,n.tZ)("code",null,t[63].value)),(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[69].value),(0,n.tZ)("td",null,t[70].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types"},t[71].value),t[72].value,(0,n.tZ)("code",null,t[73].value),t[74].value,(0,n.tZ)("code",null,t[75].value),t[76].value),(0,n.tZ)("td",null,t[77].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[78].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[79].value),(0,n.tZ)("td",null,t[80].value),(0,n.tZ)("td",null,t[81].value),(0,n.tZ)("td",null,t[82].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[83].value),(0,n.tZ)("td",null,t[84].value),(0,n.tZ)("td",null,t[85].value),(0,n.tZ)("td",null,t[86].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[87].value),(0,n.tZ)("td",null,t[88].value),(0,n.tZ)("td",null,t[89].value),(0,n.tZ)("td",null,t[90].value),(0,n.tZ)("td",null)))),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[91].value,(0,n.tZ)("code",null,t[92].value),t[93].value,(0,n.tZ)("code",null,t[94].value),t[95].value,(0,n.tZ)("code",null,t[96].value),t[97].value,(0,n.tZ)("code",null,t[98].value),t[99].value,(0,n.tZ)("code",null,t[100].value),t[101].value,(0,n.tZ)("code",null,t[102].value),t[103].value,(0,n.tZ)("code",null,t[104].value),t[105].value,(0,n.tZ)("code",null,t[106].value),t[107].value,(0,n.tZ)("code",null,t[108].value),t[109].value)),(0,n.tZ)("p",null,t[110].value,(0,n.tZ)("a",{href:"https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes"},t[111].value),t[112].value),(0,n.tZ)("h3",{id:"inputtextarea"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputtextarea"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.TextArea"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[113].value),(0,n.tZ)("th",null,t[114].value),(0,n.tZ)("th",null,t[115].value),(0,n.tZ)("th",null,t[116].value),(0,n.tZ)("th",null,t[117].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[118].value),(0,n.tZ)("td",null,t[119].value),(0,n.tZ)("td",null,t[120].value),(0,n.tZ)("td",null,t[121].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[122].value),(0,n.tZ)("td",null,t[123].value),(0,n.tZ)("td",null,t[124].value),(0,n.tZ)("td",null,t[125].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[126].value),(0,n.tZ)("td",null,t[127].value),(0,n.tZ)("td",null,t[128].value),(0,n.tZ)("td",null,t[129].value),(0,n.tZ)("td",null,t[130].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[131].value),(0,n.tZ)("td",null,t[132].value),(0,n.tZ)("td",null,t[133].value),(0,n.tZ)("td",null,t[134].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[135].value),(0,n.tZ)("td",null,t[136].value),(0,n.tZ)("td",null,t[137].value),(0,n.tZ)("td",null,t[138].value),(0,n.tZ)("td",null,t[139].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[140].value),(0,n.tZ)("td",null,t[141].value),(0,n.tZ)("td",null,t[142].value),(0,n.tZ)("td",null,t[143].value),(0,n.tZ)("td",null,t[144].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[145].value),(0,n.tZ)("td",null,t[146].value),(0,n.tZ)("td",null,t[147].value),(0,n.tZ)("td",null,t[148].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[149].value),(0,n.tZ)("td",null,t[150].value),(0,n.tZ)("td",null,t[151].value),(0,n.tZ)("td",null,t[152].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[153].value),(0,n.tZ)("td",null,t[154].value),(0,n.tZ)("td",null,t[155].value),(0,n.tZ)("td",null,t[156].value),(0,n.tZ)("td",null)))),(0,n.tZ)("p",null,t[157].value,(0,n.tZ)("code",null,t[158].value),t[159].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"},t[160].value),t[161].value),(0,n.tZ)("h4",{id:"inputsearch"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputsearch"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Search"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[162].value),(0,n.tZ)("th",null,t[163].value),(0,n.tZ)("th",null,t[164].value),(0,n.tZ)("th",null,t[165].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[166].value),(0,n.tZ)("td",null,t[167].value,(0,n.tZ)("code",null,t[168].value),t[169].value),(0,n.tZ)("td",null,t[170].value),(0,n.tZ)("td",null,t[171].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[172].value),(0,n.tZ)("td",null,t[173].value),(0,n.tZ)("td",null,t[174].value),(0,n.tZ)("td",null,t[175].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[176].value),(0,n.tZ)("td",null,t[177].value),(0,n.tZ)("td",null,t[178].value),(0,n.tZ)("td",null,t[179].value)))),(0,n.tZ)("p",null,t[180].value,(0,n.tZ)("code",null,t[181].value),t[182].value),(0,n.tZ)("h4",{id:"inputgroup"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputgroup"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Group"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[183].value),(0,n.tZ)("th",null,t[184].value),(0,n.tZ)("th",null,t[185].value),(0,n.tZ)("th",null,t[186].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[187].value),(0,n.tZ)("td",null,t[188].value),(0,n.tZ)("td",null,t[189].value),(0,n.tZ)("td",null,t[190].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[191].value),(0,n.tZ)("td",null,t[192].value,(0,n.tZ)("code",null,t[193].value),t[194].value,(0,n.tZ)("code",null,t[195].value),t[196].value,(0,n.tZ)("code",null,t[197].value),t[198].value,(0,n.tZ)("code",null,t[199].value),t[200].value,(0,n.tZ)("code",null,t[201].value)),(0,n.tZ)("td",null,t[202].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[203].value))))),(0,n.tZ)(o.Z,{lang:"jsx"},t[204].value),(0,n.tZ)("h4",{id:"inputpassword"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#inputpassword"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input.Password"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[205].value),(0,n.tZ)("th",null,t[206].value),(0,n.tZ)("th",null,t[207].value),(0,n.tZ)("th",null,t[208].value),(0,n.tZ)("th",null,t[209].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[210].value),(0,n.tZ)("td",null,t[211].value),(0,n.tZ)("td",null,t[212].value),(0,n.tZ)("td",null,t[213].value),(0,n.tZ)("td",null,t[214].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[215].value),(0,n.tZ)("td",null,t[216].value),(0,n.tZ)("td",null,t[217].value,(0,n.tZ)(a.rU,{to:"#VisibilityToggle"},t[218].value)),(0,n.tZ)("td",null,t[219].value),(0,n.tZ)("td",null)))),(0,n.tZ)("h4",{id:"visibilitytoggle"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#visibilitytoggle"},(0,n.tZ)("span",{className:"icon icon-link"})),"VisibilityToggle"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[220].value),(0,n.tZ)("th",null,t[221].value),(0,n.tZ)("th",null,t[222].value),(0,n.tZ)("th",null,t[223].value),(0,n.tZ)("th",null,t[224].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[225].value),(0,n.tZ)("td",null,t[226].value),(0,n.tZ)("td",null,t[227].value),(0,n.tZ)("td",null,t[228].value),(0,n.tZ)("td",null,t[229].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[230].value),(0,n.tZ)("td",null,t[231].value),(0,n.tZ)("td",null,t[232].value),(0,n.tZ)("td",null,t[233].value),(0,n.tZ)("td",null,t[234].value)))),(0,n.tZ)("h4",{id:"input-methods"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#input-methods"},(0,n.tZ)("span",{className:"icon icon-link"})),"Input Methods"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[235].value),(0,n.tZ)("th",null,t[236].value),(0,n.tZ)("th",null,t[237].value),(0,n.tZ)("th",null,t[238].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[239].value),(0,n.tZ)("td",null,t[240].value),(0,n.tZ)("td",null,t[241].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[242].value),(0,n.tZ)("td",null,t[243].value),(0,n.tZ)("td",null,t[244].value),(0,n.tZ)("td",null,t[245].value)))),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h3",{id:"why-input-lose-focus-when-change-prefixsuffixshowcount"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-input-lose-focus-when-change-prefixsuffixshowcount"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why Input lose focus when change ",(0,n.tZ)("code",null,t[246].value)),(0,n.tZ)("p",null,t[247].value,(0,n.tZ)("code",null,t[248].value),t[249].value,(0,n.tZ)("code",null,t[250].value),t[251].value),(0,n.tZ)(o.Z,{lang:"jsx"},t[252].value),(0,n.tZ)("h3",{id:"why-textarea-in-control-can-make-value-exceed-maxlength"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#why-textarea-in-control-can-make-value-exceed-maxlength"},(0,n.tZ)("span",{className:"icon icon-link"})),"Why TextArea in control can make ",(0,n.tZ)("code",null,t[253].value)," exceed ",(0,n.tZ)("code",null,t[254].value),"?"),(0,n.tZ)("p",null,t[255].value))))}u.default=p}}]);
