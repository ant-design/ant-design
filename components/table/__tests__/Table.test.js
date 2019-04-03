import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Table from '..';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
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

    const wrapper = render(
      <Table dataSource={data} pagination={false}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
      </Table>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const wrapper = shallow(<Table columns={columns} />);
    const newColumns = [
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
      },
    ];
    wrapper.setProps({ columns: newColumns });

    expect(wrapper.instance().columns).toBe(newColumns);
  });

  it('loading with Spin', async () => {
    const loading = {
      spinning: false,
      delay: 500,
    };
    const wrapper = mount(<Table loading={loading} />);
    expect(wrapper.find('.ant-spin')).toHaveLength(0);
    expect(wrapper.find('.ant-table-placeholder').text()).not.toEqual('');

    loading.spinning = true;
    wrapper.setProps({ loading });
    expect(wrapper.find('.ant-spin')).toHaveLength(0);

    await new Promise(resolve => setTimeout(resolve, 500));
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

  it('warning if both `expandedRowRender` & `scroll` are used', () => {
    mount(<Table expandedRowRender={() => null} scroll={{}} />);
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Table] `expandedRowRender` and `scroll` are not compatible. Please use one of them at one time.',
    );
  });
});
