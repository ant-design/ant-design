import React from 'react';

import type { FormInstance } from '../../form';
import Form from '../../form';
import Input from '../../input';
import type { TableProps } from '..';
import Table from '..';
import { fireEvent, render } from '../../../tests/utils';

const columns: TableProps['columns'] = [
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
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('click to expand', () => {
    const { container, asFragment } = render(<Table columns={columns} dataSource={data} />);
    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('force renders expanded form fields before expansion', async () => {
    const formRef = React.createRef<FormInstance>();

    const { container } = render(
      <Form ref={formRef}>
        <Table
          columns={columns}
          dataSource={[John]}
          expandable={{
            forceRender: true,
            expandedRowRender: (record) => (
              <Form.Item
                name={['expanded', record.key]}
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input />
              </Form.Item>
            ),
          }}
        />
      </Form>,
    );

    expect(container.querySelector('.ant-table-expanded-row')).toHaveStyle({ display: 'none' });
    expect(container.querySelector('input')).toBeTruthy();
    await expect(formRef.current!.validateFields({ validateOnly: true })).rejects.toMatchObject({
      errorFields: [{ name: ['expanded', '1'], errors: ['Required'] }],
    });
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
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `expandable.expandIcon` is deprecated. Please use `components.ExpandIcon` instead.',
    );
  });

  describe('expand all', () => {
    const expandedRowRender = () => <div>Expanded content</div>;

    it('expands and collapses all rows on the current page', () => {
      const onExpandAll = jest.fn();
      const onExpandedRowsChange = jest.fn();
      const columnTitle = jest.fn(({ expandIcon }) => (
        <div className="expand-column-title">
          {expandIcon}
          <span>Details</span>
        </div>
      ));
      const { container } = render(
        <Table
          columns={columns}
          dataSource={[John, Jim, { ...John, key: '3' }]}
          locale={{ collapseAll: 'Collapse current page', expandAll: 'Expand current page' }}
          pagination={{ pageSize: 2 }}
          expandable={{
            columnTitle,
            expandedRowRender,
            onExpandAll,
            onExpandedRowsChange,
            showExpandAll: true,
          }}
        />,
      );

      const expandAllIcon = container.querySelector<HTMLButtonElement>(
        'thead .ant-table-row-expand-icon',
      )!;
      expect(columnTitle).toHaveBeenCalledWith({ expandIcon: expect.anything() });
      expect(container.querySelector('.expand-column-title')).toHaveTextContent('Details');
      expect(expandAllIcon).toHaveAccessibleName('Expand current page');
      expect(expandAllIcon).toHaveAttribute('aria-expanded', 'false');
      expect(expandAllIcon).toHaveClass('ant-table-row-expand-icon-collapsed');

      fireEvent.click(expandAllIcon);
      expect(expandAllIcon).toHaveAccessibleName('Collapse current page');
      expect(expandAllIcon).toHaveAttribute('aria-expanded', 'true');
      expect(expandAllIcon).toHaveClass('ant-table-row-expand-icon-expanded');
      expect(container.querySelectorAll('.ant-table-expanded-row')).toHaveLength(2);
      expect(onExpandAll).toHaveBeenLastCalledWith(true);
      expect(onExpandedRowsChange).toHaveBeenLastCalledWith(['1', '2']);

      fireEvent.click(expandAllIcon);
      expect(expandAllIcon).toHaveAttribute('aria-expanded', 'false');
      expect(onExpandAll).toHaveBeenLastCalledWith(false);
      expect(onExpandedRowsChange).toHaveBeenLastCalledWith([]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it.each([false, true])('uses components.ExpandIcon with legacy icon: %s', (withLegacyIcon) => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={[John, Jim]}
          pagination={false}
          components={{
            ExpandIcon: ({ type, record, expanded, expandable, onClick }) => (
              <button
                type="button"
                className={type === 'all' ? 'custom-expand-all-icon' : 'custom-expand-row-icon'}
                data-record-key={type === 'row' ? record.key : undefined}
                aria-expanded={expanded}
                disabled={!expandable}
                onClick={onClick}
              />
            ),
          }}
          expandable={{
            expandedRowRender,
            expandIcon: withLegacyIcon ? () => <span className="legacy-expand-icon" /> : undefined,
            showExpandAll: true,
          }}
        />,
      );

      expect(container.querySelector('thead .custom-expand-all-icon')).toBeTruthy();
      expect(container.querySelectorAll('tbody .custom-expand-row-icon')).toHaveLength(2);
      expect(container.querySelector('.legacy-expand-icon')).toBeFalsy();

      fireEvent.click(container.querySelector('.custom-expand-all-icon')!);
      expect(container.querySelectorAll('.ant-table-expanded-row')).toHaveLength(2);

      if (withLegacyIcon) {
        expect(warnSpy).toHaveBeenCalledWith(
          'Warning: [antd: Table] `expandable.expandIcon` is deprecated. Please use `components.ExpandIcon` instead.',
        );
      } else {
        expect(warnSpy).not.toHaveBeenCalled();
      }
    });

    it('keeps expandable.expandIcon as a row-only fallback', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={[John, Jim]}
          pagination={false}
          expandable={{
            expandedRowRender,
            expandIcon: ({ onExpand, record }) => (
              <button
                type="button"
                className="legacy-expand-icon"
                onClick={(event) => onExpand(record, event)}
              />
            ),
            showExpandAll: true,
          }}
        />,
      );

      expect(container.querySelector('thead .ant-table-row-expand-icon')).toBeTruthy();
      expect(container.querySelector('thead .legacy-expand-icon')).toBeFalsy();
      expect(container.querySelectorAll('tbody .legacy-expand-icon')).toHaveLength(2);

      fireEvent.click(container.querySelector('tbody .legacy-expand-icon')!);
      expect(container.querySelectorAll('.ant-table-expanded-row')).toHaveLength(1);
    });

    it('does not remount inline legacy expand icons on rerender', () => {
      const onMount = jest.fn();
      const LegacyIcon = ({
        label,
        onExpand,
        record,
      }: {
        label: string;
        onExpand: (record: typeof John, event: React.MouseEvent<HTMLElement>) => void;
        record: typeof John;
      }) => {
        React.useEffect(() => {
          onMount();
        }, []);

        return (
          <button
            type="button"
            className="stateful-legacy-icon"
            onClick={(event) => onExpand(record, event)}
          >
            {label}
          </button>
        );
      };
      const renderTable = (label: string) => (
        <Table<typeof John>
          columns={[{ dataIndex: 'firstName', title: 'Name' }]}
          dataSource={[John, Jim]}
          pagination={false}
          expandable={{
            expandedRowRender,
            expandIcon: (props) => <LegacyIcon {...props} label={label} />,
          }}
        />
      );
      const { container, rerender } = render(renderTable('First'));

      const initialMountCount = onMount.mock.calls.length;
      expect(initialMountCount).toBeGreaterThan(0);
      rerender(renderTable('Second'));
      expect(onMount).toHaveBeenCalledTimes(initialMountCount);
      expect(
        [...container.querySelectorAll('.stateful-legacy-icon')].every(
          (icon) => icon.textContent === 'Second',
        ),
      ).toBe(true);
    });

    it('renders a spaced header icon when no rows are expandable', () => {
      const { container } = render(
        <Table
          columns={columns}
          dataSource={[John]}
          expandable={{
            expandedRowRender,
            rowExpandable: () => false,
            showExpandAll: true,
          }}
        />,
      );

      expect(
        container.querySelector(
          'thead span.ant-table-row-expand-icon.ant-table-row-expand-icon-spaced',
        ),
      ).toBeTruthy();
      expect(container.querySelector('thead button.ant-table-row-expand-icon')).toBeFalsy();
    });
  });

  it('row indent padding should be 0px when indentSize defined as 0', () => {
    const { container } = render(<Table indentSize={0} columns={columns} dataSource={data} />);

    fireEvent.click(container.querySelector('.ant-table-row-expand-icon')!);

    expect(container.querySelector<HTMLElement>('.indent-level-1')).toHaveStyle({
      paddingLeft: '0px',
    });
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

      expect(tdNodeList[0].textContent).toBe('bamboo');
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
      expect(tdNodeList[1].textContent).toBe('bamboo');
      expect(tdNodeList[2].querySelector('.ant-table-row-expand-icon')).toBeTruthy();
    });
  });
});
