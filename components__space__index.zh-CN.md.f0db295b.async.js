"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[7232],{14532:function(r,o,e){e.r(o);var d=e(2143),s=e(50250),m=e(59378),_=e(78190),S=e(74775),l=e(5937),h=e(2068),B=e(74399),v=e(46004),g=e(35708),C=e(30138),f=e(56140),p=e(5388),b=e(49545),x=e(92169),y=e(13140),O=e(95127),Z=e(74418),k=e(97119),a=e(28257),i=e(67294),n=e(13946);function u(){var c=(0,a.eL)(),t=c.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,t[1].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[2].value),(0,n.tZ)("li",null,t[3].value),(0,n.tZ)("li",null,t[4].value,(0,n.tZ)("code",null,t[5].value),t[6].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(p.Z,{items:[{demo:{id:"components-space-demo-base"},previewerProps:{title:"\u57FA\u672C\u7528\u6CD5",filename:"components/space/demo/base.tsx",jsx:`import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Upload } from 'antd';
const App = () => (
  <Space>
    Space
    <Button type="primary">Button</Button>
    <Upload>
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload>
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button>Confirm</Button>
    </Popconfirm>
  </Space>
);
export default App;
`,description:"<p>\u76F8\u90BB\u7EC4\u4EF6\u6C34\u5E73\u95F4\u8DDD\u3002</p>"}},{demo:{id:"components-space-demo-vertical"},previewerProps:{title:"\u5782\u76F4\u95F4\u8DDD",filename:"components/space/demo/vertical.tsx",jsx:`import React from 'react';
import { Card, Space } from 'antd';
const App = () => (
  <Space
    direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}
  >
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
);
export default App;
`,description:"<p>\u76F8\u90BB\u7EC4\u4EF6\u5782\u76F4\u95F4\u8DDD\u3002</p>"}},{demo:{id:"components-space-demo-size"},previewerProps:{title:"\u95F4\u8DDD\u5927\u5C0F",filename:"components/space/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { Button, Radio, Space } from 'antd';
const App = () => {
  const [size, setSize] = useState('small');
  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio value="small">Small</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="large">Large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
};
export default App;
`,description:`<p>\u95F4\u8DDD\u9884\u8BBE\u5927\u3001\u4E2D\u3001\u5C0F\u4E09\u79CD\u5927\u5C0F\u3002</p>
<p>\u901A\u8FC7\u8BBE\u7F6E <code>size</code> \u4E3A <code>large</code> <code>middle</code> \u5206\u522B\u628A\u95F4\u8DDD\u8BBE\u4E3A\u5927\u3001\u4E2D\u95F4\u8DDD\u3002\u82E5\u4E0D\u8BBE\u7F6E <code>size</code>\uFF0C\u5219\u95F4\u8DDD\u4E3A\u5C0F\u3002</p>`}},{demo:{id:"components-space-demo-align"},previewerProps:{title:"\u5BF9\u9F50",filename:"components/space/demo/align.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <div className="space-align-container">
    <div className="space-align-block">
      <Space align="center">
        center
        <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span>
      </Space>
    </div>
    <div className="space-align-block">
      <Space align="start">
        start
        <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span>
      </Space>
    </div>
    <div className="space-align-block">
      <Space align="end">
        end
        <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span>
      </Space>
    </div>
    <div className="space-align-block">
      <Space align="baseline">
        baseline
        <Button type="primary">Primary</Button>
        <span className="mock-block">Block</span>
      </Space>
    </div>
  </div>
);
export default App;
`,description:"<p>\u8BBE\u7F6E\u5BF9\u9F50\u6A21\u5F0F\u3002</p>",style:`.space-align-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.space-align-block {
  flex: none;
  margin: 8px 4px;
  padding: 4px;
  border: 1px solid #40a9ff;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}`}},{demo:{id:"components-space-demo-customize"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u5C3A\u5BF8",filename:"components/space/demo/customize.tsx",jsx:`import React, { useState } from 'react';
import { Button, Slider, Space } from 'antd';
const App = () => {
  const [size, setSize] = useState(8);
  return (
    <>
      <Slider value={size} onChange={(value) => setSize(value)} />
      <br />
      <br />
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u95F4\u8DDD\u5927\u5C0F\u3002</p>"}},{demo:{id:"components-space-demo-wrap"},previewerProps:{title:"\u81EA\u52A8\u6362\u884C",filename:"components/space/demo/wrap.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space size={[8, 16]} wrap>
    {new Array(20).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Button key={index}>Button</Button>
    ))}
  </Space>
);
export default App;
`,description:"<p>\u81EA\u52A8\u6362\u884C\u3002</p>"}},{demo:{id:"components-space-demo-split"},previewerProps:{title:"\u5206\u9694\u7B26",filename:"components/space/demo/split.tsx",jsx:`import React from 'react';
import { Divider, Space, Typography } from 'antd';
const App = () => (
  <Space split={<Divider type="vertical" />}>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
  </Space>
);
export default App;
`,description:"<p>\u76F8\u90BB\u7EC4\u4EF6\u5206\u9694\u7B26\u3002</p>"}},{demo:{id:"components-space-demo-compact"},previewerProps:{title:"\u7D27\u51D1\u5E03\u5C40\u7EC4\u5408",filename:"components/space/demo/compact.tsx",jsx:`import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Space,
  TimePicker,
  Tooltip,
  TreeSelect,
} from 'antd';
const { Option } = Select;
const { TreeNode } = TreeSelect;
const App = () => (
  <div className="site-space-compact-wrapper">
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block size="small">
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="https://ant.design"
      />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="https://ant.design"
      />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select
        mode="multiple"
        defaultValue="Zhejianggggg"
        style={{
          width: '50%',
        }}
      >
        <Option value="Zhejianggggg">Zhejianggggg</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
      <Input
        style={{
          width: '50%',
        }}
        defaultValue="Xihu District, Hangzhou"
      />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input.Search
        style={{
          width: '30%',
        }}
        defaultValue="0571"
      />
      <Input.Search
        allowClear
        style={{
          width: '50%',
        }}
        defaultValue="26888888"
      />
      <Input.Search
        style={{
          width: '20%',
        }}
        defaultValue="+1"
      />
    </Space.Compact>
    <br />
    <Space.Compact block>
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
      <InputNumber defaultValue={12} />
    </Space.Compact>
    <br />
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block>
      <DatePicker.RangePicker
        style={{
          width: '70%',
        }}
      />
      <Input
        style={{
          width: '30%',
        }}
        defaultValue="input content"
      />
      <Button type="primary">\u67E5\u8BE2</Button>
    </Space.Compact>
    <br />
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="Option1-1">
        <Option value="Option1-1">Option1-1</Option>
        <Option value="Option1-2">Option1-2</Option>
      </Select>
      <Select defaultValue="Option2-2">
        <Option value="Option2-1">Option2-1</Option>
        <Option value="Option2-2">Option2-2</Option>
      </Select>
    </Space.Compact>
    <br />
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block>
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
    </Space.Compact>
    <br />
    <Space.Compact block>
      <TimePicker
        style={{
          width: '70%',
        }}
      />
      <Cascader
        style={{
          width: '70%',
        }}
        options={[
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
        ]}
        placeholder="Select Address"
      />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <TimePicker.RangePicker />
      <TreeSelect
        showSearch
        style={{
          width: '60%',
        }}
        value="leaf1"
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={() => {}}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="leaf1" />
            <TreeNode value="leaf2" title="leaf2" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode
              value="leaf3"
              title={
                <b
                  style={{
                    color: '#08c',
                  }}
                >
                  leaf3
                </b>
              }
            />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <br />
  </div>
);
export default App;
`,description:"<p>\u4F7F\u7528 Space.Compact \u8BA9\u8868\u5355\u7EC4\u4EF6\u4E4B\u95F4\u7D27\u51D1\u8FDE\u63A5\u4E14\u5408\u5E76\u8FB9\u6846\u3002</p>",style:`.site-space-compact-wrapper .site-input-split {
  background-color: #fff;
}

