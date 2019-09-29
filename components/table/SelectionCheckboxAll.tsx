import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Checkbox, { CheckboxChangeEvent } from '../checkbox';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import { SelectionCheckboxAllProps, SelectionCheckboxAllState, SelectionItem } from './interface';

function checkSelection<T>({
  store,
  getCheckboxPropsByItem,
  getRecordKey,
  data,
  type,
  byDefaultChecked,
}: {
  store: SelectionCheckboxAllProps<T>['store'];
  getCheckboxPropsByItem: SelectionCheckboxAllProps<T>['getCheckboxPropsByItem'];
  getRecordKey: SelectionCheckboxAllProps<T>['getRecordKey'];
  data: T[];
  type: 'every' | 'some';
  byDefaultChecked: boolean;
}) {
  return byDefaultChecked
    ? data[type]((item, i) => getCheckboxPropsByItem(item, i).defaultChecked)
    : data[type](
        (item, i) => store.getState().selectedRowKeys.indexOf(getRecordKey(item, i)) >= 0,
      );
}

function getIndeterminateState<T>(props: SelectionCheckboxAllProps<T>) {
  const { store, data } = props;
  if (!data.length) {
    return false;
  }

  const someCheckedNotByDefaultChecked =
    checkSelection<T>({
      ...props,
      data,
      type: 'some',
      byDefaultChecked: false,
    }) &&
    !checkSelection<T>({
      ...props,
      data,
      type: 'every',
      byDefaultChecked: false,
    });
  const someCheckedByDefaultChecked =
    checkSelection<T>({
      ...props,
      data,
      type: 'some',
      byDefaultChecked: true,
    }) &&
    !checkSelection<T>({
      ...props,
      data,
      type: 'every',
      byDefaultChecked: true,
    });

  if (store.getState().selectionDirty) {
    return someCheckedNotByDefaultChecked;
  }
  return someCheckedNotByDefaultChecked || someCheckedByDefaultChecked;
}

function getCheckState<T>(props: SelectionCheckboxAllProps<T>) {
  const { store, data } = props;
  if (!data.length) {
    return false;
  }
  if (store.getState().selectionDirty) {
    return checkSelection({
      ...props,
      data,
      type: 'every',
      byDefaultChecked: false,
    });
  }
  return (
    checkSelection({
      ...props,
      data,
      type: 'every',
      byDefaultChecked: false,
    }) ||
    checkSelection({
      ...props,
      data,
      type: 'every',
      byDefaultChecked: true,
    })
  );
}

class SelectionCheckboxAll<T> extends React.Component<
  SelectionCheckboxAllProps<T>,
  SelectionCheckboxAllState
> {
  state = {
    checked: false,
    indeterminate: false,
  };

  unsubscribe: () => void;

  defaultSelections: SelectionItem[];

  constructor(props: SelectionCheckboxAllProps<T>) {
    super(props);
    this.defaultSelections = props.hideDefaultSelections
      ? []
      : [
          {
            key: 'all',
            text: props.locale.selectAll,
          },
          {
            key: 'invert',
            text: props.locale.selectInvert,
          },
        ];
  }

  static getDerivedStateFromProps<T>(
    props: SelectionCheckboxAllProps<T>,
    state: SelectionCheckboxAllState,
  ) {
    const checked = getCheckState(props);
    const indeterminate = getIndeterminateState(props);
    const newState: SelectionCheckboxAllState = {};
    if (indeterminate !== state.indeterminate) {
      newState.indeterminate = indeterminate;
    }
    if (checked !== state.checked) {
      newState.checked = checked;
    }
    return newState;
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setCheckState(props: SelectionCheckboxAllProps<T>) {
    const checked = getCheckState(props);
    const indeterminate = getIndeterminateState(props);
    this.setState(prevState => {
      const newState: SelectionCheckboxAllState = {};
      if (indeterminate !== prevState.indeterminate) {
        newState.indeterminate = indeterminate;
      }
      if (checked !== prevState.checked) {
        newState.checked = checked;
      }
      return newState;
    });
  }

  handleSelectAllChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
  };

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.setCheckState(this.props);
    });
  }

  renderMenus(selections: SelectionItem[]) {
    return selections.map((selection, index) => {
      return (
        <Menu.Item key={selection.key || index}>
          <div
            onClick={() => {
              this.props.onSelect(selection.key, index, selection.onSelect);
            }}
          >
            {selection.text}
          </div>
        </Menu.Item>
      );
    });
  }

  render() {
    const { disabled, prefixCls, selections, getPopupContainer } = this.props;
    const { checked, indeterminate } = this.state;

    const selectionPrefixCls = `${prefixCls}-selection`;

    let customSelections: React.ReactNode = null;

    if (selections) {
      const newSelections = Array.isArray(selections)
        ? this.defaultSelections.concat(selections)
        : this.defaultSelections;

      const menu = (
        <Menu className={`${selectionPrefixCls}-menu`} selectedKeys={[]}>
          {this.renderMenus(newSelections)}
        </Menu>
      );

      customSelections =
        newSelections.length > 0 ? (
          <Dropdown overlay={menu} getPopupContainer={getPopupContainer}>
            <div className={`${selectionPrefixCls}-down`}>
              <Icon type="down" />
            </div>
          </Dropdown>
        ) : null;
    }

    return (
      <div className={selectionPrefixCls}>
        <Checkbox
          className={classNames({ [`${selectionPrefixCls}-select-all-custom`]: customSelections })}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={this.handleSelectAllChange}
        />
        {customSelections}
      </div>
    );
  }
}

polyfill(SelectionCheckboxAll);

export default SelectionCheckboxAll;
