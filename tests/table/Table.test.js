import React from 'react';
import createStore from '../../components/table/createStore';
import Table from '../../components/table';
import TestUtils from 'react-addons-test-utils';
import { render, mount, shallow } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

const { Column, ColumnGroup } = Table;

describe('Table', () => {
  describe('row selection', () => {
    it('allow select by checkbox', () => {
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
      }];

      const data = [{
        name: 'Jack',
      }, {
        name: 'Lucy',
      }];

      const instance = TestUtils.renderIntoDocument(
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{}}
        />
      );

      const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
      const checkboxAll = checkboxes[0];

      checkboxAll.checked = true;
      TestUtils.Simulate.change(checkboxAll);

      expect(instance.store.getState()).toEqual({
        selectedRowKeys: [0, 1],
        selectionDirty: true,
      });

      checkboxes[1].checked = false;
      TestUtils.Simulate.change(checkboxes[1]);

      expect(instance.store.getState()).toEqual({
        selectedRowKeys: [1],
        selectionDirty: true,
      });

      checkboxes[1].checked = true;
      TestUtils.Simulate.change(checkboxes[1]);

      expect(instance.store.getState()).toEqual({
        selectedRowKeys: [1, 0],
        selectionDirty: true,
      });
    });

    it('pass getCheckboxProps to checkbox', () => {
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
      }];

      const data = [{
        id: 0,
        name: 'Jack',
      }, {
        id: 1,
        name: 'Lucy',
      }];

      const rowSelection = {
        getCheckboxProps: record => ({
          disabled: record.name === 'Lucy',
        }),
      };

      const instance = TestUtils.renderIntoDocument(
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          rowKey="id"
        />
      );

      const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');

      expect(checkboxes[1].disabled).toBe(false);
      expect(checkboxes[2].disabled).toBe(true);
    });

    it('works with pagination', () => {
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
      }];

      const data = [{
        id: 0,
        name: 'Jack',
      }, {
        id: 1,
        name: 'Lucy',
      }, {
        id: 3,
        name: 'Tom',
      }, {
        id: 4,
        name: 'Jerry',
      }];

      const wrapper = mount(
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{}}
          rowKey="id"
          pagination={{ pageSize: 2 }}
        />
      );

      const checkboxAll = wrapper.find('SelectionCheckboxAll');
      const pagers = wrapper.find('Pager');

      checkboxAll.find('input').simulate('change', { target: { checked: true } });
      expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });

      pagers.at(1).simulate('click');
      expect(checkboxAll.node.state).toEqual({ checked: false, indeterminate: false });

      pagers.at(0).simulate('click');
      expect(checkboxAll.node.state).toEqual({ checked: true, indeterminate: false });
    });

    // https://github.com/ant-design/ant-design/issues/4020
    it('handles defaultChecked', () => {
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
      }];

      const data = [{
        key: 0,
        name: 'Jack',
      }, {
        key: 1,
        name: 'Lucy',
      }];

      const rowSelection = {
        getCheckboxProps: record => ({
          defaultChecked: record.key === 0
        }),
      }

      const wrapper = mount(
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
        />
      );
      const checkboxs = wrapper.find('input');

      expect(checkboxs.at(1).props().checked).toBe(true);
      expect(checkboxs.at(2).props().checked).toBe(false);

      checkboxs.at(2).simulate('change', { target: { checked: true } });

      expect(checkboxs.at(1).props().checked).toBe(true);
      expect(checkboxs.at(2).props().checked).toBe(true);
    });
  });

  describe('JSX style API', () => {
    it('renders correctly', () => {
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

      expect(renderToJson(wrapper)).toMatchSnapshot();
    });
  });

  it('updates columns when receiving props', () => {
    const columns = [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    }];
    const wrapper = shallow(<Table columns={columns} />);
    const newColumns = [{
      title: 'Title',
      key: 'title',
      dataIndex: 'title'
    }];
    wrapper.setProps({ columns: newColumns });

    expect(wrapper.instance().columns).toBe(newColumns);
  });
})
