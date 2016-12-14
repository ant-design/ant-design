import React from 'react';
import { mount } from 'enzyme';
import createStore from '../createStore';
import SelectionBox from '../SelectionBox';

describe('SelectionBox', () => {
  it('unchecked by selectedRowKeys ', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

    const wrapper = mount(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(wrapper.state()).toEqual({ checked: false });
  });

  it('checked by selectedRowKeys ', () => {
    const store = createStore({
      selectedRowKeys: ['1'],
      selectionDirty: false,
    });

    const wrapper = mount(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(wrapper.state()).toEqual({ checked: true });
  });

  it('checked by defaultSelection', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

    const wrapper = mount(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={['1']}
      />
    );

    expect(wrapper.state()).toEqual({ checked: true });
  });

  it('checked when store change', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

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
});
