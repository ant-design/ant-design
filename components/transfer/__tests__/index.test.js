/* eslint no-use-before-define: "off" */
import React from 'react';
import { render, mount } from 'enzyme';
import Transfer from '..';
import TransferList from '../list';
import TransferOperation from '../operation';
import TransferSearch from '../search';
import TransferItem from '../item';
import Button from '../../button';
import Checkbox from '../../checkbox';

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
  lazy: false,
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
  lazy: false,
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
  lazy: false,
};

describe('Transfer', () => {
  it('should render correctly', () => {
    const wrapper = render(<Transfer {...listCommonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onChange={handleChange} />);
    wrapper
      .find(TransferOperation)
      .find(Button)
      .at(0)
      .simulate('click'); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], 'right', ['a']);
  });

  it('should move selected keys expect disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Transfer {...listDisabledProps} onChange={handleChange} />);
    wrapper
      .find(TransferOperation)
      .find(Button)
      .at(0)
      .simulate('click'); // move selected keys to right list
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
    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find(TransferItem)
        .find(Checkbox),
    ).toHaveLength(1);
  });

  const headerText = wrapper =>
    wrapper
      .find(TransferList)
      .at(0)
      .find('.ant-transfer-list-header-selected > span')
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
    expect(headerText(wrapper)).toEqual('1 items');
  });

  it('should display the correct locale', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { itemUnit: 'Person', notFoundContent: 'Nothing', searchPlaceholder: 'Search' };
    const wrapper = mount(
      <Transfer {...listCommonProps} {...emptyProps} showSearch locale={locale} />,
    );

    expect(headerText(wrapper)).toEqual('0 Person');

    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find('.ant-transfer-list-search')
        .at(0)
        .prop('placeholder'),
    ).toEqual('Search');

    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find('.ant-transfer-list-body-not-found')
        .at(0)
        .text(),
    ).toEqual('Nothing');
  });

  it('should display the correct locale using old API', () => {
    const emptyProps = { dataSource: [], selectedKeys: [], targetKeys: [] };
    const locale = { notFoundContent: 'old1', searchPlaceholder: 'old2' };
    const wrapper = mount(<Transfer {...listCommonProps} {...emptyProps} {...locale} showSearch />);

    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find('.ant-transfer-list-search')
        .at(0)
        .prop('placeholder'),
    ).toEqual('old2');

    expect(
      wrapper
        .find(TransferList)
        .at(0)
        .find('.ant-transfer-list-body-not-found')
        .at(0)
        .text(),
    ).toEqual('old1');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
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
    wrapper
      .find(TransferOperation)
      .find(Button)
      .at(0)
      .simulate('click');
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

  it('should show sorted targetkey', () => {
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
    const wrapper = render(<Transfer {...sortedTargetKeyProps} render={item => item.title} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add custom styles when their props are provided', () => {
    const style = {
      backgroundColor: 'red',
    };
    const listStyle = {
      backgroundColor: 'blue',
    };
    const operationStyle = {
      backgroundColor: 'yellow',
    };

    const component = mount(
      <Transfer
        {...listCommonProps}
        style={style}
        listStyle={listStyle}
        operationStyle={operationStyle}
      />,
    );

    const wrapper = component.find('.ant-transfer');
    const listSource = component.find('.ant-transfer-list').first();
    const listTarget = component.find('.ant-transfer-list').last();
    const operation = component.find('.ant-transfer-operation').first();

    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'red');
    expect(listSource.prop('style')).toHaveProperty('backgroundColor', 'blue');
    expect(listTarget.prop('style')).toHaveProperty('backgroundColor', 'blue');
    expect(operation.prop('style')).toHaveProperty('backgroundColor', 'yellow');
  });
});
