---
category: Components
group: Other
title: ConfigProvider
description: Provide a uniform configuration support for components.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://react.dev/learn/passing-data-deeply-with-context). In the render tree all components will have access to the provided config.

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';

// ...
const Demo: React.FC = () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);

export default Demo;
```

### Content Security Policy {#csp}

Some components use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```tsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## Examples

### Locale

Components which need localization support are listed here, you can toggle the language in the demo.

```tsx
import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type {
  ConfigProviderProps,
  RadioChangeEvent,
  TableProps,
  TourProps,
  UploadFile,
} from 'antd';
import {
  Button,
  Calendar,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Popconfirm,
  QRCode,
  Radio,
  Select,
  Space,
  Table,
  theme,
  TimePicker,
  Tour,
  Transfer,
  Upload,
} from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

type Locale = ConfigProviderProps['locale'];

dayjs.locale('en');

const { RangePicker } = DatePicker;

const columns: TableProps['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [{ text: 'filter1', value: 'filter1' }],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const Page: React.FC = () => {
  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const tourRefs = React.useRef<HTMLElement[]>([]);

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

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => tourRefs.current[0],
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => tourRefs.current[1],
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => tourRefs.current[2],
    },
  ];

  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'error',
    },
  ];

  return (
    <Space
      vertical
      size={[0, 16]}
      style={{ width: '100%', paddingTop: 16, borderTop: `1px solid ${token.colorBorder}` }}
    >
      <Pagination defaultCurrent={1} total={50} showSizeChanger />
      <Space wrap>
        <Select
          showSearch
          style={{ width: 200 }}
          options={[
            { label: 'jack', value: 'jack' },
            { label: 'lucy', value: 'lucy' },
          ]}
        />
        <DatePicker />
        <TimePicker />
        <RangePicker />
      </Space>
      <Space wrap>
        <Button type="primary" onClick={showModal}>
          Show Modal
        </Button>
        <Button onClick={info}>Show info</Button>
        <Button onClick={confirm}>Show confirm</Button>
        <Popconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </Popconfirm>
      </Space>
      <Transfer dataSource={[]} showSearch targetKeys={[]} />
      <div style={{ width: 320, border: `1px solid ${token.colorBorder}`, borderRadius: 8 }}>
        <Calendar fullscreen={false} value={dayjs()} />
      </div>
      <Form name="basic" autoComplete="off" labelCol={{ sm: { span: 4 } }} wrapperCol={{ span: 6 }}>
        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input width={200} />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ type: 'number', min: 0, max: 99 }]}
          initialValue={100}
        >
          <InputNumber width={200} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={[]} columns={columns} />
      <Modal title="Locale Modal" open={open} onCancel={hideModal}>
        <p>Locale Modal</p>
      </Modal>
      <Space wrap size={80}>
        <QRCode
          value="https://ant.design/"
          status="expired"
          onRefresh={() => console.log('refresh')}
        />
        <Image
          width={160}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Space>
      <Upload listType="picture-card" fileList={fileList} />
      <Divider titlePlacement="start">Tour</Divider>
      <Button type="primary" onClick={() => setTourOpen(true)}>
        Begin Tour
      </Button>
      <Space>
        <Button
          ref={(node) => {
            node && tourRefs.current.splice(0, 0, node);
          }}
        >
          {' '}
          Upload
        </Button>
        <Button
          ref={(node) => {
            node && tourRefs.current.splice(1, 0, node);
          }}
          type="primary"
        >
          Save
        </Button>
        <Button
          ref={(node) => {
            node && tourRefs.current.splice(2, 0, node);
          }}
          icon={<EllipsisOutlined />}
        />
      </Space>
      <Tour open={tourOpen} steps={steps} onClose={() => setTourOpen(false)} />
    </Space>
  );
};

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>(enUS);

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    setLocale(localeValue);
    if (!localeValue) {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginInlineEnd: 16 }}>Change locale of components:</span>
        <Radio.Group value={locale} onChange={changeLocale}>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={zhCN}>
            中文
          </Radio.Button>
        </Radio.Group>
      </div>
      <ConfigProvider locale={locale}>
        <Page />
      </ConfigProvider>
    </>
  );
};

export default App;
```

### Direction

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```css
.button-demo .ant-btn,
.button-demo .ant-btn-group {
  margin-inline-end: 8px;
  margin-bottom: 12px;
}
.button-demo .ant-btn-group > .ant-btn,
.button-demo .ant-btn-group > span > .ant-btn {
  margin-inline-end: 0;
  margin-inline-start: 0;
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
  margin-inline-end: 20px;
}

.ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
  margin-inline-end: 0;
  margin-inline-start: 20px;
}
```

