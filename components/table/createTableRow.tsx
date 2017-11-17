import * as React from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
import { Store } from './createStore';

interface TableRowProps {
  store: Store;
  className?: string;
  rowKey: string;
  prefixCls: string;
}

interface TableRowState {
  selected: boolean;
}

export default function createTableRow(Component = 'tr') {
  class TableRow extends React.Component<TableRowProps, TableRowState> {
    private store: Store;
    private unsubscribe: () => void;

    constructor(props) {
      super(props);

      this.store = props.store;
      const { selectedRowKeys } = this.store.getState();

      this.state = {
        selected: selectedRowKeys.indexOf(props.rowKey) >= 0,
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
      const { store, rowKey } = this.props;
      this.unsubscribe = store.subscribe(() => {
        const { selectedRowKeys } = this.store.getState();
        const selected = selectedRowKeys.indexOf(rowKey) >= 0;
        if (selected !== this.state.selected) {
          this.setState({ selected });
        }
      });
    }

    render() {
      const rowProps = omit(this.props, ['prefixCls', 'rowKey']);
      const className = classnames(
        this.props.className,
        {
          [`${this.props.prefixCls}-row-selected`]: this.state.selected,
        },
      );

      return (
        <Component {...rowProps} className={className}>
          {this.props.children}
        </Component>
      );
    }
  }

  return TableRow;
}
