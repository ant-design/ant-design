import React from 'react';
import Radio from '../radio';
import { Store } from './createStore';

export interface SelectionRadioProps {
  store: Store;
  defaultSelection: string[];
  rowIndex: string;
  disabled: boolean;
  onChange: (e) => void;
}

export default class SelectionRadio extends React.Component<SelectionRadioProps, any> {
  unsubscribe: () => void;

  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(),
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
      if (checked !== this.state.checked) {
        this.setState({ checked });
      }
    });
  }

  getCheckState() {
    const { store, defaultSelection, rowIndex } = this.props;
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
    const { rowIndex, disabled, onChange } = this.props;
    const { checked } = this.state;

    return (
      <Radio
        disabled={disabled}
        onChange={onChange}
        value={rowIndex}
        checked={checked}
      />
    );
  }
}
