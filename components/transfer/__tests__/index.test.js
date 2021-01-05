/* eslint @typescript-eslint/no-use-before-define: "off" */
import React from 'react';
import { mount } from 'enzyme';
import Transfer from '..';
import TransferList from '../list';
import TransferOperation from '../operation';
import TransferSearch from '../search';
import TransferItem from '../ListItem';
import Button from '../../button';
import Checkbox from '../../checkbox';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const listCommonProps = {
  dataSource: [
    {
      key: 'a',
      title: 'a',
    },
    {
      key: 'b',
      title: 'b',
    },
    {
      key: 'c',
      title: 'c',
      disabled: true,
    },
  ],
  selectedKeys: ['a'],
  targetKeys: ['b'],
};

const listDisabledProps = {
  dataSource: [
    {
      key: 'a',
      title: 'a',
      disabled: true,
    },
    {
      key: 'b',
      title: 'b',
    },
  ],
  selectedKeys: ['a', 'b'],
  targetKeys: [],
};

const searchTransferProps = {
  dataSource: [
    {
      key: '0',
      title: 'content1',
      description: 'description of content1',
      chosen: false,
    },
    {
      key: '1',
      title: 'content2',
      description: 'description of content2',
      chosen: false,
    },
    {
      key: '2',
      title: 'content3',
      description: 'description of content3',
      chosen: false,
    },
    {
      key: '3',
      title: 'content4',
      description: 'description of content4',
      chosen: false,
    },
    {
      key: '4',
      title: 'content5',
      description: 'description of content5',
      chosen: false,
    },
    {
      key: '5',
      title: 'content6',
      description: 'description of content6',
      chosen: false,
    },
  ],
  selectedKeys: [],
  targetKeys: ['3', '4'],
};

