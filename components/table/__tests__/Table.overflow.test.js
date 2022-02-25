import React from 'react';
import { mount } from 'enzyme';
import Table from '..';

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  { title: 'Long Column Title', dataIndex: 'address', key: '1' },
  { title: 'Long Column Title', dataIndex: 'address', key: '2' },
  { title: 'Long Column Title', dataIndex: 'address', key: '3' },
  { title: 'Long Column Title', dataIndex: 'address', key: '4' },
  { title: 'Long Column Title', dataIndex: 'address', key: '5' },
  { title: 'Long Column Title', dataIndex: 'address', key: '6' },
  { title: 'Long Column Title', dataIndex: 'address', key: '7' },
  { title: 'Long Column Title', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'address',
    width: 100,
  },
];

const data = [...Array(10).keys()].map(item =>
  columns.reduce((result, column) => {
    result[column.key] = 'This is long long line data';
    result.name = `${item}-name`;
    return result;
  }, {}),
);

describe('Table.overflow', () => {
  it('render overflow table', () => {
    const wrapper = mount(
      <div style={{ width: 200 }}>
        {/* eslint-disable-next-line react/jsx-key */}
        <Table rowKey={'name'} dataSource={data} columns={columns} />
      </div>,
    );

    expect(wrapper).toMatchSnapshot();

    const containerDom = wrapper.find('.ant-table-content').getDOMNode();
    expect(containerDom.scrollLeft).toBe(0);

    // containerDom.scrollTo(100,100); // 没有。。。
    containerDom.scrollLeft = 100;

    expect(containerDom.scrollLeft).toBe(100);
  });
});
