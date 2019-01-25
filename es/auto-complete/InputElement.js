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

import * as React from 'react';
import * as ReactDOM from 'react-dom';

var InputElement =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputElement, _React$Component);

  function InputElement() {
    var _this;

    _classCallCheck(this, InputElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputElement).apply(this, arguments));

    _this.focus = function () {
      _this.ele.focus ? _this.ele.focus() : ReactDOM.findDOMNode(_this.ele).focus();
    };

    _this.blur = function () {
      _this.ele.blur ? _this.ele.blur() : ReactDOM.findDOMNode(_this.ele).blur();
    };

    _this.saveRef = function (ele) {
      _this.ele = ele;
      var childRef = _this.props.children.ref;

      if (typeof childRef === 'function') {
        childRef(ele);
      }
    };

    return _this;
  }

  _createClass(InputElement, [{
    key: "render",
    value: function render() {
      return React.cloneElement(this.props.children, _extends({}, this.props, {
        ref: this.saveRef
      }), null);
    }
  }]);

  return InputElement;
}(React.Component);

export { InputElement as default };