import React from 'react';
import { render } from 'enzyme';
import Table from '..';

const columns = [
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
];

const columnsFixed = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'address',
    fixed: 'right',
    width: 100,
  },
];

describe('Table', () => {
  it('renders empty table', () => {
    const wrapper = render(<Table dataSource={[]} columns={columns} pagination={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty table with fixed columns', () => {
    const wrapper = render(
      <Table dataSource={[]} columns={columnsFixed} pagination={false} scroll={{ x: 1 }} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty table with custom emptyText', () => {
    const wrapper = render(
      <Table
        dataSource={[]}
        columns={columns}
        pagination={false}
        locale={{ emptyText: 'custom empty text' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty table without emptyText when loading', () => {
    const wrapper = render(<Table dataSource={[]} columns={columns} loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
