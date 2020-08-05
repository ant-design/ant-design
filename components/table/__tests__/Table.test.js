import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

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

    const wrapper = mount(
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

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const wrapper = mount(<Table columns={columns} />);
    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    wrapper.setProps({ columns: newColumns });

    expect(wrapper.find('th').text()).toEqual('Title');
  });

  it('loading with Spin', async () => {
    const loading = {
      spinning: false,
      delay: 500,
    };
    const wrapper = mount(<Table loading={loading} />);
    expect(wrapper.find('.ant-spin')).toHaveLength(0);
    expect(wrapper.find('.ant-table-placeholder').hostNodes().text()).not.toEqual('');

    loading.spinning = true;
    wrapper.setProps({ loading });
    expect(wrapper.find('.ant-spin')).toHaveLength(0);
    await sleep(500);
    wrapper.update();
    expect(wrapper.find('.ant-spin')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/22733
  it('support loading tip', async () => {
    const wrapper = mount(<Table loading={{ tip: 'loading...' }} />);
    await sleep(500);
    wrapper.update();
    expect(wrapper.find('.ant-spin')).toHaveLength(1);
  });

  it('renders custom components correctly when it changes', () => {
    const BodyWrapper1 = props => <tbody id="wrapper1" {...props} />;
    const BodyWrapper2 = props => <tbody id="wrapper2" {...props} />;
    const wrapper = mount(<Table components={{ body: { wrapper: BodyWrapper1 } }} />);
    wrapper.setProps({ components: { body: { wrapper: BodyWrapper2 } } });
    expect(wrapper.find('tbody').props().id).toBe('wrapper2');
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
    mount(
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
    const wrapper = mount(
      <Table columns={[{ title: 'title', onHeaderCell: () => ({ onClick }) }]} />,
    );
    wrapper.find('th').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not crash when column children is empty', () => {
    mount(
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
    mount(
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
    const wrapper = mount(
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
    wrapper.simulate('touchmove');
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
    const wrapper = mount(<Table columns={columns} dataSource={data} />);
    wrapper.find('td').forEach(td => {
      expect(td.hasClass('ant-table-cell-ellipsis')).toBeTruthy();
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
    const wrapper = mount(<Table columns={columns} dataSource={data} />);

    wrapper.find('.ant-table-thead th').forEach(td => {
      expect(td.getDOMNode().attributes.getNamedItem('title')).toBeTruthy();
    });

    wrapper.find('.ant-table-tbody td').forEach(td => {
      expect(td.getDOMNode().attributes.getNamedItem('title')).toBeFalsy();
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
    mount(<Table columns={columns} rowKey={(record, index) => record + index} />);
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
    mount(<Table columns={columns} rowKey={record => record.key} />);
    expect(warnSpy).not.toBeCalled();
  });
});
