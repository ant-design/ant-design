"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cssAnimation = _interopRequireDefault(require("css-animation"));

var _raf = _interopRequireDefault(require("raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function animate(node, show, done) {
  var height;
  var requestAnimationFrameId;
  return (0, _cssAnimation["default"])(node, 'ant-motion-collapse', {
    start: function start() {
      if (!show) {
        node.style.height = "".concat(node.offsetHeight, "px");
        node.style.opacity = '1';
      } else {
        height = node.offsetHeight;
        node.style.height = '0px';
        node.style.opacity = '0';
      }
    },
    active: function active() {
      if (requestAnimationFrameId) {
        _raf["default"].cancel(requestAnimationFrameId);
      }

      requestAnimationFrameId = (0, _raf["default"])(function () {
        node.style.height = "".concat(show ? height : 0, "px");
        node.style.opacity = show ? '1' : '0';
      });
    },
    end: function end() {
      if (requestAnimationFrameId) {
        _raf["default"].cancel(requestAnimationFrameId);
      }

      node.style.height = '';
      node.style.opacity = '';
      done();
    }
  });
}

var animation = {
  enter: function enter(node, done) {
    return animate(node, true, done);
  },
  leave: function leave(node, done) {
    return animate(node, false, done);
  },
  appear: function appear(node, done) {
    return animate(node, true, done);
  }
};
var _default = animation;
exports["default"] = _default;