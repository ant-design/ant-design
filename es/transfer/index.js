function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import { ConfigConsumer } from '../config-provider';

function noop() {}

var Transfer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Transfer, _React$Component);

  function Transfer(props) {
    var _this;

    _classCallCheck(this, Transfer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Transfer).call(this, props));
    _this.separatedDataSource = null;

    _this.moveTo = function (direction) {
      var _this$props = _this.props,
          _this$props$targetKey = _this$props.targetKeys,
          targetKeys = _this$props$targetKey === void 0 ? [] : _this$props$targetKey,
          _this$props$dataSourc = _this$props.dataSource,
          dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
          onChange = _this$props.onChange;
      var _this$state = _this.state,
          sourceSelectedKeys = _this$state.sourceSelectedKeys,
          targetSelectedKeys = _this$state.targetSelectedKeys;
      var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys; // filter the disabled options

      var newMoveKeys = moveKeys.filter(function (key) {
        return !dataSource.some(function (data) {
          return !!(key === data.key && data.disabled);
        });
      }); // move items to target box

      var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return newMoveKeys.indexOf(targetKey) === -1;
      }); // empty checked keys

      var oppositeDirection = direction === 'right' ? 'left' : 'right';

      _this.setState(_defineProperty({}, _this.getSelectedKeysName(oppositeDirection), []));

      _this.handleSelectChange(oppositeDirection, []);

      if (onChange) {
        onChange(newTargetKeys, direction, newMoveKeys);
      }
    };

    _this.moveToLeft = function () {
      return _this.moveTo('left');
    };

    _this.moveToRight = function () {
      return _this.moveTo('right');
    };

    _this.handleSelectAll = function (direction, filteredDataSource, checkAll) {
      var originalSelectedKeys = _this.state[_this.getSelectedKeysName(direction)] || [];
      var currentKeys = filteredDataSource.map(function (item) {
        return item.key;
      }); // Only operate current keys from original selected keys

      var newKeys1 = originalSelectedKeys.filter(function (key) {
        return currentKeys.indexOf(key) === -1;
      });

      var newKeys2 = _toConsumableArray(originalSelectedKeys);

      currentKeys.forEach(function (key) {
        if (newKeys2.indexOf(key) === -1) {
          newKeys2.push(key);
        }
      });
      var holder = checkAll ? newKeys1 : newKeys2;

      _this.handleSelectChange(direction, holder);

      if (!_this.props.selectedKeys) {
        _this.setState(_defineProperty({}, _this.getSelectedKeysName(direction), holder));
      }
    };

    _this.handleLeftSelectAll = function (filteredDataSource, checkAll) {
      return _this.handleSelectAll('left', filteredDataSource, checkAll);
    };

    _this.handleRightSelectAll = function (filteredDataSource, checkAll) {
      return _this.handleSelectAll('right', filteredDataSource, checkAll);
    };

    _this.handleFilter = function (direction, e) {
      var _this$props2 = _this.props,
          onSearchChange = _this$props2.onSearchChange,
          onSearch = _this$props2.onSearch;
      var value = e.target.value;

      _this.setState(_defineProperty({}, "".concat(direction, "Filter"), value));

      if (onSearchChange) {
        warning(false, '`onSearchChange` in Transfer is deprecated. Please use `onSearch` instead.');
        onSearchChange(direction, e);
      }

      if (onSearch) {
        onSearch(direction, value);
      }
    };

    _this.handleLeftFilter = function (e) {
      return _this.handleFilter('left', e);
    };

    _this.handleRightFilter = function (e) {
      return _this.handleFilter('right', e);
    };

    _this.handleClear = function (direction) {
      var onSearch = _this.props.onSearch;

      _this.setState(_defineProperty({}, "".concat(direction, "Filter"), ''));

      if (onSearch) {
        onSearch(direction, '');
      }
    };

    _this.handleLeftClear = function () {
      return _this.handleClear('left');
    };

    _this.handleRightClear = function () {
      return _this.handleClear('right');
    };

    _this.handleSelect = function (direction, selectedItem, checked) {
      var _this$state2 = _this.state,
          sourceSelectedKeys = _this$state2.sourceSelectedKeys,
          targetSelectedKeys = _this$state2.targetSelectedKeys;
      var holder = direction === 'left' ? _toConsumableArray(sourceSelectedKeys) : _toConsumableArray(targetSelectedKeys);
      var index = holder.indexOf(selectedItem.key);

      if (index > -1) {
        holder.splice(index, 1);
      }

      if (checked) {
        holder.push(selectedItem.key);
      }

      _this.handleSelectChange(direction, holder);

      if (!_this.props.selectedKeys) {
        _this.setState(_defineProperty({}, _this.getSelectedKeysName(direction), holder));
      }
    };

    _this.handleLeftSelect = function (selectedItem, checked) {
      return _this.handleSelect('left', selectedItem, checked);
    };

    _this.handleRightSelect = function (selectedItem, checked) {
      return _this.handleSelect('right', selectedItem, checked);
    };

    _this.handleScroll = function (direction, e) {
      var onScroll = _this.props.onScroll;

      if (onScroll) {
        onScroll(direction, e);
      }
    };

    _this.handleLeftScroll = function (e) {
      return _this.handleScroll('left', e);
    };

    _this.handleRightScroll = function (e) {
      return _this.handleScroll('right', e);
    };

    _this.getLocale = function (transferLocale, renderEmpty) {
      // Keep old locale props still working.
      var oldLocale = {
        notFoundContent: renderEmpty('Transfer')
      };

      if ('notFoundContent' in _this.props) {
        oldLocale.notFoundContent = _this.props.notFoundContent;
      }

      if ('searchPlaceholder' in _this.props) {
        oldLocale.searchPlaceholder = _this.props.searchPlaceholder;
      }

      return _extends({}, transferLocale, oldLocale, _this.props.locale);
    };

    _this.renderTransfer = function (transferLocale) {
      return React.createElement(ConfigConsumer, null, function (_ref) {
        var getPrefixCls = _ref.getPrefixCls,
            renderEmpty = _ref.renderEmpty;
        var _this$props3 = _this.props,
            customizePrefixCls = _this$props3.prefixCls,
            className = _this$props3.className,
            disabled = _this$props3.disabled,
            _this$props3$operatio = _this$props3.operations,
            operations = _this$props3$operatio === void 0 ? [] : _this$props3$operatio,
            showSearch = _this$props3.showSearch,
            body = _this$props3.body,
            footer = _this$props3.footer,
            style = _this$props3.style,
            listStyle = _this$props3.listStyle,
            operationStyle = _this$props3.operationStyle,
            filterOption = _this$props3.filterOption,
            render = _this$props3.render,
            lazy = _this$props3.lazy;
        var prefixCls = getPrefixCls('transfer', customizePrefixCls);

        var locale = _this.getLocale(transferLocale, renderEmpty);

        var _this$state3 = _this.state,
            leftFilter = _this$state3.leftFilter,
            rightFilter = _this$state3.rightFilter,
            sourceSelectedKeys = _this$state3.sourceSelectedKeys,
            targetSelectedKeys = _this$state3.targetSelectedKeys;

        var _this$separateDataSou = _this.separateDataSource(_this.props),
            leftDataSource = _this$separateDataSou.leftDataSource,
            rightDataSource = _this$separateDataSou.rightDataSource;

        var leftActive = targetSelectedKeys.length > 0;
        var rightActive = sourceSelectedKeys.length > 0;
        var cls = classNames(className, prefixCls, disabled && "".concat(prefixCls, "-disabled"));

        var titles = _this.getTitles(locale);

        return React.createElement("div", {
          className: cls,
          style: style
        }, React.createElement(List, _extends({
          prefixCls: "".concat(prefixCls, "-list"),
          titleText: titles[0],
          dataSource: leftDataSource,
          filter: leftFilter,
          filterOption: filterOption,
          style: listStyle,
          checkedKeys: sourceSelectedKeys,
          handleFilter: _this.handleLeftFilter,
          handleClear: _this.handleLeftClear,
          handleSelect: _this.handleLeftSelect,
          handleSelectAll: _this.handleLeftSelectAll,
          render: render,
          showSearch: showSearch,
          body: body,
          footer: footer,
          lazy: lazy,
          onScroll: _this.handleLeftScroll,
          disabled: disabled
        }, locale)), React.createElement(Operation, {
          className: "".concat(prefixCls, "-operation"),
          rightActive: rightActive,
          rightArrowText: operations[0],
          moveToRight: _this.moveToRight,
          leftActive: leftActive,
          leftArrowText: operations[1],
          moveToLeft: _this.moveToLeft,
          style: operationStyle,
          disabled: disabled
        }), React.createElement(List, _extends({
          prefixCls: "".concat(prefixCls, "-list"),
          titleText: titles[1],
          dataSource: rightDataSource,
          filter: rightFilter,
          filterOption: filterOption,
          style: listStyle,
          checkedKeys: targetSelectedKeys,
          handleFilter: _this.handleRightFilter,
          handleClear: _this.handleRightClear,
          handleSelect: _this.handleRightSelect,
          handleSelectAll: _this.handleRightSelectAll,
          render: render,
          showSearch: showSearch,
          body: body,
          footer: footer,
          lazy: lazy,
          onScroll: _this.handleRightScroll,
          disabled: disabled
        }, locale)));
      });
    };

    warning(!('notFoundContent' in props || 'searchPlaceholder' in props), 'Transfer[notFoundContent] and Transfer[searchPlaceholder] will be removed, ' + 'please use Transfer[locale] instead.');
    var _props$selectedKeys = props.selectedKeys,
        selectedKeys = _props$selectedKeys === void 0 ? [] : _props$selectedKeys,
        _props$targetKeys = props.targetKeys,
        targetKeys = _props$targetKeys === void 0 ? [] : _props$targetKeys;
    _this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) === -1;
      }),
      targetSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.indexOf(key) > -1;
      })
    };
    return _this;
  }

  _createClass(Transfer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$state4 = this.state,
          sourceSelectedKeys = _this$state4.sourceSelectedKeys,
          targetSelectedKeys = _this$state4.targetSelectedKeys;

      if (nextProps.targetKeys !== this.props.targetKeys || nextProps.dataSource !== this.props.dataSource) {
        // clear cached separated dataSource
        this.separatedDataSource = null;

        if (!nextProps.selectedKeys) {
          // clear key no longer existed
          // clear checkedKeys according to targetKeys
          var dataSource = nextProps.dataSource,
              _nextProps$targetKeys = nextProps.targetKeys,
              targetKeys = _nextProps$targetKeys === void 0 ? [] : _nextProps$targetKeys;
          var newSourceSelectedKeys = [];
          var newTargetSelectedKeys = [];
          dataSource.forEach(function (_ref2) {
            var key = _ref2.key;

            if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
              newSourceSelectedKeys.push(key);
            }

            if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
              newTargetSelectedKeys.push(key);
            }
          });
          this.setState({
            sourceSelectedKeys: newSourceSelectedKeys,
            targetSelectedKeys: newTargetSelectedKeys
          });
        }
      }

      if (nextProps.selectedKeys) {
        var _targetKeys = nextProps.targetKeys || [];

        this.setState({
          sourceSelectedKeys: nextProps.selectedKeys.filter(function (key) {
            return !_targetKeys.includes(key);
          }),
          targetSelectedKeys: nextProps.selectedKeys.filter(function (key) {
            return _targetKeys.includes(key);
          })
        });
      }
    }
  }, {
    key: "separateDataSource",
    value: function separateDataSource(props) {
      if (this.separatedDataSource) {
        return this.separatedDataSource;
      }

      var dataSource = props.dataSource,
          rowKey = props.rowKey,
          _props$targetKeys2 = props.targetKeys,
          targetKeys = _props$targetKeys2 === void 0 ? [] : _props$targetKeys2;
      var leftDataSource = [];
      var rightDataSource = new Array(targetKeys.length);
      dataSource.forEach(function (record) {
        if (rowKey) {
          record.key = rowKey(record);
        } // rightDataSource should be ordered by targetKeys
        // leftDataSource should be ordered by dataSource


        var indexOfKey = targetKeys.indexOf(record.key);

        if (indexOfKey !== -1) {
          rightDataSource[indexOfKey] = record;
        } else {
          leftDataSource.push(record);
        }
      });
      this.separatedDataSource = {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
      return this.separatedDataSource;
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(direction, holder) {
      var _this$state5 = this.state,
          sourceSelectedKeys = _this$state5.sourceSelectedKeys,
          targetSelectedKeys = _this$state5.targetSelectedKeys;
      var onSelectChange = this.props.onSelectChange;

      if (!onSelectChange) {
        return;
      }

      if (direction === 'left') {
        onSelectChange(holder, targetSelectedKeys);
      } else {
        onSelectChange(sourceSelectedKeys, holder);
      }
    }
  }, {
    key: "getTitles",
    value: function getTitles(transferLocale) {
      var props = this.props;

      if (props.titles) {
        return props.titles;
      }

      return transferLocale.titles;
    }
  }, {
    key: "getSelectedKeysName",
    value: function getSelectedKeysName(direction) {
      return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(LocaleReceiver, {
        componentName: "Transfer",
        defaultLocale: defaultLocale.Transfer
      }, this.renderTransfer);
    }
  }]);

  return Transfer;
}(React.Component); // For high-level customized Transfer @dqaria


export { Transfer as default };
Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
Transfer.defaultProps = {
  dataSource: [],
  render: noop,
  locale: {},
  showSearch: false
};
Transfer.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.array,
  render: PropTypes.func,
  targetKeys: PropTypes.array,
  onChange: PropTypes.func,
  height: PropTypes.number,
  style: PropTypes.object,
  listStyle: PropTypes.object,
  operationStyle: PropTypes.object,
  className: PropTypes.string,
  titles: PropTypes.array,
  operations: PropTypes.array,
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.node,
  locale: PropTypes.object,
  body: PropTypes.func,
  footer: PropTypes.func,
  rowKey: PropTypes.func,
  lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};