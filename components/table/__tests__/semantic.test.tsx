import React from 'react';

import type { TableProps } from '..';
import Table from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Table', () => {
  mountTest(Table);
  it('test classNames and styles', () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];

    const data = [
      {
        key: '1',
        name: 'thinkasany',
        age: 24,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
      },
      {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
      },
      {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
      },
    ];
    const testClassNames = {
      root: 'test-root',
      section: 'test-section',
      title: 'test-title',
      footer: 'test-footer',
      content: 'test-content',
      body: {
        wrapper: 'test-body-wrapper',
        cell: 'test-body-cell',
        row: 'test-body-row',
      },
      header: {
        wrapper: 'test-header-wrapper',
        cell: 'test-header-cell',
        row: 'test-header-row',
      },
      pagination: {
        root: 'test-pagination-root',
        item: 'test-pagination-item',
      },
    };
    const testStyles = {
      root: { background: 'gray' },
      section: { background: 'red' },
      title: { background: 'green' },
      footer: { background: 'pink' },
      content: { background: 'purple' },
      body: {
        wrapper: { background: 'cyan' },
        cell: { background: 'lime' },
        row: { background: 'teal' },
      },
      header: {
        wrapper: { background: 'magenta' },
        cell: { background: 'gold' },
        row: { background: 'silver' },
      },
      pagination: {
        root: { background: 'blue' },
        item: { background: 'orange' },
      },
    };
    const { container } = render(
      <Table
        styles={testStyles}
        classNames={testClassNames}
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{ pageSize: 3 }}
        title={() => <>table title</>}
        footer={() => <>table footer</>}
      />,
    );
    const root = container.querySelector('.ant-table-wrapper');
    const section = container.querySelector('.ant-table-container');
    const title = container.querySelector('.ant-table-title');
    const footer = container.querySelector('.ant-table-footer');
    const content = container.querySelector('.ant-table-content');
    const headerWrapper = container.querySelector('.ant-table-thead');
    const headerCell = container.querySelector('.ant-table-cell');
    const headerRow = container.querySelector('tr');
    const bodyWrapper = container.querySelector('.ant-table-tbody');
    const bodyCell = container.querySelector('.ant-table-tbody .ant-table-cell');
    const bodyRow = container.querySelector('.ant-table-row');
    const paginationRoot = container.querySelector('.ant-pagination');
    const paginationItem = container.querySelector('.ant-pagination-item');

    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(section).toHaveClass(testClassNames.section);
    expect(section).toHaveStyle(testStyles.section);
    expect(title).toHaveClass(testClassNames.title);
    expect(title).toHaveStyle(testStyles.title);
    expect(footer).toHaveClass(testClassNames.footer);
    expect(footer).toHaveStyle(testStyles.footer);
    expect(content).toHaveClass(testClassNames.content);
    expect(content).toHaveStyle(testStyles.content);

    expect(headerWrapper).toHaveClass(testClassNames.header.wrapper);
    expect(headerWrapper).toHaveStyle(testStyles.header.wrapper);
    expect(headerCell).toHaveClass(testClassNames.header.cell);
    expect(headerCell).toHaveStyle({ background: testStyles.header.cell.background });
    expect(headerRow).toHaveClass(testClassNames.header.row);
    expect(headerRow).toHaveStyle(testStyles.header.row);
    expect(bodyWrapper).toHaveClass(testClassNames.body.wrapper);
    expect(bodyWrapper).toHaveStyle(testStyles.body.wrapper);
    expect(bodyCell).toHaveClass(testClassNames.body.cell);
    expect(bodyCell).toHaveStyle(testStyles.body.cell);
    expect(bodyRow).toHaveClass(testClassNames.body.row);
    expect(bodyRow).toHaveStyle(testStyles.body.row);
    expect(paginationRoot).toHaveClass(testClassNames.pagination.root);
    expect(paginationRoot).toHaveStyle(testStyles.pagination.root);
    expect(paginationItem).toHaveClass(testClassNames.pagination.item);
    expect(paginationItem).toHaveStyle(testStyles.pagination.item);

    const classNameCounts = {
      root: 1,
      section: 1,
      title: 1,
      footer: 1,
      content: 1,
      'body.wrapper': 1,
      'body.cell': 9,
      'body.row': 3,
      'header.wrapper': 1,
      'header.cell': 3,
      'header.row': 1,
      'pagination.root': 1,
      'pagination.item': 4,
    };

    const toFlatObject = (obj: any, parentKey = '') => {
      return Object.entries(obj).reduce<Record<PropertyKey, string>>((acc, [key, value]) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === 'object') {
          Object.assign(acc, toFlatObject(value, newKey));
        } else if (typeof value === 'string') {
          acc[newKey] = value;
        }
        return acc;
      }, {});
    };

    const flatTestClassNames = toFlatObject(testClassNames);

    Object.entries(classNameCounts).forEach(([className, expectedCount]) => {
      const elements = container.getElementsByClassName(flatTestClassNames[className]);
      expect(elements.length).toBe(expectedCount);
    });
  });

  it('should work with function classNames and styles', () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John',
        age: 25,
      },
      {
        key: '2',
        name: 'Jane',
        age: 30,
      },
    ];

    const functionClassNames: TableProps['classNames'] = (info) => ({
      root: info.props.bordered ? 'test-bordered-root' : 'test-borderless-root',
      header: {
        wrapper: info.props.size === 'small' ? 'test-header-small' : 'test-header-default',
      },
      body: {
        wrapper: 'test-body-dynamic',
      },
      pagination: {
        root: 'test-pagination-function',
      },
    });

    const functionStyles: TableProps['styles'] = (info) => ({
      root: {
        border: info.props.bordered ? '2px solid blue' : '1px solid gray',
      },
      header: {
        wrapper: {
          backgroundColor: info.props.size === 'small' ? '#e6f7ff' : '#f6ffed',
        },
      },
      body: {
        wrapper: {
          backgroundColor: '#fffbe6',
        },
      },
      pagination: {
        root: {
          borderTop: '1px solid #d9d9d9',
        },
      },
    });

    const { container } = render(
      <Table
        columns={columns}
        dataSource={data}
        classNames={functionClassNames}
        styles={functionStyles}
        size="small"
        bordered
        pagination={{ pageSize: 2 }}
      />,
    );

    const root = container.querySelector('.ant-table-wrapper');
    const header = container.querySelector('.ant-table-thead');
    const body = container.querySelector('.ant-table-tbody');
    const pagination = container.querySelector('.ant-pagination');

    // Check function-based classNames
    expect(root).toHaveClass('test-bordered-root');
    expect(header).toHaveClass('test-header-small');
    expect(body).toHaveClass('test-body-dynamic');
    expect(pagination).toHaveClass('test-pagination-function');

    // Check function-based styles
    expect(root).toHaveStyle({
      border: '2px solid blue',
    });
    expect(header).toHaveStyle({
      backgroundColor: '#e6f7ff',
    });
    expect(body).toHaveStyle({
      backgroundColor: '#fffbe6',
    });
    expect(pagination).toHaveStyle({
      borderTop: '1px solid #d9d9d9',
    });
  });
});
