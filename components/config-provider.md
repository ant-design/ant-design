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
      style={{
        width: '100%',
        paddingTop: token.padding,
        borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      }}
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
      <div
        style={{
          width: 320,
          border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusLG,
        }}
      >
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
  Flex,
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
import { createStyles } from 'antd-style';

type DirectionType = ConfigProviderProps['direction'];

const useStyles = createStyles((props) => {
  const { css } = props;
  return {
    headerExample: css`
      display: inline-block;
      width: 42px;
      height: 42px;
      vertical-align: middle;
      background-color: #eee;
      border-radius: 4px;
    `,
  };
});

const { Search } = Input;

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

const treeSelectData = [
  {
    title: 'parent 1',
    value: '0-1',
    children: [
      {
        title: 'parent 1-0',
        value: '0-1-1',
        children: [
          { title: 'my leaf', value: 'random' },
          { title: 'your leaf', value: 'random1' },
        ],
      },
      {
        title: 'parent 1-1',
        value: 'random2',
        children: [{ title: <b style={{ color: '#08c' }}>sss</b>, value: 'random3' }],
      },
    ],
  },
];

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

const Page: React.FC<{ placement: Placement }> = (props) => {
  const { placement } = props;

  const { styles } = useStyles();

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

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
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
    <Flex className="direction-components" vertical gap="large">
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
      <Row>
        <Col span={12}>
          <Divider titlePlacement="start">Button example</Divider>
          <Flex wrap gap="small">
            <Button type="primary" icon={<DownloadOutlined />} />
            <Button type="primary" shape="circle" icon={<DownloadOutlined />} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Space.Compact>
              <Button type="primary" icon={<LeftOutlined />}>
                Backward
              </Button>
              <Button type="primary" icon={<RightOutlined />} iconPlacement="end">
                Forward
              </Button>
            </Space.Compact>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" size="small" loading>
              Loading
            </Button>
          </Flex>
        </Col>
        <Col span={12}>
          <Divider titlePlacement="start">Tree example</Divider>
          <Tree
            showLine
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            treeData={treeData}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Input (Input Group) example</Divider>
          <Flex vertical gap="large">
            <Flex vertical gap="middle">
              <Row gutter={8}>
                <Col span={5}>
                  <Input size="large" defaultValue="0571" />
                </Col>
                <Col span={8}>
                  <Input size="large" defaultValue="26888888" />
                </Col>
              </Row>
              <Space.Compact>
                <Input style={{ width: '20%' }} defaultValue="0571" />
                <Input style={{ width: '30%' }} defaultValue="26888888" />
              </Space.Compact>
              <Space.Compact>
                <Select
                  defaultValue="Option1"
                  options={[
                    { label: 'Option1', value: 'Option1' },
                    { label: 'Option2', value: 'Option2' },
                  ]}
                />
                <Input style={{ width: '50%' }} defaultValue="input content" />
                <InputNumber />
              </Space.Compact>
              <Search placeholder="input search text" enterButton="Search" size="large" />
              <Space.Compact>
                {selectBefore}
                <Input defaultValue="mysite" />
                {selectAfter}
              </Space.Compact>
            </Flex>
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
                  treeData={treeSelectData}
                />
              </Col>
            </Row>
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
            <Row>
              <Col span={24}>
                <Divider titlePlacement="start">Steps example</Divider>
                <Flex vertical gap="middle">
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
                </Flex>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Divider titlePlacement="start">Rate example</Divider>
                <Flex vertical gap="small">
                  <Rate defaultValue={2.5} />
                  <div>
                    <strong>* Note:</strong> Half star not implemented in RTL direction, it will be
                    supported after{' '}
                    <a
                      href="https://github.com/react-component/rate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rc-rate
                    </a>{' '}
                    implement rtl support.
                  </div>
                </Flex>
              </Col>
              <Col span={12}>
                <Divider titlePlacement="start">Badge example</Divider>
                <Flex align="center" gap="middle">
                  <Badge count={badgeCount}>
                    <a href="#" className={styles.headerExample} />
                  </Badge>
                  <Space.Compact>
                    <Button icon={<MinusOutlined />} onClick={declineBadge} />
                    <Button icon={<PlusOutlined />} onClick={increaseBadge} />
                  </Space.Compact>
                </Flex>
                <Flex align="center" gap="middle" style={{ marginTop: 12 }}>
                  <Badge dot={showBadge}>
                    <a href="#" className={styles.headerExample} />
                  </Badge>
                  <Switch onChange={onChangeBadge} checked={showBadge} />
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Divider titlePlacement="start">Pagination example</Divider>
          <Pagination showSizeChanger defaultCurrent={3} total={500} />
        </Col>
      </Row>
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
    </Flex>
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
        <Radio.Button value="medium">Medium</Radio.Button>
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
  dot.style.insetInlineStart = `${left}px`;
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
| componentSize | Config antd component size | `small` \| `medium` \| `large` | - |  |
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
| ~~autoInsertSpaceInButton~~ | Button auto spacing config, please use `button={{ autoInsertSpace: boolean }}` instead | boolean | - | - |
| ~~dropdownMatchSelectWidth~~ | Determine whether the dropdown menu and the select input are the same width, please use `popupMatchSelectWidth` instead | boolean | - | - |

### ConfigProvider.config() {#config}

Setting `Modal`, `Message`, `Notification` static config. Does not work on hooks.

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
| componentSize | antd component size state | `small` \| `medium` \| `large` | - | 5.3.0 |

### Component Config

The following config keys set common props for corresponding components or global effects. See the related APIs for details:

- `affix`: [Affix](/components/affix#api) (supported since 6.0.0)
- `alert`: [Alert](/components/alert#api) (supported since 5.7.0)
- `anchor`: [Anchor](/components/anchor#api) (supported since 6.0.0)
- `app`: [App](/components/app#api) (supported since 6.3.0)
- `avatar`: [Avatar](/components/avatar#api) (supported since 5.7.0)
- `badge`: [Badge](/components/badge#api) (supported since 5.7.0)
- `borderBeam`: [BorderBeam](/components/border-beam#api) (supported since 6.4.0)
- `breadcrumb`: [Breadcrumb](/components/breadcrumb#api) (supported since 5.7.0)
- `button`: [Button](/components/button#api) (supported since 5.6.0)
- `card`: [Card](/components/card#api) (supported since 5.14.0)
- `cardMeta`: [Card.Meta](/components/card#cardmeta) (supported since 6.0.0)
- `calendar`: [Calendar](/components/calendar#api) (supported since 6.0.0)
- `carousel`: [Carousel](/components/carousel#api) (supported since 5.7.0)
- `cascader`: [Cascader](/components/cascader#api) (supported since 5.13.0)
- `checkbox`: [Checkbox](/components/checkbox#api) (supported since 6.0.0)
- `collapse`: [Collapse](/components/collapse#api) (supported since 5.15.0)
- `colorPicker`: [ColorPicker](/components/color-picker#api) (supported since 6.3.0)
- `datePicker`: [DatePicker](/components/date-picker#api) (supported since 5.7.0)
- `rangePicker`: [RangePicker](/components/date-picker#rangepicker) (supported since 5.11.0)
- `descriptions`: [Descriptions](/components/descriptions#api) (supported since 5.23.0)
- `divider`: [Divider](/components/divider#api) (supported since 5.10.0)
- `drawer`: [Drawer](/components/drawer#api) (supported since 5.10.0)
- `dropdown`: [Dropdown](/components/dropdown#api) (supported since 5.11.0)
- `empty`: [Empty](/components/empty#api) (supported since 5.23.0)
- `flex`: [Flex](/components/flex#api) (supported since 5.10.0)
- `floatButton`: [FloatButton](/components/float-button#api) (supported since 6.0.0)
- `floatButtonGroup`: [FloatButton.Group](/components/float-button#floatbuttongroup) (supported since 5.16.0)
- `form`: [Form](/components/form#api) (supported since 4.8.0)
- `image`: [Image](/components/image#api) (supported since 5.14.0)
- `input`: [Input](/components/input#input) (supported since 4.2.0)
- `inputNumber`: [InputNumber](/components/input-number#api) (supported since 5.19.0)
- `otp`: [Input.OTP](/components/input#inputotp) (supported since 6.0.0)
- `inputPassword`: [Input.Password](/components/input#inputpassword) (supported since 6.4.0)
- `inputSearch`: [Input.Search](/components/input#inputsearch) (supported since 6.4.0)
- `textArea`: [Input.TextArea](/components/input#inputtextarea) (supported since 5.15.0)
- `layout`: [Layout](/components/layout#api) (supported since 5.7.0)
- `list`: [List](/components/list#api) (supported since 5.7.0)
- `masonry`: [Masonry](/components/masonry#api) (supported since 6.0.0)
- `menu`: [Menu](/components/menu#api) (supported since 5.15.0)
- `mentions`: [Mentions](/components/mentions#api) (supported since 5.13.0)
- `message`: [Message](/components/message#api) (supported since 5.7.0)
- `modal`: [Modal](/components/modal#api) (supported since 5.10.0)
- `notification`: [Notification](/components/notification#api) (supported since 5.14.0)
- `pagination`: [Pagination](/components/pagination#api) (supported since 6.0.0)
- `progress`: [Progress](/components/progress#api) (supported since 5.7.0)
- `radio`: [Radio](/components/radio#api) (supported since 6.0.0)
- `rate`: [Rate](/components/rate#api) (supported since 5.7.0)
- `result`: [Result](/components/result#api) (supported since 6.0.0)
- `ribbon`: [Badge.Ribbon](/components/badge#badgeribbon) (supported since 6.0.0)
- `skeleton`: [Skeleton](/components/skeleton#api) (supported since 6.0.0)
- `segmented`: [Segmented](/components/segmented#api) (supported since 6.0.0)
- `select`: [Select](/components/select#api) (supported since 5.13.0)
- `slider`: [Slider](/components/slider#api) (supported since 5.23.0)
- `switch`: [Switch](/components/switch#api) (supported since 6.0.0)
- `space`: [Space](/components/space#api) (supported since 5.6.0)
- `splitter`: [Splitter](/components/splitter#api) (supported since 5.21.0)
- `spin`: [Spin](/components/spin#api) (supported since 5.20.0)
- `statistic`: [Statistic](/components/statistic#api) (supported since 6.0.0)
- `steps`: [Steps](/components/steps#api) (supported since 5.10.0)
- `table`: [Table](/components/table#api) (supported since 6.2.0)
- `tabs`: [Tabs](/components/tabs#api) (supported since 5.14.0)
- `tag`: [Tag](/components/tag#api) (supported since 5.14.0)
- `timeline`: [Timeline](/components/timeline#api) (supported since 6.0.0)
- `timePicker`: [TimePicker](/components/time-picker#api) (supported since 5.13.0)
- `tour`: [Tour](/components/tour#api) (supported since 5.14.0)
- `tooltip`: [Tooltip](/components/tooltip#api) (supported since 6.1.0)
- `popover`: [Popover](/components/popover#api) (supported since 5.23.0)
- `popconfirm`: [Popconfirm](/components/popconfirm#api) (supported since 5.23.0)
- `qrcode`: [QRCode](/components/qr-code#api) (supported since 6.0.0)
- `transfer`: [Transfer](/components/transfer#api) (supported since 5.7.0)
- `tree`: [Tree](/components/tree#api) (supported since 6.0.0)
- `treeSelect`: [TreeSelect](/components/tree-select#api) (supported since 5.19.0)
- `typography`: [Typography](/components/typography#api) (supported since 6.4.0)
- `upload`: [Upload](/components/upload#api) (supported since 5.27.0)
- `watermark`: [Watermark](/components/watermark#api) (supported since 6.0.0)
- `wave`: [WaveConfig](#waveconfig) (supported since 5.8.0)

### WaveConfig

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Whether to disable wave effect | boolean | false |  |
| showEffect | Customized wave effect | (node: HTMLElement, info: { className, token, component }) => void | - |  |
| triggerType | The event that triggers wave effect | `click` \| `pointerdown` \| `pointerup` \| `mousedown` \| `mouseup` | `click` | 6.4.0 |

## FAQ

### How to contribute a new language? {#faq-add-locale}

See [&lt;Adding new language&gt;](/docs/react/i18n#adding-new-language).

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
