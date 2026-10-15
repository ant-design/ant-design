import React from 'react';

import Table from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Table.Virtual', () => {
  it('should work', () => {
    const { container } = render(
      <Table
        virtual
        scroll={{ x: 100, y: 100 }}
        columns={[{ dataIndex: 'key' }]}
        dataSource={[{ key: 'bamboo' }]}
      />,
    );

    expect(
      container.querySelectorAll(
        '.ant-table-wrapper .ant-table-tbody-virtual .ant-table-row:not(tr)',
      ),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder .ant-table-cell'),
    ).toHaveLength(1);
    expect(
      container.querySelector('.ant-table-tbody-virtual-holder .ant-table-cell')?.textContent,
    ).toBe('bamboo');
  });

  // warning from `rc-component/table`
  it('warning if no scroll', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Table virtual />);

    expect(errSpy).toHaveBeenCalledWith('Warning: `scroll.y` in virtual table must be number.');
    errSpy.mockRestore();
  });

  it('should work with edit cell', () => {
    const EditableRow: React.FC = ({ ...props }) => <tr {...props} />;

    const EditableCell: React.FC<React.PropsWithChildren<any>> = ({ children, ...restProps }) => (
      <td {...restProps}>{children}</td>
    );

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const { container } = render(
      <Table
        virtual
        components={components}
        scroll={{ y: 100 }}
        columns={[{ dataIndex: 'key' }]}
        dataSource={[{ key: 'bamboo' }]}
      />,
    );

    expect(
      container.querySelectorAll('.ant-table-wrapper .ant-table-tbody-virtual .ant-table-row'),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder .ant-table-cell'),
    ).toHaveLength(1);
    expect(
      container.querySelector('.ant-table-tbody-virtual-holder .ant-table-cell')?.textContent,
    ).toBe('bamboo');
    expect(
      container.querySelector<HTMLElement>(
        '.ant-table-wrapper .ant-table-tbody-virtual .ant-table-row',
      ),
    ).toHaveStyle({ display: 'flex' });
  });

  it('should work with sub table', () => {
    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      ];
      const data: any[] = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i.toString(),
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    const { container } = render(
      <Table
        columns={[{ dataIndex: 'key' }]}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={[{ key: '0' }]}
        size="medium"
        virtual
        scroll={{ y: 200 }}
      />,
    );

    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder-inner > div > .ant-table-row'),
    ).toHaveLength(1);

    expect(
      container.querySelectorAll(
        '.ant-table-tbody-virtual-holder-inner > div > .ant-table-row > .ant-table-cell',
      )?.[1]?.textContent,
    ).toBe('0');

    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder .ant-table-expanded-row'),
    ).toHaveLength(1);

    expect(
      container.querySelector<HTMLElement>(
        '.ant-table-tbody-virtual-holder .ant-table-expanded-row .ant-table-row',
      ),
    ).toHaveStyle({ display: 'table-row' });
  });

  it('should support columnWidth from token', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            Table: {
              selectionColumnWidth: 200,
            },
          },
        }}
      >
        <Table
          columns={[{ dataIndex: 'key' }]}
          dataSource={[{ key: '0' }]}
          virtual
          scroll={{ y: 0 }}
          rowSelection={{}}
        />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-table-selection-col')).toHaveStyle({ width: '200px' });
  });

  it('should support custom columnWidth priority over token', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            Table: {
              selectionColumnWidth: 200,
            },
          },
        }}
      >
        <Table
          columns={[{ dataIndex: 'key' }]}
          dataSource={[{ key: '0' }]}
          virtual
          scroll={{ y: 0 }}
          rowSelection={{ columnWidth: 50 }}
        />
      </ConfigProvider>,
    );
    expect(container.querySelector('.ant-table-selection-col')).toHaveStyle({ width: '50px' });
  });

  // https://github.com/ant-design/ant-design/issues/56681
  describe('selection column width', () => {
    const columns = [
      { dataIndex: 'name', width: 150, fixed: 'start' as const },
      { dataIndex: 'age', width: 150, fixed: 'start' as const },
    ];
    const dataSource = [{ key: '0', name: 'bamboo', age: 1 }];

    const getSelectionCell = (container: HTMLElement) =>
      container.querySelector<HTMLElement>(
        '.ant-table-tbody-virtual-holder .ant-table-cell.ant-table-selection-column',
      );

    it('should not be squeezed when other columns fill the scroll width', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={dataSource}
          virtual
          scroll={{ x: 300, y: 100 }}
          rowSelection={{}}
        />,
      );
      expect(getSelectionCell(container)).toHaveStyle({ width: '32px' });
    });

    it('should include the selections dropdown width', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={dataSource}
          virtual
          scroll={{ x: 300, y: 100 }}
          rowSelection={{ type: 'checkbox', selections: true }}
        />,
      );
      expect(getSelectionCell(container)).toHaveStyle({ width: '48px' });
    });

    it('should include the bordered padding', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          virtual
          scroll={{ x: 300, y: 100 }}
          rowSelection={{}}
        />,
      );
      expect(getSelectionCell(container)).toHaveStyle({ width: '48px' });
    });

    it('should keep custom columnWidth', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={dataSource}
          virtual
          scroll={{ x: 300, y: 100 }}
          rowSelection={{ columnWidth: 60 }}
        />,
      );
      expect(getSelectionCell(container)).toHaveStyle({ width: '60px' });
    });
  });
});
