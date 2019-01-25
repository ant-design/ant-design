"use strict";

var React = _interopRequireWildcard(require("react"));

var _Form = _interopRequireDefault(require("../Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// test Form.create on component without own props
var WithoutOwnProps =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WithoutOwnProps, _React$Component);

  function WithoutOwnProps() {
    var _this;

    _classCallCheck(this, WithoutOwnProps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WithoutOwnProps).apply(this, arguments));
    _this.state = {
      foo: 'bar'
    };
    return _this;
  }

  _createClass(WithoutOwnProps, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, "foo");
    }
  }]);

  return WithoutOwnProps;
}(React.Component);

var WithoutOwnPropsForm = _Form["default"].create()(WithoutOwnProps);

React.createElement(WithoutOwnPropsForm, null);

var WithOwnProps =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(WithOwnProps, _React$Component2);

  function WithOwnProps() {
    var _this2;

    _classCallCheck(this, WithOwnProps);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WithOwnProps).apply(this, arguments));
    _this2.state = {
      foo: 'bar'
    };
    return _this2;
  }

  _createClass(WithOwnProps, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, "foo");
    }
  }]);

  return WithOwnProps;
}(React.Component);

var WithOwnPropsForm = _Form["default"].create()(WithOwnProps);

React.createElement(WithOwnPropsForm, {
  name: "foo"
});

var WithCreateOptions =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(WithCreateOptions, _React$Component3);

  function WithCreateOptions() {
    _classCallCheck(this, WithCreateOptions);

    return _possibleConstructorReturn(this, _getPrototypeOf(WithCreateOptions).apply(this, arguments));
  }

  _createClass(WithCreateOptions, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, "foo");
    }
  }]);

  return WithCreateOptions;
}(React.Component);

var mapPropsToFields = function mapPropsToFields(props) {
  var username = props.username;
  return {
    username: _Form["default"].createFormField({
      value: username
    })
  };
};

var formOptions = {
  mapPropsToFields: mapPropsToFields
};

var WithCreateOptionsForm = _Form["default"].create(formOptions)(WithCreateOptions);

React.createElement(WithCreateOptionsForm, {
  username: "foo"
});