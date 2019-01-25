function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { cloneElement } from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import { ConfigConsumer } from '../config-provider';
import warning from '../_util/warning';

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }

  var paramsKeys = Object.keys(params).join('|');
  var name = route.breadcrumbName.replace(new RegExp(":(".concat(paramsKeys, ")"), 'g'), function (replacement, key) {
    return params[key] || replacement;
  });
  return name;
}

function defaultItemRender(route, params, routes, paths) {
  var isLastItem = routes.indexOf(route) === routes.length - 1;
  var name = getBreadcrumbName(route, params);
  return isLastItem ? React.createElement("span", null, name) : React.createElement("a", {
    href: "#/".concat(paths.join('/'))
  }, name);
}

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Breadcrumb, _React$Component);

  function Breadcrumb() {
    var _this;

    _classCallCheck(this, Breadcrumb);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Breadcrumb).apply(this, arguments));

    _this.renderBreadcrumb = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var crumbs;
      var _this$props = _this.props,
          customizePrefixCls = _this$props.prefixCls,
          separator = _this$props.separator,
          style = _this$props.style,
          className = _this$props.className,
          routes = _this$props.routes,
          _this$props$params = _this$props.params,
          params = _this$props$params === void 0 ? {} : _this$props$params,
          children = _this$props.children,
          _this$props$itemRende = _this$props.itemRender,
          itemRender = _this$props$itemRende === void 0 ? defaultItemRender : _this$props$itemRende;
      var prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);

      if (routes && routes.length > 0) {
        var paths = [];
        crumbs = routes.map(function (route) {
          route.path = route.path || '';
          var path = route.path.replace(/^\//, '');
          Object.keys(params).forEach(function (key) {
            path = path.replace(":".concat(key), params[key]);
          });

          if (path) {
            paths.push(path);
          }

          return React.createElement(BreadcrumbItem, {
            separator: separator,
            key: route.breadcrumbName || path
          }, itemRender(route, params, routes, paths));
        });
      } else if (children) {
        crumbs = React.Children.map(children, function (element, index) {
          if (!element) {
            return element;
          }

          warning(element.type && element.type.__ANT_BREADCRUMB_ITEM, "Breadcrumb only accepts Breadcrumb.Item as it's children");
          return cloneElement(element, {
            separator: separator,
            key: index
          });
        });
      }

      return React.createElement("div", {
        className: classNames(className, prefixCls),
        style: style
      }, crumbs);
    };

    return _this;
  }

  _createClass(Breadcrumb, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var props = this.props;
      warning(!('linkRender' in props || 'nameRender' in props), '`linkRender` and `nameRender` are removed, please use `itemRender` instead, ' + 'see: https://u.ant.design/item-render.');
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConfigConsumer, null, this.renderBreadcrumb);
    }
  }]);

  return Breadcrumb;
}(React.Component);

export { Breadcrumb as default };
Breadcrumb.defaultProps = {
  separator: '/'
};
Breadcrumb.propTypes = {
  prefixCls: PropTypes.string,
  separator: PropTypes.node,
  routes: PropTypes.array,
  params: PropTypes.object,
  linkRender: PropTypes.func,
  nameRender: PropTypes.func
};