import React from 'react';
import createStore from '../../components/table/createStore';
import SelectionBox from '../../components/table/SelectionBox';
import TestUtils from 'react-addons-test-utils';

describe('SelectionBox', () => {
  it('unchecked by selectedRowKeys ', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

    const instance = TestUtils.renderIntoDocument(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(instance.state).toEqual({ checked: false });
  });

  it('checked by selectedRowKeys ', () => {
    const store = createStore({
      selectedRowKeys: ['1'],
      selectionDirty: false,
    });

    const instance = TestUtils.renderIntoDocument(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={[]}
      />
    );

    expect(instance.state).toEqual({ checked: true });
  });

  it('checked by defaultSelection', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

    const instance = TestUtils.renderIntoDocument(
      <SelectionBox
        store={store}
        rowIndex="1"
        disabled={false}
        onChange={() => {}}
        defaultSelection={['1']}
      />
    );

    expect(instance.state).toEqual({ checked: true });
  });

  it('checked when store change', () => {
    const store = createStore({
      selectedRowKeys: [],
      selectionDirty: false,
    });

    const instance = TestUtils.renderIntoDocument(
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

    expect(instance.state).toEqual({ checked: true });
  });
})
