import React from 'react';
import Checkbox from '../checkbox';
import { Store } from './createStore';

export interface SelectionCheckboxAllProps {
  store: Store;
  disabled: boolean;
  getCheckboxPropsByItem: (item) => any;
  getRecordKey: (record, index?) => string;
  data: any[];
  onChange: (e) => void;
}

export default class SelectionCheckboxAll extends React.Component<SelectionCheckboxAllProps, any> {
  unsubscribe: () => void;

  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(),
      indeterminate: this.getIndeterminateState(),
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      const checked = this.getCheckState();
      const indeterminate = this.getIndeterminateState();
      if (checked !== this.state.checked) {
        this.setState({ checked });
      }
      if (indeterminate !== this.state.indeterminate) {
        this.setState({ indeterminate });
      }
    });
  }

  checkSelection(data, type, byDefaultChecked) {
    const { store, getCheckboxPropsByItem, getRecordKey } = this.props;
    // type should be 'every' | 'some'
    if (type === 'every' || type === 'some') {
      return (
        byDefaultChecked
        ? data[type](item => getCheckboxPropsByItem(item).defaultChecked)
        : data[type]((item, i) =>
              store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0)
      );
    }
    return false;
  }

  getCheckState() {
    const { store, data } = this.props;
    let checked;
    if (!data.length) {
      checked = false;
    } else {
      checked = store.getState().selectionDirty
        ? this.checkSelection(data, 'every', false)
        : (
          this.checkSelection(data, 'every', false) ||
          this.checkSelection(data, 'every', true)
        );

    }
    return checked;
  }

  getIndeterminateState() {
    const { store, data } = this.props;
    let indeterminate;
    if (!data.length) {
      indeterminate = false;
    } else {
      indeterminate = store.getState().selectionDirty
        ? (
          this.checkSelection(data, 'some', false) &&
            !this.checkSelection(data, 'every', false)
        )
        : ((this.checkSelection(data, 'some', false) &&
            !this.checkSelection(data, 'every', false)) ||
            (this.checkSelection(data, 'some', true) &&
            !this.checkSelection(data, 'every', true))
          );
    }
    return indeterminate;
  }

  render() {
    const { disabled, onChange } = this.props;
    const { checked, indeterminate } = this.state;

    return (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}
