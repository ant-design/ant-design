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

ConfigProvider 使用 React 的 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context) 特性，只需在应用外围包裹一次即可全局生效。

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
| componentSize | 设置 antd 组件大小 | `small` \| `medium` \| `large` | - |  |
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
| ~~autoInsertSpaceInButton~~ | Button 自动空格配置，请使用 `button={{ autoInsertSpace: boolean }}` 替代 | boolean | - | - |
| ~~dropdownMatchSelectWidth~~ | 下拉菜单和选择器是否同宽，请使用 `popupMatchSelectWidth` 替代 | boolean | - | - |

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
| componentSize | antd 组件大小状态 | `small` \| `medium` \| `large` | - | 5.3.0 |

### 组件配置 {#component-config}

以下配置项用于设置对应组件的通用属性或全局效果配置，具体 API 见链接：

- `affix`：[Affix](/components/affix-cn#api)（自 6.0.0 起支持）
- `alert`：[Alert](/components/alert-cn#api)（自 5.7.0 起支持）
- `anchor`：[Anchor](/components/anchor-cn#api)（自 6.0.0 起支持）
- `app`：[App](/components/app-cn#api)（自 6.3.0 起支持）
- `avatar`：[Avatar](/components/avatar-cn#api)（自 5.7.0 起支持）
- `badge`：[Badge](/components/badge-cn#api)（自 5.7.0 起支持）
- `borderBeam`：[BorderBeam](/components/border-beam-cn#api)（自 6.4.0 起支持）
- `breadcrumb`：[Breadcrumb](/components/breadcrumb-cn#api)（自 5.7.0 起支持）
- `button`：[Button](/components/button-cn#api)（自 5.6.0 起支持）
- `calendar`：[Calendar](/components/calendar-cn#api)（自 6.0.0 起支持）
- `card`：[Card](/components/card-cn#api)（自 5.14.0 起支持）
- `cardMeta`：[Card.Meta](/components/card-cn#cardmeta)（自 6.0.0 起支持）
- `carousel`：[Carousel](/components/carousel-cn#api)（自 5.7.0 起支持）
- `cascader`：[Cascader](/components/cascader-cn#api)（自 5.13.0 起支持）
- `checkbox`：[Checkbox](/components/checkbox-cn#api)（自 6.0.0 起支持）
- `collapse`：[Collapse](/components/collapse-cn#api)（自 5.15.0 起支持）
- `colorPicker`：[ColorPicker](/components/color-picker-cn#api)（自 6.3.0 起支持）
- `datePicker`：[DatePicker](/components/date-picker-cn#api)（自 5.7.0 起支持）
- `rangePicker`：[RangePicker](/components/date-picker-cn#rangepicker)（自 5.11.0 起支持）
- `descriptions`：[Descriptions](/components/descriptions-cn#api)（自 5.23.0 起支持）
- `divider`：[Divider](/components/divider-cn#api)（自 5.10.0 起支持）
- `drawer`：[Drawer](/components/drawer-cn#api)（自 5.10.0 起支持）
- `dropdown`：[Dropdown](/components/dropdown-cn#api)（自 5.11.0 起支持）
- `empty`：[Empty](/components/empty-cn#api)（自 5.23.0 起支持）
- `flex`：[Flex](/components/flex-cn#api)（自 5.10.0 起支持）
- `floatButton`：[FloatButton](/components/float-button-cn#api)（自 6.0.0 起支持）
- `floatButtonGroup`：[FloatButton.Group](/components/float-button-cn#floatbuttongroup)（自 5.16.0 起支持）
- `form`：[Form](/components/form-cn#api)（自 4.8.0 起支持）
- `image`：[Image](/components/image-cn#api)（自 5.14.0 起支持）
- `input`：[Input](/components/input-cn#input)（自 4.2.0 起支持）
- `inputNumber`：[InputNumber](/components/input-number-cn#api)（自 5.19.0 起支持）
- `otp`：[Input.OTP](/components/input-cn#inputotp)（自 6.0.0 起支持）
- `inputPassword`：[Input.Password](/components/input-cn#inputpassword)（自 6.4.0 起支持）
- `inputSearch`：[Input.Search](/components/input-cn#inputsearch)（自 6.4.0 起支持）
- `textArea`：[Input.TextArea](/components/input-cn#inputtextarea)（自 5.15.0 起支持）
- `layout`：[Layout](/components/layout-cn#api)（自 5.7.0 起支持）
- `list`：[List](/components/list-cn#api)（自 5.7.0 起支持）
- `masonry`：[Masonry](/components/masonry-cn#api)（自 6.0.0 起支持）
- `menu`：[Menu](/components/menu-cn#api)（自 5.15.0 起支持）
- `mentions`：[Mentions](/components/mentions-cn#api)（自 5.13.0 起支持）
- `message`：[Message](/components/message-cn#api)（自 5.7.0 起支持）
- `modal`：[Modal](/components/modal-cn#api)（自 5.10.0 起支持）
- `notification`：[Notification](/components/notification-cn#api)（自 5.14.0 起支持）
- `pagination`：[Pagination](/components/pagination-cn#api)（自 6.0.0 起支持）
- `progress`：[Progress](/components/progress-cn#api)（自 5.7.0 起支持）
- `radio`：[Radio](/components/radio-cn#api)（自 6.0.0 起支持）
- `rate`：[Rate](/components/rate-cn#api)（自 5.7.0 起支持）
- `result`：[Result](/components/result-cn#api)（自 6.0.0 起支持）
- `ribbon`：[Badge.Ribbon](/components/badge-cn#badgeribbon)（自 6.0.0 起支持）
- `skeleton`：[Skeleton](/components/skeleton-cn#api)（自 6.0.0 起支持）
- `segmented`：[Segmented](/components/segmented-cn#api)（自 6.0.0 起支持）
- `select`：[Select](/components/select-cn#api)（自 5.13.0 起支持）
- `slider`：[Slider](/components/slider-cn#api)（自 5.23.0 起支持）
- `switch`：[Switch](/components/switch-cn#api)（自 6.0.0 起支持）
- `space`：[Space](/components/space-cn#api)（自 5.6.0 起支持）
- `splitter`：[Splitter](/components/splitter-cn#api)（自 5.21.0 起支持）
- `spin`：[Spin](/components/spin-cn#api)（自 5.20.0 起支持）
- `statistic`：[Statistic](/components/statistic-cn#api)（自 6.0.0 起支持）
- `steps`：[Steps](/components/steps-cn#api)（自 5.10.0 起支持）
- `table`：[Table](/components/table-cn#api)（自 6.2.0 起支持）
- `tabs`：[Tabs](/components/tabs-cn#api)（自 5.14.0 起支持）
- `tag`：[Tag](/components/tag-cn#api)（自 5.14.0 起支持）
- `timeline`：[Timeline](/components/timeline-cn#api)（自 6.0.0 起支持）
- `timePicker`：[TimePicker](/components/time-picker-cn#api)（自 5.13.0 起支持）
- `tour`：[Tour](/components/tour-cn#api)（自 5.14.0 起支持）
- `tooltip`：[Tooltip](/components/tooltip-cn#api)（自 6.1.0 起支持）
- `popover`：[Popover](/components/popover-cn#api)（自 5.23.0 起支持）
- `popconfirm`：[Popconfirm](/components/popconfirm-cn#api)（自 5.23.0 起支持）
- `qrcode`：[QRCode](/components/qr-code-cn#api)（自 6.0.0 起支持）
- `transfer`：[Transfer](/components/transfer-cn#api)（自 5.7.0 起支持）
- `tree`：[Tree](/components/tree-cn#api)（自 6.0.0 起支持）
- `treeSelect`：[TreeSelect](/components/tree-select-cn#api)（自 5.19.0 起支持）
- `typography`：[Typography](/components/typography-cn#api)（自 6.4.0 起支持）
- `upload`：[Upload](/components/upload-cn#api)（自 5.27.0 起支持）
- `watermark`：[Watermark](/components/watermark-cn#api)（自 6.0.0 起支持）
- `wave`：[WaveConfig](#waveconfig)（自 5.8.0 起支持）

### WaveConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 是否禁用水波纹效果 | boolean | false |  |
| showEffect | 自定义水波纹效果 | (node: HTMLElement, info: { className, token, component }) => void | - |  |
| triggerType | 触发水波纹效果的事件 | `click` \| `pointerdown` \| `pointerup` \| `mousedown` \| `mouseup` | `click` | 6.4.0 |

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