```tsx
import React, { useState } from 'react';
import {
  DownloadOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined as SearchIcon,
  SmileOutlined,
} from '@ant-design/icons';
import type { ConfigProviderProps, RadioChangeEvent } from 'antd';
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
  Space,
  Steps,
  Switch,
  Tree,
  TreeSelect,
} from 'antd';

type DirectionType = ConfigProviderProps['direction'];

const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const { TreeNode } = Tree;
const { Search } = Input;

const cascaderOptions = [
  {
    value: 'tehran',
    label: 'تهران',
    children: [
      {
        value: 'tehran-c',
        label: 'تهران',
        children: [
          {
            value: 'saadat-abad',
            label: 'سعادت آباد',
          },
        ],
      },
    ],
  },
  {
    value: 'ardabil',
    label: 'اردبیل',
    children: [
      {
        value: 'ardabil-c',
        label: 'اردبیل',
        children: [
          {
            value: 'pirmadar',
            label: 'پیرمادر',
          },
        ],
      },
    ],
  },
  {
    value: 'gilan',
    label: 'گیلان',
    children: [
      {
        value: 'rasht',
        label: 'رشت',
        children: [
          {
            value: 'district-3',
            label: 'منطقه ۳',
          },
        ],
      },
    ],
  },
];

type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

const Page: React.FC<{ placement: Placement }> = ({ placement }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(5);
  const [showBadge, setShowBadge] = useState(true);

  const selectBefore = (
    <Select
      defaultValue="Http://"
      style={{ width: 90 }}
      options={[
        { label: 'Http://', value: 'Http://' },
        { label: 'Https://', value: 'Https://' },
      ]}
    />
  );

  const selectAfter = (
    <Select
      defaultValue=".com"
      style={{ width: 80 }}
      options={[
        { label: '.com', value: '.com' },
        { label: '.jp', value: '.jp' },
        { label: '.cn', value: '.cn' },
        { label: '.org', value: '.org' },
      ]}
    />
  );

  // ==== Cascader ====
  const cascaderFilter = (inputValue: string, path: { label: string }[]) =>
    path.some((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  const onCascaderChange = (value: any) => {
    console.log(value);
  };
  // ==== End Cascader ====

  // ==== Modal ====
  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setModalOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setModalOpen(false);
  };

  // ==== End Modal ====
  const onStepsChange = (newCurrentStep: number) => {
    console.log('onChange:', newCurrentStep);
    setCurrentStep(newCurrentStep);
  };

  // ==== Badge ====
  const increaseBadge = () => {
    setBadgeCount(badgeCount + 1);
  };

  const declineBadge = () => {
    setBadgeCount((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const onChangeBadge = (checked: boolean) => {
    setShowBadge(checked);
  };
  // ==== End Badge ====

  return (
    <div className="direction-components">
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Cascader example</Divider>
          <Cascader
            suffixIcon={<SearchIcon />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="یک مورد انتخاب کنید"
            placement={placement}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;With search:&nbsp;&nbsp;
          <Cascader
            suffixIcon={<SmileOutlined />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="Select an item"
            placement={placement}
            showSearch={{ filter: cascaderFilter }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Divider titlePlacement="start">Switch example</Divider>
          &nbsp;&nbsp;
          <Switch defaultChecked />
          &nbsp;&nbsp;
          <Switch loading defaultChecked />
          &nbsp;&nbsp;
          <Switch size="small" loading />
        </Col>
        <Col span={12}>
          <Divider titlePlacement="start">Radio Group example</Divider>
          <Radio.Group defaultValue="c" buttonStyle="solid">
            <Radio.Button value="a">تهران</Radio.Button>
            <Radio.Button value="b" disabled>
              اصفهان
            </Radio.Button>
            <Radio.Button value="c">فارس</Radio.Button>
            <Radio.Button value="d">خوزستان</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Divider titlePlacement="start">Button example</Divider>
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
          <Divider titlePlacement="start">Tree example</Divider>
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
                <TreeNode title={<span style={{ color: '#1677ff' }}>sss</span>} key="0-0-1-0" />
              </TreeNode>
            </TreeNode>
          </Tree>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Input (Input Group) example</Divider>
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
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
          </InputGroup>
          <br />
          <InputGroup compact>
            <Select
              defaultValue="Option1"
              options={[
                { label: 'Option1', value: 'Option1' },
                { label: 'Option2', value: 'Option2' },
              ]}
            />
            <Input style={{ width: '50%' }} defaultValue="input content" />
            <InputNumber />
          </InputGroup>
          <br />
          <Search placeholder="input search text" enterButton="Search" size="large" />
          <br />
          <br />
          <div style={{ marginBottom: 16 }}>
            <Space.Compact>
              {selectBefore}
              <Input defaultValue="mysite" />
              {selectAfter}
            </Space.Compact>
          </div>
          <br />
          <Row>
            <Col span={12}>
              <Divider titlePlacement="start">Select example</Divider>
              <Space wrap>
                <Select
                  mode="multiple"
                  defaultValue="مورچه"
                  style={{ width: 120 }}
                  options={[
                    { label: 'jack', value: 'jack' },
                    { label: 'مورچه', value: 'مورچه' },
                    { label: 'disabled', value: 'disabled', disabled: true },
                    { label: 'yiminghe', value: 'Yiminghe' },
                  ]}
                />
                <Select
                  disabled
                  defaultValue="مورچه"
                  style={{ width: 120 }}
                  options={[{ label: 'مورچه', value: 'مورچه' }]}
                />
                <Select
                  loading
                  defaultValue="مورچه"
                  style={{ width: 120 }}
                  options={[{ label: 'مورچه', value: 'مورچه' }]}
                />
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  options={[
                    { label: 'jack', value: 'jack' },
                    { label: 'سعید', value: 'سعید' },
                    { label: 'Tom', value: 'tom' },
                  ]}
                />
              </Space>
            </Col>
            <Col span={12}>
              <Divider titlePlacement="start">TreeSelect example</Divider>
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                styles={{
                  popup: {
                    root: { maxHeight: 400, overflow: 'auto' },
                  },
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
                    <TreeNode title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                  </TreeNode>
                </TreeNode>
              </TreeSelect>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Divider titlePlacement="start">Modal example</Divider>
              <Button type="primary" onClick={showModal}>
                Open Modal
              </Button>
              <Modal title="پنچره ساده" open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>نگاشته‌های خود را اینجا قراردهید</p>
                <p>نگاشته‌های خود را اینجا قراردهید</p>
                <p>نگاشته‌های خود را اینجا قراردهید</p>
              </Modal>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Divider titlePlacement="start">Steps example</Divider>
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
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Divider titlePlacement="start">Rate example</Divider>
              <Rate defaultValue={2.5} />
              <br />
              <strong>* Note:</strong> Half star not implemented in RTL direction, it will be
              supported after{' '}
              <a href="https://github.com/react-component/rate" target="_blank" rel="noreferrer">
                rc-rate
              </a>{' '}
              implement rtl support.
            </Col>
            <Col span={12}>
              <Divider titlePlacement="start">Badge example</Divider>
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
              <div style={{ marginTop: 12 }}>
                <Badge dot={showBadge}>
                  <a href="#" className="head-example" />
                </Badge>
                <Switch onChange={onChangeBadge} checked={showBadge} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Pagination example</Divider>
          <Pagination showSizeChanger defaultCurrent={3} total={500} />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Grid System example</Divider>
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

const App: React.FC = () => {
  const [direction, setDirection] = useState<DirectionType>('ltr');
  const [placement, setPlacement] = useState<Placement>('bottomLeft');

  const changeDirection = (e: RadioChangeEvent) => {
    const directionValue = e.target.value;
    setDirection(directionValue);
    setPlacement(directionValue === 'rtl' ? 'bottomRight' : 'bottomLeft');
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginInlineEnd: 16 }}>Change direction of components:</span>
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
        <Page placement={placement} />
      </ConfigProvider>
    </>
  );
};

export default App;
```

