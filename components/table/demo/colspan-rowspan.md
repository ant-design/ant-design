---
order: 13
title:
  en-US: colSpan and rowSpan
  zh-CN: 表格行/列合并
---

## zh-CN

表头只支持列合并，使用 column 里的 colSpan 进行设置。

表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。

## en-US

Table column title supports `colSpan` that set in `column`.

Table cell supports `colSpan` and `rowSpan` that set in render return object. When each of them is set to `0`, the cell will not be rendered.

````jsx
import { Table } from 'antd';

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = function (value, row, index) {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render(text, row, index) {
    if (index < 4) {
      return <a href="#">{text}</a>;
    }
    return {
      children: <a href="#">{text}</a>,
      props: {
        colSpan: 5,
      },
    };
  },
}, {
  title: '年龄',
  dataIndex: 'age',
  render: renderContent,
}, {
  title: '家庭电话',
  colSpan: 2,
  dataIndex: 'tel',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 2) {
      obj.props.rowSpan = 2;
    }
    // These two are merged into above cell
    if (index === 3) {
      obj.props.rowSpan = 0;
    }
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  },
}, {
  title: '手机号',
  colSpan: 0,
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: '住址',
  dataIndex: 'address',
  render: renderContent,
}];

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: '西湖区湖底公园1号',
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '西湖区湖底公园1号',
}, {
  key: '4',
  name: '李夫人',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '西湖区湖底公园1号',
}, {
  key: '5',
  name: '习大大',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: '西湖区湖底公园1号',
}];

ReactDOM.render(<Table columns={columns} dataSource={data} bordered />
, mountNode);
````
