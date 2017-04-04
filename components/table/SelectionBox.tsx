import React from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { Store } from './createStore';

export interface SelectionBoxProps {
  store: Store;
  type: string;
  defaultSelection: string[];
  rowIndex: string;
  disabled?: boolean;
  onChange: (e) => void;
}

export default class SelectionBox extends React.Component<SelectionBoxProps, any> {
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
      this.setState({ checked });
    });
  }

  getCheckState(props) {
    const { store, defaultSelection, rowIndex } = props;
    let checked = false;
    if (store.getState().selectionDirty) {
      checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 defaultSelection.indexOf(rowIndex) >= 0);
    }
    return checked;
  }

  render() {
    const { type, rowIndex, disabled, onChange } = this.props;
    const { checked } = this.state;

    if (type === 'radio') {
      return (
        <Radio
          disabled={disabled}
          onChange={onChange}
          value={rowIndex}
          checked={checked}
        />
      );
    }

    return (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}
