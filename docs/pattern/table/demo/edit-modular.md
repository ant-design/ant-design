---
order: 2
title: 模块编辑
---

适用在易编辑性高于易读性时，适用在有一定数量的项需要编辑时。

1.通过 `handleEdit` 函数收集数据，缓存到一个本地对象。

2.通过 `changeEditState` 函数控制编辑操作和状态，处理异步请求。

```jsx

import { Table, Select, Input } from 'antd';
const Option = Select.Option;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    // 绑定this
    this.handleEdit = this.handleEdit.bind(this);
    this.changeEditState = this.changeEditState.bind(this);

    this.columns = [
      {
        title: '订单编号',
        dataIndex: 'businessNumber',
        key: 'businessNumber',
        render: (text) => {
          return <a>{text}</a>;
        }
      },
      {
        title: '买家',
        dataIndex: 'customer',
        key: 'customer',

        // 你可以使用width来固定单元格的宽度, 避免切换时候的抖动
        width: 200,
        render: (text, record, index) => {
          return (
            <div>
              {
                this.state.editable[index] ?
                  <Select className="customer-selector" defaultValue={text} onChange={(value) => this.handleEdit(index, 'customer', value)}>
                    {
                      props.customerList.map((c, i) => <Option value={c} key={i}>{c}</Option>)
                    }
                  </Select>
                  :
                  <span>{text}</span>
              }
            </div>
          );
        }
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        width: 400,
        render: (text, record, index) => {
          return (
            <div>
              {
                this.state.editable[index] ?
                  <Input type="text" defaultValue={text} onChange={(e) => this.handleEdit(index, 'detail', e.target.value)} />
                  :
                  <span>{text}</span>
              }
            </div>
          );
        }
      },
      {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        width: 160,
        render: (text, record, index) => {
          return (
            <div>
              {
                this.state.editable[index] ?
                  <p>
                    <a onClick={ () => this.changeEditState('save', index) } >保存</a>
                    <span style={ { color: '#DEDEDE', display: 'inline-block', padding: '0 5px', transform: 'scale(1, 0.6)' } } > | </span>
                    <a onClick={ () => this.changeEditState('cancel', index) } >取消</a>
                  </p>
                  :
                  <a onClick={ () => this.changeEditState('edit', index) } >编辑</a>
              }
            </div>
          );
        }
      }
    ];

    this.state = {
      // 是否能够编辑的状态存储
      editable: {},

      // 独立的数据存储
      // 因为需要更新数据, 所以存到state上面, 不推荐直接修改props上的数据
      dataSource: props.dataSource
    };

    // 用于保存编辑状态的数据
    this.editCache = {};
  }

  // 监听外部props的变化, 如果变化了需要更新组件的state
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource
      });
    }

    if (nextProps.customerList !== this.props.customerList) {
      this.setState({
        customerList: nextProps.customerList
      });
    }
  }

  changeEditState(type, index) {
    switch (type) {
      case 'edit':
        this.setState({
          editable: { ...this.state.editable, [index]: true }
        });
        break;

      case 'save':
        // 如果有更新, 则更新数据
        // 发送异步请求也在这里
        // 需要注意重复点击, 请自行控制
        if (this.editCache[index]) {
          // 调用接口请求修改名称，成功后则可调用 this.setState 来设置 dataSource
          // 在这里例子中，需要保证的是 dataSource 为 immutable data
          setTimeout(() => {
            let dataSource = [...this.state.dataSource];
            dataSource[index] = this.editCache[index];

            let oldData = this.state.dataSource;

            this.setState({
              editable: { ...this.state.editable, [index]: false },
              dataSource
            });

            if (this.props.onChange) {
              this.props.onChange(oldData, dataSource);
            }
          }, 200);
        } else {
          this.setState({
            editable: { ...this.state.editable, [index]: false },
          });
        }
        break;

      case 'cancel':
        // 清空数据缓存
        this.editCache[index] = undefined;

        this.setState({
          editable: { ...this.state.editable, [index]: false }
        });
        break;

      default:
        break;
    }
  }

  handleEdit(index, key, value) {
    // 暂存编辑中数据
    if (!this.editCache[index]) {
      this.editCache[index] = { ...this.state.dataSource[index] };
    }

    this.editCache[index][key] = value;
  }

  render() {
    const dataSource = this.state.dataSource;
    return (
      <Table columns={this.columns} pagination={false} bordered dataSource={dataSource} />
    );
  }
}


// 使用
const mockData = [
  {
    businessNumber: '1234567890',
    customer: '竹卢',
    detail: '这个一个描述, 是的, 是一个很长的描述, 嗯, 是个描述',
    key: 0
  },
  {
    businessNumber: '0987654321',
    customer: '水鱼',
    detail: '这个一个描述, 是的, 是一个很长的描述, 嗯, 是个描述',
    key: 1
  }
];

const mockCustomerList = ['竹卢', '乐仪', '水鱼', '徐干', '左宜'];

ReactDOM.render(
  <EditableTable
    dataSource={ mockData }
    customerList={ mockCustomerList }
    onChange={ (oldData, newData) => console.log(oldData, newData) }
  />, mountNode);
```

