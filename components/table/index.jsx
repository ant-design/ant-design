'use strict';

import React from 'react';
import jQuery from 'jquery';
import Table from 'rc-table';

let AntTable = React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [],
      loading: false,
      data: []
    };
  },
  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal'
    };
  },
  handleSelect(e) {
    let checked = e.currentTarget.checked;
    let currentRowIndex = e.currentTarget.parentElement.parentElement.rowIndex;
    let selectedRow = this.props.data[currentRowIndex - 1];
    if (checked) {
      this.state.selectedRowKeys.push(currentRowIndex);
    } else {
      this.state.selectedRowKeys = this.state.selectedRowKeys.filter(function(i){
        return currentRowIndex !== i;
      });
    }
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys
    });
    if (this.props.rowSelection.onSelect) {
      this.props.rowSelection.onSelect(selectedRow, checked);
    }
  },
  handleSelectAllRow(e) {
    let checked = e.currentTarget.checked;
    this.setState({
      selectedRowKeys: checked ? this.props.data.map(function(item, i) {
        return i + 1;
      }) : []
    });
    if (this.props.rowSelection.onSelectAll) {
      this.props.rowSelection.onSelectAll(checked);
    }
  },
  renderSelectionCheckBox(value, record, index) {
    let checked = this.state.selectedRowKeys.indexOf(index + 1) >= 0;
    let checkbox = <input type="checkbox" checked={checked} onChange={this.handleSelect} />;
    return checkbox;
  },
  loadData: function() {
    this.props.resolve = this.props.resolve || function(data) {
      return data || [];
    };
    if (this.props.dataSource) {
      this.setState({
        loading: true
      });
      jQuery.ajax({
        url: this.props.dataSource,
        success: (result) => {
          result = this.props.resolve.call(this, result);
          if (this.isMounted()) {
            this.setState({
              data: result
            });
          }
        },
        complete: () => {
          this.setState({
            loading: false
          });
        }
      });
    }
  },
  componentDidMount() {
    this.loadData();
  },
  render() {
    if (this.props.rowSelection) {
      let checked = this.props.data.every(function(item, i) {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      }, this);
      let checkboxAll = <input type="checkbox" checked={checked} onChange={this.handleSelectAllRow} />;
      let selectionColumn = {
        key: 'selection-column',
        title: checkboxAll,
        width: 60,
        render: this.renderSelectionCheckBox
      };
      if (this.props.columns[0] &&
          this.props.columns[0].key === 'selection-column') {
        this.props.columns[0] = selectionColumn;
      } else {
        this.props.columns.unshift(selectionColumn);
      }
    }
    var classString = '';
    if (this.props.loading) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
    }
    // 'message message-important message-read'
    return <Table data={this.state.data}
      className={classString}
      {...this.props} />;
  }
});

export default AntTable;
