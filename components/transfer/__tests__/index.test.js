/* eslint no-use-before-define: "off" */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Transfer from '..';
import TransferList from '../list';
import TransferOperation from '../operation';
import TransferSearch from '../search';
import TransferItem from '../item';
import Button from '../../button';
import Checkbox from '../../checkbox';

const listCommonProps = {
  dataSource: [{
    key: 'a',
    title: 'a',
  }, {
    key: 'b',
    title: 'b',
  }, {
    key: 'c',
    title: 'c',
    disabled: true,
  }],
  selectedKeys: ['a'],
  targetKeys: ['b'],
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
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should move selected keys to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onChange={handleChange} />);
    wrapper.find(TransferOperation).find(Button).at(1).simulate('click'); // move selected keys to right list
    expect(handleChange).toHaveBeenCalledWith(['a', 'b'], 'right', ['a']);
  });

  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper.find(TransferItem).filterWhere(n => n.prop('item').key === 'a').simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith([], []);
  });

  it('should check checkbox when click on unchecked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper.find(TransferItem).filterWhere(n => n.prop('item').key === 'b').simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['a'], ['b']);
  });

  it('should not check checkbox when click on disabled item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper.find(TransferItem).filterWhere(n => n.prop('item').key === 'c').simulate('click');
    expect(handleSelectChange).not.toHaveBeenCalled();
  });

  it('should check all item when click on check all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper.find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => !n.prop('checked')).simulate('change');
    expect(handleSelectChange).toHaveBeenCalledWith(['a'], ['b']);
  });

  it('should uncheck all item when click on uncheck all', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(<Transfer {...listCommonProps} onSelectChange={handleSelectChange} />);
    wrapper.find('.ant-transfer-list-header input[type="checkbox"]')
      .filterWhere(n => n.prop('checked')).simulate('change');
    expect(handleSelectChange).toHaveBeenCalledWith([], []);
  });

  it('should call `filterOption` when use input in search box', () => {
    const filterOption = (inputValue, option) => inputValue === option.title;
    const wrapper = mount(<Transfer {...listCommonProps} showSearch filterOption={filterOption} />);
    wrapper.find(TransferSearch).at(0).find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find(TransferList).at(0).find(TransferItem).find(Checkbox)).toHaveLength(1);
  });

  it('should display the correct count of items when filter by input', () => {
    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    const renderFunc = item => item.title;
    const wrapper = mount(
      <Transfer
        {...searchTransferProps}
        showSearch
        filterOption={filterOption}
        render={renderFunc}
      />
    );
    wrapper.find(TransferSearch).at(0).find('input').simulate('change', { target: { value: 'content2' } });
    expect(wrapper.find(TransferList).at(0).find('.ant-transfer-list-header-selected > span').at(0)
      .first()
      .text()
      .trim()).toEqual('1');
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
      />
    );
    wrapper.find(TransferSearch).at(0).find('input')
      .simulate('change', { target: { value: 'content2' } });
    wrapper.find(TransferList).at(0).find('.ant-transfer-list-header input[type="checkbox"]').filterWhere(n => !n.prop('checked'))
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
      />
    );
    wrapper.find(TransferSearch).at(0).find('input')
      .simulate('change', { target: { value: 'content2' } });
    wrapper.find(TransferList).at(0).find('.ant-transfer-list-header input[type="checkbox"]').filterWhere(n => !n.prop('checked'))
      .simulate('change');
    wrapper.find(TransferOperation).find(Button).at(1).simulate('click');
    expect(handleChange).toHaveBeenCalledWith(['1', '3', '4'], 'right', ['1']);
  });
});
