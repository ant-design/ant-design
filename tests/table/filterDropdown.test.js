import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import FilterMenu from '../../components/table/filterDropdown';
import Dropdown from '../../components/dropdown';


describe('FilterMenu', () => {
  it('renders menu correctly', () => {
    const column = {
      filters: [{
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      }],
    };
    const locale = {
      filterConfirm: 'Confirm',
      filterReset: 'Reset',
    };
    const wrapper = mount(
      <FilterMenu
        prefixCls="antd"
        dropdownPrefixCls="antd-table-filter-dropdown"
        locale={locale}
        column={column}
        filterMultiple={false}
        selectedKeys={[]}
        filterConfirm={() => {}}
      />
    );

    const menuWrapper = render(wrapper.find(Dropdown).props().overlay);
    expect(renderToJson(menuWrapper)).toMatchSnapshot();
  });

  it('renders custom content correctly', () => {
    const column = {
      filterDropdown: (
        <div className="custom-filter-dropdown">
          custom filter
        </div>
      ),
    };

    const wrapper = mount(
      <FilterMenu
        prefixCls="antd"
        dropdownPrefixCls="antd-table-filter-dropdown"
        locale={{}}
        column={column}
        selectedKeys={[]}
      />
    );

    const menuWrapper = render(wrapper.find(Dropdown).props().overlay);
    expect(renderToJson(menuWrapper)).toMatchSnapshot();
  });
});
