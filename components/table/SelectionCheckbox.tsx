import React from 'react';
import Checkbox from '../checkbox';
import { Store } from './createStore';

export interface SelectionCheckboxProps {
  store: Store;
  defaultSelection: string[];
  rowIndex: string;
  disabled: boolean;
  onChange: (e) => void;
}

export default class SelectionCheckbox extends React.Component<SelectionCheckboxProps, any> {
  unsubscribe: () => void;

  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props),
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
      const checked = this.getCheckState(this.props);
      if (checked !== this.state.checked) {
        this.setState({ checked });
      }
    });
  }

  getCheckState(props) {
    const { store, defaultSelection, rowIndex } = props;
    let checked = false;
    if (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0) {
      if (store.getState().selectionDirty) {
        checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                   defaultSelection.indexOf(rowIndex) >= 0);
      }
    }
    return checked;
  }

  render() {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    return (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}