### Component size

Config component default size.

```tsx
import React, { useState } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Radio,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const App: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType>('small');

  return (
    <>
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
        <Space size={[0, 16]} style={{ width: '100%' }} vertical>
          <Input />
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Tab 1',
                key: '1',
                children: 'Content of Tab Pane 1',
              },
              {
                label: 'Tab 2',
                key: '2',
                children: 'Content of Tab Pane 2',
              },
              {
                label: 'Tab 3',
                key: '3',
                children: 'Content of Tab Pane 3',
              },
            ]}
          />
          <Input.Search allowClear />
          <Input.TextArea allowClear />
          <Select defaultValue="demo" options={[{ value: 'demo' }]} />
          <DatePicker />
          <DatePicker.RangePicker />
          <Button>Button</Button>
          <Card title="Card">
            <Table
              columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Age', dataIndex: 'age' },
              ]}
              dataSource={[
                { key: '1', name: 'John Brown', age: 32 },
                { key: '2', name: 'Jim Green', age: 42 },
                { key: '3', name: 'Joe Black', age: 32 },
              ]}
            />
          </Card>
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
```

### Theme

Modify theme by `theme` prop.

```tsx
import React from 'react';
import {
  Button,
  ColorPicker,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
  Switch,
} from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';

type Color = Extract<GetProp<ColorPickerProps, 'value'>, { cleared: any }>;

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
  Button: {
    colorPrimary: '#00B96B',
  },
};

export default () => {
  const [form] = Form.useForm();

  const [data, setData] = React.useState<ThemeData>(defaultData);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: data.colorPrimary,
            borderRadius: data.borderRadius,
          },
          components: {
            Button: {
              colorPrimary: data.Button?.colorPrimary,
              algorithm: data.Button?.algorithm,
            },
          },
        }}
      >
        <Space>
          <Input />
          <Button type="primary">Button</Button>
        </Space>
      </ConfigProvider>
      <Divider />
      <Form
        form={form}
        onValuesChange={(_, allValues) => {
          setData({
            ...allValues,
          });
        }}
        name="theme"
        initialValues={defaultData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name="colorPrimary"
          label="Primary Color"
          trigger="onChangeComplete"
          getValueFromEvent={(color: Color) => color.toHexString()}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item name="borderRadius" label="Border Radius">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Button">
          <Form.Item name={['Button', 'algorithm']} valuePropName="checked" label="algorithm">
            <Switch />
          </Form.Item>
          <Form.Item
            name={['Button', 'colorPrimary']}
            label="Primary Color"
            trigger="onChangeComplete"
            getValueFromEvent={(color: Color) => color.toHexString()}
          >
            <ColorPicker />
          </Form.Item>
        </Form.Item>
        <Form.Item name="submit" wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```

### Custom Wave

