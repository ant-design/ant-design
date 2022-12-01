"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[876],{13127:function(d,o,e){e.r(o);var r=e(2143),s=e(50250),m=e(59378),_=e(78190),S=e(74775),l=e(5937),h=e(2068),B=e(74399),v=e(46004),g=e(35708),C=e(30138),f=e(56140),p=e(5388),b=e(49545),y=e(92169),x=e(13140),O=e(95127),Z=e(74418),k=e(97119),a=e(28257),i=e(67294),n=e(13946);function c(){var u=(0,a.eL)(),t=u.texts;return(0,n.tZ)(a.dY,null,(0,n.tZ)(i.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,t[0].value),(0,n.tZ)("h2",{id:"when-to-use"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use"},(0,n.tZ)("span",{className:"icon icon-link"})),"When To Use"),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[1].value),(0,n.tZ)("li",null,t[2].value,(0,n.tZ)("code",null,t[3].value),t[4].value)),(0,n.tZ)("h2",{id:"examples"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#examples"},(0,n.tZ)("span",{className:"icon icon-link"})),"Examples")),(0,n.tZ)(p.Z,{items:[{demo:{id:"components-space-demo-base"},previewerProps:{title:"Basic Usage",filename:"components/space/demo/base.tsx",jsx:`import React from 'react';
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
`,description:"<p>Crowded components horizontal spacing.</p>"}},{demo:{id:"components-space-demo-vertical"},previewerProps:{title:"Vertical Space",filename:"components/space/demo/vertical.tsx",jsx:`import React from 'react';
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
`,description:"<p>Crowded components vertical spacing.</p>"}},{demo:{id:"components-space-demo-size"},previewerProps:{title:"Space Size",filename:"components/space/demo/size.tsx",jsx:`import React, { useState } from 'react';
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
`,description:`<p><code>large</code>, <code>middle</code> and <code>small</code> preset sizes.</p>
<p>Set the size to <code>large</code> and <code>middle</code> by setting size to large and middle respectively. If <code>size</code> is not set, the spacing is <code>small</code>.</p>`}},{demo:{id:"components-space-demo-align"},previewerProps:{title:"Align",filename:"components/space/demo/align.tsx",jsx:`import React from 'react';
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
`,description:"<p>Config item align.</p>",style:`.space-align-container {
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
}`}},{demo:{id:"components-space-demo-customize"},previewerProps:{title:"Customize Size",filename:"components/space/demo/customize.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Custom spacing size.</p>"}},{demo:{id:"components-space-demo-wrap"},previewerProps:{title:"Wrap",filename:"components/space/demo/wrap.tsx",jsx:`import React from 'react';
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
`,description:"<p>Auto wrap line.</p>"}},{demo:{id:"components-space-demo-split"},previewerProps:{title:"Split",filename:"components/space/demo/split.tsx",jsx:`import React from 'react';
import { Divider, Space, Typography } from 'antd';
const App = () => (
  <Space split={<Divider type="vertical" />}>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
  </Space>
);
export default App;
`,description:"<p>Crowded components split.</p>"}},{demo:{id:"components-space-demo-compact"},previewerProps:{title:"Compact Mode for form component",filename:"components/space/demo/compact.tsx",jsx:`import React from 'react';
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
`,description:"<p>Compact Mode for form component.</p>",style:`.site-space-compact-wrapper .site-input-split {
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
}`}},{demo:{id:"components-space-demo-compact-buttons"},previewerProps:{title:"Button Compact Mode",filename:"components/space/demo/compact-buttons.tsx",jsx:`import React from 'react';
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
`,description:"<p>Button component compact example.</p>"}},{demo:{id:"components-space-demo-compact-button-vertical"},previewerProps:{title:"Vertical Compact Mode",filename:"components/space/demo/compact-button-vertical.tsx",jsx:`import React from 'react';
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
`,description:"<p>Vertical Mode for Space.Compact, support Button only.</p>"}},{demo:{id:"components-space-demo-compact-debug"},previewerProps:{debug:!0,title:"Input addon debug",filename:"components/space/demo/compact-debug.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Input addon debug.</p>",style:`.select-before {
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
}`}},{demo:{id:"components-space-demo-compact-nested"},previewerProps:{debug:!0,title:"Nested Space Compact",filename:"components/space/demo/compact-nested.tsx",jsx:`import React from 'react';
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
`,description:"<p>Nested <code>Space.Compact</code></p>",style:`[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}`}},{demo:{id:"components-space-demo-debug"},previewerProps:{debug:!0,title:"Diverse Child",filename:"components/space/demo/debug.tsx",jsx:`import React from 'react';
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
`,description:"<p>Debug usage</p>"}},{demo:{id:"components-space-demo-gap-in-line"},previewerProps:{debug:!0,title:"Flex gap style",filename:"components/space/demo/gap-in-line.tsx",jsx:`import React, { useState } from 'react';
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
`,description:"<p>Debug usage</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[5].value),(0,n.tZ)("th",null,t[6].value),(0,n.tZ)("th",null,t[7].value),(0,n.tZ)("th",null,t[8].value),(0,n.tZ)("th",null,t[9].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[10].value),(0,n.tZ)("td",null,t[11].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[12].value),t[13].value,(0,n.tZ)("code",null,t[14].value),t[15].value,(0,n.tZ)("code",null,t[16].value),t[17].value,(0,n.tZ)("code",null,t[18].value)),(0,n.tZ)("td",null,t[19].value),(0,n.tZ)("td",null,t[20].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[21].value),(0,n.tZ)("td",null,t[22].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[23].value),t[24].value,(0,n.tZ)("code",null,t[25].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[26].value)),(0,n.tZ)("td",null,t[27].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[28].value),(0,n.tZ)("td",null,t[29].value),(0,n.tZ)("td",null,(0,n.tZ)(a.rU,{to:"#Size"},t[30].value),t[31].value,(0,n.tZ)(a.rU,{to:"#Size"},t[32].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[33].value)),(0,n.tZ)("td",null,t[34].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[35].value),(0,n.tZ)("td",null,t[36].value),(0,n.tZ)("td",null,t[37].value),(0,n.tZ)("td",null,t[38].value),(0,n.tZ)("td",null,t[39].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[40].value),(0,n.tZ)("td",null,t[41].value,(0,n.tZ)("code",null,t[42].value),t[43].value),(0,n.tZ)("td",null,t[44].value),(0,n.tZ)("td",null,t[45].value),(0,n.tZ)("td",null,t[46].value)))),(0,n.tZ)("h3",{id:"size"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#size"},(0,n.tZ)("span",{className:"icon icon-link"})),"Size"),(0,n.tZ)("p",null,(0,n.tZ)("code",null,t[47].value)),(0,n.tZ)("h3",{id:"spacecompact"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#spacecompact"},(0,n.tZ)("span",{className:"icon icon-link"})),"Space.Compact"),(0,n.tZ)("p",null,t[48].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,t[49].value),(0,n.tZ)("li",null,t[50].value),(0,n.tZ)("li",null,t[51].value),(0,n.tZ)("li",null,t[52].value),(0,n.tZ)("li",null,t[53].value),(0,n.tZ)("li",null,t[54].value),(0,n.tZ)("li",null,t[55].value),(0,n.tZ)("li",null,t[56].value)),(0,n.tZ)(l.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,t[57].value),(0,n.tZ)("th",null,t[58].value),(0,n.tZ)("th",null,t[59].value),(0,n.tZ)("th",null,t[60].value),(0,n.tZ)("th",null,t[61].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[62].value),(0,n.tZ)("td",null,t[63].value),(0,n.tZ)("td",null,t[64].value),(0,n.tZ)("td",null,t[65].value),(0,n.tZ)("td",null,t[66].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[67].value),(0,n.tZ)("td",null,t[68].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[69].value),t[70].value,(0,n.tZ)("code",null,t[71].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[72].value)),(0,n.tZ)("td",null,t[73].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,t[74].value),(0,n.tZ)("td",null,t[75].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[76].value),t[77].value,(0,n.tZ)("code",null,t[78].value),t[79].value,(0,n.tZ)("code",null,t[80].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,t[81].value)),(0,n.tZ)("td",null,t[82].value)))))))}o.default=c}}]);
