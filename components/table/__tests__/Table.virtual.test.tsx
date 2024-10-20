import React from 'react';

import Table from '..';
import { render } from '../../../tests/utils';

describe('Table.Virtual', () => {
  it('should work', () => {
    const { container } = render(
      <Table
        virtual
        scroll={{ x: 100, y: 100 }}
        columns={[
          {
            dataIndex: 'key',
          },
        ]}
        dataSource={[
          {
            key: 'bamboo',
          },
        ]}
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
    ).toEqual('bamboo');
  });

  // warning from `rc-table`
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
        columns={[
          {
            dataIndex: 'key',
          },
        ]}
        dataSource={[
          {
            key: 'bamboo',
          },
        ]}
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
    ).toEqual('bamboo');
    const styleMap = getComputedStyle(
      container.querySelector<HTMLElement>(
        '.ant-table-wrapper .ant-table-tbody-virtual .ant-table-row',
      )!,
    );
    expect(styleMap.display).toEqual('flex');
  });

  it('should work with sub table', () => {
    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      ];
      const data = [];
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
        columns={[
          {
            dataIndex: 'key',
          },
        ]}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={[
          {
            key: '0',
          },
        ]}
        size="middle"
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
    ).toEqual('0');

    expect(
      container.querySelectorAll('.ant-table-tbody-virtual-holder .ant-table-expanded-row'),
    ).toHaveLength(1);

    const styleMap = getComputedStyle(
      container.querySelector<HTMLElement>(
        '.ant-table-tbody-virtual-holder .ant-table-expanded-row .ant-table-row',
      )!,
    );
    expect(styleMap.display).toEqual('table-row');
  });
});
