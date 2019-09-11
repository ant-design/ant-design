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

**Note:** `ConfigProvider: direction` just affects direction of the ant-design componenents, you should wrap your elements or form with `.rtl | .ltr` class to change direction of other elements.

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
  Icon,
} from 'antd';

const InputGroup = Input.Group;
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

class Page extends React.Component {
  onCascaderChange = value => {
    console.log(value);
  };

  cascaderFilter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
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
  render() {
    return (
      <div className="direction-components example">
        <Cascader
          suffixIcon={<Icon type="smile" />}
          options={cascaderOptions}
          onChange={this.onCascaderChange}
          placeholder="یک مورد انتخاب کنید"
          popupPlacement={this.props.popupPlacement}
        />
        &nbsp;&nbsp;&nbsp;&nbsp; With search:
        <Cascader
          suffixIcon={<Icon type="search" />}
          options={cascaderOptions}
          onChange={this.onCascaderChange}
          placeholder="Select an item"
          popupPlacement={this.props.popupPlacement}
          showSearch={this.cascaderFilter}
        />
        &nbsp;&nbsp;
        <Switch defaultChecked />
        &nbsp;&nbsp;
        <Switch loading defaultChecked />
        &nbsp;&nbsp;
        <Switch size="small" loading />
        <div>
          <Tree
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
        </div>
        <br />
        <div>
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
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select defaultValue="lucy" style={{ width: 120 }} disabled>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select defaultValue="lucy" style={{ width: 120 }} loading>
            <Option value="lucy">Lucy</Option>
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
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>
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
  border-top: 1px solid #d9d9d9;
  padding-top: 16px;
}

.example {
  margin: 16px 0;
}

.example > * {
  margin-right: 8px;
}

[dir='rtl'] .example > * {
  margin-right: auto;
  margin-left: 8px;
}

.change-direction {
  margin-bottom: 16px;
}
```
