"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Comment =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Comment, _React$Component);

  function Comment() {
    var _this;

    _classCallCheck(this, Comment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Comment).apply(this, arguments));

    _this.renderNested = function (prefixCls, children) {
      return React.createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-nested"))
      }, children);
    };

    _this.renderComment = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;

      var _a = _this.props,
          actions = _a.actions,
          author = _a.author,
          avatar = _a.avatar,
          children = _a.children,
          className = _a.className,
          content = _a.content,
          customizePrefixCls = _a.prefixCls,
          style = _a.style,
          datetime = _a.datetime,
          otherProps = __rest(_a, ["actions", "author", "avatar", "children", "className", "content", "prefixCls", "style", "datetime"]);

      var prefixCls = getPrefixCls('comment', customizePrefixCls);
      var avatarDom = React.createElement("div", {
        className: "".concat(prefixCls, "-avatar")
      }, typeof avatar === 'string' ? React.createElement("img", {
        src: avatar
      }) : avatar);
      var actionDom = actions && actions.length ? React.createElement("ul", {
        className: "".concat(prefixCls, "-actions")
      }, _this.getAction(actions)) : null;
      var authorContent = React.createElement("div", {
        className: "".concat(prefixCls, "-content-author")
      }, author && React.createElement("span", {
        className: "".concat(prefixCls, "-content-author-name")
      }, author), datetime && React.createElement("span", {
        className: "".concat(prefixCls, "-content-author-time")
      }, datetime));
      var contentDom = React.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, authorContent, React.createElement("div", {
        className: "".concat(prefixCls, "-content-detail")
      }, content), actionDom);
      var comment = React.createElement("div", {
        className: "".concat(prefixCls, "-inner")
      }, avatarDom, contentDom);
      return React.createElement("div", _extends({}, otherProps, {
        className: (0, _classnames["default"])(prefixCls, className),
        style: style
      }), comment, children ? _this.renderNested(prefixCls, children) : null);
    };

    return _this;
  }

  _createClass(Comment, [{
    key: "getAction",
    value: function getAction(actions) {
      if (!actions || !actions.length) {
        return null;
      }

      var actionList = actions.map(function (action, index) {
        return React.createElement("li", {
          key: "action-".concat(index)
        }, action);
      });
      return actionList;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderComment);
    }
  }]);

  return Comment;
}(React.Component);

exports["default"] = Comment;