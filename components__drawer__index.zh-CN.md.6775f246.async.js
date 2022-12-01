"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[2482],{54152:function(d,l,t){t.r(l);var p=t(2143),c=t(50250),m=t(59378),v=t(78190),_=t(74775),a=t(5937),Z=t(2068),w=t(74399),h=t(46004),C=t(35708),D=t(30138),f=t(56140),r=t(5388),x=t(49545),g=t(92169),O=t(13140),P=t(95127),S=t(74418),R=t(97119),o=t(28257),s=t(67294),n=t(13946);function u(){var i=(0,o.eL)(),e=i.texts;return(0,n.tZ)(o.dY,null,(0,n.tZ)(s.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F55\u65F6\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F55\u65F6\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value),(0,n.tZ)("ul",null,(0,n.tZ)("li",null,e[2].value),(0,n.tZ)("li",null,e[3].value)),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(r.Z,{items:[{demo:{id:"components-drawer-demo-basic-right"},previewerProps:{title:"\u57FA\u7840\u62BD\u5C49",filename:"components/drawer/demo/basic-right.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u57FA\u7840\u62BD\u5C49\uFF0C\u70B9\u51FB\u89E6\u53D1\u6309\u94AE\u62BD\u5C49\u4ECE\u53F3\u6ED1\u51FA\uFF0C\u70B9\u51FB\u906E\u7F69\u533A\u5173\u95ED\u3002</p>",style:`[data-theme='compact'] .ant-drawer-body p {
  margin-bottom: 0;
}`}},{demo:{id:"components-drawer-demo-placement"},previewerProps:{title:"\u81EA\u5B9A\u4E49\u4F4D\u7F6E",filename:"components/drawer/demo/placement.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u81EA\u5B9A\u4E49\u4F4D\u7F6E\uFF0C\u70B9\u51FB\u89E6\u53D1\u6309\u94AE\u62BD\u5C49\u4ECE\u76F8\u5E94\u7684\u4F4D\u7F6E\u6ED1\u51FA\uFF0C\u70B9\u51FB\u906E\u7F69\u533A\u5173\u95ED\u3002</p>"}},{demo:{id:"components-drawer-demo-extra"},previewerProps:{title:"\u989D\u5916\u64CD\u4F5C",filename:"components/drawer/demo/extra.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u5728 Ant Design \u89C4\u8303\u4E2D\uFF0C\u64CD\u4F5C\u6309\u94AE\u5EFA\u8BAE\u653E\u5728\u62BD\u5C49\u7684\u53F3\u4E0A\u89D2\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>extra</code> \u5C5E\u6027\u6765\u5B9E\u73B0\u3002</p>"}},{demo:{id:"components-drawer-demo-render-in-current"},previewerProps:{title:"\u6E32\u67D3\u5728\u5F53\u524D DOM",filename:"components/drawer/demo/render-in-current.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="site-drawer-render-in-current-wrapper">
      Render in this
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};
export default App;
`,description:"<p>\u6E32\u67D3\u5728\u5F53\u524D dom \u91CC\u3002\u81EA\u5B9A\u4E49\u5BB9\u5668\uFF0C\u67E5\u770B <code>getContainer</code>\u3002</p>",style:`.site-drawer-render-in-current-wrapper {
  position: relative;
  height: 200px;
  padding: 48px;
  overflow: hidden;
  text-align: center;
  background: #fafafa;
  border: 1px solid #ebedf0;
  border-radius: 2px;
}`}},{demo:{id:"components-drawer-demo-form-in-drawer"},previewerProps:{title:"\u62BD\u5C49\u8868\u5355",filename:"components/drawer/demo/form-in-drawer.tsx",jsx:`import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
const { Option } = Select;
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Please enter url',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner',
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u5728\u62BD\u5C49\u4E2D\u4F7F\u7528\u8868\u5355\u3002</p>",style:`.site-form-in-drawer-wrapper {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 100%;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
  border-top: 1px solid #e9e9e9;
}`}},{demo:{id:"components-drawer-demo-user-profile"},previewerProps:{title:"\u4FE1\u606F\u9884\u89C8\u62BD\u5C49",filename:"components/drawer/demo/user-profile.tsx",jsx:`import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <List
        dataSource={[
          {
            id: 1,
            name: 'Lily',
          },
          {
            id: 2,
            name: 'Lily',
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={showDrawer} key={\`a-\${item.id}\`}>
                View Profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description="Progresser XTech"
            />
          </List.Item>
        )}
      />
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China\u{1F1E8}\u{1F1F3}" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u9700\u8981\u5FEB\u901F\u9884\u89C8\u5BF9\u8C61\u6982\u8981\u65F6\u4F7F\u7528\uFF0C\u70B9\u51FB\u906E\u7F69\u533A\u5173\u95ED\u3002</p>",style:`.site-description-item-profile-wrapper {
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5715;
}

[data-theme='compact'] .site-description-item-profile-wrapper {
  font-size: 12px;
  line-height: 1.66667;
}

.ant-drawer-body p.site-description-item-profile-p {
  display: block;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 1.5715;
}

[data-theme='compact'] .ant-drawer-body p.site-description-item-profile-p {
  font-size: 14px;
  line-height: 1.66667;
}

.site-description-item-profile-p-label {
  display: inline-block;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.85);
}`}},{demo:{id:"components-drawer-demo-multi-level-drawer"},previewerProps:{title:"\u591A\u5C42\u62BD\u5C49",filename:"components/drawer/demo/multi-level-drawer.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open drawer
      </Button>
      <Drawer title="Multi-level drawer" width={520} closable={false} onClose={onClose} open={open}>
        <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button>
        <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          This is two-level drawer
        </Drawer>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u5728\u62BD\u5C49\u5185\u6253\u5F00\u65B0\u7684\u62BD\u5C49\uFF0C\u7528\u4EE5\u89E3\u51B3\u591A\u5206\u652F\u4EFB\u52A1\u7684\u590D\u6742\u72B6\u51B5\u3002</p>",style:`[data-theme="dark"] .site-multi-level-drawer-footer {
  border-top: 1px solid #303030;
  background: #1f1f1f;
}`}},{demo:{id:"components-drawer-demo-size"},previewerProps:{title:"\u9884\u8BBE\u5BBD\u5EA6",filename:"components/drawer/demo/size.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const showDefaultDrawer = () => {
    setSize('default');
    setOpen(true);
  };
  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDefaultDrawer}>
          Open Default Size (378px)
        </Button>
        <Button type="primary" onClick={showLargeDrawer}>
          Open Large Size (736px)
        </Button>
      </Space>
      <Drawer
        title={\`\${size} Drawer\`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u62BD\u5C49\u7684\u9ED8\u8BA4\u5BBD\u5EA6\u4E3A <code>378px</code>\uFF0C\u53E6\u5916\u8FD8\u63D0\u4F9B\u4E00\u4E2A\u5927\u53F7\u62BD\u5C49 <code>736px</code>\uFF0C\u53EF\u4EE5\u7528 <code>size</code> \u5C5E\u6027\u6765\u8BBE\u7F6E\u3002</p>"}},{demo:{id:"components-drawer-demo-config-provider"},previewerProps:{debug:!0,title:"ConfigProvider",filename:"components/drawer/demo/config-provider.tsx",jsx:`import React, { useRef, useState } from 'react';
import { Button, ConfigProvider, Drawer } from 'antd';
const App = () => {
  const domRef = useRef(null);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <ConfigProvider getPopupContainer={() => domRef.current}>
      <div ref={domRef} className="site-drawer-render-in-current-wrapper">
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer
          rootStyle={{
            position: 'absolute',
          }}
          title="ConfigProvider"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};
export default App;
`,description:"<p>\u652F\u6301 ConfigProvider \u914D\u7F6E\u3002</p>"}},{demo:{id:"components-drawer-demo-no-mask"},previewerProps:{debug:!0,title:"\u65E0\u906E\u7F69",filename:"components/drawer/demo/no-mask.tsx",jsx:`import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const App = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Drawer without mask"
        placement="right"
        mask={false}
        onClose={onClose}
        open={open}
        contentWrapperStyle={{
          width: 333,
          background: 'red',
          borderRadius: 20,
          boxShadow: '-5px 0 5px green',
          overflow: 'hidden',
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default App;
`,description:"<p>\u901A\u8FC7 <code>mask={false}</code> \u53BB\u6389\u906E\u7F69\u3002</p>"}},{demo:{id:"components-drawer-demo-render-panel"},previewerProps:{debug:!0,title:"_InternalPanelDoNotUseOrYouWillBeFired",filename:"components/drawer/demo/render-panel.tsx",jsx:`import React from 'react';
import { Drawer } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;
export default () => (
  <div
    style={{
      padding: 32,
      background: '#e6e6e6',
    }}
  >
    <InternalDrawer
      title="Hello Title"
      style={{
        height: 300,
      }}
      footer="Footer!"
    >
      Hello Content
    </InternalDrawer>
  </div>
);
`,description:"<p>\u8C03\u8BD5\u7528\u7EC4\u4EF6\uFF0C\u8BF7\u52FF\u76F4\u63A5\u4F7F\u7528\u3002</p>"}},{demo:{id:"components-drawer-demo-scroll-debug"},previewerProps:{debug:!0,title:"\u6EDA\u52A8\u9501\u5B9A\u8C03\u8BD5",filename:"components/drawer/demo/scroll-debug.tsx",jsx:`import React, { useState } from 'react';
import { Switch, Space, Drawer, Modal } from 'antd';
const App = () => {
  const [drawer, setDrawer] = useState(false);
  const [drawer2, setDrawer2] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 999999,
      }}
    >
      <Space>
        <Switch
          checkedChildren="Drawer"
          unCheckedChildren="Drawer"
          checked={drawer}
          onChange={() => setDrawer(!drawer)}
        />
        <Switch
          checkedChildren="Drawer2"
          unCheckedChildren="Drawer2"
          checked={drawer2}
          onChange={() => setDrawer2(!drawer2)}
        />
        <Switch
          checkedChildren="Modal"
          unCheckedChildren="Modal"
          checked={modal}
          onChange={() => setModal(!modal)}
        />
        <Switch
          checkedChildren="Modal2"
          unCheckedChildren="Modal2"
          checked={modal2}
          onChange={() => setModal2(!modal2)}
        />
      </Space>
      <Drawer title="Drawer" open={drawer}>
        Some contents...
        <Drawer title="Drawer Sub" open={drawer}>
          Sub contents...
        </Drawer>
      </Drawer>
      <Drawer title="Drawer2" open={drawer2}>
        Some contents...
      </Drawer>
      <Modal title="Modal" open={modal}>
        Some contents...
      </Modal>
      <Modal title="Modal2" open={modal2}>
        Some contents...
      </Modal>
    </div>
  );
};
export default App;
`,description:"<p>\u5F53 Modal \u548C Drawer \u5171\u540C\u4F5C\u7528\u65F6\u7684\u6EDA\u52A8\u9501\u5B9A\u8C03\u8BD5\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)("p",null,(0,n.tZ)("strong",null,e[4].value),e[5].value,(0,n.tZ)("code",null,e[6].value),e[7].value,(0,n.tZ)("code",null,e[8].value),e[9].value,(0,n.tZ)("code",null,e[10].value),e[11].value,(0,n.tZ)("code",null,e[12].value),e[13].value),(0,n.tZ)(a.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[14].value),(0,n.tZ)("th",null,e[15].value),(0,n.tZ)("th",null,e[16].value),(0,n.tZ)("th",null,e[17].value),(0,n.tZ)("th",null,e[18].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[24].value),(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,e[27].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[28].value),(0,n.tZ)("td",null,e[29].value),(0,n.tZ)("td",null,e[30].value),(0,n.tZ)("td",null,e[31].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value),(0,n.tZ)("td",null,e[35].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[40].value),(0,n.tZ)("td",null,e[41].value),(0,n.tZ)("td",null,e[42].value),(0,n.tZ)("td",null,e[43].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[44].value),(0,n.tZ)("td",null,e[45].value),(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[48].value),(0,n.tZ)("td",null,e[49].value),(0,n.tZ)("td",null,e[50].value),(0,n.tZ)("td",null,e[51].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value),(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[57].value),(0,n.tZ)("td",null,e[58].value),(0,n.tZ)("td",null,e[59].value),(0,n.tZ)("td",null,e[60].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[61].value),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value),(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value,(0,n.tZ)("strong",null,e[71].value),e[72].value,(0,n.tZ)("code",null,e[73].value),e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,e[76].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[77].value),(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value,(0,n.tZ)("code",null,e[83].value),e[84].value,(0,n.tZ)("code",null,e[85].value),e[86].value,(0,n.tZ)("code",null,e[87].value),e[88].value),(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,e[92].value),(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[95].value),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[99].value),(0,n.tZ)("td",null,e[100].value),(0,n.tZ)("td",null,e[101].value),(0,n.tZ)("td",null,e[102].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[103].value),(0,n.tZ)("td",null,e[104].value),(0,n.tZ)("td",null,e[105].value),(0,n.tZ)("td",null,e[106].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[107].value),(0,n.tZ)("td",null,e[108].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[109].value),e[110].value,(0,n.tZ)("code",null,e[111].value),e[112].value,(0,n.tZ)("code",null,e[113].value),e[114].value,(0,n.tZ)("code",null,e[115].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[116].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value),(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[122].value),(0,n.tZ)("td",null,e[123].value),(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[126].value),(0,n.tZ)("td",null,e[127].value,(0,n.tZ)("code",null,e[128].value),e[129].value,(0,n.tZ)("code",null,e[130].value)),(0,n.tZ)("td",null,e[131].value),(0,n.tZ)("td",null,e[132].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[133].value),(0,n.tZ)("td",null,e[134].value,(0,n.tZ)("code",null,e[135].value),e[136].value,(0,n.tZ)("code",null,e[137].value)),(0,n.tZ)("td",null,e[138].value),(0,n.tZ)("td",null,e[139].value),(0,n.tZ)("td",null,e[140].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[141].value),(0,n.tZ)("td",null,e[142].value,(0,n.tZ)("code",null,e[143].value)),(0,n.tZ)("td",null,e[144].value),(0,n.tZ)("td",null,e[145].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[146].value),(0,n.tZ)("td",null,e[147].value),(0,n.tZ)("td",null,e[148].value),(0,n.tZ)("td",null,e[149].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[150].value),(0,n.tZ)("td",null,e[151].value),(0,n.tZ)("td",null,e[152].value),(0,n.tZ)("td",null,e[153].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[154].value),(0,n.tZ)("td",null,e[155].value),(0,n.tZ)("td",null,e[156].value),(0,n.tZ)("td",null,e[157].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[158].value),(0,n.tZ)("td",null,e[159].value,(0,n.tZ)("code",null,e[160].value)),(0,n.tZ)("td",null,e[161].value),(0,n.tZ)("td",null,e[162].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[163].value),(0,n.tZ)("td",null,e[164].value),(0,n.tZ)("td",null,e[165].value),(0,n.tZ)("td",null,e[166].value),(0,n.tZ)("td",null)))))))}l.default=u}}]);
