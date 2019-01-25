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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import addEventListener from "rc-util/es/Dom/addEventListener";
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import { ConfigConsumer } from '../config-provider';
import getScroll from '../_util/getScroll';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    left: 0,
    bottom: 0
  };
}

function getOffset(element, target) {
  var elemRect = element.getBoundingClientRect();
  var targetRect = getTargetRect(target);
  var scrollTop = getScroll(target, true);
  var scrollLeft = getScroll(target, false);
  var docElem = window.document.body;
  var clientTop = docElem.clientTop || 0;
  var clientLeft = docElem.clientLeft || 0;
  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

function noop() {}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

var Affix =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Affix, _React$Component);

  function Affix() {
    var _this;

    _classCallCheck(this, Affix);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Affix).apply(this, arguments));
    _this.state = {
      affixStyle: undefined,
      placeholderStyle: undefined
    };
    _this.eventHandlers = {};
    _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

    _this.saveFixedNode = function (node) {
      _this.fixedNode = node;
    };

    _this.savePlaceholderNode = function (node) {
      _this.placeholderNode = node;
    };

    _this.renderAffix = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var prefixCls = _this.props.prefixCls;
      var className = classNames(_defineProperty({}, getPrefixCls('affix', prefixCls), _this.state.affixStyle));
      var props = omit(_this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);

      var placeholderStyle = _extends({}, _this.state.placeholderStyle, _this.props.style);

      return React.createElement("div", _extends({}, props, {
        style: placeholderStyle,
        ref: _this.savePlaceholderNode
      }), React.createElement("div", {
        className: className,
        ref: _this.saveFixedNode,
        style: _this.state.affixStyle
      }, _this.props.children));
    };

    return _this;
  }

  _createClass(Affix, [{
    key: "setAffixStyle",
    value: function setAffixStyle(e, affixStyle) {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? noop : _this$props$onChange,
          _this$props$target = _this$props.target,
          target = _this$props$target === void 0 ? getDefaultTarget : _this$props$target;
      var originalAffixStyle = this.state.affixStyle;
      var isWindow = target() === window;

      if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
        return;
      }

      if (shallowequal(affixStyle, originalAffixStyle)) {
        return;
      }

      this.setState({
        affixStyle: affixStyle
      }, function () {
        var affixed = !!_this2.state.affixStyle;

        if (affixStyle && !originalAffixStyle || !affixStyle && originalAffixStyle) {
          onChange(affixed);
        }
      });
    }
  }, {
    key: "setPlaceholderStyle",
    value: function setPlaceholderStyle(placeholderStyle) {
      var originalPlaceholderStyle = this.state.placeholderStyle;

      if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
        return;
      }

      this.setState({
        placeholderStyle: placeholderStyle
      });
    }
  }, {
    key: "syncPlaceholderStyle",
    value: function syncPlaceholderStyle(e) {
      var affixStyle = this.state.affixStyle;

      if (!affixStyle) {
        return;
      }

      this.placeholderNode.style.cssText = '';
      this.setAffixStyle(e, _extends({}, affixStyle, {
        width: this.placeholderNode.offsetWidth
      }));
      this.setPlaceholderStyle({
        width: this.placeholderNode.offsetWidth
      });
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(e) {
      var _this$props2 = this.props,
          offsetBottom = _this$props2.offsetBottom,
          offset = _this$props2.offset,
          _this$props2$target = _this$props2.target,
          target = _this$props2$target === void 0 ? getDefaultTarget : _this$props2$target;
      var offsetTop = this.props.offsetTop;
      var targetNode = target(); // Backwards support
      // Fix: if offsetTop === 0, it will get undefined,
      //   if offsetBottom is type of number, offsetMode will be { top: false, ... }

      offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
      var scrollTop = getScroll(targetNode, true);
      var affixNode = ReactDOM.findDOMNode(this);
      var elemOffset = getOffset(affixNode, targetNode);
      var elemSize = {
        width: this.fixedNode.offsetWidth,
        height: this.fixedNode.offsetHeight
      };
      var offsetMode = {
        top: false,
        bottom: false
      }; // Default to `offsetTop=0`.

      if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
        offsetMode.top = true;
        offsetTop = 0;
      } else {
        offsetMode.top = typeof offsetTop === 'number';
        offsetMode.bottom = typeof offsetBottom === 'number';
      }

      var targetRect = getTargetRect(targetNode);
      var targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight; // ref: https://github.com/ant-design/ant-design/issues/13662

      if (scrollTop >= elemOffset.top - offsetTop && offsetMode.top) {
        // Fixed Top
        var width = elemOffset.width;
        var top = targetRect.top + offsetTop;
        this.setAffixStyle(e, {
          position: 'fixed',
          top: top,
          left: targetRect.left + elemOffset.left,
          width: width
        });
        this.setPlaceholderStyle({
          width: width,
          height: elemSize.height
        });
      } else if (scrollTop <= elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight && offsetMode.bottom) {
        // Fixed Bottom
        var targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
        var _width = elemOffset.width;
        this.setAffixStyle(e, {
          position: 'fixed',
          bottom: targetBottomOffet + offsetBottom,
          left: targetRect.left + elemOffset.left,
          width: _width
        });
        this.setPlaceholderStyle({
          width: _width,
          height: elemOffset.height
        });
      } else {
        var affixStyle = this.state.affixStyle;

        if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
          this.setAffixStyle(e, _extends({}, affixStyle, {
            width: affixNode.offsetWidth
          }));
        } else {
          this.setAffixStyle(e, null);
        }

        this.setPlaceholderStyle(null);
      }

      if (e.type === 'resize') {
        this.syncPlaceholderStyle(e);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var target = this.props.target || getDefaultTarget; // Wait for parent component ref has its value

      this.timeout = setTimeout(function () {
        _this3.setTargetEventListeners(target); // Mock Event object.


        _this3.updatePosition({});
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.target !== nextProps.target) {
        this.clearEventListeners();
        this.setTargetEventListeners(nextProps.target); // Mock Event object.

        this.updatePosition({});
      }

      if (this.props.offsetTop !== nextProps.offsetTop || this.props.offsetBottom !== nextProps.offsetBottom) {
        this.updatePosition({});
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearEventListeners();
      clearTimeout(this.timeout);
      this.updatePosition.cancel();
    }
  }, {
    key: "setTargetEventListeners",
    value: function setTargetEventListeners(getTarget) {
      var _this4 = this;

      var target = getTarget();

      if (!target) {
        return;
      }

      this.clearEventListeners();
      this.events.forEach(function (eventName) {
        _this4.eventHandlers[eventName] = addEventListener(target, eventName, _this4.updatePosition);
      });
    }
  }, {
    key: "clearEventListeners",
    value: function clearEventListeners() {
      var _this5 = this;

      this.events.forEach(function (eventName) {
        var handler = _this5.eventHandlers[eventName];

        if (handler && handler.remove) {
          handler.remove();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderAffix);
    }
  }]);

  return Affix;
}(React.Component);

export { Affix as default };
Affix.propTypes = {
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  target: PropTypes.func
};

__decorate([throttleByAnimationFrameDecorator()], Affix.prototype, "updatePosition", null);