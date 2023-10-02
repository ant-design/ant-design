import {
  DownloadOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined as SearchIcon,
  SmileOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
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
import type { DirectionType } from 'antd/es/config-provider';

const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const { Option } = Select;
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
            label: 'سعادت آیاد',
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
            value: 'primadar',
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

const Page: React.FC<{ popupPlacement: Placement }> = ({ popupPlacement }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(5);
  const [showBadge, setShowBadge] = useState(true);

  const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );

  const selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
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
          <Divider orientation="left">Cascader example</Divider>
          <Cascader
            suffixIcon={<SearchIcon />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="یک مورد انتخاب کنید"
            popupPlacement={popupPlacement}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;With search:&nbsp;&nbsp;
          <Cascader
            suffixIcon={<SmileOutlined />}
            options={cascaderOptions}
            onChange={onCascaderChange}
            placeholder="Select an item"
            popupPlacement={popupPlacement}
            showSearch={{ filter: cascaderFilter }}
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
                <TreeNode title={<span style={{ color: '#1677ff' }}>sss</span>} key="0-0-1-0" />
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
            <Input style={{ width: '20%' }} defaultValue="0571" />
            <Input style={{ width: '30%' }} defaultValue="26888888" />
          </InputGroup>
          <br />
          <InputGroup compact>
            <Select defaultValue="Option1">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="input content" />
            <InputNumber />
          </InputGroup>
          <br />
          <Search placeholder="input search text" enterButton="Search" size="large" />
          <br />
          <br />
          <div style={{ marginBottom: 16 }}>
            <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
          </div>
          <br />
          <Row>
            <Col span={12}>
              <Divider orientation="left">Select example</Divider>
              <Space wrap>
                <Select mode="multiple" defaultValue="مورچه" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="مورچه">مورچه</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select defaultValue="مورچه" style={{ width: 120 }} disabled>
                  <Option value="مورچه">مورچه</Option>
                </Select>
                <Select defaultValue="مورچه" style={{ width: 120 }} loading>
                  <Option value="مورچه">مورچه</Option>
                </Select>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.props.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="سعید">سعید</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Space>
            </Col>
            <Col span={12}>
              <Divider orientation="left">TreeSelect example</Divider>
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
              <Divider orientation="left">Modal example</Divider>
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
              <Divider orientation="left">Steps example</Divider>
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
              <Divider orientation="left">Rate example</Divider>
              <Rate defaultValue={2.5} />
              <br />
              <strong>* Note:</strong> Half star not implemented in RTL direction, it will be
              supported after <a href="https://github.com/react-component/rate">rc-rate</a>{' '}
              implement rtl support.
            </Col>
            <Col span={12}>
              <Divider orientation="left">Badge example</Divider>
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

const App: React.FC = () => {
  const [direction, setDirection] = useState<DirectionType>('ltr');
  const [popupPlacement, setPopupPlacement] = useState<Placement>('bottomLeft');

  const changeDirection = (e: RadioChangeEvent) => {
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
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>Change direction of components:</span>
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