describe('Transfer', () => {
  mountTest(Transfer);
  rtlTest(Transfer);

  it('should render correctly', () => {
    const wrapper = mount(<Transfer {...listCommonProps} />);
    expect(wrapper).toMatchRenderedSnapshot();
  });

  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onChange={handleChange} />);
    wrapper.find(TransferOperation).find(Button).at(0).simulate('click'); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], 'right', ['a']);
  });

  it('should move selected keys to left list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Transfer
        {...listCommonProps}
        selectedKeys={['a']}
        targetKeys={['a']}
        onChange={handleChange}
      />,
    );
    wrapper.find(TransferOperation).find(Button).at(1).simulate('click'); // move selected keys to left list
    expect(handleChange).toHaveBeenCalledWith([], 'left', ['a']);
  });

  it('should move selected keys expect disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Transfer {...listDisabledProps} onChange={handleChange} />);
    wrapper.find(TransferOperation).find(Button).at(0).simulate('click'); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['b'], 'right', ['b']);
  });

  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper
      .find(TransferItem)
      .filterWhere(n => n.prop('item').key === 'a')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith([], []);
  });

  it('should check checkbox when click on unchecked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper
      .find(TransferItem)
      .filterWhere(n => n.prop('item').key === 'b')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], ['b']);
  });

  it('should not check checkbox when component disabled', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(
      <Transfer {...listCommonProps} disabled onSelectChange={handleSelectChange} />,
    );
    wrapper
      .find(TransferItem)
      .filterWhere(n => n.prop('item').key === 'a')
      .simulate('click');
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should not check checkbox when click on disabled item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper
      .find(TransferItem)
      .filterWhere(n => n.prop('item').key === 'c')
      .simulate('click');
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should check all item when click on check all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => !n.prop('checked'))
      .simulate('change');
    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b']);
  });

  it('should uncheck all item when click on uncheck all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => n.prop('checked'))
      .simulate('change');
    expect(handleSelectChange).toHaveBeenCalledWith([], []);
  });

  it('should call `filterOption` when use input in search box', () => {
    const filterOption = (inputValue, option) => inputValue === option.title;
    const wrapper = mount(<Transfer {...listCommonProps} showSearch filterOption={filterOption} />);
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'a' } });
    expect(wrapper.find(TransferList).at(0).find(TransferItem).find(Checkbox)).toHaveLength(1);
  });

  const headerText = wrapper =>
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header-selected')
      .at(0)
      .first()
      .text()
      .trim();

  it('should display the correct count of items when filter by input', () => {
    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    const renderFunc = item => item.title;
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
      />,
    );
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'content2' } });
    expect(headerText(wrapper)).toEqual('1 item');
  });

  it('should display the correct locale', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { itemUnit: 'Person', notFoundContent: 'Nothing', searchPlaceholder: 'Search' };
    const wrapper = mount(
      <Transfer {...listCommonProps} {...emptyProps} showSearch locale={locale} />,
    );

    expect(headerText(wrapper)).toEqual('0 Person');

    expect(
      wrapper.find(TransferList).at(0).find('.ant-transfer-list-search').at(0).prop('placeholder'),
    ).toEqual('Search');

    expect(
      wrapper.find(TransferList).at(0).find('.ant-transfer-list-body-not-found').at(0).text(),
    ).toEqual('Nothing');
  });

  it('should display the correct locale and ignore old API', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { notFoundContent: 'old1', searchPlaceholder: 'old2' };
    const newLocalProp = { notFoundContent: 'new1', searchPlaceholder: 'new2' };
    const wrapper = mount(
      <Transfer
        {...listCommonProps}
        {...emptyProps}
        {...locale}
        locale={newLocalProp}
        showSearch
      />,
    );

    expect(
      wrapper.find(TransferList).at(0).find('.ant-transfer-list-search').at(0).prop('placeholder'),
    ).toEqual('new2');

    expect(
      wrapper.find(TransferList).at(0).find('.ant-transfer-list-body-not-found').at(0).text(),
    ).toEqual('new1');

    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      'Warning: [antd: Transfer] `notFoundContent` and `searchPlaceholder` will be removed, please use `locale` instead.',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should display the correct items unit', () => {
    const wrapper = mount(<Transfer {...listCommonProps} locale={{ itemsUnit: 'People' }} />);

    expect(headerText(wrapper)).toEqual('1/2 People');
  });

  it('should just check the filtered item when click on check all after search by input', () => {
    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    const renderFunc = item => item.title;
    const handleSelectChange = jest.fn();
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
        onSelectChange={handleSelectChange}
      />,
    );
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'content2' } });
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => !n.prop('checked'))
      .simulate('change');
    expect(handleSelectChange).toHaveBeenCalledWith(['1'], []);
  });

  it('should transfer just the filtered item after search by input', () => {
    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    const renderFunc = item => item.title;
    const handleChange = jest.fn();
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      wrapper.setProps({
        selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
      });
    };
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
        onSelectChange={handleSelectChange}
        onChange={handleChange}
      />,
    );
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'content2' } });
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => !n.prop('checked'))
      .simulate('change');
    wrapper.find(TransferOperation).find(Button).at(0).simulate('click');
    expect(handleChange).toHaveBeenCalledWith(['1', '3', '4'], 'right', ['1']);
  });

  it('should check correctly when there is a search text', () => {
    const newProps = { ...listCommonProps };
    delete newProps.targetKeys;
    delete newProps.selectedKeys;
    const handleSelectChange = jest.fn();
    const wrapper = mount(
      <Transfer
        {...newProps}
        showSearch
        onSelectChange={handleSelectChange}
        render={item => item.title}
      />,
    );
    wrapper
      .find(TransferItem)
      .filterWhere(n => n.prop('item').key === 'b')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b'], []);
    wrapper
      .find(TransferSearch)
      .at(0)
      .find('input')
      .simulate('change', { target: { value: 'a' } });
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .simulate('change');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b', 'a'], []);
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header input[type="checkbox"]')
      .simulate('change');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b'], []);
  });

  it('should show sorted targetKey', () => {
    const sortedTargetKeyProps = {
      dataSource: [
        {
          key: 'a',
          title: 'a',
        },
        {
          key: 'b',
          title: 'b',
        },
        {
          key: 'c',
          title: 'c',
        },
      ],
      targetKeys: ['c', 'b'],
      lazy: false,
    };
    const wrapper = mount(<Transfer {...sortedTargetKeyProps} render={item => item.title} />);
    expect(wrapper).toMatchRenderedSnapshot();
  });

  it('should add custom styles when their props are provided', () => {
    const style = {
      backgroundColor: 'red',
    };
    const leftStyle = {
      backgroundColor: 'blue',
    };
    const rightStyle = {
      backgroundColor: 'red',
    };
    const operationStyle = {
      backgroundColor: 'yellow',
    };

    const component = mount(
      <Transfer
        {...listCommonProps}
        style={style}
        listStyle={({ direction }) => (direction === 'left' ? leftStyle : rightStyle)}
        operationStyle={operationStyle}
      />,
    );

    const wrapper = component.find('.ant-transfer');
    const listSource = component.find('.ant-transfer-list').first();
    const listTarget = component.find('.ant-transfer-list').last();
    const operation = component.find('.ant-transfer-operation').first();

    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(listSource.prop('style')).toHaveProperty('backgroundColor', 'blue');
    expect(listTarget.prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(operation.prop('style')).toHaveProperty('backgroundColor', 'yellow');
  });

  it('should support onScroll', () => {
    const onScroll = jest.fn();
    const component = mount(<Transfer {...listCommonProps} onScroll={onScroll} />);
    component
      .find('.ant-transfer-list')
      .at(0)
      .find('.ant-transfer-list-content')
      .at(0)
      .simulate('scroll');
    expect(onScroll).toHaveBeenLastCalledWith('left', expect.anything());
    component
      .find('.ant-transfer-list')
      .at(1)
      .find('.ant-transfer-list-content')
      .at(0)
      .simulate('scroll');
    expect(onScroll).toHaveBeenLastCalledWith('right', expect.anything());
  });

  it('should support rowKey is function', () => {
    expect(() => {
      mount(<Transfer {...listCommonProps} rowKey={record => record.key} />);
    }).not.toThrow();
  });

  it('should support render value and label in item', () => {
    const component = mount(
      <Transfer
        dataSource={[
          {
            key: 'a',
            title: 'title',
          },
        ]}
        render={record => ({ value: `${record.title} value`, label: 'label' })}
      />,
    );
    expect(component).toMatchRenderedSnapshot();
  });

  it('should render correct checkbox label when checkboxLabel is defined', () => {
    const selectAllLabels = ['Checkbox Label'];
    const wrapper = mount(<Transfer {...listCommonProps} selectAllLabels={selectAllLabels} />);
    expect(headerText(wrapper)).toEqual('Checkbox Label');
  });

  it('should render correct checkbox label when checkboxLabel is a function', () => {
    const selectAllLabels = [
      ({ selectedCount, totalCount }) => (
        <span>
          {selectedCount} of {totalCount}
        </span>
      ),
    ];
    const wrapper = mount(<Transfer {...listCommonProps} selectAllLabels={selectAllLabels} />);
    expect(headerText(wrapper)).toEqual('1 of 2');
  });

  describe('pagination', () => {
    it('boolean', () => {
      const wrapper = mount(<Transfer {...listDisabledProps} pagination />);
      expect(wrapper.find('Pagination').first().props()).toEqual(
        expect.objectContaining({
          pageSize: 10,
        }),
      );
    });

    it('object', () => {
      const wrapper = mount(<Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />);
      expect(
        wrapper.find('.ant-transfer-list').first().find('.ant-transfer-list-content-item'),
      ).toHaveLength(1);
      expect(wrapper.find('Pagination').first().props()).toEqual(
        expect.objectContaining({
          pageSize: 1,
        }),
      );
    });

    it('not exceed max size', () => {
      const wrapper = mount(<Transfer {...listDisabledProps} pagination={{ pageSize: 1 }} />);
      wrapper.find('.ant-pagination-next .ant-pagination-item-link').first().simulate('click');
      expect(wrapper.find('Pagination').first().props()).toEqual(
        expect.objectContaining({
          current: 2,
        }),
      );

      wrapper.setProps({ targetKeys: ['b', 'c'] });
      expect(wrapper.find('Pagination').first().props()).toEqual(
        expect.objectContaining({
          current: 1,
        }),
      );
    });
  });

  it('remove by click icon', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onChange={onChange} oneWay />);
    wrapper.find('.ant-transfer-list-content-item-remove').first().simulate('click');
    expect(onChange).toHaveBeenCalledWith([], 'left', ['b']);
  });
});
