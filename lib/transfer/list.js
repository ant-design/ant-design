"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _PureRenderMixin = _interopRequireDefault(require("rc-util/lib/PureRenderMixin"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _search = _interopRequireDefault(require("./search"));

var _item = _interopRequireDefault(require("./item"));

var _triggerEvent = _interopRequireDefault(require("../_util/triggerEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function noop() {}

function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]';
}

var TransferList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransferList, _React$Component);

  function TransferList(props) {
    var _this;

    _classCallCheck(this, TransferList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransferList).call(this, props));

    _this.handleSelect = function (selectedItem) {
      var checkedKeys = _this.props.checkedKeys;
      var result = checkedKeys.some(function (key) {
        return key === selectedItem.key;
      });

      _this.props.handleSelect(selectedItem, !result);
    };

    _this.handleFilter = function (e) {
      _this.props.handleFilter(e);

      if (!e.target.value) {
        return;
      } // Manually trigger scroll event for lazy search bug
      // https://github.com/ant-design/ant-design/issues/5631


      _this.triggerScrollTimer = window.setTimeout(function () {
        var transferNode = ReactDOM.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this)));
        var listNode = transferNode.querySelectorAll('.ant-transfer-list-content')[0];

        if (listNode) {
          (0, _triggerEvent["default"])(listNode, 'scroll');
        }
      }, 0);
    };

    _this.handleClear = function () {
      _this.props.handleClear();
    };

    _this.matchFilter = function (text, item) {
      var _this$props = _this.props,
          filter = _this$props.filter,
          filterOption = _this$props.filterOption;

      if (filterOption) {
        return filterOption(filter, item);
      }

      return text.indexOf(filter) >= 0;
    };

    _this.renderItem = function (item) {
      var _this$props$render = _this.props.render,
          render = _this$props$render === void 0 ? noop : _this$props$render;
      var renderResult = render(item);
      var isRenderResultPlain = isRenderResultPlainObject(renderResult);
      return {
        renderedText: isRenderResultPlain ? renderResult.value : renderResult,
        renderedEl: isRenderResultPlain ? renderResult.label : renderResult
      };
    };

    _this.state = {
      mounted: false
    };
    return _this;
  }

  _createClass(TransferList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = window.setTimeout(function () {
        _this2.setState({
          mounted: true
        });
      }, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
      clearTimeout(this.triggerScrollTimer);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _PureRenderMixin["default"].shouldComponentUpdate.apply(this, args);
    }
  }, {
    key: "getCheckStatus",
    value: function getCheckStatus(filteredDataSource) {
      var checkedKeys = this.props.checkedKeys;

      if (checkedKeys.length === 0) {
        return 'none';
      } else if (filteredDataSource.every(function (item) {
        return checkedKeys.indexOf(item.key) >= 0;
      })) {
        return 'all';
      }

      return 'part';
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          dataSource = _this$props2.dataSource,
          titleText = _this$props2.titleText,
          checkedKeys = _this$props2.checkedKeys,
          lazy = _this$props2.lazy,
          disabled = _this$props2.disabled,
          body = _this$props2.body,
          footer = _this$props2.footer,
          showSearch = _this$props2.showSearch,
          style = _this$props2.style,
          filter = _this$props2.filter,
          searchPlaceholder = _this$props2.searchPlaceholder,
          notFoundContent = _this$props2.notFoundContent,
          itemUnit = _this$props2.itemUnit,
          itemsUnit = _this$props2.itemsUnit,
          onScroll = _this$props2.onScroll; // Custom Layout

      var footerDom = footer && footer(this.props);
      var bodyDom = body && body(this.props);
      var listCls = (0, _classnames["default"])(prefixCls, _defineProperty({}, "".concat(prefixCls, "-with-footer"), !!footerDom));
      var filteredDataSource = [];
      var totalDataSource = [];
      var showItems = dataSource.map(function (item) {
        var _this3$renderItem = _this3.renderItem(item),
            renderedText = _this3$renderItem.renderedText,
            renderedEl = _this3$renderItem.renderedEl;

        if (filter && filter.trim() && !_this3.matchFilter(renderedText, item)) {
          return null;
        } // all show items


        totalDataSource.push(item);

        if (!item.disabled) {
          // response to checkAll items
          filteredDataSource.push(item);
        }

        var checked = checkedKeys.indexOf(item.key) >= 0;
        return React.createElement(_item["default"], {
          disabled: disabled,
          key: item.key,
          item: item,
          lazy: lazy,
          renderedText: renderedText,
          renderedEl: renderedEl,
          checked: checked,
          prefixCls: prefixCls,
          onClick: _this3.handleSelect
        });
      });
      var unit = dataSource.length > 1 ? itemsUnit : itemUnit;
      var search = showSearch ? React.createElement("div", {
        className: "".concat(prefixCls, "-body-search-wrapper")
      }, React.createElement(_search["default"], {
        prefixCls: "".concat(prefixCls, "-search"),
        onChange: this.handleFilter,
        handleClear: this.handleClear,
        placeholder: searchPlaceholder,
        value: filter,
        disabled: disabled
      })) : null;
      var searchNotFound = showItems.every(function (item) {
        return item === null;
      }) && React.createElement("div", {
        className: "".concat(prefixCls, "-body-not-found")
      }, notFoundContent);
      var listBody = bodyDom || React.createElement("div", {
        className: (0, _classnames["default"])(showSearch ? "".concat(prefixCls, "-body ").concat(prefixCls, "-body-with-search") : "".concat(prefixCls, "-body"))
      }, search, !searchNotFound && React.createElement(_rcAnimate["default"], {
        component: "ul",
        componentProps: {
          onScroll: onScroll
        },
        className: "".concat(prefixCls, "-content"),
        transitionName: this.state.mounted ? "".concat(prefixCls, "-content-item-highlight") : '',
        transitionLeave: false
      }, showItems), searchNotFound);
      var listFooter = footerDom ? React.createElement("div", {
        className: "".concat(prefixCls, "-footer")
      }, footerDom) : null;
      var checkStatus = this.getCheckStatus(filteredDataSource);
      var checkedAll = checkStatus === 'all';
      var checkAllCheckbox = React.createElement(_checkbox["default"], {
        disabled: disabled,
        checked: checkedAll,
        indeterminate: checkStatus === 'part',
        onChange: function onChange() {
          return _this3.props.handleSelectAll(filteredDataSource, checkedAll);
        }
      });
      return React.createElement("div", {
        className: listCls,
        style: style
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, checkAllCheckbox, React.createElement("span", {
        className: "".concat(prefixCls, "-header-selected")
      }, React.createElement("span", null, (checkedKeys.length > 0 ? "".concat(checkedKeys.length, "/") : '') + totalDataSource.length, ' ', unit), React.createElement("span", {
        className: "".concat(prefixCls, "-header-title")
      }, titleText))), listBody, listFooter);
    }
  }]);

  return TransferList;
}(React.Component);

exports["default"] = TransferList;
TransferList.defaultProps = {
  dataSource: [],
  titleText: '',
  showSearch: false,
  render: noop,
  lazy: {}
};