---
order: 0
title: 直接编辑
---

适用在易编辑性高于易读性时。

```jsx
import { Table, Select, Input, Switch } from 'antd';
const Option = Select.Option;

const mockData = [{
  businessNumber: '1234567890',
  customer: '林外',
  detail: '这个一个描述描述描述描述描述',
  emergency: true,
  key: 0,
}];

const mockCustomerList = ['林外', '本杰'];

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '订单编号',
      dataIndex: 'businessNumber',
      key: 'businessNumber',
      render(number) {
        return <a>{number}</a>;
      },
    }, {
      title: '买家',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer, record) => {
        return (
          <Select className="customer-selector" defaultValue={customer}
            onChange={(value) => this.handleEdit(record.key, 'customer', value)}
          >
            {
              props.customerList.map((c, i) =>
                <Option value={c} key={i}>{c}</Option>)
            }
          </Select>
        );
      }
    }, {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
      render: (detail, record) => {
        return (
          <Input type="text" defaultValue={detail}
            onChange={(e) => this.handleEdit(record.key, 'detail', e.target.value)}
          />
        );
      }
    }, {
      title: '加急',
      dataIndex: 'emergency',
      key: 'emergency',
      render: (emergency, record) => {
        return (
          <Switch checkedChildren="Y" unCheckedChildren="N"
            defaultChecked={emergency}
            onChange={(value) => this.handleEdit(record.key, 'emergency', value)}
          />
        );
      }
    }];
  }

  handleEdit(key, field, value) {
    const recordToBeEdited = this.props.dataSource
      .find((record) => record.key === key);
    const editedRecord = {
      ...recordToBeEdited,
      [field]: value,
    };

    // Send edited data to server in real world.
    console.log(editedRecord);
  }

  render() {
    const props = this.props;
    return (
      <Table columns={this.columns} pagination={false} bordered
        dataSource={props.dataSource} />
    );
  }
}

ReactDOM.render(
  <EditableTable
    dataSource={mockData}
    customerList={mockCustomerList}
  />);
```

```css
.customer-selector {
  width: 100%;
}
```