Wave effect brings dynamic. Use `component` to determine which component use it. You can also use HappyProvider from [`@ant-design/happy-work-theme`](https://github.com/ant-design/happy-work-theme) to implement dynamic wave effect.

```tsx
import React from 'react';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { Button, ConfigProvider, Flex } from 'antd';
import type { ConfigProviderProps, GetProp } from 'antd';

type WaveConfig = GetProp<ConfigProviderProps, 'wave'>;

// Prepare effect holder
const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);

  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = 'inherit';
  div.style.background = 'transparent';
  div.style.zIndex = '999';
  div.style.pointerEvents = 'none';
  div.style.overflow = 'hidden';
  node.appendChild(div);

  return div;
};

const createDot = (holder: HTMLElement, color: string, left: number, top: number, size = 0) => {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = color;
  dot.style.transform = 'translate3d(-50%, -50%, 0)';
  dot.style.transition = 'all 1s ease-out';
  holder.appendChild(dot);
  return dot;
};

// Inset Effect
const showInsetEffect: WaveConfig['showEffect'] = (node, { event, component }) => {
  if (component !== 'Button') {
    return;
  }

  const holder = createHolder(node);

  const rect = holder.getBoundingClientRect();

  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  const dot = createDot(holder, 'rgba(255, 255, 255, 0.65)', left, top);

  // Motion
  requestAnimationFrame(() => {
    dot.ontransitionend = () => {
      holder.remove();
    };

    dot.style.width = '200px';
    dot.style.height = '200px';
    dot.style.opacity = '0';
  });
};

// Shake Effect
const showShakeEffect: WaveConfig['showEffect'] = (node, { component }) => {
  if (component !== 'Button') {
    return;
  }

  const seq = [0, -15, 15, -5, 5, 0];
  const itv = 10;

  let steps = 0;

  const loop = () => {
    cancelAnimationFrame((node as any).effectTimeout);

    (node as any).effectTimeout = requestAnimationFrame(() => {
      const currentStep = Math.floor(steps / itv);
      const current = seq[currentStep];
      const next = seq[currentStep + 1];

      if (next === undefined || next === null) {
        node.style.transform = '';
        node.style.transition = '';
        return;
      }

      // Trans from current to next by itv
      const angle = current + ((next - current) / itv) * (steps % itv);

      node.style.transform = `rotate(${angle}deg)`;
      node.style.transition = 'none';

      steps += 1;
      loop();
    });
  };

  loop();
};

// Component
const Wrapper: React.FC<WaveConfig & { name: string }> = ({ name, ...wave }) => (
  <ConfigProvider wave={wave}>
    <Button type="primary">{name}</Button>
  </ConfigProvider>
);

const Demo: React.FC = () => (
  <Flex gap="large" wrap>
    <Wrapper name="Disabled" disabled />
    <Wrapper name="Default" />
    <Wrapper name="Inset" showEffect={showInsetEffect} />
    <Wrapper name="Shake" showEffect={showShakeEffect} />
    <HappyProvider>
      <Button type="primary">Happy Work</Button>
    </HappyProvider>
  </Flex>
);

export default Demo;
```

### Static function

Use `holderRender` to set the `Provider` for the static methods `message`,`modal`,`notification`.

```tsx
import React, { useContext, useLayoutEffect } from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { App, Button, ConfigProvider, message, Modal, notification, Space } from 'antd';

const Demo: React.FC = () => {
  const { locale, theme } = useContext(ConfigProvider.ConfigContext);
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <StyleProvider hashPriority="high">
          <ConfigProvider componentSize="small" locale={locale} theme={theme}>
            <App message={{ maxCount: 1 }} notification={{ maxCount: 1 }}>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      ),
    });
  }, [locale, theme]);

  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            message.info('This is a normal message');
          }}
        >
          message
        </Button>
        <Button
          type="primary"
          onClick={() => {
            notification.open({
              title: 'Notification Title',
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
          }}
        >
          notification
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Do you want to delete these items?',
              icon: <ExclamationCircleFilled />,
              content: 'Some descriptions',
            });
          }}
        >
          Modal
        </Button>
      </Space>
    </div>
  );
};

export default Demo;
```





## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | Config antd component `disabled` | boolean | - | 4.21.0 |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| getPopupContainer | To set the container of the popup element. The default is to create a `div` element in `body` | `(trigger?: HTMLElement) => HTMLElement \| ShadowRoot` | () => document.body |  |
| getTargetContainer | Config Affix, Anchor scroll target container | `() => HTMLElement \| Window \| ShadowRoot` | () => window | 4.2.0 |
| iconPrefixCls | Set icon prefix className | string | `anticon` | 4.11.0 |
| locale | Language package setting, you can find the packages in [antd/locale](https://unpkg.com/antd/locale/) | object | - |  |
| popupMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | - | 5.5.0 |
| popupOverflow | Select like component popup logic. Can set to show in viewport or follow window scroll | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| prefixCls | Set prefix className | string | `ant` |  |
| renderEmpty | Set empty content of components. Ref [Empty](/components/empty/) | function(componentName: string): ReactNode | - |  |
| theme | Set theme, ref [Customize Theme](/docs/react/customize-theme) | [Theme](/docs/react/customize-theme#theme) | - | 5.0.0 |
| variant | Set variant of data entry components | `outlined` \| `filled` \| `borderless` | - | 5.19.0 |
| virtual | Disable virtual scroll when set to `false` | boolean | - | 4.3.0 |
| warning | Config warning level, when `strict` is `false`, it will aggregate deprecated information into a single message | { strict: boolean } | - | 5.10.0 |

### ConfigProvider.config() {#config}

Setting `Modal`, `Message`, `Notification` static config. Not work on hooks.

```tsx
ConfigProvider.config({
  // 5.13.0+
  holderRender: (children) => (
    <ConfigProvider
      prefixCls="ant"
      iconPrefixCls="anticon"
      theme={{ token: { colorPrimary: 'red' } }}
    >
      {children}
    </ConfigProvider>
  ),
});
```

### ConfigProvider.useConfig() <Badge>5.3.0+</Badge> {#useconfig}

Get the value of the parent `Provider`, Such as `DisabledContextProvider`, `SizeContextProvider`.

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | antd component disabled state | boolean | - | 5.3.0 |
| componentSize | antd component size state | `small` \| `middle` \| `large` | - | 5.3.0 |

### Component Config

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Set Affix common props | { className?: string, style?: React.CSSProperties } | - | 6.0.0 |
| alert | Set Alert common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, successIcon?: React.ReactNode, infoIcon?: React.ReactNode, warningIcon?: React.ReactNode, errorIcon?: React.ReactNode } | - | 5.7.0, `closeIcon`: 5.14.0, `successIcon`, `infoIcon`, `warningIcon` and `errorIcon`: 6.2.0 |
| anchor | Set Anchor common props | { className?: string, style?: React.CSSProperties, classNames?: [AnchorStyleConfig\["classNames"\]](/components/anchor#semantic-dom), styles?: [AnchorStyleConfig\["styles"\]](/components/anchor#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| avatar | Set Avatar common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| badge | Set Badge common props | { className?: string, style?: React.CSSProperties, classNames?: [BadgeProps\["classNames"\]](/components/badge#semantic-dom), styles?: [BadgeProps\["styles"\]](/components/badge#semantic-dom) } | - | 5.7.0 |
| breadcrumb | Set Breadcrumb common props | { className?: string, style?: React.CSSProperties, classNames?: [BreadcrumbConfig\["classNames"\]](/components/breadcrumb#semantic-dom), styles?: [BreadcrumbConfig\["styles"\]](/components/breadcrumb#semantic-dom), separator?: ReactNode, dropdownIcon?: ReactNode } | - | 5.7.0, `classNames`, `separator` and `styles`: 6.0.0, `dropdownIcon`: 6.2.0 |
| button | Set Button common props | { className?: string, style?: React.CSSProperties, classNames?: [ButtonProps\["classNames"\]](/components/button#semantic-dom), styles?: [ButtonProps\["styles"\]](/components/button#semantic-dom), autoInsertSpace?: boolean, variant?: ButtonVariantType, color?: ButtonColorType, shape?: [ButtonProps\["shape"\]](/components/button#api), loadingIcon?: ReactNode } | - | 5.6.0, `autoInsertSpace`: 5.17.0, `variant` and `color`: 5.25.0, `shape`: 5.27.0, `loadingIcon`: 6.3.0 |
| card | Set Card common props | { className?: string, style?: React.CSSProperties, classNames?: [CardProps\["classNames"\]](/components/card#semantic-dom), styles?: [CardProps\["styles"\]](/components/card#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.14.0 |
| cardMeta | Set Card.Meta common props | { className?: string, style?: React.CSSProperties, classNames?: [CardMetaProps\["classNames"\]](/components/card#semantic-dom), styles?: [CardMetaProps\["styles"\]](/components/card#semantic-dom) } | - | 6.0.0 |
| calendar | Set Calendar common props | { className?: string, style?: React.CSSProperties, classNames?: [CalendarConfig\["classNames"\]](/components/calendar#semantic-dom), styles?: [CalendarConfig\["styles"\]](/components/calendar#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| carousel | Set Carousel common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| cascader | Set Cascader common props | { className?: string, style?: React.CSSProperties, classNames?: [CascaderConfig\["classNames"\]](/components/cascader#semantic-dom), styles?: [CascaderConfig\["styles"\]](/components/cascader#semantic-dom), expandIcon?: React.ReactNode, loadingIcon?: React.ReactNode } | - | 5.7.0, `classNames` and `styles`: 6.0.0, `expandIcon` and `loadingIcon`: 6.3.0 |
| checkbox | Set Checkbox common props | { className?: string, style?: React.CSSProperties, classNames?: [CheckboxConfig\["classNames"\]](/components/checkbox#semantic-dom), styles?: [CheckboxConfig\["styles"\]](/components/checkbox#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| collapse | Set Collapse common props | { className?: string, style?: React.CSSProperties, expandIcon?: (props) => ReactNode, classNames?: [CollapseProps\["classNames"\]](/components/collapse#semantic-dom), styles?: [CollapseProps\["styles"\]](/components/collapse#semantic-dom) } | - | 5.7.0, `expandIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| colorPicker | Set ColorPicker common props | { className?: string, style?: React.CSSProperties, classNames?: [ColorPickerConfig\["classNames"\]](/components/color-picker#semantic-dom), styles?: [ColorPickerConfig\["styles"\]](/components/color-picker#semantic-dom) } | - | 5.7.0 |
| datePicker | Set datePicker common props | { className?: string, style?: React.CSSProperties, classNames?: [DatePickerConfig\["classNames"\]](/components/date-picker#semantic-dom), styles?: [DatePickerConfig\["styles"\]](/components/date-picker#semantic-dom), suffixIcon?: React.ReactNode } | - | 5.7.0, `suffixIcon`: 6.3.0 |
| rangePicker | Set rangePicker common props | { className?: string, style?: React.CSSProperties, separator?: React.ReactNode } | - | 5.11.0, `separator`: 6.3.0 |
| descriptions | Set Descriptions common props | { className?: string, style?: React.CSSProperties, classNames?: [DescriptionsProps\["classNames"\]](/components/descriptions#semantic-dom), styles?: [DescriptionsProps\["styles"\]](/components/descriptions#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| divider | Set Divider common props | { className?: string, style?: React.CSSProperties, classNames?: [DividerProps\["classNames"\]](/components/divider#semantic-dom), styles?: [DividerProps\["styles"\]](/components/divider#semantic-dom) } | - |  |
| drawer | Set Drawer common props | { className?: string, style?: React.CSSProperties, classNames?: [DrawerProps\["classNames"\]](/components/drawer#semantic-dom), styles?: [DrawerProps\["styles"\]](/components/drawer#semantic-dom), closeIcon?: ReactNode, closable?: [DrawerProps\["closable"\]](/components/drawer-cn#api) } | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| dropdown | Set Dropdown common props | { className?: string, style?: React.CSSProperties, classNames?: [DropdownConfig\["classNames"\]](/components/dropdown#semantic-dom), styles?: [DropdownConfig\["styles"\]](/components/dropdown#semantic-dom) } | - |  |
| empty | Set Empty common props | { className?: string, style?: React.CSSProperties, classNames?: [EmptyProps\["classNames"\]](/components/empty#api), styles?: [EmptyProps\["styles"\]](/components/empty#api), image?: ReactNode } | - | 5.7.0, `classNames` and `styles`: 5.23.0, `image`: 5.27.0 |
| flex | Set Flex common props | { className?: string, style?: React.CSSProperties, vertical?: boolean } | - | 5.10.0 |
| floatButton | Set FloatButton common props | { className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button#semantic-dom), backTopIcon?: React.ReactNode } | - |  |
| floatButtonGroup | Set FloatButton.Group common props | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button#semantic-dom) } | - |  |
| form | Set Form common props | { className?: string, style?: React.CSSProperties, validateMessages?: [ValidateMessages](/components/form/#validatemessages), requiredMark?: boolean \| `optional`, scrollToFirstError?: boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options), classNames?:[FormConfig\["classNames"\]](/components/form#semantic-dom), styles?: [FormConfig\["styles"\]](/components/form#semantic-dom), tooltip?: [TooltipProps](/components/tooltip#api) & { icon?: ReactNode } } | - | `requiredMark`: 4.8.0; `colon`: 4.18.0; `scrollToFirstError`: 5.2.0; `className` and `style`: 5.7.0; `tooltip`: 6.3.0 |
| image | Set Image common props | { className?: string, style?: React.CSSProperties, preview?: { closeIcon?: React.ReactNode, classNames?:[ImageConfig\["classNames"\]](/components/image#semantic-dom), styles?: [ImageConfig\["styles"\]](/components/image#semantic-dom) }, fallback?: string } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| input | Set Input common props | { autoComplete?: string, className?: string, style?: React.CSSProperties, allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 4.2.0, `allowClear`: 5.15.0 |
| inputNumber | Set InputNumber common props | { className?: string, style?: React.CSSProperties, classNames?: [InputNumberConfig\["classNames"\]](/components/input-number#semantic-dom), styles?: [InputNumberConfig\["styles"\]](/components/input-number#semantic-dom) } | - |  |
| otp | Set OTP common props | { className?: string, style?: React.CSSProperties, classNames?: [OTPConfig\["classNames"\]](/components/input#semantic-otp), styles?: [OTPConfig\["styles"\]](/components/input#semantic-otp) } | - |  |
| inputSearch | Set Search common props | { className?: string, style?: React.CSSProperties, classNames?: [InputSearchConfig\["classNames"\]](/components/input#semantic-search), styles?: [InputSearchConfig\["styles"\]](/components/input#semantic-search) } | - |  |
| textArea | Set TextArea common props | { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[TextAreaConfig\["classNames"\]](/components/input#semantic-textarea), styles?: [TextAreaConfig\["styles"\]](/components/input#semantic-textarea), allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 5.15.0 |
| layout | Set Layout common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| list | Set List common props | { className?: string, style?: React.CSSProperties, item?:{ classNames: [ListItemProps\["classNames"\]](/components/list#listitem), styles: [ListItemProps\["styles"\]](/components/list#listitem) } } | - | 5.7.0 |
| masonry | Set Masonry common props | { className?: string, style?: React.CSSProperties, classNames?: [MasonryProps\["classNames"\]](/components/masonry#semantic-dom), styles?: [MasonryProps\["styles"\]](/components/masonry#semantic-dom) } | - |  |
| menu | Set Menu common props | { className?: string, style?: React.CSSProperties, expandIcon?: ReactNode \| props => ReactNode } | - | 5.7.0, `expandIcon`: 5.15.0 |
| mentions | Set Mentions common props | { className?: string, style?: React.CSSProperties, classNames?:[MentionsConfig\["classNames"\]](/components/mentions#semantic-dom), styles?: [MentionsConfig\["styles"\]](/components/mentions#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| message | Set Message common props | { className?: string, style?: React.CSSProperties, classNames?: [MessageConfig\["classNames"\]](/components/message#semantic-dom), styles?: [MessageConfig\["styles"\]](/components/message#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| modal | Set Modal common props | { className?: string, style?: React.CSSProperties, classNames?: [ModalProps\["classNames"\]](/components/modal#semantic-dom), styles?: [ModalProps\["styles"\]](/components/modal#semantic-dom), closeIcon?: React.ReactNode } | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| notification | Set Notification common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [NotificationConfig\["classNames"\]](/components/notification#semantic-dom), styles?: [NotificationConfig\["styles"\]](/components/notification#semantic-dom) } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| pagination | Set Pagination common props | { showSizeChanger?: boolean, totalBoundaryShowSizeChanger?: number, className?: string, style?: React.CSSProperties,classNames?:[PaginationConfig\["classNames"\]](/components/pagination#semantic-dom), styles?: [PaginationConfig\["styles"\]](/components/pagination#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| progress | Set Progress common props | { className?: string, style?: React.CSSProperties, classNames?: [ProgressConfig\["classNames"\]](/components/progress#semantic-dom), styles?: [ProgressConfig\["styles"\]](/components/progress#semantic-dom) } | - |  |
| radio | Set Radio common props | { className?: string, style?: React.CSSProperties, classNames?: [RadioConfig\["classNames"\]](/components/radio#semantic-dom), styles?: [RadioConfig\["styles"\]](/components/radio#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| rate | Set Rate common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| result | Set Result common props | { className?: string, style?: React.CSSProperties , classNames?: [ResultProps\["classNames"\]](/components/result#semantic-dom), styles?: [ResultProps\["styles"\]](/components/result#semantic-dom)} | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| ribbon | Set Ribbon common props | { className?: string, style?: React.CSSProperties, , classNames?: [RibbonProps\["classNames"\]](/components/badge#semantic-dom), styles?: [RibbonProps\["styles"\]](/components/badge#semantic-dom) } | - | 6.0.0 |
| skeleton | Set Skeleton common props | { className?: string, style?: React.CSSProperties, classNames?: [SkeletonProps\["classNames"\]](/components/skeleton#semantic-dom), styles?: [SkeletonProps\["styles"\]](/components/skeleton#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| segmented | Set Segmented common props | { className?: string, style?: React.CSSProperties, classNames?: [SegmentedProps\["classNames"\]](/components/segmented#semantic-dom), styles?: [SegmentedProps\["styles"\]](/components/segmented#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| select | Set Select common props | { className?: string, showSearch?: boolean, style?: React.CSSProperties, classNames?: [SelectConfig\["classNames"\]](/components/select#semantic-dom), styles?: [SelectConfig\["styles"\]](/components/select#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| slider | Set Slider common props | { className?: string, style?: React.CSSProperties, classNames?: [SliderProps\["classNames"\]](/components/slider#semantic-dom), styles?: [SliderProps\["styles"\]](/components/slider#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| switch | Set Switch common props | { className?: string, style?: React.CSSProperties, classNames?: [SwitchStyleConfig\["classNames"\]](/components/switch#semantic-dom), styles?: [SwitchStyleConfig\["styles"\]](/components/switch#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| space | Set Space common props, ref [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number`, className?: string, style?: React.CSSProperties, classNames?: [SpaceProps\["classNames"\]](/components/space#semantic-dom), styles?: [SpaceProps\["styles"\]](/components/space#semantic-dom) } | - | 5.6.0 |
| splitter | Set Splitter common props | { className?: string, style?: React.CSSProperties, classNames?:[Splitter\["classNames"\]](/components/splitter#semantic-dom), styles?: [Splitter\["styles"\]](/components/splitter#semantic-dom) } | - | 5.21.0 |
| spin | Set Spin common props | { className?: string, style?: React.CSSProperties, indicator?: React.ReactElement, classNames?:[SpinConfig\["classNames"\]](/components/spin#semantic-dom), styles?: [SpinConfig\["styles"\]](/components/spin#semantic-dom) } | - | 5.7.0, `indicator`: 5.20.0, `classNames` and `styles`: 6.0.0 |
| statistic | Set Statistic common props | { className?: string, style?: React.CSSProperties, classNames?: [StatisticProps\["classNames"\]](/components/statistic#semantic-dom), styles?: [StatisticProps\["styles"\]](/components/statistic#semantic-dom)} | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| steps | Set Steps common props | { className?: string, style?: React.CSSProperties, classNames?:[StepsConfig\["classNames"\]](/components/steps#semantic-dom), styles?: [StepsConfig\["styles"\]](/components/steps#semantic-dom) } | - |  |
| table | Set Table common props | { className?: string, style?: React.CSSProperties, expandable?: { expandIcon?: props => React.ReactNode }, rowKey?: [TableProps\["rowKey"\]](/components/table#api), scroll?: [TableProps\["scroll"\]](/components/table#api), classNames?: [TableProps\["classNames"\]](/components/table#semantic-dom), styles?: [TableProps\["styles"\]](/components/table#semantic-dom) } | - | `scroll`: 6.2.0 |
| tabs | Set Tabs common props | { className?: string, style?: React.CSSProperties, indicator?: { size?: GetIndicatorSize, align?: `start` \| `center` \| `end` }, moreIcon?: ReactNode, addIcon?: ReactNode, removeIcon?: ReactNode, classNames?: [TabsConfig\["classNames"\]](/components/tabs#semantic-dom), styles?: [TabsConfig\["styles"\]](/components/tabs#semantic-dom) } | - | 5.7.0, `moreIcon` and `addIcon`: 5.14.0, `removeIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| tag | Set Tag common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [TagProps\["classNames"\]](/components/tag#semantic-dom), styles?: [TagProps\["styles"\]](/components/tag#semantic-dom) } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| timeline | Set Timeline common props | { className?: string, style?: React.CSSProperties, classNames?: [TimelineConfig\["classNames"\]](/components/timeline#semantic-dom), styles?: [TimelineConfig\["styles"\]](/components/timeline#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| timePicker | Set TimePicker common props | { className?: string, style?: React.CSSProperties, classNames?: [TimePickerConfig\["classNames"\]](/components/time-picker#semantic-dom), styles?: [TimePickerConfig\["styles"\]](/components/time-picker#semantic-dom), suffixIcon?: React.ReactNode } | - | 5.7.0, `suffixIcon`: 6.3.0 |
| tour | Set Tour common props | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [TourProps\["classNames"\]](/components/tour#semantic-dom), styles?: [TourProps\["styles"\]](/components/tour#semantic-dom) } | - | 5.14.0, `classNames`、`styles`、`className`、`style`: 6.0.0 |
| tooltip | Set Tooltip common props | { className?: string, style?: React.CSSProperties, classNames?:[Tooltip\["classNames"\]](/components/tooltip#semantic-dom), styles?: [Tooltip\["styles"\]](/components/tooltip#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, unique?: boolean, trigger?: [Tooltip\["trigger"\]](/components/tooltip#api) } | - |  |
| popover | Set Popover common props | { className?: string, style?: React.CSSProperties, classNames?:[Popover\["classNames"\]](/components/popover#semantic-dom), styles?: [Popover\["styles"\]](/components/popover#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popover\["trigger"\]](/components/popover#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| popconfirm | Set Popconfirm common props | { className?: string, style?: React.CSSProperties, classNames?:[Popconfirm\["classNames"\]](/components/popconfirm#semantic-dom), styles?: [Popconfirm\["styles"\]](/components/popconfirm#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popconfirm\["trigger"\]](/components/popconfirm#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| qrcode | Set QRCode common props | { className?: string, style?: React.CSSProperties, classNames?:[QRCode\["classNames"\]](/components/qr-code#semantic-dom), styles?: [QRCode\["styles"\]](/components/qr-code#semantic-dom) } | - |  |
| transfer | Set Transfer common props | { className?: string, style?: React.CSSProperties, classNames?: [TransferConfig\["classNames"\]](/components/transfer#semantic-dom), styles?: [TransferConfig\["styles"\]](/components/transfer#semantic-dom), selectionsIcon?: React.ReactNode } | - |  |
| tree | Set Tree common props | { className?: string, style?: React.CSSProperties, classNames?: [TreeConfig\["classNames"\]](/components/tree#semantic-dom), styles?: [TreeConfig\["styles"\]](/components/tree#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| treeSelect | Set TreeSelect common props | { className?: string, style?: React.CSSProperties, classNames?: [TreeSelectConfig\["classNames"\]](/components/tree-select#semantic-dom), styles?: [TreeSelectConfig\["styles"\]](/components/tree-select#semantic-dom), switcherIcon?: [TreeSelect\["switcherIcon"\]](/components/tree-select#api)} | - |  |
| typography | Set Typography common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| upload | Set Upload common props | { className?: string, style?: React.CSSProperties, classNames?:[UploadConfig\["classNames"\]](/components/upload#semantic-dom), styles?: [UploadConfig\["styles"\]](/components/upload#semantic-dom), customRequest?: [Upload\["customRequest"\]](/components/upload#api) } | - | 5.7.0, `customRequest`: 5.27.0, `classNames` and `styles`: 6.0.0 |
| wave | Config wave effect | { disabled?: boolean, showEffect?: (node: HTMLElement, info: { className, token, component }) => void } | - | 5.8.0 |

## FAQ

### How to contribute a new language? {#faq-add-locale}

See [&lt;Adding new language&gt;](/docs/react/i18n#adding-newplanguage).

### Date-related components locale is not working? {#faq-locale-not-work}

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### Modal throw error when setting `getPopupContainer`? {#faq-get-popup-container}

Related issue: <https://github.com/ant-design/ant-design/issues/19974>

When you config `getPopupContainer` to parentNode globally, Modal will throw error of `triggerNode is undefined` because it did not have a triggerNode. You can try the [fix](https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a) below.

```diff
 <ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
 >
   <App />
 </ConfigProvider>
```

### Why can't ConfigProvider props (like `prefixCls` and `theme`) affect ReactNode inside `message.info`, `notification.open`, `Modal.confirm`? {#faq-message-inherit}

antd will dynamic create React instance by `ReactDOM.render` when call message methods. Whose context is different with origin code located context. We recommend `useMessage`, `useNotification` and `useModal` which , the methods came from `message/notification/Modal` has been deprecated in 5.x.

### Locale is not working with Vite in production mode? {#faq-vite-locale-not-work}

Related issue: [#39045](https://github.com/ant-design/ant-design/issues/39045)

In production mode of Vite, default exports from cjs file should be used like this: `enUS.default`. So you can directly import locale from `es/` directory like `import enUS from 'antd/es/locale/en_US'` to make dev and production have the same behavior.

### `prefixCls` priority(The former is covered by the latter) {#faq-prefixcls-priority}

1. `ConfigProvider.config({ prefixCls: 'prefix-1' })`
2. `ConfigProvider.config({ holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider> })`
3. `message.config({ prefixCls: 'prefix-3' })`
