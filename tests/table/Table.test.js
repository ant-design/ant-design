import React from 'react';
import createStore from '../../components/table/createStore';
import Table from '../../components/table';
import TestUtils from 'react-addons-test-utils';
import { render } from 'enzyme';
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
})
