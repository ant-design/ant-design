---
category: Components
subtitle: 全局化配置
group: 其他
title: ConfigProvider
description: 为组件提供统一的全局化配置。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

## 使用 {#usage}

ConfigProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

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

### 内容安全策略（CSP）{#csp}

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```tsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## 代码演示 {#examples}

### 国际化

此处列出 Ant Design 中需要国际化支持的组件，你可以在演示里切换语言。

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

### 方向

这里列出了支持 `rtl` 方向的组件，您可以在演示中切换方向。

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

### 组件尺寸

修改默认组件尺寸。

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

### 主题

通过 `theme` 修改主题。

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

### 自定义波纹

波纹效果带来了灵动性，可以通过 `component` 判断来自哪个组件。你也可以使用 [`@ant-design/happy-work-theme`](https://github.com/ant-design/happy-work-theme) 提供的 HappyProvider 实现动态波纹效果。

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

### 静态方法

使用 `holderRender` 给 `message` 、`modal` 、`notification` 静态方法设置 `Provider`

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

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| componentDisabled | 设置 antd 组件禁用状态 | boolean | - | 4.21.0 |
| componentSize | 设置 antd 组件大小 | `small` \| `middle` \| `large` | - |  |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - |  |
| direction | 设置文本展示方向。 [示例](#config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | `(trigger?: HTMLElement) => HTMLElement \| ShadowRoot` | () => document.body |  |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器。 | `() => HTMLElement \| Window \| ShadowRoot` | () => window | 4.2.0 |
| iconPrefixCls | 设置图标统一样式前缀 | string | `anticon` | 4.11.0 |
| locale | 语言包配置，语言包可到 [antd/locale](https://unpkg.com/antd/locale/) 目录下寻找 | object | - |  |
| popupMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动 | boolean \| number | - | 5.5.0 |
| popupOverflow | Select 类组件弹层展示逻辑，默认为可视区域滚动，可配置成滚动区域滚动 | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| prefixCls | 设置统一样式前缀 | string | `ant` |  |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty-cn) | function(componentName: string): ReactNode | - |  |
| theme | 设置主题，参考 [定制主题](/docs/react/customize-theme-cn) | [Theme](/docs/react/customize-theme-cn#theme) | - | 5.0.0 |
| variant | 设置全局输入组件形态变体 | `outlined` \| `filled` \| `borderless` | - | 5.19.0 |
| virtual | 设置 `false` 时关闭虚拟滚动 | boolean | - | 4.3.0 |
| warning | 设置警告等级，`strict` 为 `false` 时会将废弃相关信息聚合为单条信息 | { strict: boolean } | - | 5.10.0 |

### ConfigProvider.config() {#config}

设置 `Modal`、`Message`、`Notification` 静态方法配置，只会对非 hooks 的静态方法调用生效。

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

获取父级 `Provider` 的值，如 `DisabledContextProvider`、`SizeContextProvider`。

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

| 返回值 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| componentDisabled | antd 组件禁用状态 | boolean | - | 5.3.0 |
| componentSize | antd 组件大小状态 | `small` \| `middle` \| `large` | - | 5.3.0 |

### 组件配置 {#component-config}

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| affix | 设置 Affix 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 6.0.0 |
| alert | 设置 Alert 组件的通用属性 | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, successIcon?: React.ReactNode, infoIcon?: React.ReactNode, warningIcon?: React.ReactNode, errorIcon?: React.ReactNode } | - | 5.7.0, `closeIcon`: 5.14.0, `successIcon`, `infoIcon`, `warningIcon` 和 `errorIcon`: 6.2.0 |
| anchor | 设置 Anchor 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [AnchorStyleConfig\["classNames"\]](/components/anchor-cn#semantic-dom), styles?: [AnchorStyleConfig\["styles"\]](/components/anchor-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| avatar | 设置 Avatar 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| badge | 设置 Badge 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [BadgeProps\["classNames"\]](/components/badge-cn#semantic-dom), styles?: [BadgeProps\["styles"\]](/components/badge-cn#semantic-dom) } | - | 5.7.0 |
| breadcrumb | 设置 Breadcrumb 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [BreadcrumbConfig\["classNames"\]](/components/breadcrumb-cn#semantic-dom), styles?: [BreadcrumbConfig\["styles"\]](/components/breadcrumb-cn#semantic-dom), separator?: ReactNode, dropdownIcon?: ReactNode } | - | 5.7.0, `classNames`, `separator` 和 `styles`: 6.0.0, `dropdownIcon`: 6.2.0 |
| button | 设置 Button 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [ButtonProps\["classNames"\]](/components/button-cn#semantic-dom), styles?: [ButtonProps\["styles"\]](/components/button-cn#semantic-dom), autoInsertSpace?: boolean, variant?: ButtonVariantType, color?: ButtonColorType, shape?: [ButtonProps\["shape"\]](/components/button#api), loadingIcon?: ReactNode } | - | 5.6.0, `autoInsertSpace`: 5.17.0, `variant` 和 `color`: 5.25.0, `shape`: 5.27.0, `loadingIcon`: 6.3.0 |
| calendar | 设置 Calendar 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [CalendarConfig\["classNames"\]](/components/calendar-cn#semantic-dom), styles?: [CalendarConfig\["styles"\]](/components/calendar-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| card | 设置 Card 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [CardProps\["classNames"\]](/components/card-cn#semantic-dom), styles?: [CardProps\["styles"\]](/components/card-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 5.14.0 |
| cardMeta | 设置 Card.Meta 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [CardMetaProps\["classNames"\]](/components/card-cn#semantic-dom), styles?: [CardMetaProps\["styles"\]](/components/card-cn#semantic-dom) } | - | 6.0.0 |
| carousel | 设置 Carousel 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| cascader | 设置 Cascader 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [CascaderConfig\["classNames"\]](/components/cascader#semantic-dom), styles?: [CascaderConfig\["styles"\]](/components/cascader#semantic-dom), expandIcon?: React.ReactNode, loadingIcon?: React.ReactNode } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0, `expandIcon` 和 `loadingIcon`: 6.3.0 |
| checkbox | 设置 Checkbox 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [CheckboxConfig\["classNames"\]](/components/checkbox-cn#semantic-dom), styles?: [CheckboxConfig\["styles"\]](/components/checkbox-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| collapse | 设置 Collapse 组件的通用属性 | { className?: string, style?: React.CSSProperties, expandIcon?: (props) => ReactNode, classNames?: [CollapseProps\["classNames"\]](/components/collapse-cn#semantic-dom), styles?: [CollapseProps\["styles"\]](/components/collapse-cn#semantic-dom) } | - | 5.7.0, `expandIcon`: 5.15.0, `classNames` 和 `styles`: 6.0.0 |
| colorPicker | 设置 ColorPicker 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [ColorPickerConfig\["classNames"\]](/components/color-picker-cn#semantic-dom), styles?: [ColorPickerConfig\["styles"\]](/components/color-picker-cn#semantic-dom) } | - | 5.7.0 |
| datePicker | 设置 DatePicker 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [DatePickerConfig\["classNames"\]](/components/date-picker-cn#semantic-dom), styles?: [DatePickerConfig\["styles"\]](/components/date-picker-cn#semantic-dom), suffixIcon?: React.ReactNode } | - | 5.7.0, `suffixIcon`: 6.3.0 |
| rangePicker | 设置 RangePicker 组件的通用属性 | { className?: string, style?: React.CSSProperties, separator?: React.ReactNode } | - | 5.11.0, `separator`: 6.3.0 |
| descriptions | 设置 Descriptions 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [DescriptionsProps\["classNames"\]](/components/descriptions-cn#semantic-dom), styles?: [DescriptionsProps\["styles"\]](/components/descriptions-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 5.23.0 |
| divider | 设置 Divider 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [DividerProps\["classNames"\]](/components/divider-cn#semantic-dom), styles?: [DividerProps\["styles"\]](/components/divider-cn#semantic-dom) } | - |  |
| drawer | 设置 Drawer 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [DrawerProps\["classNames"\]](/components/drawer-cn#semantic-dom), styles?: [DrawerProps\["styles"\]](/components/drawer-cn#semantic-dom), closeIcon?: ReactNode, closable?: [DrawerProps\["closable"\]](/components/drawer-cn#api)} | - | 5.7.0, `classNames` 和 `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| dropdown | 设置 Dropdown 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [DropdownConfig\["classNames"\]](/components/dropdown-cn#semantic-dom), styles?: [DropdownConfig\["styles"\]](/components/dropdown-cn#semantic-dom) } | - |  |
| empty | 设置 Empty 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[EmptyProps\["classNames"\]](/components/empty-cn#api), styles?: [EmptyProps\["styles"\]](/components/empty-cn#api), image?: ReactNode } | - | 5.7.0, `classNames` 和 `styles`: 5.23.0, `image`: 5.27.0 |
| flex | 设置 Flex 组件的通用属性 | { className?: string, style?: React.CSSProperties, vertical?: boolean } | - | 5.10.0 |
| floatButton | 设置 FloatButton 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button-cn#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button-cn#semantic-dom), backTopIcon?: React.ReactNode } | - |  |
| floatButtonGroup | 设置 FloatButton.Group 组件的通用属性 | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button-cn#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button-cn#semantic-dom) } | - |  |
| form | 设置 Form 组件的通用属性 | { className?: string, style?: React.CSSProperties, validateMessages?: [ValidateMessages](/components/form-cn#validatemessages), requiredMark?: boolean \| `optional`, colon?: boolean, scrollToFirstError?: boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options), classNames?:[FormConfig\["classNames"\]](/components/form-cn#semantic-dom), styles?: [FormConfig\["styles"\]](/components/form-cn#semantic-dom), tooltip?: [TooltipProps](/components/tooltip-cn#api) & { icon?: ReactNode } } | - | `requiredMark`: 4.8.0; `colon`: 4.18.0; `scrollToFirstError`: 5.2.0; `className` 和 `style`: 5.7.0; `tooltip`: 6.3.0 |
| image | 设置 Image 组件的通用属性 | { className?: string, style?: React.CSSProperties, preview?: { closeIcon?: React.ReactNode, classNames?:[ImageConfig\["classNames"\]](/components/image-cn#semantic-dom), styles?: [ImageConfig\["styles"\]](/components/image-cn#semantic-dom) }, fallback?: string } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` 和 `styles`: 6.0.0 |
| input | 设置 Input 组件的通用属性 | { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[InputConfig\["classNames"\]](/components/input-cn#semantic-input), styles?: [InputConfig\["styles"\]](/components/input-cn#semantic-input), allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 5.7.0, `allowClear`: 5.15.0 |
| inputNumber | 设置 Input 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [InputNumberConfig\["classNames"\]](/components/input-number-cn#semantic-dom), styles?: [InputNumberConfig\["styles"\]](/components/input-number-cn#semantic-dom) } | - |  |
| otp | 设置 OTP 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [OTPConfig\["classNames"\]](/components/input-cn#semantic-otp), styles?: [OTPConfig\["styles"\]](/components/input-cn#semantic-otp) } | - |  |
| inputSearch | 设置 Search 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [InputSearchConfig\["classNames"\]](/components/input-cn#semantic-search), styles?: [InputSearchConfig\["styles"\]](/components/input-cn#semantic-search) } | - |  |
| textArea | 设置 TextArea 组件的通用属性 | { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[TextAreaConfig\["classNames"\]](/components/input-cn#semantic-textarea), styles?: [TextAreaConfig\["styles"\]](/components/input-cn#semantic-textarea), allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 5.15.0 |
| layout | 设置 Layout 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| list | 设置 List 组件的通用属性 | { className?: string, style?: React.CSSProperties, item?:{ classNames: [ListItemProps\["classNames"\]](/components/list-cn#listitem), styles: [ListItemProps\["styles"\]](/components/list-cn#listitem) } } | - | 5.7.0 |
| masonry | 设置 Masonry 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [MasonryProps\["classNames"\]](/components/masonry#semantic-dom), styles?: [MasonryProps\["styles"\]](/components/masonry#semantic-dom) } | - |  |
| menu | 设置 Menu 组件的通用属性 | { className?: string, style?: React.CSSProperties, expandIcon?: ReactNode \| props => ReactNode } | - | 5.7.0, `expandIcon`: 5.15.0 |
| mentions | 设置 Mentions 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[MentionsConfig\["classNames"\]](/components/mentions-cn#semantic-dom), styles?: [MentionsConfig\["styles"\]](/components/mentions-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| message | 设置 Message 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [MessageConfig\["classNames"\]](/components/message-cn#semantic-dom), styles?: [MessageConfig\["styles"\]](/components/message-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| modal | 设置 Modal 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [ModalProps\["classNames"\]](/components/modal-cn#semantic-dom), styles?: [ModalProps\["styles"\]](/components/modal-cn#semantic-dom), closeIcon?: React.ReactNode } | - | 5.7.0, `classNames` 和 `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| notification | 设置 Notification 组件的通用属性 | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [NotificationConfig\["classNames"\]](/components/notification-cn#semantic-dom), styles?: [NotificationConfig\["styles"\]](/components/notification-cn#semantic-dom) } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` 和 `styles`: 6.0.0 |
| pagination | 设置 Pagination 组件的通用属性 | { showSizeChanger?: boolean, totalBoundaryShowSizeChanger?: number, className?: string, style?: React.CSSProperties,classNames?:[PaginationConfig\["classNames"\]](/components/pagination-cn#semantic-dom), styles?: [PaginationConfig\["styles"\]](/components/pagination-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| progress | 设置 Progress 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [ProgressConfig\["classNames"\]](/components/progress#semantic-dom), styles?: [ProgressConfig\["styles"\]](/components/progress#semantic-dom) } | - |  |
| radio | 设置 Radio 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [RadioConfig\["classNames"\]](/components/radio-cn#semantic-dom), styles?: [RadioConfig\["styles"\]](/components/radio-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| rate | 设置 Rate 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| result | 设置 Result 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [ResultProps\["classNames"\]](/components/result-cn#semantic-dom), styles?: [ResultProps\["styles"\]](/components/result-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| ribbon | 设置 Ribbon 组件的通用属性 | { className?: string, style?: React.CSSProperties, , classNames?: [RibbonProps\["classNames"\]](/components/badge-cn#semantic-dom), styles?: [RibbonProps\["styles"\]](/components/badge-cn#semantic-dom) } | - | 6.0.0 |
| skeleton | 设置 Skeleton 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [SkeletonProps\["classNames"\]](/components/skeleton-cn#semantic-dom), styles?: [SkeletonProps\["styles"\]](/components/skeleton-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| segmented | 设置 Segmented 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [SegmentedProps\["classNames"\]](/components/segmented-cn#semantic-dom), styles?: [SegmentedProps\["styles"\]](/components/segmented-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| select | 设置 Select 组件的通用属性 | { className?: string, showSearch?: boolean, style?: React.CSSProperties, classNames?: [SelectConfig\["classNames"\]](/components/select-cn#semantic-dom), styles?: [SelectConfig\["styles"\]](/components/select-cn#semantic-dom) } | - | 5.7.0,`classNames` 和 `styles`: 6.0.0 |
| slider | 设置 Slider 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [SliderProps\["classNames"\]](/components/slider-cn#semantic-dom), styles?: [SliderProps\["styles"\]](/components/slider-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 5.23.0 |
| switch | 设置 Switch 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [SwitchStyleConfig\["classNames"\]](/components/switch-cn#semantic-dom), styles?: [SwitchStyleConfig\["styles"\]](/components/switch-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| space | 设置 Space 的通用属性，参考 [Space](/components/space-cn) | { size: `small` \| `middle` \| `large` \| `number`, className?: string, style?: React.CSSProperties, classNames?: [SpaceProps\["classNames"\]](/components/space-cn#semantic-dom), styles?: [SpaceProps\["styles"\]](/components/space-cn#semantic-dom) } | - | 5.6.0 |
| splitter | 设置 Splitter 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[Splitter\["classNames"\]](/components/splitter-cn#semantic-dom), styles?: [Splitter\["styles"\]](/components/splitter-cn#semantic-dom) } | - | 5.21.0 |
| spin | 设置 Spin 组件的通用属性 | { className?: string, style?: React.CSSProperties, indicator?: React.ReactElement, classNames?:[SpinConfig\["classNames"\]](/components/spin-cn#semantic-dom), styles?: [SpinConfig\["styles"\]](/components/spin-cn#semantic-dom) } | - | 5.7.0, `indicator`: 5.20.0, `classNames` 和 `styles`: 6.0.0 |
| statistic | 设置 Statistic 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [StatisticProps\["classNames"\]](/components/statistic-cn#semantic-dom), styles?: [StatisticProps\["styles"\]](/components/statistic-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| steps | 设置 Steps 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[StepsConfig\["classNames"\]](/components/steps#semantic-dom), styles?: [StepsConfig\["styles"\]](/components/steps#semantic-dom) } | - |  |
| table | 设置 Table 组件的通用属性 | { className?: string, style?: React.CSSProperties, expandable?: { expandIcon?: props => React.ReactNode }, rowKey?: [TableProps\["rowKey"\]](/components/table-cn#api), scroll?: [TableProps\["scroll"\]](/components/table-cn#api), classNames?: [TableProps\["classNames"\]](/components/table-cn#semantic-dom), styles?: [TableProps\["styles"\]](/components/table-cn#semantic-dom) } | - | `scroll`: 6.2.0 |
| tabs | 设置 Tabs 组件的通用属性 | { className?: string, style?: React.CSSProperties, indicator?: { size?: GetIndicatorSize, align?: `start` \| `center` \| `end` }, moreIcon?: ReactNode, addIcon?: ReactNode, removeIcon?: ReactNode, classNames?: [TabsConfig\["classNames"\]](/components/tabs-cn#semantic-dom), styles?: [TabsConfig\["styles"\]](/components/tabs-cn#semantic-dom) } | - | 5.7.0, `moreIcon` and `addIcon`: 5.14.0, `removeIcon`: 5.15.0, `classNames` 和 `styles`: 6.0.0 |
| tag | 设置 Tag 组件的通用属性 | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [TagProps\["classNames"\]](/components/tag-cn#semantic-dom), styles?: [TagProps\["styles"\]](/components/tag-cn#semantic-dom) } | - | 5.7.0, closeIcon: 5.14.0, `classNames` 和 `styles`: 6.0.0 |
| timeline | 设置 Timeline 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [TimelineConfig\["classNames"\]](/components/timeline-cn#semantic-dom), styles?: [TimelineConfig\["styles"\]](/components/timeline-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| timePicker | 设置 TimePicker 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [TimePickerConfig\["classNames"\]](/components/time-picker-cn#semantic-dom), styles?: [TimePickerConfig\["styles"\]](/components/time-picker-cn#semantic-dom), suffixIcon?: React.ReactNode } | - | 5.7.0, `suffixIcon`: 6.3.0 |
| tour | 设置 Tour 组件的通用属性 | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [TourProps\["classNames"\]](/components/tour-cn#semantic-dom), styles?: [TourProps\["styles"\]](/components/tour-cn#semantic-dom) } | - | 5.14.0, `classNames`、`styles`、`className`、`style`: 6.0.0 |
| tooltip | 设置 Tooltip 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[Tooltip\["classNames"\]](/components/tooltip-cn#semantic-dom), styles?: [Tooltip\["styles"\]](/components/tooltip-cn#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, unique?: boolean, trigger?: [Tooltip\["trigger"\]](/components/tooltip-cn#api)} | - | `trigger`: 6.1.0 |
| popover | 设置 Popover 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[Popover\["classNames"\]](/components/popover-cn#semantic-dom), styles?: [Popover\["styles"\]](/components/popover-cn#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popover\["trigger"\]](/components/popover-cn#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| popconfirm | 设置 Popconfirm 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[Popconfirm\["classNames"\]](/components/popconfirm-cn#semantic-dom), styles?: [Popconfirm\["styles"\]](/components/popconfirm-cn#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popconfirm\["trigger"\]](/components/popconfirm-cn#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| qrcode | 设置 QRCode 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[QRCode\["classNames"\]](/components/qr-code-cn#semantic-dom), styles?: [QRCode\["styles"\]](/components/qr-code-cn#semantic-dom) } | - |  |
| transfer | 设置 Transfer 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [TransferConfig\["classNames"\]](/components/transfer-cn#semantic-dom), styles?: [TransferConfig\["styles"\]](/components/transfer-cn#semantic-dom), selectionsIcon?: React.ReactNode } | - |  |
| tree | 设置 Tree 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [TreeConfig\["classNames"\]](/components/tree-cn#semantic-dom), styles?: [TreeConfig\["styles"\]](/components/tree-cn#semantic-dom) } | - | 5.7.0, `classNames` 和 `styles`: 6.0.0 |
| treeSelect | 设置 TreeSelect 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?: [TreeSelectConfig\["classNames"\]](/components/tree-select-cn#semantic-dom), styles?: [TreeSelectConfig\["styles"\]](/components/tree-select-cn#semantic-dom), switcherIcon?: [TreeSelect\["switcherIcon"\]](/components/tree-select-cn#api)} | - |  |
| typography | 设置 Typography 组件的通用属性 | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| upload | 设置 Upload 组件的通用属性 | { className?: string, style?: React.CSSProperties, classNames?:[UploadConfig\["classNames"\]](/components/upload-cn#semantic-dom), styles?: [UploadConfig\["styles"\]](/components/upload-cn#semantic-dom), customRequest?: [Upload\["customRequest"\]](/components/upload#api) } | - | 5.7.0, `customRequest`: 5.27.0, `classNames` 和 `styles`: 6.0.0 |
| wave | 设置水波纹特效 | { disabled?: boolean, showEffect?: (node: HTMLElement, info: { className, token, component }) => void } | - | 5.8.0 |

## FAQ

### 如何增加一个新的语言包？ {#faq-add-locale}

参考[《增加语言包》](/docs/react/i18n#%E5%A2%9E%E5%8A%A0%E8%AF%AD%E8%A8%80%E5%8C%85)。

### 为什么时间类组件的国际化 locale 设置不生效？ {#faq-locale-not-work}

参考 FAQ [为什么时间类组件的国际化 locale 设置不生效？](/docs/react/faq#为什么时间类组件的国际化-locale-设置不生效)。

### 配置 `getPopupContainer` 导致 Modal 报错？ {#faq-get-popup-container}

相关 issue：<https://github.com/ant-design/ant-design/issues/19974>

当如下全局设置 `getPopupContainer` 为触发节点的 parentNode 时，由于 Modal 的用法不存在 `triggerNode`，这样会导致 `triggerNode is undefined` 的报错，需要增加一个[判断条件](https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a)。

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

### 为什么 message.info、notification.open 或 Modal.confirm 等方法内的 ReactNode 无法继承 ConfigProvider 的属性？比如 `prefixCls` 和 `theme`。 {#faq-message-inherit}

静态方法是使用 ReactDOM.render 重新渲染一个 React 根节点上，和主应用的 React 节点是脱离的。我们建议使用 useMessage、useNotification 和 useModal 来使用相关方法。原先的静态方法在 5.0 中已被废弃。

### Vite 生产模式打包后国际化 locale 设置不生效？ {#faq-vite-locale-not-work}

相关 issue：[#39045](https://github.com/ant-design/ant-design/issues/39045)

由于 Vite 生产模式下打包与开发模式不同，cjs 格式的文件会多一层，需要 `zhCN.default` 来获取。推荐 Vite 用户直接从 `antd/es/locale` 目录下引入 esm 格式的 locale 文件。

### prefixCls 优先级(前者被后者覆盖) {#faq-prefixcls-priority}

1. `ConfigProvider.config({ prefixCls: 'prefix-1' })`
2. `ConfigProvider.config({ holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider> })`
3. `message.config({ prefixCls: 'prefix-3' })`
