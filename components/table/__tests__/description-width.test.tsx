import React from 'react';
import { render } from '@testing-library/react';

import { Table, Descriptions } from '../../index';

describe('Table Description Width', () => {
  it('should constrain Description width when table has scroll x max-content', () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Description',
        render: () => (
          <Descriptions data-testid="description-component">
            <Descriptions.Item label="Product">高精度移液器套装</Descriptions.Item>
            <Descriptions.Item label="Number">1234567890</Descriptions.Item>
          </Descriptions>
        ),
      },
    ];

    const dataSource = [
      {
        key: '1',
        name: 'John Brown',
      },
    ];

    const { container } = render(
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    );

    const descriptionElement = container.querySelector('[data-testid="description-component"]');
    expect(descriptionElement).toBeInTheDocument();
    
    // Check if the table has scroll-horizontal class
    const tableElement = container.querySelector('.ant-table-scroll-horizontal');
    expect(tableElement).toBeInTheDocument();
  });

  it('should constrain Description width in expanded rows when table has scroll x max-content', () => {
    const columns = [
      {
        title: 'Name', 
        dataIndex: 'name',
      },
    ];

    const dataSource = [
      {
        key: '1',
        name: 'John Brown',
      },
    ];

    const expandedRowRender = () => (
      <Descriptions data-testid="expanded-description">
        <Descriptions.Item label="Product">高精度移液器套装</Descriptions.Item>
        <Descriptions.Item label="Number">1234567890</Descriptions.Item>
      </Descriptions>
    );

    const { container } = render(
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        pagination={false}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['1'],
        }}
      />
    );

    const expandedDescription = container.querySelector('[data-testid="expanded-description"]');
    expect(expandedDescription).toBeInTheDocument();
    
    // Check if the table has scroll-horizontal class
    const tableElement = container.querySelector('.ant-table-scroll-horizontal');
    expect(tableElement).toBeInTheDocument();
  });
});