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

type DirectionType = ConfigProviderProps['direction'];

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
                    <a href="#" className="head-example" />
                  </Badge>
                  <Space.Compact>
                    <Button icon={<MinusOutlined />} onClick={declineBadge} />
                    <Button icon={<PlusOutlined />} onClick={increaseBadge} />
                  </Space.Compact>
                </Flex>
                <Flex align="center" gap="middle" style={{ marginTop: 12 }}>
                  <Badge dot={showBadge}>
                    <a href="#" className="head-example" />
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
