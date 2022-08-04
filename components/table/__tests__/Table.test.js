import React from 'react';
import Table from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep } from '../../../tests/utils';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  mountTest(Table);
  rtlTest(Table);

  const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('renders JSX correctly', () => {
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
      },
    ];

    const { asFragment } = render(
      <Table dataSource={data} pagination={false}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        {'invalid child'}
      </Table>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const { container, rerender } = render(<Table columns={columns} />);

    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    rerender(<Table columns={newColumns} />);
    expect(container.querySelector('th').textContent).toEqual('Title');
  });

  it('loading with Spin', async () => {
    const loading = {
      spinning: false,
      delay: 500,
    };
    const { container, rerender } = render(<Table loading={loading} />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
    expect(container.querySelector('.ant-table-placeholder').textContent).not.toEqual('');

    loading.spinning = true;
    rerender(<Table loading={loading} />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
    await sleep(500);
    rerender(<Table loading />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/22733
  it('support loading tip', async () => {
    const { container, rerender } = render(<Table loading={{ tip: 'loading...' }} />);
    await sleep(500);
    rerender(<Table loading={{ tip: 'loading...', loading: true }} />);
    expect(container.querySelectorAll('.ant-spin')).toHaveLength(1);
  });

  it('renders custom components correctly when it changes', () => {
    const BodyWrapper1 = props => <tbody id="wrapper1" {...props} />;
    const BodyWrapper2 = props => <tbody id="wrapper2" {...props} />;
    const { container, rerender } = render(
      <Table components={{ body: { wrapper: BodyWrapper1 } }} />,
    );
    rerender(<Table components={{ body: { wrapper: BodyWrapper2 } }} />);
    expect(container.querySelector('tbody').id).toBe('wrapper2');
  });

  it('props#columnsPageRange and props#columnsPageSize do not warn anymore', () => {
    const data = [
      {
        key: '1',
        age: 32,
      },
      {
        key: '2',
        age: 42,
      },
    ];

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const columnsPageRange = jest.fn();
    const columnsPageSize = jest.fn();
    render(
      <Table
        dataSource={data}
        rowkey="key"
        columnsPageRange={columnsPageRange}
        columnsPageSize={columnsPageSize}
      >
        <Column title="Age" dataIndex="age" key="age" />
      </Table>,
    );

    expect(errorSpy).not.toHaveBeenCalledWith(
      '`columnsPageRange` and `columnsPageSize` are removed, please use fixed columns instead, see: https://u.ant.design/fixed-columns.',
    );

    expect(columnsPageRange).not.toHaveBeenCalled();
    expect(columnsPageSize).not.toHaveBeenCalled();
  });

  it('support onHeaderCell', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Table columns={[{ title: 'title', onHeaderCell: () => ({ onClick }) }]} />,
    );
    fireEvent.click(container.querySelector('th'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not crash when column children is empty', () => {
    render(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />,
    );
  });

  it('should not crash when dataSource is array with none-object items', () => {
    render(
      <Table
        columns={[
          {
            title: 'name',
          },
        ]}
        dataSource={['1', 2, undefined, {}, null, true, false, 0]}
      />,
    );
  });

  it('prevent touch event', () => {
    // prevent touch event, 原来的用例感觉是少了 touchmove 调用判断
    const touchmove = jest.fn();
    const { container } = render(
      <Table
        columns={[
          {
            dataIndex: 'name',
            children: undefined,
          },
        ]}
        dataSource={[]}
      />,
    );
    fireEvent.touchMove(container.querySelector('.ant-table'));
    expect(touchmove).not.toHaveBeenCalled();
  });

  it('renders ellipsis by showTitle option', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: false } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: false } },
    ];
    const { container } = render(<Table columns={columns} dataSource={data} />);
    container.querySelectorAll('td').forEach(td => {
      expect(td.className.includes('ant-table-cell-ellipsis')).toBe(true);
    });
  });

  it('not renders ellipsis origin html title', () => {
    const data = [
      {
        id: '1',
        age: 32,
      },
      {
        id: '2',
        age: 42,
      },
    ];
    const columns = [
      { title: 'id', dataKey: 'id', ellipsis: { showTitle: true } },
      { title: 'age', dataKey: 'age', ellipsis: { showTitle: true } },
    ];

    const { container } = render(<Table columns={columns} dataSource={data} />);
    container.querySelectorAll('.ant-table-thead th').forEach(td => {
      expect(td.attributes.title).toBeTruthy();
    });
    container.querySelectorAll('.ant-table-tbody td').forEach(td => {
      expect(td.attributes.title).toBeFalsy();
    });
  });

  it('warn about rowKey when using index parameter', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    render(<Table columns={columns} rowKey={(record, index) => record + index} />);
    expect(warnSpy).toBeCalledWith(
      'Warning: [antd: Table] `index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.',
    );
  });
  it('not warn about rowKey', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    render(<Table columns={columns} rowKey={record => record.key} />);
    expect(warnSpy).not.toBeCalled();
  });

  it('should support ref', () => {
    warnSpy.mockReset();
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const Wrapper = () => {
      const ref = React.useRef();
      return <Table ref={ref} columns={columns} />;
    };
    render(<Wrapper />);
    expect(warnSpy).not.toBeCalled();
  });
});
