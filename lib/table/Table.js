"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _rcTable = _interopRequireDefault(require("rc-table"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _filterDropdown = _interopRequireDefault(require("./filterDropdown"));

var _createStore = _interopRequireDefault(require("./createStore"));

var _SelectionBox = _interopRequireDefault(require("./SelectionBox"));

var _SelectionCheckboxAll = _interopRequireDefault(require("./SelectionCheckboxAll"));

var _Column = _interopRequireDefault(require("./Column"));

var _ColumnGroup = _interopRequireDefault(require("./ColumnGroup"));

var _createBodyRow = _interopRequireDefault(require("./createBodyRow"));

var _util = require("./util");

var _pagination = _interopRequireDefault(require("../pagination"));

var _icon = _interopRequireDefault(require("../icon"));

var _spin = _interopRequireDefault(require("../spin"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _default = _interopRequireDefault(require("../locale-provider/default"));

var _configProvider = require("../config-provider");

var _warning = _interopRequireDefault(require("../_util/warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
  }
  return t;
};

function noop() {}

function stopPropagation(e) {
  e.stopPropagation();

  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

function getRowSelection(props) {
  return props.rowSelection || {};
}

var defaultPagination = {
  onChange: noop,
  onShowSizeChange: noop
};
var ROW_SELECTION_COLUMN_WIDTH = '62px';
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */

var emptyObject = {};

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props));

    _this.getCheckboxPropsByItem = function (item, index) {
      var rowSelection = getRowSelection(_this.props);

      if (!rowSelection.getCheckboxProps) {
        return {};
      }

      var key = _this.getRecordKey(item, index); // Cache checkboxProps


      if (!_this.CheckboxPropsCache[key]) {
        _this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
      }

      return _this.CheckboxPropsCache[key];
    };

    _this.onRow = function (prefixCls, record, index) {
      var onRow = _this.props.onRow;
      var custom = onRow ? onRow(record, index) : {};
      return _extends({}, custom, {
        prefixCls: prefixCls,
        store: _this.store,
        rowKey: _this.getRecordKey(record, index)
      });
    };

    _this.handleFilter = function (column, nextFilters) {
      var props = _this.props;

      var pagination = _extends({}, _this.state.pagination);

      var filters = _extends({}, _this.state.filters, _defineProperty({}, _this.getColumnKey(column), nextFilters)); // Remove filters not in current columns


      var currentColumnKeys = [];
      (0, _util.treeMap)(_this.columns, function (c) {
        if (!c.children) {
          currentColumnKeys.push(_this.getColumnKey(c));
        }
      });
      Object.keys(filters).forEach(function (columnKey) {
        if (currentColumnKeys.indexOf(columnKey) < 0) {
          delete filters[columnKey];
        }
      });

      if (props.pagination) {
        // Reset current prop
        pagination.current = 1;
        pagination.onChange(pagination.current);
      }

      var newState = {
        pagination: pagination,
        filters: {}
      };

      var filtersToSetState = _extends({}, filters); // Remove filters which is controlled


      _this.getFilteredValueColumns().forEach(function (col) {
        var columnKey = _this.getColumnKey(col);

        if (columnKey) {
          delete filtersToSetState[columnKey];
        }
      });

      if (Object.keys(filtersToSetState).length > 0) {
        newState.filters = filtersToSetState;
      } // Controlled current prop will not respond user interaction


      if (_typeof(props.pagination) === 'object' && 'current' in props.pagination) {
        newState.pagination = _extends({}, pagination, {
          current: _this.state.pagination.current
        });
      }

      _this.setState(newState, function () {
        _this.store.setState({
          selectionDirty: false
        });

        var onChange = _this.props.onChange;

        if (onChange) {
          onChange.apply(null, _this.prepareParamsArguments(_extends({}, _this.state, {
            selectionDirty: false,
            filters: filters,
            pagination: pagination
          })));
        }
      });
    };

    _this.handleSelect = function (record, rowIndex, e) {
      var checked = e.target.checked;
      var nativeEvent = e.nativeEvent;
      var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();

      var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);

      var key = _this.getRecordKey(record, rowIndex);

      var pivot = _this.state.pivot;

      var rows = _this.getFlatCurrentPageData(_this.props.childrenColumnName);

      var realIndex = rowIndex;

      if (_this.props.expandedRowRender) {
        realIndex = rows.findIndex(function (row) {
          return _this.getRecordKey(row, rowIndex) === key;
        });
      }

      if (nativeEvent.shiftKey && pivot !== undefined && realIndex !== pivot) {
        var changeRowKeys = [];
        var direction = Math.sign(pivot - realIndex);
        var dist = Math.abs(pivot - realIndex);
        var step = 0;

        var _loop = function _loop() {
          var i = realIndex + step * direction;
          step += 1;
          var row = rows[i];

          var rowKey = _this.getRecordKey(row, i);

          var checkboxProps = _this.getCheckboxPropsByItem(row, i);

          if (!checkboxProps.disabled) {
            if (selectedRowKeys.includes(rowKey)) {
              if (!checked) {
                selectedRowKeys = selectedRowKeys.filter(function (j) {
                  return rowKey !== j;
                });
                changeRowKeys.push(rowKey);
              }
            } else if (checked) {
              selectedRowKeys.push(rowKey);
              changeRowKeys.push(rowKey);
            }
          }
        };

        while (step <= dist) {
          _loop();
        }

        _this.setState({
          pivot: realIndex
        });

        _this.store.setState({
          selectionDirty: true
        });

        _this.setSelectedRowKeys(selectedRowKeys, {
          selectWay: 'onSelectMultiple',
          record: record,
          checked: checked,
          changeRowKeys: changeRowKeys,
          nativeEvent: nativeEvent
        });
      } else {
        if (checked) {
          selectedRowKeys.push(_this.getRecordKey(record, realIndex));
        } else {
          selectedRowKeys = selectedRowKeys.filter(function (i) {
            return key !== i;
          });
        }

        _this.setState({
          pivot: realIndex
        });

        _this.store.setState({
          selectionDirty: true
        });

        _this.setSelectedRowKeys(selectedRowKeys, {
          selectWay: 'onSelect',
          record: record,
          checked: checked,
          changeRowKeys: void 0,
          nativeEvent: nativeEvent
        });
      }
    };

    _this.handleRadioSelect = function (record, rowIndex, e) {
      var checked = e.target.checked;
      var nativeEvent = e.nativeEvent;

      var key = _this.getRecordKey(record, rowIndex);

      var selectedRowKeys = [key];

      _this.store.setState({
        selectionDirty: true
      });

      _this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: 'onSelect',
        record: record,
        checked: checked,
        changeRowKeys: void 0,
        nativeEvent: nativeEvent
      });
    };

    _this.handleSelectRow = function (selectionKey, index, onSelectFunc) {
      var data = _this.getFlatCurrentPageData(_this.props.childrenColumnName);

      var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();

      var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);

      var changeableRowKeys = data.filter(function (item, i) {
        return !_this.getCheckboxPropsByItem(item, i).disabled;
      }).map(function (item, i) {
        return _this.getRecordKey(item, i);
      });
      var changeRowKeys = [];
      var selectWay = 'onSelectAll';
      var checked; // handle default selection

      switch (selectionKey) {
        case 'all':
          changeableRowKeys.forEach(function (key) {
            if (selectedRowKeys.indexOf(key) < 0) {
              selectedRowKeys.push(key);
              changeRowKeys.push(key);
            }
          });
          selectWay = 'onSelectAll';
          checked = true;
          break;

        case 'removeAll':
          changeableRowKeys.forEach(function (key) {
            if (selectedRowKeys.indexOf(key) >= 0) {
              selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
              changeRowKeys.push(key);
            }
          });
          selectWay = 'onSelectAll';
          checked = false;
          break;

        case 'invert':
          changeableRowKeys.forEach(function (key) {
            if (selectedRowKeys.indexOf(key) < 0) {
              selectedRowKeys.push(key);
            } else {
              selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
            }

            changeRowKeys.push(key);
            selectWay = 'onSelectInvert';
          });
          break;

        default:
          break;
      }

      _this.store.setState({
        selectionDirty: true
      }); // when select custom selection, callback selections[n].onSelect


      var rowSelection = _this.props.rowSelection;
      var customSelectionStartIndex = 2;

      if (rowSelection && rowSelection.hideDefaultSelections) {
        customSelectionStartIndex = 0;
      }

      if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
        return onSelectFunc(changeableRowKeys);
      }

      _this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: selectWay,
        checked: checked,
        changeRowKeys: changeRowKeys
      });
    };

    _this.handlePageChange = function (current) {
      var props = _this.props;

      var pagination = _extends({}, _this.state.pagination);

      if (current) {
        pagination.current = current;
      } else {
        pagination.current = pagination.current || 1;
      }

      for (var _len = arguments.length, otherArguments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        otherArguments[_key - 1] = arguments[_key];
      }

      pagination.onChange.apply(pagination, [pagination.current].concat(otherArguments));
      var newState = {
        pagination: pagination
      }; // Controlled current prop will not respond user interaction

      if (props.pagination && _typeof(props.pagination) === 'object' && 'current' in props.pagination) {
        newState.pagination = _extends({}, pagination, {
          current: _this.state.pagination.current
        });
      }

      _this.setState(newState);

      _this.store.setState({
        selectionDirty: false
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange.apply(null, _this.prepareParamsArguments(_extends({}, _this.state, {
          selectionDirty: false,
          pagination: pagination
        })));
      }
    };

    _this.renderSelectionBox = function (type) {
      return function (_, record, index) {
        var rowKey = _this.getRecordKey(record, index);

        var props = _this.getCheckboxPropsByItem(record, index);

        var handleChange = function handleChange(e) {
          type === 'radio' ? _this.handleRadioSelect(record, index, e) : _this.handleSelect(record, index, e);
        };

        return React.createElement("span", {
          onClick: stopPropagation
        }, React.createElement(_SelectionBox["default"], _extends({
          type: type,
          store: _this.store,
          rowIndex: rowKey,
          onChange: handleChange,
          defaultSelection: _this.getDefaultSelection()
        }, props)));
      };
    };

    _this.getRecordKey = function (record, index) {
      var rowKey = _this.props.rowKey;
      var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      (0, _warning["default"])(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, ' + 'or set `rowKey` of Table to an unique primary key, ' + 'see https://u.ant.design/table-row-key');
      return recordKey === undefined ? index : recordKey;
    };

    _this.getPopupContainer = function () {
      return ReactDOM.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this)));
    };

    _this.handleShowSizeChange = function (current, pageSize) {
      var pagination = _this.state.pagination;
      pagination.onShowSizeChange(current, pageSize);

      var nextPagination = _extends({}, pagination, {
        pageSize: pageSize,
        current: current
      });

      _this.setState({
        pagination: nextPagination
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange.apply(null, _this.prepareParamsArguments(_extends({}, _this.state, {
          pagination: nextPagination
        })));
      }
    };

    _this.renderTable = function (prefixCls, renderEmpty, dropdownPrefixCls, contextLocale, loading) {
      var _classNames;

      var _a = _this.props,
          style = _a.style,
          className = _a.className,
          showHeader = _a.showHeader,
          locale = _a.locale,
          restProps = __rest(_a, ["style", "className", "showHeader", "locale"]);

      var data = _this.getCurrentPageData();

      var expandIconAsCell = _this.props.expandedRowRender && _this.props.expandIconAsCell !== false;

      var mergedLocale = _extends({}, contextLocale, locale);

      if (!locale || !locale.emptyText) {
        mergedLocale.emptyText = renderEmpty('Table');
      }

      var classString = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(_this.props.size), true), _defineProperty(_classNames, "".concat(prefixCls, "-bordered"), _this.props.bordered), _defineProperty(_classNames, "".concat(prefixCls, "-empty"), !data.length), _defineProperty(_classNames, "".concat(prefixCls, "-without-column-header"), !showHeader), _classNames));

      var columns = _this.renderRowSelection(prefixCls, mergedLocale);

      columns = _this.renderColumnsDropdown(prefixCls, dropdownPrefixCls, columns, mergedLocale);
      columns = columns.map(function (column, i) {
        var newColumn = _extends({}, column);

        newColumn.key = _this.getColumnKey(newColumn, i);
        return newColumn;
      });
      var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;

      if ('expandIconColumnIndex' in restProps) {
        expandIconColumnIndex = restProps.expandIconColumnIndex;
      }

      return React.createElement(_rcTable["default"], _extends({
        key: "table"
      }, restProps, {
        onRow: function onRow(record, index) {
          return _this.onRow(prefixCls, record, index);
        },
        components: _this.components,
        prefixCls: prefixCls,
        data: data,
        columns: columns,
        showHeader: showHeader,
        className: classString,
        expandIconColumnIndex: expandIconColumnIndex,
        expandIconAsCell: expandIconAsCell,
        emptyText: !loading.spinning && mergedLocale.emptyText
      }));
    };

    _this.renderComponent = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls,
          renderEmpty = _ref.renderEmpty;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          customizeDropdownPrefixCls = _this$props.dropdownPrefixCls,
          style = _this$props.style,
          className = _this$props.className;

      var data = _this.getCurrentPageData();

      var loading = _this.props.loading;

      if (typeof loading === 'boolean') {
        loading = {
          spinning: loading
        };
      }

      var prefixCls = getPrefixCls('table', customizePrefixCls);
      var dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);
      var table = React.createElement(_LocaleReceiver["default"], {
        componentName: "Table",
        defaultLocale: _default["default"].Table
      }, function (locale) {
        return _this.renderTable(prefixCls, renderEmpty, dropdownPrefixCls, locale, loading);
      }); // if there is no pagination or no data,
      // the height of spin should decrease by half of pagination

      var paginationPatchClass = _this.hasPagination() && data && data.length !== 0 ? "".concat(prefixCls, "-with-pagination") : "".concat(prefixCls, "-without-pagination");
      return React.createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-wrapper"), className),
        style: style
      }, React.createElement(_spin["default"], _extends({}, loading, {
        className: loading.spinning ? "".concat(paginationPatchClass, " ").concat(prefixCls, "-spin-holder") : ''
      }), _this.renderPagination(prefixCls, 'top'), table, _this.renderPagination(prefixCls, 'bottom')));
    };

    (0, _warning["default"])(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use ' + 'fixed columns instead, see: https://u.ant.design/fixed-columns.');
    (0, _warning["default"])(!('expandedRowRender' in props) || !('scroll' in props), '`expandedRowRender` and `scroll` are not compatible. Please use one of them at one time.');
    _this.columns = props.columns || (0, _util.normalizeColumns)(props.children);

    _this.createComponents(props.components);

    _this.state = _extends({}, _this.getDefaultSortOrder(_this.columns), {
      // 减少状态
      filters: _this.getFiltersFromColumns(),
      pagination: _this.getDefaultPagination(props),
      pivot: undefined
    });
    _this.CheckboxPropsCache = {};
    _this.store = (0, _createStore["default"])({
      selectedRowKeys: getRowSelection(props).selectedRowKeys || [],
      selectionDirty: false
    });
    return _this;
  }

  _createClass(Table, [{
    key: "getDefaultSelection",
    value: function getDefaultSelection() {
      var _this2 = this;

      var rowSelection = getRowSelection(this.props);

      if (!rowSelection.getCheckboxProps) {
        return [];
      }

      return this.getFlatData().filter(function (item, rowIndex) {
        return _this2.getCheckboxPropsByItem(item, rowIndex).defaultChecked;
      }).map(function (record, rowIndex) {
        return _this2.getRecordKey(record, rowIndex);
      });
    }
  }, {
    key: "getDefaultPagination",
    value: function getDefaultPagination(props) {
      var pagination = props.pagination || {};
      return this.hasPagination(props) ? _extends({}, defaultPagination, pagination, {
        current: pagination.defaultCurrent || pagination.current || 1,
        pageSize: pagination.defaultPageSize || pagination.pageSize || 10
      }) : {};
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.columns = nextProps.columns || (0, _util.normalizeColumns)(nextProps.children);

      if ('pagination' in nextProps || 'pagination' in this.props) {
        this.setState(function (previousState) {
          var newPagination = _extends({}, defaultPagination, previousState.pagination, nextProps.pagination);

          newPagination.current = newPagination.current || 1;
          newPagination.pageSize = newPagination.pageSize || 10;
          return {
            pagination: nextProps.pagination !== false ? newPagination : emptyObject
          };
        });
      }

      if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
        this.store.setState({
          selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
        });
      }

      if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
        this.store.setState({
          selectionDirty: false
        });
      } // https://github.com/ant-design/ant-design/issues/10133


      this.CheckboxPropsCache = {};

      if (this.getSortOrderColumns(this.columns).length > 0) {
        var sortState = this.getSortStateFromColumns(this.columns);

        if (sortState.sortColumn !== this.state.sortColumn || sortState.sortOrder !== this.state.sortOrder) {
          this.setState(sortState);
        }
      }

      var filteredValueColumns = this.getFilteredValueColumns(this.columns);

      if (filteredValueColumns.length > 0) {
        var filtersFromColumns = this.getFiltersFromColumns(this.columns);

        var newFilters = _extends({}, this.state.filters);

        Object.keys(filtersFromColumns).forEach(function (key) {
          newFilters[key] = filtersFromColumns[key];
        });

        if (this.isFiltersChanged(newFilters)) {
          this.setState({
            filters: newFilters
          });
        }
      }

      this.createComponents(nextProps.components, this.props.components);
    }
  }, {
    key: "setSelectedRowKeys",
    value: function setSelectedRowKeys(selectedRowKeys, selectionInfo) {
      var _this3 = this;

      var selectWay = selectionInfo.selectWay,
          record = selectionInfo.record,
          checked = selectionInfo.checked,
          changeRowKeys = selectionInfo.changeRowKeys,
          nativeEvent = selectionInfo.nativeEvent;
      var rowSelection = getRowSelection(this.props);

      if (rowSelection && !('selectedRowKeys' in rowSelection)) {
        this.store.setState({
          selectedRowKeys: selectedRowKeys
        });
      }

      var data = this.getFlatData();

      if (!rowSelection.onChange && !rowSelection[selectWay]) {
        return;
      }

      var selectedRows = data.filter(function (row, i) {
        return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
      });

      if (rowSelection.onChange) {
        rowSelection.onChange(selectedRowKeys, selectedRows);
      }

      if (selectWay === 'onSelect' && rowSelection.onSelect) {
        rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
      } else if (selectWay === 'onSelectMultiple' && rowSelection.onSelectMultiple) {
        var changeRows = data.filter(function (row, i) {
          return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
        });
        rowSelection.onSelectMultiple(checked, selectedRows, changeRows);
      } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
        var _changeRows = data.filter(function (row, i) {
          return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
        });

        rowSelection.onSelectAll(checked, selectedRows, _changeRows);
      } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
        rowSelection.onSelectInvert(selectedRowKeys);
      }
    }
  }, {
    key: "hasPagination",
    value: function hasPagination(props) {
      return (props || this.props).pagination !== false;
    }
  }, {
    key: "isFiltersChanged",
    value: function isFiltersChanged(filters) {
      var _this4 = this;

      var filtersChanged = false;

      if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
        filtersChanged = true;
      } else {
        Object.keys(filters).forEach(function (columnKey) {
          if (filters[columnKey] !== _this4.state.filters[columnKey]) {
            filtersChanged = true;
          }
        });
      }

      return filtersChanged;
    }
  }, {
    key: "getSortOrderColumns",
    value: function getSortOrderColumns(columns) {
      return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
        return 'sortOrder' in column;
      });
    }
  }, {
    key: "getFilteredValueColumns",
    value: function getFilteredValueColumns(columns) {
      return (0, _util.flatFilter)(columns || this.columns || [], function (column) {
        return typeof column.filteredValue !== 'undefined';
      });
    }
  }, {
    key: "getFiltersFromColumns",
    value: function getFiltersFromColumns(columns) {
      var _this5 = this;

      var filters = {};
      this.getFilteredValueColumns(columns).forEach(function (col) {
        var colKey = _this5.getColumnKey(col);

        filters[colKey] = col.filteredValue;
      });
      return filters;
    }
  }, {
    key: "getDefaultSortOrder",
    value: function getDefaultSortOrder(columns) {
      var definedSortState = this.getSortStateFromColumns(columns);
      var defaultSortedColumn = (0, _util.flatFilter)(columns || [], function (column) {
        return column.defaultSortOrder != null;
      })[0];

      if (defaultSortedColumn && !definedSortState.sortColumn) {
        return {
          sortColumn: defaultSortedColumn,
          sortOrder: defaultSortedColumn.defaultSortOrder
        };
      }

      return definedSortState;
    }
  }, {
    key: "getSortStateFromColumns",
    value: function getSortStateFromColumns(columns) {
      // return first column which sortOrder is not falsy
      var sortedColumn = this.getSortOrderColumns(columns).filter(function (col) {
        return col.sortOrder;
      })[0];

      if (sortedColumn) {
        return {
          sortColumn: sortedColumn,
          sortOrder: sortedColumn.sortOrder
        };
      }

      return {
        sortColumn: null,
        sortOrder: null
      };
    }
  }, {
    key: "getSorterFn",
    value: function getSorterFn(state) {
      var _ref2 = state || this.state,
          sortOrder = _ref2.sortOrder,
          sortColumn = _ref2.sortColumn;

      if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
        return;
      }

      return function (a, b) {
        var result = sortColumn.sorter(a, b, sortOrder);

        if (result !== 0) {
          return sortOrder === 'descend' ? -result : result;
        }

        return 0;
      };
    }
  }, {
    key: "isSameColumn",
    value: function isSameColumn(a, b) {
      if (a && b && a.key && a.key === b.key) {
        return true;
      }

      return a === b || (0, _shallowequal["default"])(a, b, function (value, other) {
        if (typeof value === 'function' && typeof other === 'function') {
          return value === other || value.toString() === other.toString();
        }
      });
    }
  }, {
    key: "toggleSortOrder",
    value: function toggleSortOrder(column) {
      if (!column.sorter) {
        return;
      }

      var sortDirections = column.sortDirections || this.props.sortDirections;
      var _this$state = this.state,
          sortOrder = _this$state.sortOrder,
          sortColumn = _this$state.sortColumn; // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题

      var newSortOrder; // 切换另一列时，丢弃 sortOrder 的状态

      if (this.isSameColumn(sortColumn, column) && sortOrder !== undefined) {
        // 按照sortDirections的内容依次切换排序状态
        var methodIndex = sortDirections.indexOf(sortOrder) + 1;
        newSortOrder = methodIndex === sortDirections.length ? undefined : sortDirections[methodIndex];
      } else {
        newSortOrder = sortDirections[0];
      }

      var newState = {
        sortOrder: newSortOrder,
        sortColumn: newSortOrder ? column : null
      }; // Controlled

      if (this.getSortOrderColumns().length === 0) {
        this.setState(newState);
      }

      var onChange = this.props.onChange;

      if (onChange) {
        onChange.apply(null, this.prepareParamsArguments(_extends({}, this.state, newState)));
      }
    }
  }, {
    key: "renderRowSelection",
    value: function renderRowSelection(prefixCls, locale) {
      var _this6 = this;

      var _this$props2 = this.props,
          rowSelection = _this$props2.rowSelection,
          childrenColumnName = _this$props2.childrenColumnName;
      var columns = this.columns.concat();

      if (rowSelection) {
        var data = this.getFlatCurrentPageData(childrenColumnName).filter(function (item, index) {
          if (rowSelection.getCheckboxProps) {
            return !_this6.getCheckboxPropsByItem(item, index).disabled;
          }

          return true;
        });
        var selectionColumnClass = (0, _classnames["default"])("".concat(prefixCls, "-selection-column"), _defineProperty({}, "".concat(prefixCls, "-selection-column-custom"), rowSelection.selections));
        var selectionColumn = {
          key: 'selection-column',
          render: this.renderSelectionBox(rowSelection.type),
          className: selectionColumnClass,
          fixed: rowSelection.fixed,
          width: rowSelection.columnWidth || ROW_SELECTION_COLUMN_WIDTH,
          title: rowSelection.columnTitle
        };

        if (rowSelection.type !== 'radio') {
          var checkboxAllDisabled = data.every(function (item, index) {
            return _this6.getCheckboxPropsByItem(item, index).disabled;
          });
          selectionColumn.title = selectionColumn.title || React.createElement(_SelectionCheckboxAll["default"], {
            store: this.store,
            locale: locale,
            data: data,
            getCheckboxPropsByItem: this.getCheckboxPropsByItem,
            getRecordKey: this.getRecordKey,
            disabled: checkboxAllDisabled,
            prefixCls: prefixCls,
            onSelect: this.handleSelectRow,
            selections: rowSelection.selections,
            hideDefaultSelections: rowSelection.hideDefaultSelections,
            getPopupContainer: this.getPopupContainer
          });
        }

        if ('fixed' in rowSelection) {
          selectionColumn.fixed = rowSelection.fixed;
        } else if (columns.some(function (column) {
          return column.fixed === 'left' || column.fixed === true;
        })) {
          selectionColumn.fixed = 'left';
        }

        if (columns[0] && columns[0].key === 'selection-column') {
          columns[0] = selectionColumn;
        } else {
          columns.unshift(selectionColumn);
        }
      }

      return columns;
    }
  }, {
    key: "getColumnKey",
    value: function getColumnKey(column, index) {
      return column.key || column.dataIndex || index;
    }
  }, {
    key: "getMaxCurrent",
    value: function getMaxCurrent(total) {
      var _this$state$paginatio = this.state.pagination,
          current = _this$state$paginatio.current,
          pageSize = _this$state$paginatio.pageSize;

      if ((current - 1) * pageSize >= total) {
        return Math.floor((total - 1) / pageSize) + 1;
      }

      return current;
    }
  }, {
    key: "isSortColumn",
    value: function isSortColumn(column) {
      var sortColumn = this.state.sortColumn;

      if (!column || !sortColumn) {
        return false;
      }

      return this.getColumnKey(sortColumn) === this.getColumnKey(column);
    }
  }, {
    key: "renderColumnsDropdown",
    value: function renderColumnsDropdown(prefixCls, dropdownPrefixCls, columns, locale) {
      var _this7 = this;

      var _this$state2 = this.state,
          sortOrder = _this$state2.sortOrder,
          filters = _this$state2.filters;
      return (0, _util.treeMap)(columns, function (column, i) {
        var _classNames3;

        var key = _this7.getColumnKey(column, i);

        var filterDropdown;
        var sortButton;
        var onHeaderCell = column.onHeaderCell;

        var isSortColumn = _this7.isSortColumn(column);

        if (column.filters && column.filters.length > 0 || column.filterDropdown) {
          var colFilters = key in filters ? filters[key] : [];
          filterDropdown = React.createElement(_filterDropdown["default"], {
            locale: locale,
            column: column,
            selectedKeys: colFilters,
            confirmFilter: _this7.handleFilter,
            prefixCls: "".concat(prefixCls, "-filter"),
            dropdownPrefixCls: dropdownPrefixCls || 'ant-dropdown',
            getPopupContainer: _this7.getPopupContainer,
            key: "filter-dropdown"
          });
        }

        if (column.sorter) {
          var sortDirections = column.sortDirections || _this7.props.sortDirections;
          var isAscend = isSortColumn && sortOrder === 'ascend';
          var isDescend = isSortColumn && sortOrder === 'descend';
          var ascend = sortDirections.indexOf('ascend') !== -1 && React.createElement(_icon["default"], {
            className: "".concat(prefixCls, "-column-sorter-up ").concat(isAscend ? 'on' : 'off'),
            type: "caret-up",
            theme: "filled"
          });
          var descend = sortDirections.indexOf('descend') !== -1 && React.createElement(_icon["default"], {
            className: "".concat(prefixCls, "-column-sorter-down ").concat(isDescend ? 'on' : 'off'),
            type: "caret-down",
            theme: "filled"
          });
          sortButton = React.createElement("div", {
            title: locale.sortTitle,
            className: "".concat(prefixCls, "-column-sorter"),
            key: "sorter"
          }, ascend, descend);

          onHeaderCell = function onHeaderCell(col) {
            var colProps = {}; // Get original first

            if (column.onHeaderCell) {
              colProps = _extends({}, column.onHeaderCell(col));
            } // Add sorter logic


            var onHeaderCellClick = colProps.onClick;

            colProps.onClick = function () {
              _this7.toggleSortOrder(column);

              if (onHeaderCellClick) {
                onHeaderCellClick.apply(void 0, arguments);
              }
            };

            return colProps;
          };
        }

        return _extends({}, column, {
          className: (0, _classnames["default"])(column.className, (_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-column-has-actions"), sortButton || filterDropdown), _defineProperty(_classNames3, "".concat(prefixCls, "-column-has-filters"), filterDropdown), _defineProperty(_classNames3, "".concat(prefixCls, "-column-has-sorters"), sortButton), _defineProperty(_classNames3, "".concat(prefixCls, "-column-sort"), isSortColumn && sortOrder), _classNames3)),
          title: [React.createElement("div", {
            key: "title",
            className: sortButton ? "".concat(prefixCls, "-column-sorters") : undefined
          }, _this7.renderColumnTitle(column.title), sortButton), filterDropdown],
          onHeaderCell: onHeaderCell
        });
      });
    }
  }, {
    key: "renderColumnTitle",
    value: function renderColumnTitle(title) {
      var _this$state3 = this.state,
          filters = _this$state3.filters,
          sortOrder = _this$state3.sortOrder; // https://github.com/ant-design/ant-design/issues/11246#issuecomment-405009167

      if (title instanceof Function) {
        return title({
          filters: filters,
          sortOrder: sortOrder
        });
      }

      return title;
    }
  }, {
    key: "renderPagination",
    value: function renderPagination(prefixCls, paginationPosition) {
      // 强制不需要分页
      if (!this.hasPagination()) {
        return null;
      }

      var size = 'default';
      var pagination = this.state.pagination;

      if (pagination.size) {
        size = pagination.size;
      } else if (this.props.size === 'middle' || this.props.size === 'small') {
        size = 'small';
      }

      var position = pagination.position || 'bottom';
      var total = pagination.total || this.getLocalData().length;
      return total > 0 && (position === paginationPosition || position === 'both') ? React.createElement(_pagination["default"], _extends({
        key: "pagination-".concat(paginationPosition)
      }, pagination, {
        className: (0, _classnames["default"])(pagination.className, "".concat(prefixCls, "-pagination")),
        onChange: this.handlePageChange,
        total: total,
        size: size,
        current: this.getMaxCurrent(total),
        onShowSizeChange: this.handleShowSizeChange
      })) : null;
    } // Get pagination, filters, sorter

  }, {
    key: "prepareParamsArguments",
    value: function prepareParamsArguments(state) {
      var pagination = _extends({}, state.pagination); // remove useless handle function in Table.onChange


      delete pagination.onChange;
      delete pagination.onShowSizeChange;
      var filters = state.filters;
      var sorter = {};

      if (state.sortColumn && state.sortOrder) {
        sorter.column = state.sortColumn;
        sorter.order = state.sortOrder;
        sorter.field = state.sortColumn.dataIndex;
        sorter.columnKey = this.getColumnKey(state.sortColumn);
      }

      var extra = {
        currentDataSource: this.getLocalData(state)
      };
      return [pagination, filters, sorter, extra];
    }
  }, {
    key: "findColumn",
    value: function findColumn(myKey) {
      var _this8 = this;

      var column;
      (0, _util.treeMap)(this.columns, function (c) {
        if (_this8.getColumnKey(c) === myKey) {
          column = c;
        }
      });
      return column;
    }
  }, {
    key: "getCurrentPageData",
    value: function getCurrentPageData() {
      var data = this.getLocalData();
      var current;
      var pageSize;
      var state = this.state; // 如果没有分页的话，默认全部展示

      if (!this.hasPagination()) {
        pageSize = Number.MAX_VALUE;
        current = 1;
      } else {
        pageSize = state.pagination.pageSize;
        current = this.getMaxCurrent(state.pagination.total || data.length);
      } // 分页
      // ---
      // 当数据量少于等于每页数量时，直接设置数据
      // 否则进行读取分页数据


      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.filter(function (_, i) {
          return i >= (current - 1) * pageSize && i < current * pageSize;
        });
      }

      return data;
    }
  }, {
    key: "getFlatData",
    value: function getFlatData() {
      return (0, _util.flatArray)(this.getLocalData(null, false));
    }
  }, {
    key: "getFlatCurrentPageData",
    value: function getFlatCurrentPageData(childrenColumnName) {
      return (0, _util.flatArray)(this.getCurrentPageData(), childrenColumnName);
    }
  }, {
    key: "recursiveSort",
    value: function recursiveSort(data, sorterFn) {
      var _this9 = this;

      var _this$props$childrenC = this.props.childrenColumnName,
          childrenColumnName = _this$props$childrenC === void 0 ? 'children' : _this$props$childrenC;
      return data.sort(sorterFn).map(function (item) {
        return item[childrenColumnName] ? _extends({}, item, _defineProperty({}, childrenColumnName, _this9.recursiveSort(item[childrenColumnName], sorterFn))) : item;
      });
    }
  }, {
    key: "getLocalData",
    value: function getLocalData(state) {
      var _this10 = this;

      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var currentState = state || this.state;
      var dataSource = this.props.dataSource;
      var data = dataSource || []; // 优化本地排序

      data = data.slice(0);
      var sorterFn = this.getSorterFn(currentState);

      if (sorterFn) {
        data = this.recursiveSort(data, sorterFn);
      } // 筛选


      if (filter && currentState.filters) {
        Object.keys(currentState.filters).forEach(function (columnKey) {
          var col = _this10.findColumn(columnKey);

          if (!col) {
            return;
          }

          var values = currentState.filters[columnKey] || [];

          if (values.length === 0) {
            return;
          }

          var onFilter = col.onFilter;
          data = onFilter ? data.filter(function (record) {
            return values.some(function (v) {
              return onFilter(v, record);
            });
          }) : data;
        });
      }

      return data;
    }
  }, {
    key: "createComponents",
    value: function createComponents() {
      var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var prevComponents = arguments.length > 1 ? arguments[1] : undefined;
      var bodyRow = components && components.body && components.body.row;
      var preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;

      if (!this.row || bodyRow !== preBodyRow) {
        this.row = (0, _createBodyRow["default"])(bodyRow);
      }

      this.components = _extends({}, components, {
        body: _extends({}, components.body, {
          row: this.row
        })
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderComponent);
    }
  }]);

  return Table;
}(React.Component);

exports["default"] = Table;
Table.Column = _Column["default"];
Table.ColumnGroup = _ColumnGroup["default"];
Table.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  prefixCls: PropTypes.string,
  useFixedHeader: PropTypes.bool,
  rowSelection: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  bordered: PropTypes.bool,
  onChange: PropTypes.func,
  locale: PropTypes.object,
  dropdownPrefixCls: PropTypes.string,
  sortDirections: PropTypes.array
};
Table.defaultProps = {
  dataSource: [],
  useFixedHeader: false,
  className: '',
  size: 'default',
  loading: false,
  bordered: false,
  indentSize: 20,
  locale: {},
  rowKey: 'key',
  showHeader: true,
  sortDirections: ['ascend', 'descend']
};