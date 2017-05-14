import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Table from '..';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  it('renders JSX correctly', () => {
    const data = [{
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
    }, {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
    }];

    const wrapper = render(
      <Table dataSource={data} pagination={false}>
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
          />
          <Column
            title="Last Name"
            dataIndex="lastName"
            key="lastName"
          />
        </ColumnGroup>
        <Column
          title="Age"
          dataIndex="age"
          key="age"
        />
      </Table>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    }];
    const wrapper = shallow(<Table columns={columns} />);
    const newColumns = [{
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    }];
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

    loading.spinning = true;
    wrapper.setProps({ loading });
    expect(wrapper.find('.ant-spin')).toHaveLength(0);

    await new Promise(resolve => setTimeout(resolve, 500));
    expect(wrapper.find('.ant-spin')).toHaveLength(1);
  });
});
