"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _spin = _interopRequireDefault(require("../spin"));

var _pagination = _interopRequireDefault(require("../pagination"));

var _grid = require("../grid");

var _Item = _interopRequireDefault(require("./Item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var List =
/*#__PURE__*/
function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    var _this;

    _classCallCheck(this, List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
    _this.state = {
      paginationCurrent: 1
    };
    _this.defaultPaginationProps = {
      current: 1,
      pageSize: 10,
      onChange: function onChange(page, pageSize) {
        var pagination = _this.props.pagination;

        _this.setState({
          paginationCurrent: page
        });

        if (pagination && pagination.onChange) {
          pagination.onChange(page, pageSize);
        }
      },
      total: 0
    };
    _this.keys = {};

    _this.renderItem = function (item, index) {
      var _this$props = _this.props,
          dataSource = _this$props.dataSource,
          renderItem = _this$props.renderItem,
          rowKey = _this$props.rowKey;
      var key;

      if (typeof rowKey === 'function') {
        key = rowKey(dataSource[index]);
      } else if (typeof rowKey === 'string') {
        key = dataSource[rowKey];
      } else {
        key = dataSource.key;
      }

      if (!key) {
        key = "list-item-".concat(index);
      }

      _this.keys[index] = key;
      return renderItem(item, index);
    };

    _this.renderEmpty = function (prefixCls, renderEmpty) {
      var locale = _this.props.locale;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-empty-text")
      }, locale && locale.emptyText || renderEmpty('List'));
    };

    _this.renderList = function (_ref) {
      var _classNames;

      var getPrefixCls = _ref.getPrefixCls,
          renderEmpty = _ref.renderEmpty;
      var paginationCurrent = _this.state.paginationCurrent;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          bordered = _a.bordered,
          split = _a.split,
          className = _a.className,
          children = _a.children,
          itemLayout = _a.itemLayout,
          loadMore = _a.loadMore,
          pagination = _a.pagination,
          grid = _a.grid,
          dataSource = _a.dataSource,
          size = _a.size,
          rowKey = _a.rowKey,
          renderItem = _a.renderItem,
          header = _a.header,
          footer = _a.footer,
          loading = _a.loading,
          locale = _a.locale,
          rest = __rest(_a, ["prefixCls", "bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer", "loading", "locale"]);

      var prefixCls = getPrefixCls('list', customizePrefixCls);
      var loadingProp = loading;

      if (typeof loadingProp === 'boolean') {
        loadingProp = {
          spinning: loadingProp
        };
      }

      var isLoading = loadingProp && loadingProp.spinning; // large => lg
      // small => sm

      var sizeCls = '';

      switch (size) {
        case 'large':
          sizeCls = 'lg';
          break;

        case 'small':
          sizeCls = 'sm';

        default:
          break;
      }

      var classString = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-vertical"), itemLayout === 'vertical'), _defineProperty(_classNames, "".concat(prefixCls, "-").concat(sizeCls), sizeCls), _defineProperty(_classNames, "".concat(prefixCls, "-split"), split), _defineProperty(_classNames, "".concat(prefixCls, "-bordered"), bordered), _defineProperty(_classNames, "".concat(prefixCls, "-loading"), isLoading), _defineProperty(_classNames, "".concat(prefixCls, "-grid"), grid), _defineProperty(_classNames, "".concat(prefixCls, "-something-after-last-item"), _this.isSomethingAfterLastItem()), _classNames));

      var paginationProps = _extends({}, _this.defaultPaginationProps, {
        total: dataSource.length,
        current: paginationCurrent
      }, pagination || {});

      var largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);

      if (paginationProps.current > largestPage) {
        paginationProps.current = largestPage;
      }

      var paginationContent = pagination ? React.createElement("div", {
        className: "".concat(prefixCls, "-pagination")
      }, React.createElement(_pagination["default"], _extends({}, paginationProps, {
        onChange: _this.defaultPaginationProps.onChange
      }))) : null;

      var splitDataSource = _toConsumableArray(dataSource);

      if (pagination) {
        if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
          splitDataSource = _toConsumableArray(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
        }
      }

      var childrenContent;
      childrenContent = isLoading && React.createElement("div", {
        style: {
          minHeight: 53
        }
      });

      if (splitDataSource.length > 0) {
        var items = splitDataSource.map(function (item, index) {
          return _this.renderItem(item, index);
        });
        var childrenList = [];
        React.Children.forEach(items, function (child, index) {
          childrenList.push(React.cloneElement(child, {
            key: _this.keys[index]
          }));
        });
        childrenContent = grid ? React.createElement(_grid.Row, {
          gutter: grid.gutter
        }, childrenList) : childrenList;
      } else if (!children && !isLoading) {
        childrenContent = _this.renderEmpty(prefixCls, renderEmpty);
      }

      var paginationPosition = paginationProps.position || 'bottom';
      return React.createElement("div", _extends({
        className: classString
      }, rest), (paginationPosition === 'top' || paginationPosition === 'both') && paginationContent, header && React.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, header), React.createElement(_spin["default"], loadingProp, childrenContent, children), footer && React.createElement("div", {
        className: "".concat(prefixCls, "-footer")
      }, footer), loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent);
    };

    return _this;
  }

  _createClass(List, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        grid: this.props.grid
      };
    }
  }, {
    key: "isSomethingAfterLastItem",
    value: function isSomethingAfterLastItem() {
      var _this$props2 = this.props,
          loadMore = _this$props2.loadMore,
          pagination = _this$props2.pagination,
          footer = _this$props2.footer;
      return !!(loadMore || pagination || footer);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderList);
    }
  }]);

  return List;
}(React.Component);

exports["default"] = List;
List.Item = _Item["default"];
List.childContextTypes = {
  grid: PropTypes.any
};
List.defaultProps = {
  dataSource: [],
  bordered: false,
  split: true,
  loading: false,
  pagination: false
};