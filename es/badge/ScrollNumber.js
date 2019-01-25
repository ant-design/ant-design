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
import { createElement, Component } from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';

function getNumberArray(num) {
  return num ? num.toString().split('').reverse().map(function (i) {
    return Number(i);
  }) : [];
}

var ScrollNumber =
/*#__PURE__*/
function (_Component) {
  _inherits(ScrollNumber, _Component);

  function ScrollNumber(props) {
    var _this;

    _classCallCheck(this, ScrollNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollNumber).call(this, props));

    _this.renderScrollNumber = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          className = _this$props.className,
          style = _this$props.style,
          title = _this$props.title,
          _this$props$component = _this$props.component,
          component = _this$props$component === void 0 ? 'sup' : _this$props$component,
          displayComponent = _this$props.displayComponent; // fix https://fb.me/react-unknown-prop

      var restProps = omit(_this.props, ['count', 'onAnimated', 'component', 'prefixCls', 'displayComponent']);
      var prefixCls = getPrefixCls('scroll-number', customizePrefixCls);

      var newProps = _extends({}, restProps, {
        className: classNames(prefixCls, className),
        title: title
      }); // allow specify the border
      // mock border-color by box-shadow for compatible with old usage:
      // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />


      if (style && style.borderColor) {
        newProps.style = _extends({}, style, {
          boxShadow: "0 0 0 1px ".concat(style.borderColor, " inset")
        });
      }

      if (displayComponent) {
        return React.cloneElement(displayComponent, {
          className: classNames("".concat(prefixCls, "-custom-component"), displayComponent.props && displayComponent.props.className)
        });
      }

      return createElement(component, newProps, _this.renderNumberElement(prefixCls));
    };

    _this.state = {
      animateStarted: true,
      count: props.count
    };
    return _this;
  }

  _createClass(ScrollNumber, [{
    key: "getPositionByNum",
    value: function getPositionByNum(num, i) {
      if (this.state.animateStarted) {
        return 10 + num;
      }

      var currentDigit = getNumberArray(this.state.count)[i];
      var lastDigit = getNumberArray(this.lastCount)[i]; // 同方向则在同一侧切换数字

      if (this.state.count > this.lastCount) {
        if (currentDigit >= lastDigit) {
          return 10 + num;
        }

        return 20 + num;
      }

      if (currentDigit <= lastDigit) {
        return 10 + num;
      }

      return num;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if ('count' in nextProps) {
        if (this.state.count === nextProps.count) {
          return;
        }

        this.lastCount = this.state.count; // 复原数字初始位置

        this.setState({
          animateStarted: true
        }, function () {
          // 等待数字位置复原完毕
          // 开始设置完整的数字
          setTimeout(function () {
            _this2.setState({
              animateStarted: false,
              count: nextProps.count
            }, function () {
              var onAnimated = _this2.props.onAnimated;

              if (onAnimated) {
                onAnimated();
              }
            });
          }, 5);
        });
      }
    }
  }, {
    key: "renderNumberList",
    value: function renderNumberList(position) {
      var childrenToReturn = [];

      for (var i = 0; i < 30; i++) {
        var currentClassName = position === i ? 'current' : '';
        childrenToReturn.push(React.createElement("p", {
          key: i.toString(),
          className: currentClassName
        }, i % 10));
      }

      return childrenToReturn;
    }
  }, {
    key: "renderCurrentNumber",
    value: function renderCurrentNumber(prefixCls, num, i) {
      var position = this.getPositionByNum(num, i);
      var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
      return createElement('span', {
        className: "".concat(prefixCls, "-only"),
        style: {
          transition: removeTransition ? 'none' : undefined,
          msTransform: "translateY(".concat(-position * 100, "%)"),
          WebkitTransform: "translateY(".concat(-position * 100, "%)"),
          transform: "translateY(".concat(-position * 100, "%)")
        },
        key: i
      }, this.renderNumberList(position));
    }
  }, {
    key: "renderNumberElement",
    value: function renderNumberElement(prefixCls) {
      var _this3 = this;

      var count = this.state.count;

      if (count && Number(count) % 1 === 0) {
        return getNumberArray(count).map(function (num, i) {
          return _this3.renderCurrentNumber(prefixCls, num, i);
        }).reverse();
      }

      return count;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderScrollNumber);
    }
  }]);

  return ScrollNumber;
}(Component);

export { ScrollNumber as default };
ScrollNumber.defaultProps = {
  count: null,
  onAnimated: function onAnimated() {}
};