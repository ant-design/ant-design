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
    wrapper.find('.ant-table-row-expand-icon').last().simulate('click');
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

    wrapper.find('.ant-table-row-expand-icon').first().simulate('click');
    expect(
      wrapper
        .find('.ant-table-row-expand-icon')
        .first()
        .hasClass('ant-table-row-expand-icon-expanded'),
    ).toBeTruthy();

    wrapper.find('.ant-table-row-expand-icon').first().simulate('click');
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

  describe('expandIconColumnIndex', () => {
    it('basic', () => {
      const wrapper = mount(
        <Table
          columns={[{ dataIndex: 'key' }]}
          dataSource={[{ key: 'bamboo' }]}
          expandable={{
            expandIconColumnIndex: 1,
            expandedRowRender: () => '',
          }}
        />,
      );

      expect(wrapper.find('td').at(0).text()).toEqual('bamboo');
      expect(wrapper.find('td').at(1).find('.ant-table-row-expand-icon').length).toBeTruthy();
    });

    it('work with selection', () => {
      const wrapper = mount(
        <Table
          columns={[{ dataIndex: 'key' }]}
          dataSource={[{ key: 'bamboo' }]}
          expandable={{
            expandIconColumnIndex: 2,
            expandedRowRender: () => '',
          }}
          rowSelection={{}}
        />,
      );

      expect(wrapper.find('td').at(0).find('.ant-checkbox-input').length).toBeTruthy();
      expect(wrapper.find('td').at(1).text()).toEqual('bamboo');
      expect(wrapper.find('td').at(2).find('.ant-table-row-expand-icon').length).toBeTruthy();
    });
  });

  describe('nest children', () => {
    [null, undefined].forEach(children => {
      it(String(children), () => {
        const wrapper = mount(
          <Table
            columns={[{ dataIndex: 'key' }]}
            dataSource={[{ key: 1, children }]}
            rowSelection={{}}
          />,
        );
        expect(
          wrapper.find('tbody tr').last().find('td').first().find('.ant-table-row-expand-icon')
            .length,
        ).toBeFalsy();
        expect(
          wrapper.find('tbody tr').last().find('td').last().find('.ant-table-row-expand-icon')
            .length,
        ).toBeTruthy();
      });
    });
  });
});
