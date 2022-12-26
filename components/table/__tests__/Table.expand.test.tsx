/* eslint-disable react/no-multi-comp */
import React from 'react';
import Table from '..';
import { fireEvent, render } from '../../../tests/utils';

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
    const { container, asFragment } = render(<Table columns={columns} dataSource={data} />);
    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('expandRowByClick should not block click icon', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={[John, Jim]}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: () => '',
        }}
      />,
    );
    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(container.querySelector('.ant-table-row-expand-icon-expanded')).toBeTruthy();

    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(container.querySelector('.ant-table-row-expand-icon-collapsed')).toBeTruthy();
  });

  it('show expandIcon', () => {
    const { container } = render(
      <Table
        columns={[{ dataIndex: 'key' }]}
        dataSource={[{ key: 233 }]}
        expandable={{
          expandIcon: () => <div className="expand-icon" />,
        }}
      />,
    );
    expect(container.querySelectorAll('.expand-icon')).toHaveLength(1);
  });

  it('row indent padding should be 0px when indentSize defined as 0', () => {
    const { container } = render(<Table indentSize={0} columns={columns} dataSource={data} />);

    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(container.querySelector<HTMLElement>('.indent-level-1')?.style.paddingLeft).toEqual(
      '0px',
    );
  });

  it('has right aria-expanded state', () => {
    const { container } = render(<Table columns={columns} dataSource={data} />);
    expect(container.querySelector('[aria-expanded=false]')).toBeTruthy();
    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(container.querySelector('[aria-expanded=true]')).toBeTruthy();
  });

  describe('expandIconColumnIndex', () => {
    it('basic', () => {
      const { container } = render(
        <Table
          columns={[{ dataIndex: 'key' }]}
          dataSource={[{ key: 'bamboo' }]}
          expandable={{
            expandIconColumnIndex: 1,
            expandedRowRender: () => '',
          }}
        />,
      );

      // header has td element (a11y): https://github.com/react-component/table/pull/859
      const tdNodeList = container.querySelectorAll('tbody td');

      expect(tdNodeList[0].textContent).toEqual('bamboo');
      expect(tdNodeList[1].querySelector('.ant-table-row-expand-icon')).toBeTruthy();
    });

    it('work with selection', () => {
      const { container } = render(
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
      const tdNodeList = container.querySelectorAll('tbody td');
      expect(tdNodeList[0].querySelector('.ant-checkbox-input')).toBeTruthy();
      expect(tdNodeList[1].textContent).toEqual('bamboo');
      expect(tdNodeList[2].querySelector('.ant-table-row-expand-icon')).toBeTruthy();
    });
  });
});
