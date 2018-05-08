import * as React from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { SelectionBoxProps, SelectionBoxState } from './interface';

export default class SelectionBox extends React.Component<SelectionBoxProps, SelectionBoxState> {
  unsubscribe: () => void;

  constructor(props: SelectionBoxProps) {
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

  getCheckState(props: SelectionBoxProps) {
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
    const { type, rowIndex, ...rest } = this.props;
    const { checked } = this.state;

    if (type === 'radio') {
      return (
        <Radio
          checked={checked}
          value={rowIndex}
          {...rest}
        />
      );
    } else {
      return (
        <Checkbox
          checked={checked}
          {...rest}
        />
      );
    }
  }
}
