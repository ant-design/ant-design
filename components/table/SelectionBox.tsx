import * as React from 'react';
import Checkbox from '../checkbox';
import Radio from '../radio';
import { SelectionBoxProps, SelectionBoxState } from './interface';
import { getSelectionBoxCheckState } from './util';

export default class SelectionBox extends React.Component<SelectionBoxProps, SelectionBoxState> {
  unsubscribe: () => void;

  constructor(props: SelectionBoxProps) {
    super(props);

    this.state = {
      checked: getSelectionBoxCheckState(props),
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
      const checked = getSelectionBoxCheckState(this.props);
      this.setState({ checked });
    });
  }

  render() {
    const { type, rowIndex, ...rest } = this.props;
    const { checked } = this.state;

    if (type === 'radio') {
      return <Radio checked={checked} value={rowIndex} {...rest} />;
    } else {
      return <Checkbox checked={checked} {...rest} />;
    }
  }
}
