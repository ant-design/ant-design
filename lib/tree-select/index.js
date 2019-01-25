"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcTreeSelect = _interopRequireWildcard(require("rc-tree-select"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _warning = _interopRequireDefault(require("../_util/warning"));

var _icon = _interopRequireDefault(require("../icon"));

var _omit = _interopRequireDefault(require("omit.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TreeSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeSelect, _React$Component);

  function TreeSelect(props) {
    var _this;

    _classCallCheck(this, TreeSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeSelect).call(this, props));

    _this.saveTreeSelect = function (node) {
      _this.rcTreeSelect = node;
    };

    _this.renderSwitcherIcon = function (prefixCls, _ref) {
      var isLeaf = _ref.isLeaf,
          loading = _ref.loading;

      if (loading) {
        return React.createElement(_icon["default"], {
          type: "loading",
          className: "".concat(prefixCls, "-switcher-loading-icon")
        });
      }

      if (isLeaf) {
        return null;
      }

      return React.createElement(_icon["default"], {
        type: "caret-down",
        className: "".concat(prefixCls, "-switcher-icon")
      });
    };

    _this.renderTreeSelect = function (_ref2) {
      var _classNames;

      var getContextPopupContainer = _ref2.getPopupContainer,
          getPrefixCls = _ref2.getPrefixCls,
          renderEmpty = _ref2.renderEmpty;

      var _a = _this.props,
          customizePrefixCls = _a.prefixCls,
          className = _a.className,
          size = _a.size,
          notFoundContent = _a.notFoundContent,
          dropdownStyle = _a.dropdownStyle,
          dropdownClassName = _a.dropdownClassName,
          suffixIcon = _a.suffixIcon,
          getPopupContainer = _a.getPopupContainer,
          restProps = __rest(_a, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle", "dropdownClassName", "suffixIcon", "getPopupContainer"]);

      var rest = (0, _omit["default"])(restProps, ['inputIcon', 'removeIcon', 'clearIcon', 'switcherIcon']);
      var prefixCls = getPrefixCls('select', customizePrefixCls);
      var cls = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _classNames), className);
      var checkable = rest.treeCheckable;

      if (checkable) {
        checkable = React.createElement("span", {
          className: "".concat(prefixCls, "-tree-checkbox-inner")
        });
      }

      var inputIcon = suffixIcon && (React.isValidElement(suffixIcon) ? React.cloneElement(suffixIcon) : suffixIcon) || React.createElement(_icon["default"], {
        type: "down",
        className: "".concat(prefixCls, "-arrow-icon")
      });
      var removeIcon = React.createElement(_icon["default"], {
        type: "close",
        className: "".concat(prefixCls, "-remove-icon")
      });
      var clearIcon = React.createElement(_icon["default"], {
        type: "close-circle",
        className: "".concat(prefixCls, "-clear-icon"),
        theme: "filled"
      });
      return React.createElement(_rcTreeSelect["default"], _extends({
        switcherIcon: function switcherIcon(nodeProps) {
          return _this.renderSwitcherIcon(prefixCls, nodeProps);
        },
        inputIcon: inputIcon,
        removeIcon: removeIcon,
        clearIcon: clearIcon
      }, rest, {
        getPopupContainer: getPopupContainer || getContextPopupContainer,
        dropdownClassName: (0, _classnames["default"])(dropdownClassName, "".concat(prefixCls, "-tree-dropdown")),
        prefixCls: prefixCls,
        className: cls,
        dropdownStyle: _extends({
          maxHeight: '100vh',
          overflow: 'auto'
        }, dropdownStyle),
        treeCheckable: checkable,
        notFoundContent: notFoundContent || renderEmpty('Select'),
        ref: _this.saveTreeSelect
      }));
    };

    (0, _warning["default"])(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
    return _this;
  }

  _createClass(TreeSelect, [{
    key: "focus",
    value: function focus() {
      this.rcTreeSelect.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.rcTreeSelect.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderTreeSelect);
    }
  }]);

  return TreeSelect;
}(React.Component);

exports["default"] = TreeSelect;
TreeSelect.TreeNode = _rcTreeSelect.TreeNode;
TreeSelect.SHOW_ALL = _rcTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = _rcTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = _rcTreeSelect.SHOW_CHILD;
TreeSelect.defaultProps = {
  transitionName: 'slide-up',
  choiceTransitionName: 'zoom',
  showSearch: false
};