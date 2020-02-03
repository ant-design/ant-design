/* eslint-disable react/no-multi-comp */
import React from 'react';
import { mount } from 'enzyme';
import Table from '..';

const columns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
];

const John = {
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
};

const Jim = {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
};

const data = [
  {
    ...John,

    children: [
      {
        ...Jim,
      },
    ],
  },
];

describe('Table.expand', () => {
  it('click to expand', () => {
    const wrapper = mount(<Table columns={columns} dataSource={data} />);
    wrapper
      .find('.ant-table-row-expand-icon')
      .last()
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support expandIconColumnIndex', () => {
    const wrapper = mount(<Table columns={[]} dataSource={data} expandIconColumnIndex={1} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('expandRowByClick should not block click icon', () => {
    const wrapper = mount(
      <Table
        columns={columns}
        dataSource={[John, Jim]}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: () => '',
        }}
      />,
    );

    wrapper
      .find('.ant-table-row-expand-icon')
      .first()
      .simulate('click');
    expect(
      wrapper
        .find('.ant-table-row-expand-icon')
        .first()
        .hasClass('ant-table-row-expand-icon-expanded'),
    ).toBeTruthy();

    wrapper
      .find('.ant-table-row-expand-icon')
      .first()
      .simulate('click');
    expect(
      wrapper
        .find('.ant-table-row-expand-icon')
        .first()
        .hasClass('ant-table-row-expand-icon-collapsed'),
    ).toBeTruthy();
  });

  it('show expandIcon', () => {
    const wrapper = mount(
      <Table
        columns={[{ dataIndex: 'key' }]}
        dataSource={[{ key: 233 }]}
        expandable={{
          expandIcon: () => <div className="expand-icon" />,
        }}
      />,
    );

    expect(wrapper.find('.expand-icon')).toHaveLength(1);
  });
});
