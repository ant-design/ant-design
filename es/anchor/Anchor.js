function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from "rc-util/es/Dom/addEventListener";
import Affix from '../affix';
import { ConfigConsumer } from '../config-provider';
import getScroll from '../_util/getScroll';
import raf from 'raf';

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element, container) {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  var rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }

    return rect.top - container.getBoundingClientRect().top;
  }

  return rect.top;
}

function easeInOutCubic(t, b, c, d) {
  var cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }

  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

var sharpMatcherRegx = /#([^#]+)$/;

function scrollTo(href) {
  var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var getContainer = arguments.length > 2 ? arguments[2] : undefined;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var container = getContainer();
  var scrollTop = getScroll(container, true);
  var sharpLinkMatch = sharpMatcherRegx.exec(href);

  if (!sharpLinkMatch) {
    return;
  }

  var targetElement = document.getElementById(sharpLinkMatch[1]);

  if (!targetElement) {
    return;
  }

  var eleOffsetTop = getOffsetTop(targetElement, container);
  var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
  var startTime = Date.now();

  var frameFunc = function frameFunc() {
    var timestamp = Date.now();
    var time = timestamp - startTime;
    var nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);

    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      container.scrollTop = nextScrollTop;
    }

    if (time < 450) {
      raf(frameFunc);
    } else {
      callback();
    }
  };

  raf(frameFunc);
}

var Anchor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Anchor, _React$Component);

  function Anchor() {
    var _this;

    _classCallCheck(this, Anchor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Anchor).apply(this, arguments));
    _this.state = {
      activeLink: null
    };
    _this.links = [];

    _this.handleScroll = function () {
      if (_this.animating) {
        return;
      }

      var _this$props = _this.props,
          offsetTop = _this$props.offsetTop,
          bounds = _this$props.bounds;

      _this.setState({
        activeLink: _this.getCurrentAnchor(offsetTop, bounds)
      });
    };

    _this.handleScrollTo = function (link) {
      var _this$props2 = _this.props,
          offsetTop = _this$props2.offsetTop,
          getContainer = _this$props2.getContainer;
      _this.animating = true;

      _this.setState({
        activeLink: link
      });

      scrollTo(link, offsetTop, getContainer, function () {
        _this.animating = false;
      });
    };

    _this.updateInk = function () {
      if (typeof document === 'undefined') {
        return;
      }

      var prefixCls = _this.prefixCls;
      var anchorNode = ReactDOM.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this)));
      var linkNode = anchorNode.getElementsByClassName("".concat(prefixCls, "-link-title-active"))[0];

      if (linkNode) {
        _this.inkNode.style.top = "".concat(linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5, "px");
      }
    };

    _this.saveInkNode = function (node) {
      _this.inkNode = node;
    };

    _this.renderAnchor = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props3 = _this.props,
          customizePrefixCls = _this$props3.prefixCls,
          _this$props3$classNam = _this$props3.className,
          className = _this$props3$classNam === void 0 ? '' : _this$props3$classNam,
          style = _this$props3.style,
          offsetTop = _this$props3.offsetTop,
          affix = _this$props3.affix,
          showInkInFixed = _this$props3.showInkInFixed,
          children = _this$props3.children,
          getContainer = _this$props3.getContainer;
      var activeLink = _this.state.activeLink;
      var prefixCls = getPrefixCls('anchor', customizePrefixCls); // To support old version react.
      // Have to add prefixCls on the instance.
      // https://github.com/facebook/react/issues/12397

      _this.prefixCls = prefixCls;
      var inkClass = classNames("".concat(prefixCls, "-ink-ball"), {
        visible: activeLink
      });
      var wrapperClass = classNames(className, "".concat(prefixCls, "-wrapper"));
      var anchorClass = classNames(prefixCls, {
        fixed: !affix && !showInkInFixed
      });

      var wrapperStyle = _extends({
        maxHeight: offsetTop ? "calc(100vh - ".concat(offsetTop, "px)") : '100vh'
      }, style);

      var anchorContent = React.createElement("div", {
        className: wrapperClass,
        style: wrapperStyle
      }, React.createElement("div", {
        className: anchorClass
      }, React.createElement("div", {
        className: "".concat(prefixCls, "-ink")
      }, React.createElement("span", {
        className: inkClass,
        ref: _this.saveInkNode
      })), children));
      return !affix ? anchorContent : React.createElement(Affix, {
        offsetTop: offsetTop,
        target: getContainer
      }, anchorContent);
    };

    return _this;
  }

  _createClass(Anchor, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      var antAnchor = {
        registerLink: function registerLink(link) {
          if (!_this2.links.includes(link)) {
            _this2.links.push(link);
          }
        },
        unregisterLink: function unregisterLink(link) {
          var index = _this2.links.indexOf(link);

          if (index !== -1) {
            _this2.links.splice(index, 1);
          }
        },
        activeLink: this.state.activeLink,
        scrollTo: this.handleScrollTo,
        onClick: this.props.onClick
      };
      return {
        antAnchor: antAnchor
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var getContainer = this.props.getContainer;
      this.scrollEvent = addEventListener(getContainer(), 'scroll', this.handleScroll);
      this.handleScroll();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollEvent) {
        this.scrollEvent.remove();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateInk();
    }
  }, {
    key: "getCurrentAnchor",
    value: function getCurrentAnchor() {
      var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var activeLink = '';

      if (typeof document === 'undefined') {
        return activeLink;
      }

      var linkSections = [];
      var getContainer = this.props.getContainer;
      var container = getContainer();
      this.links.forEach(function (link) {
        var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());

        if (!sharpLinkMatch) {
          return;
        }

        var target = document.getElementById(sharpLinkMatch[1]);

        if (target) {
          var top = getOffsetTop(target, container);

          if (top < offsetTop + bounds) {
            linkSections.push({
              link: link,
              top: top
            });
          }
        }
      });

      if (linkSections.length) {
        var maxSection = linkSections.reduce(function (prev, curr) {
          return curr.top > prev.top ? curr : prev;
        });
        return maxSection.link;
      }

      return '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderAnchor);
    }
  }]);

  return Anchor;
}(React.Component);

export { Anchor as default };
Anchor.defaultProps = {
  affix: true,
  showInkInFixed: false,
  getContainer: getDefaultContainer
};
Anchor.childContextTypes = {
  antAnchor: PropTypes.object
};