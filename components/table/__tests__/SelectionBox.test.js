import React from 'react';
import { mount } from 'enzyme';
import createStore from '../createStore';
import SelectionBox from '../SelectionBox';

const getDefaultStore = (selectedRowKeys) => {
  return createStore({
    selectedRowKeys: selectedRowKeys || [],
    selectionDirty: false,
  });
};

describe('SelectionBox', () => {
  it('unchecked by selectedRowKeys ', () => {
    const wrapper = mount(
      <SelectionBox
        store={getDefaultStore()}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(wrapper.state()).toEqual({ checked: false });
  });

  it('checked by selectedRowKeys ', () => {
    const wrapper = mount(
      <SelectionBox
        store={getDefaultStore(['1'])}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(wrapper.state()).toEqual({ checked: true });
  });

  it('checked by defaultSelection', () => {
    const wrapper = mount(
      <SelectionBox
        store={getDefaultStore()}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={['1']}
      />
    );

    expect(wrapper.state()).toEqual({ checked: true });
  });

  it('checked when store change', () => {
    const store = getDefaultStore();
    const wrapper = mount(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    store.setState({
      selectedRowKeys: ['1'],
      selectionDirty: true,
    });

    expect(wrapper.state()).toEqual({ checked: true });
  });

  it('passes props to Checkbox', () => {
    const checkboxProps = {
      name: 'testName',
      id: 'testId',
    };
    const wrapper = mount(
      <SelectionBox
        store={getDefaultStore()}
        rowIndex="1"
        disabled={false}
        onChange={() => {
        }}
        defaultSelection={['1']}
        {...checkboxProps}
      />
    );
    wrapper.find('Checkbox').forEach((box) => {
      expect(box.props().name).toEqual(checkboxProps.name);
      expect(box.props().id).toEqual(checkboxProps.id);
    });
  });

  it('passes props to Radios', () => {
    const radioProps = {
      name: 'testName',
      id: 'testId',
    };
    const wrapper = mount(
      <SelectionBox
        store={getDefaultStore()}
        rowIndex="1"
        disabled={false}
        onChange={() => {
        }}
        defaultSelection={['1']}
        type="radio"
        {...radioProps}
      />
    );
    wrapper.find('Radio').forEach((radio) => {
      expect(radio.props().name).toEqual(radioProps.name);
      expect(radio.props().id).toEqual(radioProps.id);
    });
  });
});
