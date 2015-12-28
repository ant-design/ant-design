import React from 'react';
import Table from 'rc-table';
import Checkbox from '../checkbox';
import Radio from '../radio';
import FilterDropdown from './filterDropdown';
import Pagination from '../pagination';
import Icon from '../icon';
import objectAssign from 'object-assign';
import Spin from '../spin';
import classNames from 'classnames';

function noop() {
}

const defaultLocale = {
  filterTitle: '筛选',
  filterConfirm: '确定',
  filterReset: '重置',
  emptyText: '暂无数据',
};

let AntTable = React.createClass({
  getInitialState() {
    return {
      // 减少状态
      selectedRowKeys: [],
      filters: {},
      selectionDirty: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      radioIndex: null,
      pagination: this.hasPagination() ? objectAssign({
        pageSize: 10,
        current: 1
      }, this.props.pagination) : {}
    };
  },

  getDefaultProps() {
    return {
      dataSource: [],
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      className: '',
      size: 'large',
      loading: false,
      bordered: false,
      onChange: noop,
      locale: {}
    };
  },

  propTypes: {
    dataSource: React.PropTypes.array,
    prefixCls: React.PropTypes.string,
    useFixedHeader: React.PropTypes.bool,
    rowSelection: React.PropTypes.object,
    className: React.PropTypes.string,
    size: React.PropTypes.string,
    loading: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    locale: React.PropTypes.object,
  },

  getDefaultSelection() {
    let selectedRowKeys = [];
    if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps) {
      let data = this.getCurrentPageData();
      data.filter((item) => {
        if (this.props.rowSelection.getCheckboxProps) {
          return this.props.rowSelection.getCheckboxProps(item).defaultChecked;
        }
        return true;
      }).map((record, rowIndex) => {
        selectedRowKeys.push(this.getRecordKey(record, rowIndex));
      });
    }
    return selectedRowKeys;
  },

  componentWillReceiveProps(nextProps) {
    if (('pagination' in nextProps) && nextProps.pagination !== false) {
      this.setState({
        pagination: objectAssign({}, this.state.pagination, nextProps.pagination)
      });
    }
    // 外界只有 dataSource 的变化会触发新请求
    if ('dataSource' in nextProps &&
        nextProps.dataSource !== this.props.dataSource) {
      let selectedRowKeys = this.state.selectedRowKeys;
      // 把不在当前页的选中项去掉
      let currentPageRowKeys =
        this.getCurrentPageData(nextProps.dataSource).map(
          (record, i) => this.getRecordKey(record, i)
        );
      selectedRowKeys = selectedRowKeys.filter((key) => {
        return currentPageRowKeys.indexOf(key) >= 0;
      });
      this.setState({
        selectionDirty: false,
        selectedRowKeys,
      });
    }
  },

  hasPagination() {
    return this.props.pagination !== false;
  },

  toggleSortOrder(order, column) {
    let sortColumn = this.state.sortColumn;
    let sortOrder = this.state.sortOrder;
    let sorter;
    // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    let isSortColumn = this.isSortColumn(column);
    if (!isSortColumn) {  // 当前列未排序
      sortOrder = order;
      sortColumn = column;
    } else {                      // 当前列已排序
      if (sortOrder === order) {  // 切换为未排序状态
        sortOrder = '';
        sortColumn = null;
      } else {                    // 切换为排序状态
        sortOrder = order;
      }
    }
    if (typeof column.sorter === 'function') {
      sorter = function () {
        let result = column.sorter.apply(this, arguments);
        if (sortOrder === 'ascend') {
          return result;
        } else if (sortOrder === 'descend') {
          return -result;
        }
      };
    }
    const newState = {
      sortOrder,
      sortColumn,
      sorter
    };
    this.setState(newState);
    this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
  },

  handleFilter(column, filters) {
    filters = objectAssign({}, this.state.filters, {
      [this.getColumnKey(column)]: filters
    });
    // Remove filters not in current columns
    const currentColumnKeys = this.props.columns.map(c => this.getColumnKey(c));
    Object.keys(filters).forEach((columnKey) => {
      if (currentColumnKeys.indexOf(columnKey) < 0) {
        delete filters[columnKey];
      }
    });
    const newState = {
      selectedRowKeys: [],
      selectionDirty: false,
      filters
    };
    this.setState(newState);
    this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
  },

  handleSelect(record, rowIndex, e) {
    let checked = e.target.checked;
    let defaultSelection = [];
    if (!this.state.selectionDirty) {
      defaultSelection = this.getDefaultSelection();
    }
    let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => {
        return key !== i;
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectionDirty: true
    });
    if (this.props.rowSelection.onSelect) {
      let data = this.getCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleRadioSelect: function (record, rowIndex, e) {
    let checked = e.target.checked;
    let defaultSelection = [];
    if (!this.state.selectionDirty) {
      defaultSelection = this.getDefaultSelection();
    }
    let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    selectedRowKeys = [key];
    this.setState({
      selectedRowKeys: selectedRowKeys,
      radioIndex: key,
      selectionDirty: true
    });
    if (this.props.rowSelection.onSelect) {
      let data = this.getCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleSelectAllRow(e) {
    let checked = e.target.checked;
    let data = this.getCurrentPageData();
    let selectedRowKeys = checked ? data.filter((item) => {
      if (this.props.rowSelection.getCheckboxProps) {
        return !this.props.rowSelection.getCheckboxProps(item).disabled;
      }
      return true;
    }).map((item, i) => {
      return this.getRecordKey(item, i);
    }) : [];
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectionDirty: true
    });
    if (this.props.rowSelection.onSelectAll) {
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelectAll(checked, selectedRows);
    }
  },

  handlePageChange(current) {
    let pagination = objectAssign({}, this.state.pagination);
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    const newState = {
      // 防止内存泄漏，只维持当页
      selectedRowKeys: [],
      selectionDirty: false,
      pagination
    };
    this.setState(newState);
    this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
  },

  onRadioChange: function (ev) {
    this.setState({
      radioIndex: ev.target.value
    });
  },

  renderSelectionRadio(value, record, index) {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    let checked;
    if (this.state.selectionDirty) {
      checked = this.state.radioIndex === rowIndex;
    } else {
      checked = (this.state.radioIndex === rowIndex ||
                 this.getDefaultSelection().indexOf(rowIndex) >= 0);
    }
    return <Radio disabled={props.disabled} onChange={this.handleRadioSelect.bind(this, record, rowIndex)}
                  value={rowIndex} checked={checked}/>;
  },

  renderSelectionCheckBox(value, record, index) {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let checked;
    if (this.state.selectionDirty) {
      checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (this.state.selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 this.getDefaultSelection().indexOf(rowIndex) >= 0);
    }
    let props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    return <Checkbox checked={checked} disabled={props.disabled}
                     onChange={this.handleSelect.bind(this, record, rowIndex)}/>;
  },

  getRecordKey(record, index) {
    if (this.props.rowKey) {
      return this.props.rowKey(record, index);
    }
    return record.key || index;
  },

  renderRowSelection() {
    let columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      let data = this.getCurrentPageData().filter((item) => {
        if (this.props.rowSelection.getCheckboxProps) {
          return !this.props.rowSelection.getCheckboxProps(item).disabled;
        }
        return true;
      });
      let checked;
      if (!data.length) {
        checked = false;
      } else {
        checked = this.state.selectionDirty
          ? data.every((item, i) =>
              this.state.selectedRowKeys.indexOf(this.getRecordKey(item, i)) >= 0)
          : data.every((item) =>
              this.props.rowSelection.getCheckboxProps &&
              this.props.rowSelection.getCheckboxProps(item).defaultChecked);
      }
      let selectionColumn;
      if (this.props.rowSelection.type === 'radio') {
        selectionColumn = {
          key: 'selection-column',
          render: this.renderSelectionRadio,
          className: 'ant-table-selection-column'
        };
      } else {
        let checkboxAll = <Checkbox checked={checked} onChange={this.handleSelectAllRow}/>;
        selectionColumn = {
          key: 'selection-column',
          title: checkboxAll,
          render: this.renderSelectionCheckBox,
          className: 'ant-table-selection-column'
        };
      }
      if (columns[0] &&
        columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  },

  getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
  },

  isSortColumn(column) {
    if (!column || !this.state.sortColumn) {
      return false;
    }
    let colKey = this.getColumnKey(column);
    let isSortColumn = (this.getColumnKey(this.state.sortColumn) === colKey);
    return isSortColumn;
  },

  renderColumnsDropdown(columns) {
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    return columns.map((column, i) => {
      column = objectAssign({}, column);
      let key = this.getColumnKey(column, i);
      let filterDropdown, sortButton;
      if (column.filters && column.filters.length > 0) {
        let colFilters = this.state.filters[key] || [];
        filterDropdown =
          <FilterDropdown locale={locale} column={column}
                          selectedKeys={colFilters}
                          confirmFilter={this.handleFilter}/>;
      }
      if (column.sorter) {
        let isSortColumn = this.isSortColumn(column);
        if (isSortColumn) {
          column.className = column.className || '';
          if (this.state.sortOrder) {
            column.className += ' ant-table-column-sort';
          }
        }

        sortButton = <div className="ant-table-column-sorter">
          <span className={'ant-table-column-sorter-up ' +
                           ((isSortColumn && this.state.sortOrder === 'ascend') ? 'on' : 'off')}
                title="↑"
                onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
            <Icon type="caret-up"/>
          </span>
          <span className={'ant-table-column-sorter-down ' +
                           ((isSortColumn && this.state.sortOrder === 'descend') ? 'on' : 'off')}
                title="↓"
                onClick={this.toggleSortOrder.bind(this, 'descend', column)}>
            <Icon type="caret-down"/>
          </span>
        </div>;
      }
      column.title = <div>
        {column.title}
        {sortButton}
        {filterDropdown}
      </div>;
      return column;
    });
  },

  handleShowSizeChange(current, pageSize) {
    const pagination = this.state.pagination;
    if (pagination.onShowSizeChange) {
      pagination.onShowSizeChange(current, pageSize);
    }

    let nextPagination = objectAssign(pagination, {
      pageSize: pageSize
    });
    this.setState({ pagination: nextPagination });
  },

  renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let classString = classNames({
      'ant-table-pagination': true,
      'mini': this.props.size === 'middle' || this.props.size === 'small',
    });
    let total = this.state.pagination.total || this.getLocalData().length;
    const pageSize = this.state.pagination.pageSize;
    return (total > 0) ?
      <Pagination {...this.state.pagination}
                  className={classString}
                  onChange={this.handlePageChange}
                  total={total}
                  pageSize={pageSize}
                  onShowSizeChange={this.handleShowSizeChange} /> : null;
  },

  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    const pagination = state.pagination;
    const filters = state.filters;
    const sorter = {};
    if (state.sortColumn &&
      state.sortOrder &&
      state.sortColumn.dataIndex) {
      sorter.field = state.sortColumn.dataIndex;
      sorter.order = state.sortOrder;
    }
    return [pagination, filters, sorter];
  },

  findColumn(myKey) {
    return this.props.columns.filter((c) => {
      return this.getColumnKey(c) === myKey;
    })[0];
  },

  getCurrentPageData(dataSource) {
    let data = this.getLocalData(dataSource);
    let current, pageSize;
    let state = this.state;
    // 如果没有分页的话，默认全部展示
    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      current = 1;
    } else {
      pageSize = state.pagination.pageSize;
      current = state.pagination.current;
    }
    // 分页
    // ---
    // 当数据量少于每页数量时，直接设置数据
    // 否则进行读取分页数据
    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter((item, i) => {
        if (i >= (current - 1) * pageSize &&
          i < current * pageSize) {
          return item;
        }
      });
    }
    return data;
  },

  getLocalData(dataSource) {
    let state = this.state;
    let data = dataSource || this.props.dataSource;
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.sort(state.sorter);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        let col = this.findColumn(columnKey);
        if (!col) {
          return;
        }
        let values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        data = col.onFilter ? data.filter(record => {
          return values.some(v => col.onFilter(v, record));
        }) : data;
      });
    }
    return data;
  },

  render() {
    let data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    let expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    let locale = objectAssign({}, defaultLocale, this.props.locale);

    let classString = classNames({
      [`ant-table-${this.props.size}`]: true,
      'ant-table-bordered': this.props.bordered,
      [this.props.className]: !!this.props.className,
    });

    columns = this.renderColumnsDropdown(columns);
    columns = columns.map((column, i) => {
      column.key = column.key || column.dataIndex || i;
      return column;
    });
    let emptyText;
    let emptyClass = '';
    if (!data || data.length === 0) {
      emptyText = <div className="ant-table-placeholder">
        <Icon type="frown"/>{locale.emptyText}
      </div>;
      emptyClass = ' ant-table-empty';
    }

    let table = <div>
      <Table {...this.props}
        data={data}
        columns={columns}
        className={classString}
        expandIconAsCell={expandIconAsCell} />
      {emptyText}
    </div>;
    if (this.props.loading) {
      // if there is no pagination or no data, the height of spin should decrease by half of pagination
      let paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
              ? 'ant-table-with-pagination'
              : 'ant-table-without-pagination';
      let spinClassName = `${paginationPatchClass} ant-table-spin-holder`;
      table = <Spin className={spinClassName}>{table}</Spin>;
    }
    return (
      <div className={'clearfix' + emptyClass}>
        {table}
        {this.renderPagination()}
      </div>
    );
  }
});

export default AntTable;