.site-space-compact-wrapper .site-input-right:not(.ant-input-rtl) {
  border-left-width: 0;
}

.site-space-compact-wrapper .site-input-right:not(.ant-input-rtl):hover,
.site-space-compact-wrapper .site-input-right:not(.ant-input-rtl):focus {
  border-left-width: 1px;
}

.site-space-compact-wrapper .site-input-right.ant-input-rtl {
  border-right-width: 0;
}

.site-space-compact-wrapper .site-input-right.ant-input-rtl:hover,
.site-space-compact-wrapper .site-input-right.ant-input-rtl:focus {
  border-right-width: 1px;
}`}},{demo:{id:"components-space-demo-compact-buttons"},previewerProps:{title:"Button \u7D27\u51D1\u5E03\u5C40",filename:"components/space/demo/compact-buttons.tsx",jsx:`import React from 'react';
import {
  DownloadOutlined,
  EllipsisOutlined,
  HeartOutlined,
  LikeOutlined,
  CommentOutlined,
  StarOutlined,
  ShareAltOutlined,
  WarningOutlined,
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { Button, Menu, Dropdown, Space, Tooltip } from 'antd';
const App = () => (
  <div>
    <Space.Compact block>
      <Tooltip title="Like">
        <Button icon={<LikeOutlined />} />
      </Tooltip>
      <Tooltip title="Comment">
        <Button icon={<CommentOutlined />} />
      </Tooltip>
      <Tooltip title="Star">
        <Button icon={<StarOutlined />} />
      </Tooltip>
      <Tooltip title="Heart">
        <Button icon={<HeartOutlined />} />
      </Tooltip>
      <Tooltip title="Share">
        <Button icon={<ShareAltOutlined />} />
      </Tooltip>
      <Tooltip title="Download">
        <Button icon={<DownloadOutlined />} />
      </Tooltip>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: 'Report',
                icon: <WarningOutlined />,
              },
              {
                key: '2',
                label: 'Mail',
                icon: <MailOutlined />,
              },
              {
                key: '3',
                label: 'Mobile',
                icon: <MobileOutlined />,
              },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
      <Button type="primary">Button 4</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button icon={<DownloadOutlined />} />
      </Tooltip>
      <Button type="primary">Button 4</Button>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: '1st item',
              },
              {
                key: '2',
                label: '2nd item',
              },
              {
                key: '3',
                label: '3rd item',
              },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button type="primary" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
  </div>
);
export default App;
`,description:"<p>Button \u7EC4\u4EF6\u7D27\u51D1\u6392\u5217\u7684\u793A\u4F8B\u3002</p>"}},{demo:{id:"components-space-demo-compact-button-vertical"},previewerProps:{title:"\u5782\u76F4\u65B9\u5411\u7D27\u51D1\u5E03\u5C40",filename:"components/space/demo/compact-button-vertical.tsx",jsx:`import React from 'react';
import { Button, Space } from 'antd';
const App = () => (
  <Space>
    <Space.Compact direction="vertical">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Space.Compact>
    <Space.Compact direction="vertical">
      <Button type="dashed">Button 1</Button>
      <Button type="dashed">Button 2</Button>
      <Button type="dashed">Button 3</Button>
    </Space.Compact>
    <Space.Compact direction="vertical">
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Button type="primary">Button 3</Button>
    </Space.Compact>
  </Space>
);
export default App;
`,description:"<p>\u5782\u76F4\u65B9\u5411\u7684\u7D27\u51D1\u5E03\u5C40\uFF0C\u76EE\u524D\u4EC5\u652F\u6301 Button \u7EC4\u5408\u3002</p>"}},{demo:{id:"components-space-demo-compact-debug"},previewerProps:{debug:!0,title:"\u8C03\u8BD5 Input \u524D\u7F6E/\u540E\u7F6E\u6807\u7B7E",filename:"components/space/demo/compact-debug.tsx",jsx:`import React, { useState } from 'react';
import { SettingOutlined, CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  Cascader,
  Input,
  Select,
  Space,
  Button,
  Tooltip,
  Modal,
  Dropdown,
  Drawer,
  InputNumber,
  DatePicker,
} from 'antd';
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
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Space direction="vertical">
      <Space.Compact block>
        <Button>default Button</Button>
        <Button danger>danger Button</Button>
        <Button type="dashed">dashed Button</Button>
        <Button type="text">text Button</Button>
        <Button type="link">Link Button</Button>
        <Tooltip title="Tooltip">
          <Button icon={<DownloadOutlined />} disabled />
        </Tooltip>
      </Space.Compact>
      <br />
      <Space.Compact>
        <Button>Prefix</Button>
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <Input placeholder="prefix" />
        <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
        <Button icon={<CopyOutlined />} />
      </Space.Compact>
      <Space.Compact>
        <Input.Search />
        <Input.Search />
        <Button icon={<CopyOutlined />} />
      </Space.Compact>
      <Space.Compact>
        <Input addonAfter={<SettingOutlined />} defaultValue="mysite" />
        <Button type="primary">Submit</Button>
        <Input placeholder="suffix" addonAfter={<SettingOutlined />} />
      </Space.Compact>
      <Space.Compact>
        <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <Button>Prefix</Button>
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
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <br />
      <Space.Compact>
        <Button onClick={() => setShowModal(true)}>debug Modal context</Button>
        {showModal && (
          <Modal title="Basic Modal" open={showModal} onCancel={() => setShowModal(false)}>
            <Button>normal button A</Button>
            <Button>normal button B</Button>
            <br />
            <br />
            <Input />
            <br />
            <br />
            <Space.Compact>
              <Button>compact button A</Button>
              <Button>compact button B</Button>
            </Space.Compact>
          </Modal>
        )}
      </Space.Compact>
      <Space.Compact>
        <Dropdown.Button
          menu={{
            items: [
              {
                key: '1',
                label: <Button>menu button</Button>,
              },
              {
                key: '2',
                label: 'normal menu item',
              },
            ],
          }}
        >
          debug Dropdown.Button context
        </Dropdown.Button>
      </Space.Compact>
      <Space.Compact>
        <Button onClick={() => setShowDrawer(true)}>debug Drawer context</Button>
        {showDrawer && (
          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={() => setShowDrawer(false)}
            open={showDrawer}
          >
            <Button>normal button A</Button>
            <Button>normal button B</Button>
            <br />
            <br />
            <Space.Compact>
              <Button>compact button A</Button>
              <Button>compact button B</Button>
            </Space.Compact>
          </Drawer>
        )}
      </Space.Compact>
      <Space.Compact>
        <InputNumber addonBefore="+" addonAfter="$" defaultValue={100} />
      </Space.Compact>
      <Space.Compact>
        <Select defaultValue="Sign Up">
          <Option value="Sign Up">Sign Up</Option>
          <Option value="Sign In">Sign In</Option>
        </Select>
      </Space.Compact>
      <Space.Compact>
        <DatePicker.RangePicker
          style={{
            width: '70%',
          }}
        />
      </Space.Compact>
      <Space.Compact>
        <InputNumber defaultValue={12} />
      </Space.Compact>
      <Space.Compact>
        <Cascader
          style={{
            width: '70%',
          }}
          options={[
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
          ]}
          placeholder="Select Address"
        />
      </Space.Compact>
      <Space.Compact direction="vertical">
        <Button>vertical compact button A</Button>
      </Space.Compact>
    </Space>
  );
};
export default App;
`,description:"<p>\u8C03\u8BD5 Input \u524D\u7F6E/\u540E\u7F6E\u6807\u7B7E\u3002</p>",style:`.select-before {
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
}`}},{demo:{id:"components-space-demo-compact-nested"},previewerProps:{debug:!0,title:"\u7D27\u51D1\u5E03\u5C40\u5D4C\u5957",filename:"components/space/demo/compact-nested.tsx",jsx:`import React from 'react';
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Cascader, Input, InputNumber, Space, Select, TimePicker } from 'antd';
const { Option } = Select;
const App = () => (
  <>
    <Space.Compact block>
      <Space.Compact>
        <Space.Compact>
          <Input
            style={{
              width: 90,
            }}
            placeholder="Typing..."
          />
          <Button icon={<SearchOutlined />} />
        </Space.Compact>
        <Space.Compact>
          <InputNumber defaultValue={12} />
          <Select defaultValue="Option1">
            <Option value="Option1">Opt1</Option>
            <Option value="Option2">Opt2</Option>
          </Select>
        </Space.Compact>
      </Space.Compact>
      <Button type="primary">Separator</Button>
      <Space.Compact>
        <Space.Compact>
          <Input.Search
            style={{
              width: 110,
            }}
            placeholder="Search"
          />
          <Button type="primary">Submit</Button>
        </Space.Compact>
        <Space.Compact>
          <Input defaultValue="mysite" />
          <Button icon={<CopyOutlined />} />
        </Space.Compact>
      </Space.Compact>
    </Space.Compact>
    <>
      <br />
      <Space.Compact block>
        <Space.Compact>
          <TimePicker />
          <Button type="primary">Submit</Button>
        </Space.Compact>
        <Space.Compact>
          <Cascader
            options={[
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
            ]}
            placeholder="Select Address"
          />
          <Button type="primary">Submit</Button>
        </Space.Compact>
      </Space.Compact>
    </>
  </>
);
export default App;
`,description:"<p>\u5D4C\u5957\u4F7F\u7528\u7684\u7D27\u51D1\u5E03\u5C40</p>",style:`[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}`}},{demo:{id:"components-space-demo-debug"},previewerProps:{debug:!0,title:"\u591A\u6837\u7684 Child",filename:"components/space/demo/debug.tsx",jsx:`import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
const App = () => (
  <Space>
    <>
      Button
      <Button>Button</Button>
    </>
    Button
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button>Delete</Button>
    </Popconfirm>
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button disabled>Delete</Button>
    </Popconfirm>
    {null}
    {false}
    {1}
    Button
    {null}
    {undefined}
  </Space>
);
export default App;
`,description:"<p>Debug usage</p>"}},{demo:{id:"components-space-demo-gap-in-line"},previewerProps:{debug:!0,title:"Flex gap \u6837\u5F0F",filename:"components/space/demo/gap-in-line.tsx",jsx:`import React, { useState } from 'react';
import { Space, Switch } from 'antd';
const style = {
  width: 150,
  height: 100,
  background: 'red',
};
const App = () => {
  const [singleCol, setSingleCol] = useState(false);
  return (
    <>
      <Switch
        checked={singleCol}
        onChange={() => {
          setSingleCol(!singleCol);
        }}
      />
      <div
        style={{
          boxShadow: '0 0 5px green',
        }}
      >
        <Space
          style={{
            width: singleCol ? 307 : 310,
            background: 'blue',
          }}
          size={[8, 8]}
          wrap
        >
          <div style={style} />
          <div style={style} />
          <div style={style} />
          <div style={style} />
        </Space>
      </div>
    </>
  );
};
export default App;
`,description:"<p>Debug usage</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("h3",{id:"space"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#space"},(0,n.tZ)("span",{className:"icon icon-link"})),"Space"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[7].value),(0,n.tZ)("th",null,t[8].value),(0,n.tZ)("th",null,t[9].value),(0,n.tZ)("th",null,t[10].value),(0,n.tZ)("th",null,t[11].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[12].value),(0,n.tZ)("td",null,t[13].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[14].value),t[15].value,(0,n.tZ)("code",null,t[16].value),t[17].value,(0,n.tZ)("code",null,t[18].value),t[19].value,(0,n.tZ)("code",null,t[20].value)),(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[23].value),(0,n.tZ)("td",null,t[24].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[25].value),t[26].value,(0,n.tZ)("code",null,t[27].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[28].value)),(0,n.tZ)("td",null,t[29].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[30].value),(0,n.tZ)("td",null,t[31].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#Size"},t[32].value),t[33].value,(0,n.tZ)(a.rU,{to:"#Size"},t[34].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[35].value)),(0,n.tZ)("td",null,t[36].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value),(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[42].value),(0,n.tZ)("td",null,t[43].value,(0,n.tZ)("code",null,t[44].value),t[45].value),(0,n.tZ)("td",null,t[46].value),(0,n.tZ)("td",null,t[47].value),(0,n.tZ)("td",null,t[48].value)))),(0,n.tZ)("h3",{id:"size"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#size"},(0,n.tZ)("span",{className:"icon icon-link"})),"Size"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,t[49].value)),(0,n.tZ)("h3",{id:"spacecompact"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#spacecompact"},(0,n.tZ)("span",{className:"icon icon-link"})),"Space.Compact"),(0,n.tZ)("blockquote",null,(0,n.tZ)("p",null,t[50].value)),(0,n.tZ)("p",null,t[51].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[52].value),(0,n.tZ)("li",null,t[53].value),(0,n.tZ)("li",null,t[54].value),(0,n.tZ)("li",null,t[55].value),(0,n.tZ)("li",null,t[56].value),(0,n.tZ)("li",null,t[57].value),(0,n.tZ)("li",null,t[58].value),(0,n.tZ)("li",null,t[59].value)),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[60].value),(0,n.tZ)("th",null,t[61].value),(0,n.tZ)("th",null,t[62].value),(0,n.tZ)("th",null,t[63].value),(0,n.tZ)("th",null,t[64].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value),(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null,t[69].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[70].value),(0,n.tZ)("td",null,t[71].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[72].value),t[73].value,(0,n.tZ)("code",null,t[74].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[75].value)),(0,n.tZ)("td",null,t[76].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[77].value),(0,n.tZ)("td",null,t[78].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[79].value),t[80].value,(0,n.tZ)("code",null,t[81].value),t[82].value,(0,n.tZ)("code",null,t[83].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[84].value)),(0,n.tZ)("td",null,t[85].value)))))))}o.default=u}}]);
