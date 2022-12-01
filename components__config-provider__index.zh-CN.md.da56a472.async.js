"use strict";(self.webpackChunkantd=self.webpackChunkantd||[]).push([[745],{57068:function(c,o,t){t.r(o);var p=t(2143),m=t(50250),v=t(59378),_=t(78190),a=t(74775),i=t(5937),f=t(2068),h=t(74399),g=t(46004),C=t(35708),Z=t(30138),x=t(56140),u=t(5388),B=t(49545),b=t(92169),E=t(13140),P=t(95127),O=t(74418),D=t(97119),l=t(28257),d=t(67294),n=t(13946);function r(){var s=(0,l.eL)(),e=s.texts;return(0,n.tZ)(l.dY,null,(0,n.tZ)(d.Fragment,null,(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("p",null,e[0].value),(0,n.tZ)("h2",{id:"\u4F7F\u7528"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4F7F\u7528"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4F7F\u7528"),(0,n.tZ)("p",null,e[1].value,(0,n.tZ)("a",{href:"https://facebook.github.io/react/docs/context.html"},e[2].value),e[3].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[4].value),(0,n.tZ)("h3",{id:"content-security-policy"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#content-security-policy"},(0,n.tZ)("span",{className:"icon icon-link"})),"Content Security Policy"),(0,n.tZ)("p",null,e[5].value,(0,n.tZ)("code",null,e[6].value),e[7].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[8].value),(0,n.tZ)("h2",{id:"\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4EE3\u7801\u6F14\u793A"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4EE3\u7801\u6F14\u793A")),(0,n.tZ)(u.Z,{items:[{demo:{id:"components-config-provider-demo-locale"},previewerProps:{title:"\u56FD\u9645\u5316",filename:"components/config-provider/demo/locale.tsx",jsx:`import React, { useState } from 'react';
import {
  Button,
  Calendar,
  ConfigProvider,
  DatePicker,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Table,
  TimePicker,
  Transfer,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
dayjs.locale('en');
const { Option } = Select;
const { RangePicker } = DatePicker;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];
const Page = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const info = () => {
    Modal.info({
      title: 'some info',
      content: 'some info',
    });
  };
  const confirm = () => {
    Modal.confirm({
      title: 'some info',
      content: 'some info',
    });
  };
  return (
    <div className="locale-components">
      <div className="example">
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </div>
      <div className="example">
        <Select
          showSearch
          style={{
            width: 200,
          }}
        >
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
        </Select>
        <DatePicker />
        <TimePicker />
        <RangePicker
          style={{
            width: 200,
          }}
        />
      </div>
      <div className="example">
        <Button type="primary" onClick={showModal}>
          Show Modal
        </Button>
        <Button onClick={info}>Show info</Button>
        <Button onClick={confirm}>Show confirm</Button>
        <Popconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </Popconfirm>
      </div>
      <div className="example">
        <Transfer dataSource={[]} showSearch targetKeys={[]} />
      </div>
      <div className="site-config-provider-calendar-wrapper">
        <Calendar fullscreen={false} value={dayjs()} />
      </div>
      <div className="example">
        <Table dataSource={[]} columns={columns} />
      </div>
      <Modal title="Locale Modal" open={open} onCancel={hideModal}>
        <p>Locale Modal</p>
      </Modal>
    </div>
  );
};
const App = () => {
  const [locale, setLocal] = useState(enUS);
  const changeLocale = (e) => {
    const localeValue = e.target.value;
    setLocal(localeValue);
    if (!localeValue) {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  };
  return (
    <div>
      <div className="change-locale">
        <span
          style={{
            marginRight: 16,
          }}
        >
          Change locale of components:{' '}
        </span>
        <Radio.Group value={locale} onChange={changeLocale}>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={zhCN}>
            \u4E2D\u6587
          </Radio.Button>
        </Radio.Group>
      </div>
      <ConfigProvider locale={locale}>
        <Page
          key={locale ? locale.locale : 'en' /* Have to refresh for production environment */}
        />
      </ConfigProvider>
    </div>
  );
};
export default App;
`,description:"<p>\u6B64\u5904\u5217\u51FA Ant Design \u4E2D\u9700\u8981\u56FD\u9645\u5316\u652F\u6301\u7684\u7EC4\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u5728\u6F14\u793A\u91CC\u5207\u6362\u8BED\u8A00\u3002</p>",style:`.site-config-provider-calendar-wrapper {
  width: 319px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}

.locale-components {
  padding-top: 16px;
  border-top: 1px solid #d9d9d9;
}

.code-box-demo .example {
  margin: 16px 0;
}

.code-box-demo .example > * {
  margin-right: 8px;
}

.change-locale {
  margin-bottom: 16px;
}`}},{demo:{id:"components-config-provider-demo-direction"},previewerProps:{title:"\u65B9\u5411",filename:"components/config-provider/demo/direction.tsx",jsx:`import React, { useState } from 'react';
import {
  DownloadOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined as SearchIcon,
  SmileOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Cascader,
  Col,
  ConfigProvider,
  Divider,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Radio,
  Rate,
  Row,
  Select,
  Steps,
  Switch,
  Tree,
  TreeSelect,
} from 'antd';
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
const { Option } = Select;
const { TreeNode } = Tree;
const { Search } = Input;
const cascaderOptions = [
  {
    value: 'tehran',
    label: '\u062A\u0647\u0631\u0627\u0646',
    children: [
      {
        value: 'tehran-c',
        label: '\u062A\u0647\u0631\u0627\u0646',
        children: [
          {
            value: 'saadat-abad',
            label: '\u0633\u0639\u0627\u062F\u062A \u0622\u06CC\u0627\u062F',
          },
        ],
      },
    ],
  },
  {
    value: 'ardabil',
    label: '\u0627\u0631\u062F\u0628\u06CC\u0644',
    children: [
      {
        value: 'ardabil-c',
        label: '\u0627\u0631\u062F\u0628\u06CC\u0644',
        children: [
          {
            value: 'primadar',
            label: '\u067E\u06CC\u0631\u0645\u0627\u062F\u0631',
          },
        ],
      },
    ],
  },
  {
    value: 'gilan',
    label: '\u06AF\u06CC\u0644\u0627\u0646',
    children: [
      {
        value: 'rasht',
        label: '\u0631\u0634\u062A',
        children: [
          {
            value: 'district-3',
            label: '\u0645\u0646\u0637\u0642\u0647 \u06F3',
          },
        ],
      },
    ],
  },
];
const Page = ({ popupPlacement }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(5);
  const [showBadge, setShowBadge] = useState(true);
  const selectBefore = (
    <Select
      defaultValue="Http://"
      style={{
        width: 90,
      }}
    >
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select
      defaultValue=".com"
      style={{
        width: 80,
      }}
    >
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  // ==== Cascader ====
  const cascaderFilter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  const onCascaderChange = (value) => {
    console.log(value);
  };
  // ==== End Cascader ====

  // ==== Modal ====
  const showModal = () => {
    setModalOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setModalOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setModalOpen(false);
  };

  // ==== End Modal ====

  const onStepsChange = (newCurrentStep) => {
    console.log('onChange:', newCurrentStep);
    setCurrentStep(newCurrentStep);
  };

  // ==== Badge ====

  const increaseBadge = () => {
    setBadgeCount(badgeCount + 1);
  };
  const declineBadge = () => {
    let newBadgeCount = badgeCount - 1;
    if (newBadgeCount < 0) {
      newBadgeCount = 0;
    }
    setBadgeCount(newBadgeCount);
  };
  const onChangeBadge = (checked) => {
    setShowBadge(checked);
  };
  // ==== End Badge ====

  return (
    <div className="direction-components">
      <Row>
        <Col span={24}>
          <Divider orientation="left">Cascader example</Divider>
          <Cascader
            suffixIcon={<SearchIcon />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="\u06CC\u06A9 \u0645\u0648\u0631\u062F \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F"
            popupPlacement={popupPlacement}
          />
          &nbsp;&nbsp;&nbsp;&nbsp; With search:
          <Cascader
            suffixIcon={<SmileOutlined />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="Select an item"
            popupPlacement={popupPlacement}
            showSearch={{
              filter: cascaderFilter,
            }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Divider orientation="left">Switch example</Divider>
          &nbsp;&nbsp;
          <Switch defaultChecked />
          &nbsp;&nbsp;
          <Switch loading defaultChecked />
          &nbsp;&nbsp;
          <Switch size="small" loading />
        </Col>
        <Col span={12}>
          <Divider orientation="left">Radio Group example</Divider>

          <Radio.Group defaultValue="c" buttonStyle="solid">
            <Radio.Button value="a">\u062A\u0647\u0631\u0627\u0646</Radio.Button>
            <Radio.Button value="b" disabled>
              \u0627\u0635\u0641\u0647\u0627\u0646
            </Radio.Button>
            <Radio.Button value="c">\u0641\u0627\u0631\u0633</Radio.Button>
            <Radio.Button value="d">\u062E\u0648\u0632\u0633\u062A\u0627\u0646</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Divider orientation="left">Button example</Divider>
          <div className="button-demo">
            <Button type="primary" icon={<DownloadOutlined />} />
            <Button type="primary" shape="circle" icon={<DownloadOutlined />} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Download
            </Button>
            <br />
            <Button.Group>
              <Button type="primary">
                <LeftOutlined />
                Backward
              </Button>
              <Button type="primary">
                Forward
                <RightOutlined />
              </Button>
            </Button.Group>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" size="small" loading>
              Loading
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <Divider orientation="left">Tree example</Divider>
          <Tree
            showLine
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0" disabled>
                <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                <TreeNode title="leaf" key="0-0-0-1" />
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode
                  title={
                    <span
                      style={{
                        color: '#1890ff',
                      }}
                    >
                      sss
                    </span>
                  }
                  key="0-0-1-0"
                />
              </TreeNode>
            </TreeNode>
          </Tree>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Divider orientation="left">Input (Input Group) example</Divider>
          <InputGroup size="large">
            <Row gutter={8}>
              <Col span={5}>
                <Input defaultValue="0571" />
              </Col>
              <Col span={8}>
                <Input defaultValue="26888888" />
              </Col>
            </Row>
          </InputGroup>
          <br />
          <InputGroup compact>
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
          </InputGroup>
          <br />
          <InputGroup compact>
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
          </InputGroup>
          <br />
          <Search placeholder="input search text" enterButton="Search" size="large" />
          <br />
          <br />
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
          </div>
          <br />
          <Row>
            <Col span={12}>
              <Divider orientation="left">Select example</Divider>
              <Select
                mode="multiple"
                defaultValue="\u0645\u0648\u0631\u0686\u0647"
                style={{
                  width: 120,
                }}
              >
                <Option value="jack">Jack</Option>
                <Option value="\u0645\u0648\u0631\u0686\u0647">\u0645\u0648\u0631\u0686\u0647</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
              <Select
                defaultValue="\u0645\u0648\u0631\u0686\u0647"
                style={{
                  width: 120,
                }}
                disabled
              >
                <Option value="\u0645\u0648\u0631\u0686\u0647">\u0645\u0648\u0631\u0686\u0647</Option>
              </Select>
              <Select
                defaultValue="\u0645\u0648\u0631\u0686\u0647"
                style={{
                  width: 120,
                }}
                loading
              >
                <Option value="\u0645\u0648\u0631\u0686\u0647">\u0645\u0648\u0631\u0686\u0647</Option>
              </Select>
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="\u0633\u0639\u06CC\u062F">\u0633\u0639\u06CC\u062F</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Divider orientation="left">TreeSelect example</Divider>
              <div>
                <TreeSelect
                  showSearch
                  style={{
                    width: '100%',
                  }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                >
                  <TreeNode title="parent 1" key="0-1">
                    <TreeNode title="parent 1-0" key="0-1-1">
                      <TreeNode title="my leaf" key="random" />
                      <TreeNode title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="random2">
                      <TreeNode
                        title={
                          <b
                            style={{
                              color: '#08c',
                            }}
                          >
                            sss
                          </b>
                        }
                        key="random3"
                      />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Divider orientation="left">Modal example</Divider>
              <div>
                <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button>
                <Modal title="\u067E\u0646\u0686\u0631\u0647 \u0633\u0627\u062F\u0647" open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <p>\u0646\u06AF\u0627\u0634\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0648\u062F \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0642\u0631\u0627\u0631\u062F\u0647\u06CC\u062F</p>
                  <p>\u0646\u06AF\u0627\u0634\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0648\u062F \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0642\u0631\u0627\u0631\u062F\u0647\u06CC\u062F</p>
                  <p>\u0646\u06AF\u0627\u0634\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0648\u062F \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0642\u0631\u0627\u0631\u062F\u0647\u06CC\u062F</p>
                </Modal>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Divider orientation="left">Steps example</Divider>
              <div>
                <Steps
                  progressDot
                  current={currentStep}
                  items={[
                    {
                      title: 'Finished',
                      description: 'This is a description.',
                    },
                    {
                      title: 'In Progress',
                      description: 'This is a description.',
                    },
                    {
                      title: 'Waiting',
                      description: 'This is a description.',
                    },
                  ]}
                />
                <br />
                <Steps
                  current={currentStep}
                  onChange={onStepsChange}
                  items={[
                    {
                      title: 'Step 1',
                      description: 'This is a description.',
                    },
                    {
                      title: 'Step 2',
                      description: 'This is a description.',
                    },
                    {
                      title: 'Step 3',
                      description: 'This is a description.',
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Divider orientation="left">Rate example</Divider>
              <div>
                <Rate defaultValue={2.5} />
                <br />
                <strong>* Note:</strong> Half star not implemented in RTL direction, it will be
                supported after <a href="https://github.com/react-component/rate">rc-rate</a>{' '}
                implement rtl support.
              </div>
            </Col>
            <Col span={12}>
              <Divider orientation="left">Badge example</Divider>
              <div>
                <div>
                  <Badge count={badgeCount}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <ButtonGroup>
                    <Button onClick={declineBadge}>
                      <MinusOutlined />
                    </Button>
                    <Button onClick={increaseBadge}>
                      <PlusOutlined />
                    </Button>
                  </ButtonGroup>
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Badge dot={showBadge}>
                    <a href="#" className="head-example" />
                  </Badge>
                  <Switch onChange={onChangeBadge} checked={showBadge} />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <br />
      <br />
      <Row>
        <Col span={24}>
          <Divider orientation="left">Pagination example</Divider>
          <Pagination showSizeChanger defaultCurrent={3} total={500} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Divider orientation="left">Grid System example</Divider>
          <div className="grid-demo">
            <div className="code-box-demo">
              <p>
                <strong>* Note:</strong> Every calculation in RTL grid system is from right side
                (offset, push, etc.)
              </p>
              <Row>
                <Col span={8}>col-8</Col>
                <Col span={8} offset={8}>
                  col-8
                </Col>
              </Row>
              <Row>
                <Col span={6} offset={6}>
                  col-6 col-offset-6
                </Col>
                <Col span={6} offset={6}>
                  col-6 col-offset-6
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  col-12 col-offset-6
                </Col>
              </Row>
              <Row>
                <Col span={18} push={6}>
                  col-18 col-push-6
                </Col>
                <Col span={6} pull={18}>
                  col-6 col-pull-18
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const App = () => {
  const [direction, setDirection] = useState('ltr');
  const [popupPlacement, setPopupPlacement] = useState('bottomLeft');
  const changeDirection = (e) => {
    const directionValue = e.target.value;
    setDirection(directionValue);
    if (directionValue === 'rtl') {
      setPopupPlacement('bottomRight');
    } else {
      setPopupPlacement('bottomLeft');
    }
  };
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginRight: 16,
          }}
        >
          Change direction of components:{' '}
        </span>
        <Radio.Group defaultValue="ltr" onChange={changeDirection}>
          <Radio.Button key="ltr" value="ltr">
            LTR
          </Radio.Button>
          <Radio.Button key="rtl" value="rtl">
            RTL
          </Radio.Button>
        </Radio.Group>
      </div>
      <ConfigProvider direction={direction}>
        <Page popupPlacement={popupPlacement} />
      </ConfigProvider>
    </>
  );
};
export default App;
`,description:"<p>\u8FD9\u91CC\u5217\u51FA\u4E86\u652F\u6301 <code>rtl</code> \u65B9\u5411\u7684\u7EC4\u4EF6\uFF0C\u60A8\u53EF\u4EE5\u5728\u6F14\u793A\u4E2D\u5207\u6362\u65B9\u5411\u3002</p>",style:`.button-demo .ant-btn,
.button-demo .ant-btn-group {
  margin-right: 8px;
  margin-bottom: 12px;
}
.button-demo .ant-btn-group > .ant-btn,
.button-demo .ant-btn-group > span > .ant-btn {
  margin-right: 0;
  margin-left: 0;
}

.head-example {
  display: inline-block;
  width: 42px;
  height: 42px;
  vertical-align: middle;
  background: #eee;
  border-radius: 4px;
}

.ant-badge:not(.ant-badge-not-a-wrapper) {
  margin-right: 20px;
}
.ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
  margin-right: 0;
  margin-left: 20px;
}`}},{demo:{id:"components-config-provider-demo-size"},previewerProps:{title:"\u7EC4\u4EF6\u5C3A\u5BF8",filename:"components/config-provider/demo/size.tsx",jsx:`import React, { useState } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Radio,
  Select,
  Table,
  Tabs,
} from 'antd';
const { TabPane } = Tabs;
const App = () => {
  const [componentSize, setComponentSize] = useState('small');
  return (
    <div>
      <Radio.Group
        value={componentSize}
        onChange={(e) => {
          setComponentSize(e.target.value);
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Divider />
      <ConfigProvider componentSize={componentSize}>
        <div className="example">
          <Input />
        </div>
        <div className="example">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
        <div className="example">
          <Input.Search allowClear />
        </div>
        <div className="example">
          <Input.TextArea allowClear />
        </div>
        <div className="example">
          <Select
            defaultValue="demo"
            options={[
              {
                value: 'demo',
              },
            ]}
          />
        </div>
        <div className="example">
          <DatePicker />
        </div>
        <div className="example">
          <DatePicker.RangePicker />
        </div>
        <div className="example">
          <Button>Button</Button>
        </div>
        <div className="example">
          <Card title="Card">
            <Table
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                },
              ]}
              dataSource={[
                {
                  key: '1',
                  name: 'John Brown',
                  age: 32,
                },
                {
                  key: '2',
                  name: 'Jim Green',
                  age: 42,
                },
                {
                  key: '3',
                  name: 'Joe Black',
                  age: 32,
                },
              ]}
            />
          </Card>
        </div>
      </ConfigProvider>
    </div>
  );
};
export default App;
`,description:"<p>\u4FEE\u6539\u9ED8\u8BA4\u7EC4\u4EF6\u5C3A\u5BF8\u3002</p>"}},{demo:{id:"components-config-provider-demo-theme"},previewerProps:{title:"\u4E3B\u9898",filename:"components/config-provider/demo/theme.tsx",jsx:`import React from 'react';
import { Button, ConfigProvider, Form, InputNumber } from 'antd';
import { SketchPicker } from 'react-color';
const defaultData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
};
export default () => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState(defaultData);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
        },
      }}
    >
      <Form
        form={form}
        onValuesChange={(changedValues, allValues) => {
          const colorObj = changedValues?.colorPrimary
            ? {
                colorPrimary: allValues?.colorPrimary?.hex,
              }
            : {};
          setData({
            ...allValues,
            ...colorObj,
          });
        }}
        name="theme"
        initialValues={defaultData}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Form.Item valuePropName="color" name="colorPrimary" label="Primary Color">
          <SketchPicker />
        </Form.Item>
        <Form.Item name="borderRadius" label="Border Radius">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="submit"
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
`,description:"<p>\u901A\u8FC7 <code>theme</code> \u4FEE\u6539\u4E3B\u9898\u3002</p>"}},{demo:{id:"components-config-provider-demo-prefixcls"},previewerProps:{debug:!0,title:"\u524D\u7F00",filename:"components/config-provider/demo/prefixCls.tsx",jsx:`import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Select } from 'antd';

// Ant Design site use \`es\` module for view
// but do not replace related lib \`lib\` with \`es\`
// which do not show correct in site.
// We may need do convert in site also.
const App = () => {
  const [prefixCls, setPrefixCls] = useState('light');
  return (
    <div>
      <Button
        style={{
          marginBottom: '12px',
        }}
        type="primary"
        onClick={() => setPrefixCls('dark')}
      >
        toggle prefixCls
      </Button>
      <div>
        <ConfigProvider prefixCls={prefixCls} iconPrefixCls="bamboo">
          <SmileOutlined />
          <Select />
        </ConfigProvider>
      </div>
    </div>
  );
};
export default App;
`,description:"<p>\u4FEE\u6539\u7EC4\u4EF6\u548C\u56FE\u6807\u524D\u7F00\u3002</p>"}}]}),(0,n.tZ)("div",{className:"markdown"},(0,n.tZ)("h2",{id:"api"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#api"},(0,n.tZ)("span",{className:"icon icon-link"})),"API"),(0,n.tZ)(i.Z,{className:"component-api-table"},(0,n.tZ)("thead",null,(0,n.tZ)("tr",null,(0,n.tZ)("th",null,e[9].value),(0,n.tZ)("th",null,e[10].value),(0,n.tZ)("th",null,e[11].value),(0,n.tZ)("th",null,e[12].value),(0,n.tZ)("th",null,e[13].value))),(0,n.tZ)("tbody",null,(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[14].value),(0,n.tZ)("td",null,e[15].value,(0,n.tZ)("code",null,e[16].value),e[17].value),(0,n.tZ)("td",null,e[18].value),(0,n.tZ)("td",null,e[19].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[20].value),(0,n.tZ)("td",null,e[21].value),(0,n.tZ)("td",null,e[22].value),(0,n.tZ)("td",null,e[23].value),(0,n.tZ)("td",null,e[24].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[25].value),(0,n.tZ)("td",null,e[26].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[27].value),e[28].value,(0,n.tZ)("code",null,e[29].value),e[30].value,(0,n.tZ)("code",null,e[31].value)),(0,n.tZ)("td",null,e[32].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[33].value),(0,n.tZ)("td",null,e[34].value,(0,n.tZ)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"},e[35].value),e[36].value),(0,n.tZ)("td",null,e[37].value),(0,n.tZ)("td",null,e[38].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[39].value),(0,n.tZ)("td",null,e[40].value,(0,n.tZ)(l.rU,{to:"#components-config-provider-demo-direction"},e[41].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[42].value),e[43].value,(0,n.tZ)("code",null,e[44].value)),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[45].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[46].value),(0,n.tZ)("td",null,e[47].value,(0,n.tZ)("code",null,e[48].value),e[49].value,(0,n.tZ)("code",null,e[50].value),e[51].value),(0,n.tZ)("td",null,e[52].value),(0,n.tZ)("td",null,e[53].value),(0,n.tZ)("td",null,e[54].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[55].value),(0,n.tZ)("td",null,e[56].value),(0,n.tZ)("td",null,e[57].value,(0,n.tZ)(l.rU,{to:"/components/form/#validateMessages"},e[58].value),e[59].value,(0,n.tZ)("code",null,e[60].value),e[61].value),(0,n.tZ)("td",null,e[62].value),(0,n.tZ)("td",null,e[63].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[64].value),(0,n.tZ)("td",null,e[65].value),(0,n.tZ)("td",null,e[66].value),(0,n.tZ)("td",null,e[67].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[68].value),(0,n.tZ)("td",null,e[69].value),(0,n.tZ)("td",null,e[70].value),(0,n.tZ)("td",null,e[71].value),(0,n.tZ)("td",null,e[72].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[73].value),(0,n.tZ)("td",null,e[74].value),(0,n.tZ)("td",null,e[75].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[76].value)),(0,n.tZ)("td",null,e[77].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[78].value),(0,n.tZ)("td",null,e[79].value),(0,n.tZ)("td",null,e[80].value),(0,n.tZ)("td",null,e[81].value),(0,n.tZ)("td",null,e[82].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[83].value),(0,n.tZ)("td",null,e[84].value,(0,n.tZ)("a",{href:"http://unpkg.com/antd/locale/"},e[85].value),e[86].value),(0,n.tZ)("td",null,e[87].value),(0,n.tZ)("td",null,e[88].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[89].value),(0,n.tZ)("td",null,e[90].value),(0,n.tZ)("td",null,e[91].value),(0,n.tZ)("td",null,(0,n.tZ)("code",null,e[92].value)),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[93].value),(0,n.tZ)("td",null,e[94].value,(0,n.tZ)(l.rU,{to:"/components/empty/"},e[95].value)),(0,n.tZ)("td",null,e[96].value),(0,n.tZ)("td",null,e[97].value),(0,n.tZ)("td",null)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[98].value),(0,n.tZ)("td",null,e[99].value,(0,n.tZ)("code",null,e[100].value),e[101].value,(0,n.tZ)(l.rU,{to:"/components/space"},e[102].value)),(0,n.tZ)("td",null,e[103].value,(0,n.tZ)("code",null,e[104].value),e[105].value,(0,n.tZ)("code",null,e[106].value),e[107].value,(0,n.tZ)("code",null,e[108].value),e[109].value,(0,n.tZ)("code",null,e[110].value),e[111].value),(0,n.tZ)("td",null,e[112].value),(0,n.tZ)("td",null,e[113].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[114].value),(0,n.tZ)("td",null,e[115].value,(0,n.tZ)(l.rU,{to:"/docs/react/customize-theme-cn"},e[116].value)),(0,n.tZ)("td",null,e[117].value),(0,n.tZ)("td",null,e[118].value),(0,n.tZ)("td",null,e[119].value)),(0,n.tZ)("tr",null,(0,n.tZ)("td",null,e[120].value),(0,n.tZ)("td",null,e[121].value,(0,n.tZ)("code",null,e[122].value),e[123].value),(0,n.tZ)("td",null,e[124].value),(0,n.tZ)("td",null,e[125].value),(0,n.tZ)("td",null,e[126].value)))),(0,n.tZ)("h3",{id:"configproviderconfig-4130"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#configproviderconfig-4130"},(0,n.tZ)("span",{className:"icon icon-link"})),"ConfigProvider.config() ",(0,n.tZ)("code",null,e[127].value)),(0,n.tZ)("p",null,e[128].value,(0,n.tZ)("code",null,e[129].value),e[130].value,(0,n.tZ)("code",null,e[131].value),e[132].value,(0,n.tZ)("code",null,e[133].value),e[134].value),(0,n.tZ)(a.Z,{lang:"jsx"},e[135].value),(0,n.tZ)("h2",{id:"faq"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#faq"},(0,n.tZ)("span",{className:"icon icon-link"})),"FAQ"),(0,n.tZ)("h4",{id:"\u5982\u4F55\u589E\u52A0\u4E00\u4E2A\u65B0\u7684\u8BED\u8A00\u5305"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u5982\u4F55\u589E\u52A0\u4E00\u4E2A\u65B0\u7684\u8BED\u8A00\u5305"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u5982\u4F55\u589E\u52A0\u4E00\u4E2A\u65B0\u7684\u8BED\u8A00\u5305\uFF1F"),(0,n.tZ)("p",null,e[136].value,(0,n.tZ)(l.rU,{to:"/docs/react/i18n#%E5%A2%9E%E5%8A%A0%E8%AF%AD%E8%A8%80%E5%8C%85"},e[137].value),e[138].value),(0,n.tZ)("h4",{id:"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316-locale-\u8BBE\u7F6E\u4E0D\u751F\u6548"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48\u65F6\u95F4\u7C7B\u7EC4\u4EF6\u7684\u56FD\u9645\u5316 locale \u8BBE\u7F6E\u4E0D\u751F\u6548\uFF1F"),(0,n.tZ)("p",null,e[139].value,(0,n.tZ)(l.rU,{to:"/docs/react/faq#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-locale-%E8%AE%BE%E7%BD%AE%E4%B8%8D%E7%94%9F%E6%95%88%EF%BC%9F"},e[140].value),e[141].value),(0,n.tZ)("h4",{id:"\u914D\u7F6E-getpopupcontainer-\u5BFC\u81F4-modal-\u62A5\u9519"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u914D\u7F6E-getpopupcontainer-\u5BFC\u81F4-modal-\u62A5\u9519"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u914D\u7F6E ",(0,n.tZ)("code",null,e[142].value)," \u5BFC\u81F4 Modal \u62A5\u9519\uFF1F"),(0,n.tZ)("p",null,e[143].value,(0,n.tZ)("a",{href:"https://github.com/ant-design/ant-design/issues/19974"},e[144].value)),(0,n.tZ)("p",null,e[145].value,(0,n.tZ)("code",null,e[146].value),e[147].value,(0,n.tZ)("code",null,e[148].value),e[149].value,(0,n.tZ)("code",null,e[150].value),e[151].value,(0,n.tZ)("a",{href:"https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a"},e[152].value),e[153].value),(0,n.tZ)(a.Z,{lang:"diff"},e[154].value),(0,n.tZ)("h4",{id:"\u4E3A\u4EC0\u4E48-messageinfonotificationopen-\u6216-modalconfirm-\u7B49\u65B9\u6CD5\u5185\u7684-reactnode-\u65E0\u6CD5\u7EE7\u627F-configprovider-\u7684\u5C5E\u6027\u6BD4\u5982-prefixcls-\u548C-theme"},(0,n.tZ)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#\u4E3A\u4EC0\u4E48-messageinfonotificationopen-\u6216-modalconfirm-\u7B49\u65B9\u6CD5\u5185\u7684-reactnode-\u65E0\u6CD5\u7EE7\u627F-configprovider-\u7684\u5C5E\u6027\u6BD4\u5982-prefixcls-\u548C-theme"},(0,n.tZ)("span",{className:"icon icon-link"})),"\u4E3A\u4EC0\u4E48 message.info\u3001notification.open \u6216 Modal.confirm \u7B49\u65B9\u6CD5\u5185\u7684 ReactNode \u65E0\u6CD5\u7EE7\u627F ConfigProvider \u7684\u5C5E\u6027\uFF1F\u6BD4\u5982 ",(0,n.tZ)("code",null,e[155].value)," \u548C ",(0,n.tZ)("code",null,e[156].value),"\u3002"),(0,n.tZ)("p",null,e[157].value))))}o.default=r}}]);
