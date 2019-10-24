---
order: 2
title:
  zh-CN: 方向
  en-US: Direction
---

## zh-CN

这里列出了支持 `rtl` 方向的组件，您可以在演示中切换方向。

## en-US

Components which support rtl direction are listed here, you can toggle the direction in the demo.

```jsx
import {
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  ConfigProvider,
  Cascader,
  Radio,
  Switch,
  Tree,
  Modal,
  Button,
  Table,
  Form,
  Divider,
  Pagination,
} from 'antd';

import { Search as SearchIcon, Smile, Down } from '@ant-design/icons';

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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
        <Divider type="vertical" />
        <a className="ant-dropdown-link">
          More actions <Down />
        </a>
      </span>
    ),
  },
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'هوشنگ ابتهاج',
    age: `${i}2`,
    address: `Rasht No. ${i} Shahrdari sq.`,
    description: `Hushang Ebtehaj is an Iranian poet of the ${i}th century, whose life and work spans many of Iran's political, cultural and literary upheavals`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class Page extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    expandedRowRender,
    title: undefined,
    showHeader,
    footer,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,

    modalVisible: false,
  };

  selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );

  selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  // ==== Cascader ====
  cascaderFilter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  onCascaderChange = value => {
    console.log(value);
  };
  // ==== End Cascader ====

  // ==== Modal ====
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  };
  // ==== End Modal ====
  // ==== Table ====

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleTableLayoutChange = e => {
    this.setState({ tableLayout: e.target.value });
  };

  handleExpandChange = enable => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  };

  handleEllipsisChange = enable => {
    this.setState({ ellipsis: enable });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handleDataChange = hasData => {
    this.setState({ hasData });
  };

  handlePaginationChange = e => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  };
  // ==== End Table ====

  render() {
    const { currentStep } = this.state;
    return (
      <div className="direction-components example">
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Cascader example:</h3>
            <Cascader
              suffixIcon={<SearchIcon />}
              options={cascaderOptions}
              onChange={this.onCascaderChange}
              placeholder="یک مورد انتخاب کنید"
              popupPlacement={this.props.popupPlacement}
            />
            &nbsp;&nbsp;&nbsp;&nbsp; With search:
            <Cascader
              suffixIcon={<Smile />}
              options={cascaderOptions}
              onChange={this.onCascaderChange}
              placeholder="Select an item"
              popupPlacement={this.props.popupPlacement}
              showSearch={this.cascaderFilter}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Switch example:</h3>
            &nbsp;&nbsp;
            <Switch defaultChecked />
            &nbsp;&nbsp;
            <Switch loading defaultChecked />
            &nbsp;&nbsp;
            <Switch size="small" loading />
          </Col>
          <Col span={12}>
            <h3 className="demo-block-title">Radio Group example:</h3>

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
          <Col span={24}>
            <h3 className="demo-block-title">Tree example:</h3>
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
                  <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                </TreeNode>
              </TreeNode>
            </Tree>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Input (Input Group) example:</h3>
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
              <Input
                addonBefore={this.selectBefore}
                addonAfter={this.selectAfter}
                defaultValue="mysite"
              />
            </div>
            <br />

            <Row>
              <Col span={24}>
                <h3 className="demo-block-title">Select example:</h3>
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
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="سعید">سعید</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <h3 className="demo-block-title">Modal example:</h3>
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    Open Modal
                  </Button>
                  <Modal
                    title="پنچره ساده"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                    <p>نگاشته‌های خود را اینجا قراردهید</p>
                  </Modal>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <br />
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Table example:</h3>
            <div>
              <Form
                layout="inline"
                className="components-table-demo-control-bar"
                style={{ marginBottom: 16 }}
              >
                <Form.Item label="Bordered">
                  <Switch checked={this.state.bordered} onChange={this.handleToggle('bordered')} />
                </Form.Item>
                <Form.Item label="loading">
                  <Switch checked={this.state.loading} onChange={this.handleToggle('loading')} />
                </Form.Item>
                <Form.Item label="Title">
                  <Switch checked={!!this.state.title} onChange={this.handleTitleChange} />
                </Form.Item>
                <Form.Item label="Column Header">
                  <Switch checked={!!this.state.showHeader} onChange={this.handleHeaderChange} />
                </Form.Item>
                <Form.Item label="Footer">
                  <Switch checked={!!this.state.footer} onChange={this.handleFooterChange} />
                </Form.Item>
                <Form.Item label="Expandable">
                  <Switch
                    checked={!!this.state.expandedRowRender}
                    onChange={this.handleExpandChange}
                  />
                </Form.Item>
                <Form.Item label="Checkbox">
                  <Switch
                    checked={!!this.state.rowSelection}
                    onChange={this.handleRowSelectionChange}
                  />
                </Form.Item>
                <Form.Item label="Fixed Header">
                  <Switch checked={!!this.state.scroll} onChange={this.handleScollChange} />
                </Form.Item>
                <Form.Item label="Has Data">
                  <Switch checked={!!this.state.hasData} onChange={this.handleDataChange} />
                </Form.Item>
                <Form.Item label="Ellipsis">
                  <Switch checked={!!this.state.ellipsis} onChange={this.handleEllipsisChange} />
                </Form.Item>
                <Form.Item label="Size">
                  <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="middle">Middle</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Table Layout">
                  <Radio.Group
                    value={this.state.tableLayout}
                    onChange={this.handleTableLayoutChange}
                  >
                    <Radio.Button value={undefined}>Unset</Radio.Button>
                    <Radio.Button value="fixed">Fixed</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Pagination">
                  <Radio.Group
                    value={this.state.pagination ? this.state.pagination.position : 'none'}
                    onChange={this.handlePaginationChange}
                  >
                    <Radio.Button value="top">Top</Radio.Button>
                    <Radio.Button value="bottom">Bottom</Radio.Button>
                    <Radio.Button value="both">Both</Radio.Button>
                    <Radio.Button value="none">None</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
              <Table
                {...this.state}
                columns={columns.map(item => ({ ...item, ellipsis: this.state.ellipsis }))}
                dataSource={this.state.hasData ? data : null}
              />
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Pagination example:</h3>
            <Pagination showSizeChanger defaultCurrent={3} total={500} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <h3 className="demo-block-title">Grid System example:</h3>
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
  }
}

class App extends React.Component {
  state = {
    direction: 'ltr',
    popupPlacement: 'bottomLeft',
  };

  changeDirection = e => {
    const directionValue = e.target.value;
    this.setState({ direction: directionValue });
    if (directionValue === 'rtl') {
      this.setState({ popupPlacement: 'bottomRight' });
    } else {
      this.setState({ popupPlacement: 'bottomLeft' });
    }
  };

  render() {
    const { direction } = this.state;
    return (
      <div>
        <div className="change-direction">
          <span style={{ marginRight: 16 }}>Change direction of components: </span>
          <Radio.Group defaultValue="ltr" onChange={this.changeDirection}>
            <Radio.Button key="ltr" value="ltr">
              LTR
            </Radio.Button>
            <Radio.Button key="rtl" value="rtl">
              RTL
            </Radio.Button>
          </Radio.Group>
        </div>
        <ConfigProvider direction={direction}>
          <Page className={direction} popupPlacement={this.state.popupPlacement} />
        </ConfigProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.direction-components {
  padding-top: 16px;
  border-top: 1px solid #d9d9d9;
}

.example {
  margin: 16px 0;
}

.example > * {
  margin-right: 8px;
}

.change-direction {
  margin-bottom: 16px;
}
.demo-block-title {
  margin-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
}
```
